module.exports = async function (req, res) {
  try {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");

    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceLang || !targetLang) {
      return res.status(400).json({
        error: "Missing text, sourceLang, or targetLang",
      });
    }

    const apiResponse = await fetch(
      "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userID:
            process.env.BHASHINI_USER_ID ||
            "817f8383c7c94dd98ae91a8060fcf6ae",
          apiKey:
            process.env.BHASHINI_API_KEY ||
            "bo-dgg1TCi9y-5VUdWy0sYTKERUL9L1u7k70by_D4fTcWlJEILyJyDU1uki_O019",
        },
        body: JSON.stringify({
          input: [
            {
              source: text,
              source_language: sourceLang,
              target_language: targetLang,
            },
          ],
          pipelineTasks: [{ taskType: "translation" }],
        }),
      }
    );

    const raw = await apiResponse.text();
    if (!apiResponse.ok) {
      return res.status(502).json({
        error: "Bhashini API error",
        status: apiResponse.status,
        body: raw,
      });
    }

    const json = JSON.parse(raw);
    const translated = json?.output?.[0]?.target || text;

    return res.json({ translated });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({
      error: "Server crashed",
      details: err.message,
    });
  }
};
