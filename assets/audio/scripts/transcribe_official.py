import os, sys, json, time

OUT = os.path.join(os.path.dirname(__file__), "..", "official", "transcripts")
SRC = os.path.join(os.path.dirname(__file__), "..", "official")
os.makedirs(OUT, exist_ok=True)

FILES = ["za1-ms-a1.mp3", "za1-ms-a2.mp3", "za1-ms-a3.mp3"]

t0 = time.time()
from faster_whisper import WhisperModel

# CPU, int8 for speed on Apple Silicon. Override size with WHISPER_MODEL env.
size = os.environ.get("WHISPER_MODEL", "small")
model = WhisperModel(size, device="cpu", compute_type="int8")
print(f"[{time.time()-t0:.0f}s] model '{size}' loaded", flush=True)

for fn in FILES:
    path = os.path.join(SRC, fn)
    if not os.path.exists(path):
        print("MISSING", path, flush=True)
        continue
    print(f"[{time.time()-t0:.0f}s] transcribing {fn} ...", flush=True)
    segments, info = model.transcribe(
        path, language="de", beam_size=5, vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=500),
    )
    segs = []
    full = []
    for s in segments:
        segs.append({"start": round(s.start, 2), "end": round(s.end, 2), "text": s.text.strip()})
        full.append(s.text.strip())
    base = os.path.splitext(fn)[0]
    with open(os.path.join(OUT, base + ".txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(full))
    with open(os.path.join(OUT, base + ".json"), "w", encoding="utf-8") as f:
        json.dump(segs, f, ensure_ascii=False, indent=2)
    print(f"[{time.time()-t0:.0f}s] done {fn}: {len(segs)} segments", flush=True)

print(f"[{time.time()-t0:.0f}s] ALL DONE", flush=True)
