import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appPath = resolve(root, "app.js");

const defaults = {
  baseUrl: "https://openrouter.ai/api/v1",
  model: "openai/gpt-4o-mini-tts-2025-12-15",
  voice: "nova",
  speed: 0.92,
  responseFormat: "mp3",
  instructions:
    "Speak in clear, natural standard German for an ÖSD A1 listening exam. Use a calm adult voice, slow exam pace, careful numbers and dates, and short pauses between items."
};

function usage() {
  return `
Usage:
  OPENROUTER_API_KEY=... node scripts/generate-openrouter-tts.mjs --exams 9-12

Options:
  --exams 9-12        Exam range or comma list, e.g. 9-12 or 9,10,11,12
  --exam exam-9       Single exam id. Can be repeated.
  --tasks 1-3         Listening task range/list. Defaults to 1-3.
  --voice nova        Voice. Defaults to OPENROUTER_TTS_VOICE or nova.
  --model slug        Defaults to openai/gpt-4o-mini-tts-2025-12-15.
  --speed 0.92        Playback speed. OpenAI TTS supports this.
  --force             Overwrite existing MP3 files.
  --dry-run           Print what would be generated without calling the API.
`;
}

async function loadDotEnv() {
  try {
    const text = await readFile(resolve(root, ".env"), "utf8");
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) continue;
      let value = rawValue.trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function parseArgs(argv) {
  const args = {
    exams: [],
    tasks: [1, 2, 3],
    force: false,
    dryRun: false,
    model: process.env.OPENROUTER_TTS_MODEL || defaults.model,
    voice: process.env.OPENROUTER_TTS_VOICE || defaults.voice,
    speed: Number(process.env.OPENROUTER_TTS_SPEED || defaults.speed),
    baseUrl: process.env.OPENROUTER_BASE_URL || defaults.baseUrl,
    instructions: process.env.OPENROUTER_TTS_INSTRUCTIONS || defaults.instructions
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--force") {
      args.force = true;
      continue;
    }
    if (arg === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (arg === "--exam") {
      args.exams.push(normalizeExamId(argv[++i]));
      continue;
    }
    if (arg === "--exams") {
      args.exams.push(...parseNumberList(argv[++i]).map((n) => `exam-${n}`));
      continue;
    }
    if (arg === "--tasks") {
      args.tasks = parseNumberList(argv[++i]);
      continue;
    }
    if (arg === "--model") {
      args.model = argv[++i];
      continue;
    }
    if (arg === "--voice") {
      args.voice = argv[++i];
      continue;
    }
    if (arg === "--speed") {
      args.speed = Number(argv[++i]);
      continue;
    }
    if (arg === "--base-url") {
      args.baseUrl = argv[++i];
      continue;
    }
    if (arg === "--instructions") {
      args.instructions = argv[++i];
      continue;
    }
    throw new Error(`Unknown option: ${arg}${usage()}`);
  }

  if (!args.exams.length) {
    throw new Error(`Choose exams explicitly, for example: --exams 9-12${usage()}`);
  }
  if (!Number.isFinite(args.speed) || args.speed <= 0) {
    throw new Error("--speed must be a positive number");
  }
  return args;
}

function normalizeExamId(value) {
  if (!value) throw new Error("Missing exam id");
  return value.startsWith("exam-") ? value : `exam-${value}`;
}

function parseNumberList(value) {
  if (!value) throw new Error("Missing range/list value");
  const parts = value.split(",");
  const numbers = [];
  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((n) => Number(n.trim()));
      if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
        throw new Error(`Invalid range: ${part}`);
      }
      for (let n = start; n <= end; n += 1) numbers.push(n);
    } else {
      const n = Number(part.trim());
      if (!Number.isInteger(n)) throw new Error(`Invalid number: ${part}`);
      numbers.push(n);
    }
  }
  return [...new Set(numbers)];
}

async function loadExams() {
  const code = await readFile(appPath, "utf8");
  const marker = "/* ---------- state ---------- */";
  const markerIndex = code.indexOf(marker);
  if (markerIndex === -1) throw new Error(`Could not find app data marker in ${appPath}`);

  const context = { console };
  vm.createContext(context);
  vm.runInContext(`${code.slice(0, markerIndex)}\nglobalThis.__exams = exams;`, context);
  return context.__exams;
}

function speechInputs(task, taskNumber) {
  const transcript = String(task.transcript || "").trim();
  if (!transcript) return [];

  if (taskNumber === 2) {
    const clean = transcript.replace(/\s*\(Sie hören den Text zwei Mal\.\)\s*$/i, "").trim();
    return [clean, "Sie hören den Text jetzt zum zweiten Mal.", clean];
  }

  const parts = transcript.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const hasNumberedTexts = parts.some((part) => /^Text\s+\d+:/i.test(part));
  return hasNumberedTexts ? parts : [transcript];
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function createSpeech({ apiKey, baseUrl, model, voice, speed, responseFormat, instructions, input }) {
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/audio/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:8096",
      "X-Title": "OSD German A1 Practice"
    },
    body: JSON.stringify({
      model,
      input,
      voice,
      response_format: responseFormat,
      speed,
      provider: {
        options: {
          openai: {
            instructions
          }
        }
      }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenRouter TTS failed (${response.status}): ${text}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  await loadDotEnv();
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey && !args.dryRun) {
    throw new Error("OPENROUTER_API_KEY is required unless --dry-run is used");
  }

  const exams = await loadExams();
  const selected = exams.filter((exam) => args.exams.includes(exam.id));
  const missing = args.exams.filter((id) => !selected.some((exam) => exam.id === id));
  if (missing.length) throw new Error(`Exam id not found: ${missing.join(", ")}`);

  for (const exam of selected) {
    for (const taskNumber of args.tasks) {
      const task = exam.listening?.tasks?.[taskNumber - 1];
      if (!task) throw new Error(`${exam.id} has no listening Aufgabe ${taskNumber}`);
      if (!task.audio) throw new Error(`${exam.id} listening Aufgabe ${taskNumber} has no audio path`);

      const outputPath = resolve(root, task.audio);
      const inputs = speechInputs(task, taskNumber);
      if (!inputs.length) throw new Error(`${exam.id} listening Aufgabe ${taskNumber} has no transcript`);
      const totalChars = inputs.reduce((sum, input) => sum + input.length, 0);

      if (!args.force && await exists(outputPath)) {
        console.log(`SKIP ${task.audio} existing`);
        continue;
      }

      if (args.dryRun) {
        console.log(`DRY  ${task.audio} ${totalChars} chars in ${inputs.length} segment(s)`);
        continue;
      }

      console.log(`TTS  ${task.audio} ${totalChars} chars in ${inputs.length} segment(s)`);
      const chunks = [];
      for (let index = 0; index < inputs.length; index += 1) {
        if (inputs.length > 1) console.log(`     segment ${index + 1}/${inputs.length}`);
        chunks.push(await createSpeech({
          apiKey,
          baseUrl: args.baseUrl,
          model: args.model,
          voice: args.voice,
          speed: args.speed,
          responseFormat: defaults.responseFormat,
          instructions: args.instructions,
          input: inputs[index]
        }));
      }
      const audio = Buffer.concat(chunks);
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, audio);
      console.log(`OK   ${task.audio} ${Math.round(audio.length / 1024)} KB`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
