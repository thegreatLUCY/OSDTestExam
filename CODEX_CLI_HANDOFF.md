# Codex CLI Handoff - OSD German A1 Practice Site

Date: 2026-05-24

This handoff is for continuing the OSD/ÖSD German A1 exam practice website work in Codex CLI.

## Critical Guardrails

- Work only in this fork:
  `/Users/robeirtoma/Downloads/OSD GERMAN A1 fork`
- Do not touch the original project folder:
  `/Users/robeirtoma/Documents/OSD GERMAN A1`
- Do not use or modify the original live server on:
  `http://localhost:8095/`
- The fork has been served separately on:
  `http://localhost:8096/`

The user was very explicit about this boundary. Treat the original folder as read-only background history and avoid opening/editing it unless the user explicitly changes the instruction.

## How To Run

From the fork:

```bash
cd "/Users/robeirtoma/Downloads/OSD GERMAN A1 fork"
python3 -m http.server 8096
```

Open:

```text
http://localhost:8096/?v=27
```

If `8096` is busy, inspect first:

```bash
lsof -i :8096
```

Do not kill processes unless the user approves or clearly asks.

## Project Shape

This is a static HTML/CSS/JS app. There is no package manager or build step.

Main files:

- `index.html`
  - App shell.
  - Loads `styles.css?v=27` and `app.js?v=27`.
  - Contains early theme boot script to prevent the wrong theme from flashing.
- `styles.css`
  - Layout, exam paper styling, cards, dark theme variables, print rules.
- `app.js`
  - All exam data.
  - Rendering.
  - Scoring.
  - State management.
  - Theme toggle.
- `assets/pdf/osd-za1-official-sample-2024.pdf`
  - Official model set PDF.
- `assets/img/official/page-01.png` through `page-16.png`
  - Rendered official PDF pages used in the official reference view.
- `assets/audio/official/`
  - Official listening audio:
    - `za1-ms-a1.mp3`
    - `za1-ms-a2.mp3`
    - `za1-ms-a3.mp3`
  - Official transcripts are embedded in `app.js`.
- `assets/img/practice/exam-*`
  - Downloaded/replaced practice images.
- `assets/audio/generated/`
  - Manually supplied practice listening MP3 files.
- `assets/img/scripts/fetch_photos.py`
  - Source image search/download script for practice images.
- `scripts/generate-openrouter-tts.mjs`
  - Local-only OpenRouter TTS generator for practice listening MP3s.
  - Reads transcripts from `app.js`.
  - Writes MP3 files to the existing `assets/audio/generated/exam-*-task-*.mp3` paths.
  - Requires `OPENROUTER_API_KEY`; never put the key in browser code.

## Current Exam Inventory

Exam IDs in `app.js`:

- `exam-official`
  - Official ÖSD ZA1 model set.
  - Uses official PDF/page images and official MP3 audio.
- `exam-1`
  - Übungssatz 1.
  - Theme: Ankommen in Wien.
  - Sprechen uses custom images: `speaking-1.jpg`, `speaking-2.jpg`, `speaking-3.jpg`.
- `exam-2`
  - Übungssatz 2.
  - Theme: Termine und Alltag.
- `exam-3`
  - Übungssatz 3.
  - Theme: Familie und Freizeit.
- `exam-4`
  - Übungssatz 4.
  - Theme: Unterwegs und Einkaufen.
- `exam-5`
  - Übungssatz 5.
  - Theme: Post, Bank und Erledigungen.
- `exam-6`
  - Übungssatz 6.
  - Theme: Gesundheit und Wohnen.
- `exam-7`
  - Übungssatz 7.
  - Theme: Lernen und Arbeit.
- `exam-8`
  - Übungssatz 8.
  - Theme: Freizeit und Besuch.
- `exam-9`
  - Übungssatz 9.
  - Theme: Amt, Bank und Fundbüro.
- `exam-10`
  - Übungssatz 10.
  - Theme: Reise, Wetter und Gepäck.
- `exam-11`
  - Übungssatz 11.
  - Theme: Wohnen, Nachbarn und Reparaturen.
- `exam-12`
  - Übungssatz 12.
  - Theme: Arbeit, Kurs und digitale Termine.

## What Was Built Or Fixed

### Fork/server separation

- The user rejected changes to the original project and asked for all work to happen only in the fork.
- The fork was run on `8096`.
- The original live version on `8095` must remain untouched.

### Übungssatz 2

- Added realistic ÖSD-style paper sections:
  - Lesen Aufgabe 1 Anzeigen sheet.
  - Lesen Aufgabe 3 Bilder sheet.
  - Hören Aufgabe 1 Fotos sheet.
- Added inline listening transcripts.
- Listening audio was later replaced by manually supplied MP3 files.
- Removed answer leaks such as visible `Bild 1: ...` labels.
- Corrected Lesen Aufgabe 3 item E to:
  `Ich suche Arbeit am Samstagvormittag im Café.`
- Corrected Hören Aufgabe 2 instruction to refer to the Notizblatt.
- Improved Schreiben so scored fields are grounded in the prompt.

### Dark theme

- Added a persistent light/dark theme toggle.
- Storage key:
  `osd-a1-theme`
- Added `:root[data-theme="dark"]` variables.
- Converted many hard-coded light surfaces to variables.
- Added print safeguards so dark mode does not break printed sheets.
- Adjusted mobile header layout so the theme controls do not overflow.

### Übungssatz 3

- Added Anzeigen sheet, Bilder/Fotos sheets, and transcripts.
- Added image scenes to `assets/img/scripts/fetch_photos.py`.
- Downloaded Openverse images for the set.
- Resized a very large image and corrected it back to JPEG format.
- Listening audio was later replaced by manually supplied MP3 files.

### Official Modellsatz correction

The official Lesen Aufgabe 3 answer registration was wrong because rows B-E were not in the same order as the official PDF.

Correct official answer mapping:

- A = 5
- B = 4
- C = 1
- D = 6
- E = 3

The row order was corrected in `app.js`:

- A: hospital phone ban
- B: Gasthaus
- C: no smoking office
- D: dog leash
- E: airport bus

Official Hören Aufgabe 3 was checked and was already correct:

- Asien
- Afrika
- Europa
- Amerika
- Afrika

### Übungssatz 4

The audit showed Satz 4 was weaker than the others:

- No paper-style sheets.
- Visible answer leaks in labels.
- Missing transcript keys.
- Writing form was too thin.

Fixes:

- Added Anzeigen sheet.
- Added Bilder/Fotos sheets.
- Added inline transcripts.
- Added image scenes to `assets/img/scripts/fetch_photos.py`.
- Downloaded images.
- Replaced the double-negative reading item:
  `Braucht man keinen Ausweis?`
  with:
  `Muss man einen Ausweis mitbringen?`
- Listening audio was later replaced by manually supplied MP3 files.
- Expanded the writing form to 10 grounded fields:
  - Name
  - Geburtsdatum
  - Adresse
  - Telefon
  - E-Mail
  - Ziel
  - Datum
  - Abfahrt
  - Personen
  - Bezahlung

### Writing scoring robustness

`app.js` form scoring now accepts both the displayed answer and any accepted variants:

```js
const accepted = [field.answer, ...(field.accepted || [])]
```

This applies to scoring and review rendering.

Übungssatz 1 writing was expanded to 10 fields:

- Familienname
- Vorname
- Geburtsdatum
- Straße
- Hausnummer
- PLZ
- Ort
- Telefon
- E-Mail
- Muttersprache

The prompt now includes `Muttersprache Arabisch`.

## Assets Currently Present

Practice images:

- `assets/img/practice/exam-1/`
- `assets/img/practice/exam-2/`
- `assets/img/practice/exam-3/`
- `assets/img/practice/exam-4/`
- `assets/img/practice/exam-5/`
- `assets/img/practice/exam-6/`
- `assets/img/practice/exam-7/`
- `assets/img/practice/exam-8/`
- `assets/img/practice/exam-9/`
- `assets/img/practice/exam-10/`
- `assets/img/practice/exam-11/`
- `assets/img/practice/exam-12/`

Most sets have:

- `l1-A.jpg` through `l1-F.jpg`
- `l3-1.jpg` through `l3-6.jpg`
- `manifest.json`

Note: `exam-1` has a slightly different legacy image layout:

- It uses `pharmacy.jpg` for some references.
- It does not fully mirror the later `l1-*` and `l3-*` naming pattern.

Practice audio:

- `assets/audio/generated/exam-1-task-1.mp3`
- `assets/audio/generated/exam-1-task-2.mp3`
- `assets/audio/generated/exam-1-task-3.mp3`
- `assets/audio/generated/exam-2-task-1.mp3`
- `assets/audio/generated/exam-2-task-2.mp3`
- `assets/audio/generated/exam-2-task-3.mp3`
- `assets/audio/generated/exam-3-task-1.mp3`
- `assets/audio/generated/exam-3-task-2.mp3`
- `assets/audio/generated/exam-3-task-3.mp3`
- `assets/audio/generated/exam-4-task-1.mp3`
- `assets/audio/generated/exam-4-task-2.mp3`
- `assets/audio/generated/exam-4-task-3.mp3`

Übungssatz 1-6 audio is manually supplied MP3 audio. Übungssatz 7-12 audio was generated with OpenRouter TTS. All MP3 paths for Übungssatz 5-12 are currently present:

- `assets/audio/generated/exam-5-task-1.mp3` through `exam-12-task-3.mp3`

Practice transcripts are embedded in `app.js` next to each listening task; separate practice transcript markdown files were removed to avoid duplication.

OpenRouter TTS workflow:

```bash
OPENROUTER_API_KEY=sk-or-... node scripts/generate-openrouter-tts.mjs --exams 9-12
```

Defaults:

- endpoint: `https://openrouter.ai/api/v1/audio/speech`
- model: `openai/gpt-4o-mini-tts-2025-12-15`
- voice: `nova`
- speed: `0.92`

The script skips existing MP3 files unless `--force` is passed. Use `--dry-run` to preview without calling the API.

Important generator behavior:

- Numbered Hören texts are generated segment-by-segment so every `Text 1`, `Text 2`, etc. is spoken.
- Aufgabe 2 Notizblatt audio is generated as three segments: first reading, "Sie hören den Text jetzt zum zweiten Mal.", second reading. This avoids the TTS provider shortening/reusing repeated text.

## Verification Already Completed

Commands that passed:

```bash
node --check app.js
node --check scripts/generate-openrouter-tts.mjs
node scripts/generate-openrouter-tts.mjs --exams 8-12 --dry-run
python3 -m py_compile assets/img/scripts/fetch_photos.py
```

Latest validation for Übungssatz 9-12:

- Übungssatz 9-12 Lesen:
  - `16/16` correct per set.
  - `30/30` points per set.
- Übungssatz 9-12 Hören:
  - `16/16` correct per set.
  - `30/30` points per set.
- Übungssatz 9-12 Schreiben form:
  - `10/10` expected fields correct per set.

Asset-reference check showed all referenced images exist. Expected missing audio files are pending manual recordings for exams that have not yet been supplied.

An isolated scoring harness was also run against practice sets 1-4. Result:

- Übungssatz 1-4 Lesen:
  - `16/16` correct.
  - `30/30` points.
- Übungssatz 1-4 Hören:
  - `16/16` correct.
  - `30/30` points.
- Übungssatz 1-4 Schreiben form:
  - `10/10` expected fields correct.
  - `5/5` points.
- No scoring issues were reported by the harness.

Live browser verification on `http://localhost:8096/?v=17` showed:

- Exams 1-4 reading:
  - Anzeigen sheet present.
  - Image sheet present.
  - 6 images present.
  - Images loaded successfully.
  - No answer-label leaks found.
  - No horizontal overflow.
- Exams 1-4 listening:
  - 3 audio players present.
  - Audio sources loaded successfully.
  - Photo sheet present.
  - 6 images present.
  - Images loaded successfully.
  - Notizblatt present.
  - No transcript-key leaks found.
  - No horizontal overflow.
- Browser console/page errors:
  - none observed.

## Known Caveats

- The practice sets are ÖSD-style practice sets, not official ÖSD materials.
- Only the `exam-official` set uses official ÖSD PDF/audio.
- Practice listening audio is manually supplied MP3 audio and should be treated as training audio, not official sample audio.
- Some practice images are downloaded CC/Openverse-style placeholders. The user may replace images manually. If they do, preserve the same filenames and paths so `app.js` references keep working.
- Some UI strings are still English, for example score labels. This has not been fully German-localized yet.
- There may be a `__pycache__` folder from Python compilation. It is not important to the app.

## Cache Versioning

Current cache query version in `index.html` is `v=27`.

When changing `app.js` or `styles.css`, bump both references in `index.html`, for example:

```html
<link rel="stylesheet" href="styles.css?v=27">
<script src="app.js?v=27" defer></script>
```

Then test with:

```text
http://localhost:8096/?v=27
```

## Important Workflow Notes

- Prefer editing with `apply_patch`.
- Do not overwrite user-replaced images.
- If replacing an image, use the same target filename unless intentionally changing `app.js`.
- Before changing an exam, inspect the relevant data block in `app.js`.
- After changing an exam, run:

```bash
node --check app.js
```

- After changing scripts, run:

```bash
python3 -m py_compile assets/img/scripts/fetch_photos.py
```

- After changing UI/CSS, open the site on `8096` and check:
  - official set still works,
  - target Übungssatz renders,
  - no answer leaks,
  - no horizontal overflow,
  - images/audio load,
  - dark theme still works,
  - print/paper sections remain readable.

## Suggested Next Work

- Human visual QA for Übungssatz 3 and 4 images.
- Replace any weak images while preserving paths.
- Localize remaining English UI strings into German if desired.
- Add a dedicated answer-key/review mode.
- Improve printable worksheets.
- Add a short learner progress/save summary if the user wants repeated practice tracking.

## User Expectations

The user is looking for a precise ÖSD A1-style trainer, not a generic German quiz shell.

The important standard is:

- reading tasks should look and behave like ÖSD A1 Lesen:
  - situations to ads,
  - short text yes/no,
  - notices/images matching;
- listening tasks should look and behave like ÖSD A1 Hören:
  - picture matching,
  - Notizblatt completion,
  - interview/matrix task;
- writing should be grounded in realistic form/email prompts;
- official materials should be used directly where available;
- invented practice content is acceptable only when it follows the real exam structure closely.

When unsure, compare any new practice set against Übungssatz 1 and the official Modellsatz before declaring it done.
