#!/bin/bash
# Transcribe the 3 official OeSD ZA1 MP3s with whisper.cpp (German).
set -uo pipefail
cd "$(dirname "$0")/../official" || exit 1
OUT=transcripts
mkdir -p "$OUT"

echo "[brew install $(date)]"
brew install ffmpeg whisper-cpp 2>&1 | tail -3

BIN=""
for c in whisper-cli whisper-cpp main; do
  if command -v "$c" >/dev/null 2>&1; then BIN="$c"; break; fi
done
echo "whisper binary: ${BIN:-NONE}"
[ -z "$BIN" ] && { echo "NO_WHISPER_BIN"; exit 1; }

MODEL="$OUT/ggml-small.bin"
if [ ! -s "$MODEL" ]; then
  echo "[download model $(date)]"
  curl -L --fail -o "$MODEL" \
    "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin" 2>&1 | tail -1
fi
ls -la "$MODEL"

for n in 1 2 3; do
  mp3="za1-ms-a${n}.mp3"
  wav="$OUT/za1-ms-a${n}.wav"
  base="$OUT/za1-ms-a${n}"
  echo "[ffmpeg $mp3 $(date)]"
  ffmpeg -y -i "$mp3" -ar 16000 -ac 1 -c:a pcm_s16le "$wav" 2>&1 | tail -1
  echo "[transcribe $mp3 $(date)]"
  "$BIN" -m "$MODEL" -l de -f "$wav" -otxt -of "$base" 2>&1 | tail -2
  echo "--- $base.txt ---"
  head -c 400 "$base.txt" 2>/dev/null; echo
done
rm -f "$OUT"/za1-ms-a*.wav
echo "[ALL DONE $(date)]"
