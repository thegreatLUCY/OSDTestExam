# ÖSD ZA1 German A1 Practice Exam Trainer

A browser-based practice trainer for the ÖSD Zertifikat A1 / ZA1 exam format. The app includes the official model set as a reference and twelve practice exams with matching reading, listening, writing, and speaking sections.

The goal is to make repeated exam practice feel close to the real paper/audio workflow while keeping the project simple to run: it is a static HTML/CSS/JavaScript site with no build step.

## Screenshots

![Exam overview](docs/screenshots/overview.png)

![Reading task](docs/screenshots/reading.png)

![Listening task](docs/screenshots/listening.png)

## What Is Included

- Official ÖSD ZA1 model set reference with original PDF page images and official audio.
- Twelve complete practice exams in the same core flow:
  - `Lesen`: ads/situations, yes/no notices, image matching.
  - `Hören`: photo matching, note sheet completion, short interviews.
  - `Schreiben`: form completion plus short email prompt.
  - `Sprechen`: introduction topics, picture description, role-play prompt.
- Automatic scoring for reading, listening, and the writing form task.
- Manual/self-check support for writing email and speaking.
- Light/dark theme, printable pages, persistent local progress.
- Practice MP3 audio for all practice exams.

## Run Locally

From the project root:

```bash
python3 -m http.server 8096
```

Open:

```text
http://localhost:8096/?v=30
```

No package install is required for the app itself.

## Project Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── docs/screenshots/
├── assets/
│   ├── audio/
│   │   ├── official/
│   │   └── generated/
│   ├── img/
│   │   ├── official/
│   │   └── practice/
│   └── pdf/
└── scripts/
```

The practice exam content is defined in `app.js`. Audio and image paths are normal static assets, so replacing media is usually just a matter of preserving the same filename.

## Audio Workflow

Practice audio files live in:

```text
assets/audio/generated/
```

The current project uses manually supplied MP3 files for earlier practice exams and OpenRouter-generated MP3 files for later sets. The OpenRouter generator is local-only and reads transcripts from `app.js`.

Example:

```bash
OPENROUTER_API_KEY=sk-or-... node scripts/generate-openrouter-tts.mjs --exams 9-12
```

Useful options:

```bash
node scripts/generate-openrouter-tts.mjs --exams 8-12 --dry-run
node scripts/generate-openrouter-tts.mjs --exams 12 --tasks 2 --force
```

The script skips existing MP3 files unless `--force` is passed. Keep real API keys in `.env`; `.env` is ignored by Git.

## Image Workflow

Practice images live in:

```text
assets/img/practice/exam-*/
```

The helper script in `assets/img/scripts/fetch_photos.py` can fetch replacement images from Openverse/Pexels while preserving the expected naming pattern. If you replace images manually, keep the same filenames unless you also update `app.js`.

## Verification

Useful checks:

```bash
node --check app.js
node --check scripts/generate-openrouter-tts.mjs
python3 -m py_compile assets/img/scripts/fetch_photos.py
```

Asset reference check:

```bash
node -e 'const fs=require("fs"); const code=fs.readFileSync("app.js","utf8"); const refs=[...code.matchAll(/"(assets\\/(?:img|audio|pdf)\\/[^"]+)"/g)].map(m=>m[1]); const missing=[...new Set(refs)].filter(p=>!fs.existsSync(p)); console.log(missing.length?missing.join("\\n"):"all referenced assets present");'
```

## Notes

- This is an independent practice tool, not an official ÖSD product.
- The official model set is kept as a reference section; practice exams are authored training material.
- API keys and local machine artifacts are intentionally ignored.
