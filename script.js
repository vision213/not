const words = [
    "ability", "account", "achieve", "acquire", "actress", "address", "advance", "aerobic", "airport",
    "alcohol", "already", "amateur", "amazing", "analyst", "ancient", "another", "antenna", "antique", "anxiety",
    "apology", "approve", "arrange", "artwork", "assault", "athlete", "attract", "auction", "average", "avocado",
    "awesome", "awkward", "balance", "balcony", "bargain", "because", "believe", "benefit", "between", "bicycle",
    "biology", "blanket", "blossom", "bracket", "brother", "buffalo", "cabbage", "capable", "capital", "captain",
    "catalog", "caution", "ceiling", "century", "certain", "chapter", "chicken", "chimney", "chronic", "chuckle",
    "citizen", "clarify", "cluster", "coconut", "collect", "combine", "comfort", "company", "concert", "conduct",
    "confirm", "connect", "control", "correct", "country", "cricket", "crucial", "crumble", "crystal", "culture",
    "curious", "current", "curtain", "cushion", "decline", "defense", "deliver", "dentist", "deposit", "despair",
    "destroy", "develop", "diagram", "diamond", "digital", "dignity", "dilemma", "disease", "dismiss", "display",
    "divorce", "dolphin", "drastic", "dynamic", "ecology", "economy", "educate", "elegant", "element", "embrace",
    "emotion", "empower", "endless", "endorse", "enforce", "enhance", "episode", "erosion", "essence", "eternal",
    "example", "exclude", "execute", "exhaust", "exhibit", "explain", "express", "eyebrow", "faculty", "fantasy",
    "fashion", "fatigue", "feature", "federal", "fiction", "fitness", "fortune", "forward", "fragile", "furnace",
    "gallery", "garbage", "garment", "general", "genuine", "gesture", "giraffe", "glimpse", "goddess", "gorilla",
    "gravity", "grocery", "hamster", "harvest", "history", "holiday", "hundred", "husband", "illegal", "illness",
    "imitate", "immense", "improve", "impulse", "include", "inflict", "inherit", "initial", "inspire", "install",
    "involve", "isolate", "jealous", "journey", "ketchup", "kingdom", "kitchen", "laundry", "lawsuit", "lecture",
    "leisure", "leopard", "liberty", "library", "license", "lobster", "lottery", "luggage", "machine", "mandate",
    "mansion", "maximum", "measure", "mention", "message", "million", "minimum", "miracle", "mistake", "mixture",
    "monitor", "monster", "morning", "mystery", "neglect", "neither", "network", "neutral", "nominee", "notable",
    "nothing", "nuclear", "obscure", "observe", "obvious", "october", "olympic", "opinion", "orchard", "ostrich",
    "outdoor", "outside", "panther", "patient", "pattern", "payment", "peasant", "pelican", "penalty", "perfect",
    "picture", "pioneer", "plastic", "popular", "portion", "pottery", "poverty", "predict", "prepare", "present",
    "prevent", "primary", "private", "problem", "process", "produce", "program", "project", "promote", "prosper",
    "protect", "provide", "pudding", "pumpkin", "purpose", "pyramid", "quality", "quantum", "quarter", "raccoon",
    "rebuild", "receive", "recycle", "reflect", "regular", "release", "replace", "require", "retreat", "reunion",
    "romance", "sadness", "satisfy", "satoshi", "sausage", "scatter", "science", "section", "segment", "seminar",
    "service", "session", "shallow", "sheriff", "shuffle", "sibling", "similar", "situate", "slender", "soldier",
    "someone", "spatial", "special", "sponsor", "squeeze", "stadium", "stomach", "student", "stumble", "subject",
    "success", "suggest", "supreme", "surface", "suspect", "sustain", "swallow", "symptom", "tagline", "thought",
    "thunder", "tobacco", "toddler", "tonight", "tornado", "tourist", "traffic", "trigger", "trouble", "trumpet",
    "tuition", "typical", "unaware", "uncover", "unhappy", "uniform", "unknown", "unusual", "upgrade", "useless",
    "utility", "utilize", "various", "vehicle", "venture", "version", "veteran", "vibrant", "vicious", "victory",
    "village", "violate", "virtual", "volcano", "warfare", "warrior", "weather", "wedding", "weekend", "welcome",
    "whisper", "witness", "wrestle"
];

let currentIndex = 0;

function generateNextWord() {
    const wordContainer = document.getElementById('word');
    if (currentIndex < words.length) {
        wordContainer.textContent = words[currentIndex];
        currentIndex++;
    } else {
        wordContainer.textContent = "End of words list";
    }
}

function copyWord() {
    const wordContainer = document.getElementById('word');
    const textArea = document.createElement('textarea');
    textArea.value = wordContainer.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    /*alert("Word copied to clipboard: " + wordContainer.textContent);*/
}