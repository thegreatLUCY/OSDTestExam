import os, sys, json, time, math

OUT = os.path.join(os.path.dirname(__file__), "..", "official", "transcripts")
SRC = os.path.join(os.path.dirname(__file__), "..", "official")
os.makedirs(OUT, exist_ok=True)

t0 = time.time()
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly
import whisper

print(f"[{time.time()-t0:.0f}s] libs ok", flush=True)
model = whisper.load_model(os.environ.get("WHISPER_MODEL", "small"))
print(f"[{time.time()-t0:.0f}s] model loaded", flush=True)

for n in (1, 2, 3):
    mp3 = os.path.join(SRC, f"za1-ms-a{n}.mp3")
    data, sr = sf.read(mp3, dtype="float32", always_2d=False)
    if getattr(data, "ndim", 1) > 1:
        data = data.mean(axis=1)
    if sr != 16000:
        g = math.gcd(int(sr), 16000)
        data = resample_poly(data, 16000 // g, int(sr) // g).astype(np.float32)
    print(f"[{time.time()-t0:.0f}s] decoded a{n} ({len(data)/16000:.0f}s) -> transcribing", flush=True)
    r = model.transcribe(data, language="de", fp16=False, verbose=False)
    base = os.path.join(OUT, f"za1-ms-a{n}")
    with open(base + ".txt", "w", encoding="utf-8") as f:
        f.write(r["text"].strip())
    with open(base + ".json", "w", encoding="utf-8") as f:
        json.dump(
            [{"start": round(s["start"], 2), "end": round(s["end"], 2), "text": s["text"].strip()} for s in r["segments"]],
            f, ensure_ascii=False, indent=2,
        )
    print(f"[{time.time()-t0:.0f}s] done a{n}: {len(r['segments'])} segments", flush=True)

print(f"[{time.time()-t0:.0f}s] ALL DONE", flush=True)
