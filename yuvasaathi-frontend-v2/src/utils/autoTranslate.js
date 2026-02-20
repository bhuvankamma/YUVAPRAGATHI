import { translateText } from "./translate";

/*
  Safe Auto Translator
  - Skips invalid nodes
  - Skips inputs, buttons, links, SVG, numbers
  - Never crashes (all checks added)
  - Stores original text in data-original-text
  - Uses caching for speed
*/

export async function autoTranslatePage(lang) {
  if (!lang || lang === "en") return;

  const allElements = document.querySelectorAll("body *");

  const nodesToTranslate = [];
  const textsToTranslate = [];

  allElements.forEach(el => {
    try {
      // Skip elements that must NOT be translated
      if (
        !el ||
        !el.tagName ||
        ["SCRIPT", "STYLE", "IMG", "SVG"].includes(el.tagName) ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) ||
        el.classList.contains("no-translate")
      ) {
        return;
      }

      // Only translate pure text nodes (nodeType === 3)
      if (
        el.childNodes &&
        el.childNodes.length === 1 &&
        el.childNodes[0].nodeType === 3
      ) {
        const rawText =
          el.getAttribute("data-original-text") || el.innerText || "";

        if (typeof rawText !== "string") return;

        const cleanText = rawText.trim();

        if (!cleanText) return;
        if (cleanText.length < 2) return;
        if (/^[0-9.,₹$]+$/.test(cleanText)) return;

        // Save original text once
        if (!el.getAttribute("data-original-text")) {
          el.setAttribute("data-original-text", cleanText);
        }

        nodesToTranslate.push(el);
        textsToTranslate.push(cleanText);
      }
    } catch (err) {
      console.warn("Skipping invalid node:", err);
    }
  });

  // Remove duplicates
  const uniqueTexts = [...new Set(textsToTranslate)];
  const translationMap = {};

  // Load cached translations first
  uniqueTexts.forEach(text => {
    const cached = localStorage.getItem(`trans_${lang}_${text}`);
    if (cached) translationMap[text] = cached;
  });

  // Identify missing texts
  const missingTexts = uniqueTexts.filter(t => !translationMap[t]);

  // Translate missing texts one-by-one
  for (const text of missingTexts) {
    try {
      const result = await translateText(text, lang);
      translationMap[text] = result;
      localStorage.setItem(`trans_${lang}_${text}`, result);
    } catch (err) {
      console.warn("Translation failed for:", text);
    }
  }

  // Apply translations safely
  nodesToTranslate.forEach(el => {
    try {
      const original = el.getAttribute("data-original-text");
      if (original && translationMap[original]) {
        el.innerText = translationMap[original];
      }
    } catch (err) {
      console.warn("Failed to apply translation:", err);
    }
  });

  console.log("🌍 Page auto-translated to:", lang);
}
