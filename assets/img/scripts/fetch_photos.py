"""Download curated, license-clear photos for the practice picture/photo sheets.

Two providers:
  - pexels   : needs env PEXELS_API_KEY (free key from pexels.com/api)
  - openverse: keyless, Creative-Commons (api.openverse.org)

Each tile gets ONE hand-picked search term so the scene is unambiguous
(the whole task is "interpret the picture"). Edit SCENES, not the questions.

Usage:
  PEXELS_API_KEY=xxxx python3 fetch_photos.py exam-1 pexels
  python3 fetch_photos.py exam-1 openverse
"""
import os, sys, json, urllib.request, urllib.parse

ROOT = os.path.join(os.path.dirname(__file__), "..", "practice")

# scene key -> precise search query (German exam scenes)
SCENES = {
    "exam-1": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "supermarket grocery shopping",
        "l3-2": "atm cash machine bank",
        "l3-3": "train station platform",
        "l3-4": "people talking conversation cafe",
        "l3-5": "pharmacy drugstore counter",
        "l3-6": "office desk furniture store",
        # Hören A1 photo tiles A..F
        "l1-A": "train at railway platform",
        "l1-B": "supermarket aisle shopping cart",
        "l1-C": "pharmacy medicine counter",
        "l1-D": "bicycle repair workshop",
        "l1-E": "language class people talking",
        "l1-F": "coffee cup cafe table",
    },
    "exam-2": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "doctor office waiting room",
        "l3-2": "adult german language class",
        "l3-3": "office meeting people table",
        "l3-4": "cafe worker counter",
        "l3-5": "fitness gym swimming pool",
        "l3-6": "laptop repair computer help",
        # Hören A1 photo tiles A..F
        "l1-A": "medical clinic reception",
        "l1-B": "office meeting room",
        "l1-C": "city bus stop",
        "l1-D": "cafeteria lunch tray",
        "l1-E": "office copy machine",
        "l1-F": "language school classroom",
    },
    "exam-3": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "indoor swimming pool family",
        "l3-2": "hotel room breakfast",
        "l3-3": "birthday party room",
        "l3-4": "lost and found office",
        "l3-5": "guitar lesson music school",
        "l3-6": "public park bench",
        # Hören A1 photo tiles A..F
        "l1-A": "swimming pool",
        "l1-B": "cinema theater seats",
        "l1-C": "cafe terrace",
        "l1-D": "hotel room bed",
        "l1-E": "birthday party",
        "l1-F": "train station platform",
    },
    "exam-4": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "museum art gallery",
        "l3-2": "farmers market vegetables",
        "l3-3": "mobile phone shop",
        "l3-4": "train station platform",
        "l3-5": "hotel room bed",
        "l3-6": "winter coat clothing store",
        # Hören A1 photo tiles A..F
        "l1-A": "museum art gallery",
        "l1-B": "farmers market vegetables",
        "l1-C": "bus stop station",
        "l1-D": "mobile phone shop",
        "l1-E": "language school classroom",
        "l1-F": "hotel room bed",
    },
    "exam-5": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "post office counter parcel",
        "l3-2": "atm cash machine bank",
        "l3-3": "laundromat washing machines",
        "l3-4": "bakery bread counter",
        "l3-5": "public library books computer",
        "l3-6": "shoe repair shop",
        # Hören A1 photo tiles A..F
        "l1-A": "post office parcel counter",
        "l1-B": "bank atm machine",
        "l1-C": "laundromat washing machine",
        "l1-D": "bakery coffee bread",
        "l1-E": "library books desk",
        "l1-F": "children playground",
    },
    "exam-6": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "dentist office patient",
        "l3-2": "apartment viewing room",
        "l3-3": "plumber fixing sink",
        "l3-4": "pharmacy medicine counter",
        "l3-5": "moving furniture truck",
        "l3-6": "yoga class beginners",
        # Hören A1 photo tiles A..F
        "l1-A": "dentist office chair",
        "l1-B": "apartment building entrance",
        "l1-C": "pharmacy medicine",
        "l1-D": "plumber sink repair",
        "l1-E": "yoga class mat",
        "l1-F": "moving boxes furniture",
    },
    "exam-7": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "office job interview",
        "l3-2": "computer class adults",
        "l3-3": "kindergarten classroom children",
        "l3-4": "copy machine office",
        "l3-5": "cafeteria lunch tray",
        "l3-6": "people language exchange conversation",
        # Hören A1 photo tiles A..F
        "l1-A": "office job interview",
        "l1-B": "computer class laptop",
        "l1-C": "kindergarten children classroom",
        "l1-D": "copy machine printer",
        "l1-E": "canteen lunch tray",
        "l1-F": "city tram stop",
    },
    "exam-8": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "cinema theater seats",
        "l3-2": "zoo animals family",
        "l3-3": "hairdresser salon",
        "l3-4": "restaurant pizza table",
        "l3-5": "museum art gallery",
        "l3-6": "train ticket station",
        # Hören A1 photo tiles A..F
        "l1-A": "cinema theater",
        "l1-B": "zoo animals",
        "l1-C": "hairdresser salon",
        "l1-D": "restaurant table reservation",
        "l1-E": "museum tour gallery",
        "l1-F": "train station platform",
    },
    "exam-9": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "city hall service counter",
        "l3-2": "lost and found keys bag",
        "l3-3": "bank teller customer",
        "l3-4": "copy machine office",
        "l3-5": "health insurance form office",
        "l3-6": "language school office",
        # Hören A1 photo tiles A..F
        "l1-A": "city hall office counter",
        "l1-B": "lost keys found office",
        "l1-C": "bank teller counter",
        "l1-D": "photocopy machine office",
        "l1-E": "tram stop replacement bus",
        "l1-F": "language class adults",
    },
    "exam-10": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "train station delayed platform",
        "l3-2": "airport bus stop",
        "l3-3": "luggage locker station",
        "l3-4": "hotel reception desk",
        "l3-5": "rain weather hiking jacket",
        "l3-6": "tourist information city map",
        # Hören A1 photo tiles A..F
        "l1-A": "train station platform delay",
        "l1-B": "airport bus outside terminal",
        "l1-C": "hotel reception desk",
        "l1-D": "luggage lockers train station",
        "l1-E": "heavy rain street umbrella",
        "l1-F": "bicycle rental shop",
    },
    "exam-11": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "apartment door keys lock",
        "l3-2": "laundry room washing machines",
        "l3-3": "radiator heating repair",
        "l3-4": "neighbors party apartment",
        "l3-5": "courtyard flea market",
        "l3-6": "community garden courtyard",
        # Hören A1 photo tiles A..F
        "l1-A": "water pipe repair basement",
        "l1-B": "locksmith opening door",
        "l1-C": "broken washing machine",
        "l1-D": "elevator out of service",
        "l1-E": "loud music apartment party",
        "l1-F": "community garden plants",
    },
    "exam-12": {
        # Lesen A3 picture tiles 1..6
        "l3-1": "parcel locker pickup code",
        "l3-2": "online video meeting computer",
        "l3-3": "printer scanner documents",
        "l3-4": "job interview office",
        "l3-5": "mobile phone shop sim card",
        "l3-6": "volunteer soup kitchen",
        # Hören A1 photo tiles A..F
        "l1-A": "package delivery boxes",
        "l1-B": "computer course adults laptop",
        "l1-C": "job center appointment office",
        "l1-D": "mobile phone sim card shop",
        "l1-E": "volunteer food kitchen",
        "l1-F": "office printer machine",
    },
}


def http_get(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def pexels_url(query):
    key = os.environ.get("PEXELS_API_KEY")
    if not key:
        raise SystemExit("PEXELS_API_KEY not set")
    q = urllib.parse.quote(query)
    api = f"https://api.pexels.com/v1/search?query={q}&per_page=1&orientation=landscape"
    data = json.loads(http_get(api, {"Authorization": key}))
    photos = data.get("photos") or []
    if not photos:
        return None
    return photos[0]["src"]["large"]


def openverse_url(query):
    q = urllib.parse.quote(query)
    api = f"https://api.openverse.org/v1/images/?q={q}&license_type=commercial&page_size=1"
    data = json.loads(http_get(api, {"User-Agent": "osd-a1-practice/1.0"}))
    results = data.get("results") or []
    if not results:
        return None
    return results[0].get("url")


def main():
    exam = sys.argv[1] if len(sys.argv) > 1 else "exam-1"
    provider = sys.argv[2] if len(sys.argv) > 2 else "pexels"
    pick = {"pexels": pexels_url, "openverse": openverse_url}[provider]
    out_dir = os.path.join(ROOT, exam)
    os.makedirs(out_dir, exist_ok=True)
    manifest = {}
    for key, query in SCENES[exam].items():
        path = os.path.join(out_dir, key + ".jpg")
        if os.path.exists(path) and os.path.getsize(path) > 0:
            manifest[key] = f"assets/img/practice/{exam}/{key}.jpg"
            print(f"  SKIP {key:8s} existing")
            continue
        try:
            src = pick(query)
            if not src:
                print(f"  NO RESULT  {key}  ({query})")
                continue
            img = http_get(src, {"User-Agent": "osd-a1-practice/1.0"})
            with open(path, "wb") as f:
                f.write(img)
            manifest[key] = f"assets/img/practice/{exam}/{key}.jpg"
            print(f"  OK  {key:8s} {len(img)//1024:5d} KB  {query}")
        except Exception as e:
            print(f"  FAIL {key}: {e}")
    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print("manifest ->", os.path.join(out_dir, "manifest.json"))


if __name__ == "__main__":
    main()
