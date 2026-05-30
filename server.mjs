// ---------------------------------------------------------------------------
// Local development server for the OSD ZA1 trainer.
//
// Why this file exists:
//   The trainer is a static site (index.html + app.js + styles.css). For the
//   new AI speaking practice we need to call two paid APIs on OpenRouter. API
//   keys must NEVER live in browser JavaScript (anyone could read them in the
//   page source and run up your bill). So the browser talks to THIS small
//   server instead, and only this server knows the key.
//
//   This server does two jobs:
//     1. Serves the static files (replacing `python3 -m http.server`).
//     2. Exposes one API endpoint: POST /api/speaking-feedback
//
//   It uses only built-in Node modules, so there is no `npm install` and no
//   build step - run it with:  node server.mjs
//
// Flow of the speaking feature:
//   browser records German speech (webm)
//      -> sends base64 audio to POST /api/speaking-feedback
//          -> we call OpenRouter Whisper (speech -> text transcript)
//          -> we call OpenRouter Gemini (transcript -> friendly A1 correction)
//      <- we return JSON { transcript, corrected, mistakes, translation, nextQuestion }
// ---------------------------------------------------------------------------

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// The folder this file lives in == the site root we serve from.
const root = dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT || 8096);

// OpenRouter details. We reuse the SAME key for both transcription and chat.
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const STT_MODEL = process.env.OPENROUTER_STT_MODEL || "openai/whisper-1";
const CHAT_MODEL = process.env.OPENROUTER_CHAT_MODEL || "google/gemini-2.5-flash-lite";

// ---------------------------------------------------------------------------
// Load .env (so OPENROUTER_API_KEY is available). Same lightweight parser the
// TTS script uses - no dependency on a dotenv package.
// ---------------------------------------------------------------------------
async function loadDotEnv() {
  try {
    const text = await readFile(resolve(root, ".env"), "utf8");
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) continue; // real env vars win
      let value = rawValue.trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error; // missing .env is fine
  }
}

// ---------------------------------------------------------------------------
// The tutor's instructions. We ask the model to reply with STRICT JSON so the
// browser can show each piece (correction, mistakes, translation, next
// question) in its own box. Keeping the German at A1 level is the whole point.
// ---------------------------------------------------------------------------
const TUTOR_SYSTEM_PROMPT = `You are a friendly, encouraging German speaking tutor for absolute beginners (CEFR level A1).
A student is practising for the OSD Zertifikat A1 speaking exam. You receive the exam task and a transcript of what the student SAID OUT LOUD (the transcript may contain speech-recognition errors - be forgiving).

Reply with ONLY a JSON object, no markdown, in exactly this shape:
{
  "corrected": "the student's sentence(s) rewritten in correct, simple A1 German. Keep it short and natural.",
  "mistakes": ["one short, kind note per mistake, in English, e.g. 'Use \"bin\" not \"ist\" with ich.' If there are no mistakes, return an empty array."],
  "translation": "the corrected German translated into simple English",
  "nextQuestion": "one new, very simple A1 German question to keep the conversation going, related to the task"
}

Rules:
- Stay at A1: short sentences, common words, present tense, no complex grammar terms.
- Be warm and positive. Praise effort.
- If the transcript is empty or not German, gently say so inside "mistakes" and give an easy nextQuestion to try again.
- Output valid JSON only. No backticks, no extra text.`;

// ---------------------------------------------------------------------------
// Helper: read the full request body and parse it as JSON.
// ---------------------------------------------------------------------------
function readJsonBody(req) {
  return new Promise((resolvePromise, reject) => {
    const chunks = [];
    let size = 0;
    const LIMIT = 30 * 1024 * 1024; // 30 MB safety cap (audio is small, but be safe)
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > LIMIT) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolvePromise(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

// Small helper to send a JSON response with a status code.
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

// ---------------------------------------------------------------------------
// Step 1: send the recorded audio to OpenRouter Whisper -> get a transcript.
// ---------------------------------------------------------------------------
async function transcribeAudio(apiKey, audioBase64, format) {
  const response = await fetch(`${OPENROUTER_BASE_URL}/audio/transcriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: STT_MODEL,
      // OpenRouter wants raw base64 (NOT a data: URL) plus the container format.
      input_audio: { data: audioBase64, format },
      language: "de", // we expect German; helps accuracy
      temperature: 0
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Transcription failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const data = await response.json();
  return (data.text || "").trim();
}

// ---------------------------------------------------------------------------
// Step 2: send the transcript to the Gemini tutor -> get structured feedback.
// ---------------------------------------------------------------------------
async function getTutorFeedback(apiKey, { transcript, taskTitle, taskPrompt, mode, cardTopic, previousQuestion }) {
  // Build the context we hand the tutor. Guided mode focuses the correction on
  // one specific topic card; chat mode keeps a back-and-forth going.
  let userContent =
    `Exam task: ${taskTitle || "Sprechen"}\n` +
    `Instructions: ${taskPrompt || "Speak freely in simple German."}\n`;
  if (mode === "guided" && cardTopic) {
    userContent += `The student is speaking about this topic card: "${cardTopic}". Focus your correction on this topic. Your nextQuestion is ignored here, so keep it short.\n`;
  }
  if (mode === "chat" && previousQuestion) {
    userContent += `You previously asked: "${previousQuestion}". The student is answering that question.\n`;
  }
  userContent += `\nStudent said (transcript): "${transcript}"`;

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: "system", content: TUTOR_SYSTEM_PROMPT },
        { role: "user", content: userContent }
      ],
      // Ask the API to guarantee a JSON object back when the model supports it.
      response_format: { type: "json_object" },
      temperature: 0.4
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Tutor request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "";
  return parseTutorJson(content);
}

// The model is told to return JSON, but models sometimes wrap it in ```json
// fences or add stray text. This parses defensively so one odd reply doesn't
// crash the feature.
function parseTutorJson(content) {
  let text = content.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  }
  try {
    return normalizeFeedback(JSON.parse(text));
  } catch {
    // Last resort: grab the first {...} block we can find.
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return normalizeFeedback(JSON.parse(match[0]));
      } catch {
        /* fall through */
      }
    }
    throw new Error("Tutor returned an unparseable response.");
  }
}

// Make sure the shape is always what the browser expects.
function normalizeFeedback(obj) {
  return {
    corrected: typeof obj.corrected === "string" ? obj.corrected : "",
    mistakes: Array.isArray(obj.mistakes) ? obj.mistakes.map(String) : [],
    translation: typeof obj.translation === "string" ? obj.translation : "",
    nextQuestion: typeof obj.nextQuestion === "string" ? obj.nextQuestion : ""
  };
}

// ---------------------------------------------------------------------------
// The API endpoint that ties both steps together.
// ---------------------------------------------------------------------------
async function handleSpeakingFeedback(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "Server is missing OPENROUTER_API_KEY. Add it to your .env file." });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  const {
    audio,
    format = "webm",
    taskTitle = "",
    taskPrompt = "",
    mode = "guided",
    cardTopic = "",
    previousQuestion = ""
  } = body;
  if (!audio || typeof audio !== "string") {
    sendJson(res, 400, { error: "No audio was received. Please record again." });
    return;
  }

  try {
    // 1) speech -> text
    const transcript = await transcribeAudio(apiKey, audio, format);
    if (!transcript) {
      sendJson(res, 200, {
        transcript: "",
        corrected: "",
        mistakes: ["I couldn't hear any speech. Try recording again and speak a little louder."],
        translation: "",
        nextQuestion: "Wie heißen Sie?"
      });
      return;
    }

    // 2) text -> friendly A1 correction
    const feedback = await getTutorFeedback(apiKey, { transcript, taskTitle, taskPrompt, mode, cardTopic, previousQuestion });
    sendJson(res, 200, { transcript, ...feedback });
  } catch (error) {
    // Log the full error in the terminal for debugging; send a short message to the browser.
    console.error("[speaking-feedback]", error);
    sendJson(res, 502, { error: "The AI tutor is unavailable right now. Please try again." });
  }
}

// ---------------------------------------------------------------------------
// Writing checker (Schreiben Aufgabe 2). Text-only -> we only call the chat
// model (no Whisper), so this is much cheaper than the speaking endpoint.
// The model decides, for each checklist item (Anrede, Grund, Tag/Uhrzeit,
// Frage, Gruß), whether it's clearly covered in the student's email.
// ---------------------------------------------------------------------------
const WRITING_SYSTEM_PROMPT = `You check an A1 German text written for the OSD Zertifikat A1 exam, Schreiben Aufgabe 2. The text is either a short personal e-mail or a short formal letter (Brief), at least 30 words long. You are warm and encouraging but precise.

You will be given:
- the task prompt (what the text is about),
- a checklist of items the text must contain,
- the student's text.

For each checklist item decide whether it is clearly present. Be reasonable - short and simple counts. Greetings can be informal ("Liebe Frau ...", "Hallo ...") or formal ("Sehr geehrte ..."). A question must contain a question mark or clearly be phrased as a question to count as "Frage am Ende"/"Bitte". For a letter, look for a formal salutation ("Sehr geehrte ...") and a formal closing ("Mit freundlichen Grüßen") plus a signature/name.

ALSO check, regardless of the checklist:
- Grammar: simple A1 verb forms (sein, haben, modal verbs), correct word order, correct articles (der/die/das) where obvious, separable verbs, correct prepositions in common phrases.
- German capitalization: ALL nouns must start with a capital letter (e.g. "Bus", "Tasche", "Termin"), the first word of every sentence is capitalized, and formal "Sie/Ihr/Ihnen" is always capitalized in letters.
- Spelling of common A1 words.

Reply with ONLY a JSON object (no markdown, no backticks), in this exact shape:
{
  "items": [{"label": "<the exact checklist label>", "covered": true | false, "note": "<one short sentence in English>"}],
  "grammar": ["<one short English sentence per grammar or capitalization issue you found, e.g. 'Capitalize \\"Tasche\\" - it is a noun.'>"],
  "overall": "<one short overall comment in English>",
  "corrected": "<an improved A1-level version of the text in German with correct grammar and capitalization>"
}

Rules:
- One object per checklist label, in the SAME ORDER as given.
- "grammar" is an array. Use an empty array [] if everything is correct.
- Keep notes short (max ~15 words each).
- The corrected version stays at A1 level (short sentences, common words) and must use correct German capitalization.
- Output valid JSON only.`;

async function getWritingFeedback(apiKey, { emailText, prompt, checklist }) {
  const userContent =
    `Email task: ${prompt}\n` +
    `Checklist items (in order): ${JSON.stringify(checklist)}\n\n` +
    `Student's email:\n"""\n${emailText}\n"""`;

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: CHAT_MODEL, // cheap: google/gemini-2.5-flash-lite by default
      messages: [
        { role: "system", content: WRITING_SYSTEM_PROMPT },
        { role: "user", content: userContent }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Writing tutor request failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "";
  return normalizeWritingFeedback(parseLooseJson(content), checklist);
}

// Same defensive JSON-parse approach as parseTutorJson, kept separate so we can
// shape errors more usefully here.
function parseLooseJson(content) {
  let text = content.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  }
  try { return JSON.parse(text); } catch { /* try again */ }
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch { /* fall through */ }
  }
  throw new Error("Writing tutor returned an unparseable response.");
}

// Make sure every checklist item appears in the result (and in order), even if
// the model dropped one. Missing items default to covered=false with a note.
function normalizeWritingFeedback(obj, checklist) {
  const incoming = Array.isArray(obj?.items) ? obj.items : [];
  const items = checklist.map((label) => {
    const match = incoming.find((it) => typeof it?.label === "string" && it.label.trim() === label.trim());
    return {
      label,
      covered: Boolean(match?.covered),
      note: typeof match?.note === "string" ? match.note : (match?.covered ? "Looks good." : "Not clearly in the text.")
    };
  });
  return {
    items,
    grammar: Array.isArray(obj?.grammar) ? obj.grammar.map(String) : [],
    overall: typeof obj?.overall === "string" ? obj.overall : "",
    corrected: typeof obj?.corrected === "string" ? obj.corrected : ""
  };
}

// Simple A1-friendly word count: split on whitespace, ignore empties.
const MIN_WORDS = 30;
function countWordsServer(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function handleWritingFeedback(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "Server is missing OPENROUTER_API_KEY. Add it to your .env file." });
    return;
  }
  let body;
  try { body = await readJsonBody(req); }
  catch (error) { sendJson(res, 400, { error: error.message }); return; }

  const { emailText = "", prompt = "", checklist = [] } = body;
  if (typeof emailText !== "string" || !emailText.trim()) {
    sendJson(res, 400, { error: "Please write your email first." });
    return;
  }
  if (!Array.isArray(checklist) || !checklist.length) {
    sendJson(res, 400, { error: "Missing checklist." });
    return;
  }

  try {
    const feedback = await getWritingFeedback(apiKey, { emailText, prompt, checklist });
    // Deterministic word count (we don't trust the model to count). Browser
    // shows this prominently as a pass/fail indicator alongside the checklist.
    const wordCount = countWordsServer(emailText);
    sendJson(res, 200, {
      ...feedback,
      wordCount,
      minWords: MIN_WORDS,
      wordCountOk: wordCount >= MIN_WORDS
    });
  } catch (error) {
    console.error("[writing-feedback]", error);
    sendJson(res, 502, { error: "The AI tutor is unavailable right now. Please try again." });
  }
}

// ---------------------------------------------------------------------------
// Vocabulary lookup. Given a single German word (and the surrounding sentence
// for context), Gemini returns a short English translation plus two A1-level
// example sentences. Used by the click-to-translate feature in the browser.
// ---------------------------------------------------------------------------
const TRANSLATE_SYSTEM_PROMPT = `You translate single German words for an absolute beginner (A1) learning German. You are concise and accurate.

You receive one word and optionally the sentence it came from (for context, e.g. to disambiguate homonyms).

Reply with ONLY a JSON object, no markdown, no backticks, in this exact shape:
{
  "translation": "<short English meaning. If the word has several common meanings, list them comma-separated. Keep it under 60 characters.>",
  "examples": ["<one short A1 German sentence using this word>", "<another short A1 German sentence using this word>"]
}

Rules:
- The two example sentences must use the SAME word (or its correctly inflected form).
- Keep examples simple (present tense when possible, short, everyday vocabulary).
- Always return exactly 2 examples.
- Output valid JSON only.`;

async function translateWord(apiKey, { word, context }) {
  const userContent = context
    ? `Word: "${word}"\nContext sentence: "${context}"`
    : `Word: "${word}"`;

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: CHAT_MODEL, // gemini-2.5-flash-lite - cheap
      messages: [
        { role: "system", content: TRANSLATE_SYSTEM_PROMPT },
        { role: "user", content: userContent }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Translate request failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || "";
  const parsed = parseLooseJson(content);
  return {
    translation: typeof parsed?.translation === "string" ? parsed.translation : "",
    examples: Array.isArray(parsed?.examples) ? parsed.examples.slice(0, 2).map(String) : []
  };
}

async function handleTranslateWord(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    sendJson(res, 500, { error: "Server is missing OPENROUTER_API_KEY. Add it to your .env file." });
    return;
  }
  let body;
  try { body = await readJsonBody(req); }
  catch (error) { sendJson(res, 400, { error: error.message }); return; }

  const word = (body.word || "").trim();
  const context = typeof body.context === "string" ? body.context.slice(0, 400) : "";
  if (!word) {
    sendJson(res, 400, { error: "No word supplied." });
    return;
  }
  if (word.length > 60) {
    sendJson(res, 400, { error: "Word too long." });
    return;
  }

  try {
    const result = await translateWord(apiKey, { word, context });
    sendJson(res, 200, result);
  } catch (error) {
    console.error("[translate-word]", error);
    sendJson(res, 502, { error: "The translator is unavailable right now." });
  }
}

// ---------------------------------------------------------------------------
// Static file serving (so the same server delivers index.html, app.js, audio, etc.)
// ---------------------------------------------------------------------------
const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".webm": "audio/webm",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon"
};

async function serveStatic(req, res) {
  // Strip the query string (e.g. ?v=33 cache-buster) before resolving the path.
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  // Resolve against root and block path traversal (e.g. /../.env).
  const filePath = normalize(resolve(root, "." + urlPath));
  if (!filePath.startsWith(root)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }
  // Never serve the secrets file even if someone guesses the path.
  if (filePath.endsWith("/.env")) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  try {
    const info = await stat(filePath);
    if (info.isDirectory()) {
      sendJson(res, 403, { error: "Forbidden" });
      return;
    }
    const data = await readFile(filePath);
    const type = CONTENT_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type, "Content-Length": data.length });
    res.end(data);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
}

// ---------------------------------------------------------------------------
// Router: API requests go to the handler, everything else is a static file.
// ---------------------------------------------------------------------------
const server = createServer((req, res) => {
  const pathname = req.url.split("?")[0];

  if (pathname === "/api/speaking-feedback") {
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Use POST for this endpoint." });
      return;
    }
    handleSpeakingFeedback(req, res);
    return;
  }

  if (pathname === "/api/writing-feedback") {
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Use POST for this endpoint." });
      return;
    }
    handleWritingFeedback(req, res);
    return;
  }

  if (pathname === "/api/translate-word") {
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Use POST for this endpoint." });
      return;
    }
    handleTranslateWord(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

await loadDotEnv();
server.listen(PORT, () => {
  const hasKey = Boolean(process.env.OPENROUTER_API_KEY);
  console.log(`OSD ZA1 trainer running at http://localhost:${PORT}/?v=41`);
  console.log(`Speaking tutor API: POST /api/speaking-feedback`);
  console.log(`Writing tutor API:  POST /api/writing-feedback`);
  console.log(`Translate API:      POST /api/translate-word`);
  if (!hasKey) {
    console.warn("WARNING: OPENROUTER_API_KEY is not set - the speaking tutor will return an error until you add it to .env");
  }
});
