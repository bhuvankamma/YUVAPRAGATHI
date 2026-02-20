const API_BASE =
  "https://translate-service-es6w3x51r-bhuvankalyan-kumar-kammas-projects.vercel.app";

export async function translateText(text, targetLang) {
  if (!text || typeof text !== "string") return text;
  if (text.trim().length === 0) return text;
  if (targetLang === "en") return text;

  const cacheKey = `trans_${targetLang}_${text}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) return cached;

  try {
    const response = await fetch(`${API_BASE}/api/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        sourceLang: "en",
        targetLang,
      }),
    });

    const raw = await response.text();

    let data = {};
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.warn("⚠ JSON parse failed:", raw);
      return text;
    }

    const translated = data.translated || text;
    localStorage.setItem(cacheKey, translated);
    return translated;
  } catch (err) {
    console.error("Translation failed:", err);
    return text;
  }
}
