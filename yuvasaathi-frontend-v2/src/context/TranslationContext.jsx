// context/TranslationContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import en from "../en.json";
import { translateText } from "../utils/translate";
import { autoTranslatePage } from "../utils/autoTranslate";

const TranslationContext = createContext();

// -------------------------------------------
// Utility: Translate all JSON keys (flat or nested)
// (kept similar to your original implementation)
// -------------------------------------------
const translateJSON = async (json, lang) => {
  const result = {};
  const keys = Object.keys(json);

  const promises = keys.map(async (key) => {
    const value = json[key];

    if (typeof value === "string") {
      result[key] = await translateText(value, lang);
    } else if (Array.isArray(value)) {
      const newArr = [];
      for (let item of value) {
        if (typeof item === "string") {
          newArr.push(await translateText(item, lang));
        } else if (typeof item === "object" && item !== null) {
          const obj = {};
          for (let innerKey in item) {
            obj[innerKey] =
              typeof item[innerKey] === "string"
                ? await translateText(item[innerKey], lang)
                : item[innerKey];
          }
          newArr.push(obj);
        } else {
          newArr.push(item);
        }
      }
      result[key] = newArr;
    } else if (typeof value === "object" && value !== null) {
      const newObj = {};
      for (let innerKey in value) {
        const innerValue = value[innerKey];
        newObj[innerKey] =
          typeof innerValue === "string" ? await translateText(innerValue, lang) : innerValue;
      }
      result[key] = newObj;
    } else {
      result[key] = value;
    }
  });

  await Promise.all(promises);
  return result;
};

// -------------------------------------------
// Provider
// -------------------------------------------
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("site_language") || "en";
    } catch (e) {
      return "en";
    }
  });

  const [translations, setTranslations] = useState(() => {
    try {
      const cached = localStorage.getItem(`json_trans_${localStorage.getItem("site_language") || "en"}`);
      return cached ? JSON.parse(cached) : en;
    } catch (e) {
      return en;
    }
  });

  const observerRef = useRef(null);
  const translateDebounceRef = useRef(null);

  // changeLanguage: translate JSON and trigger DOM auto-translate
  const changeLanguage = async (lang) => {
    setLanguage(lang);
    try {
      localStorage.setItem("site_language", lang);
    } catch (e) {}

    if (lang === "en") {
      setTranslations(en);
      // ensure DOM gets reset back to original text (autoTranslatePage is no-op for 'en')
      try {
        await autoTranslatePage("en");
      } catch (e) {}
      return;
    }

    // Try cached JSON
    const cacheKey = `json_trans_${lang}`;
    try {
      const cachedJSON = localStorage.getItem(cacheKey);
      if (cachedJSON) {
        setTranslations(JSON.parse(cachedJSON));
        // run DOM auto-translate after a tick so rendered UI updates first
        setTimeout(() => autoTranslatePage(lang).catch(() => {}), 100);
        return;
      }
    } catch (e) {}

    // Otherwise translate JSON and cache it
    try {
      const translatedJSON = await translateJSON(en, lang);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(translatedJSON));
      } catch (e) {}
      setTranslations(translatedJSON);
      // run DOM auto-translate after translations state applied
      setTimeout(() => autoTranslatePage(lang).catch(() => {}), 100);
    } catch (err) {
      console.error("Full JSON translation failed:", err);
    }
  };

  // t(key) helper for components
  const t = (key) => (translations && translations[key]) || key;

  // On mount: if language != en, ensure page DOM is translated
  useEffect(() => {
    if (language && language !== "en") {
      // run once after first render
      setTimeout(() => autoTranslatePage(language).catch(() => {}), 200);
    }
  }, []); // eslint-disable-line

  // Re-run autoTranslatePage when language changes (covers DOM-only content)
  useEffect(() => {
    if (language && language !== "en") {
      // small debounce to allow React renders to finish
      if (translateDebounceRef.current) clearTimeout(translateDebounceRef.current);
      translateDebounceRef.current = setTimeout(() => {
        autoTranslatePage(language).catch(() => {});
      }, 120);
    } else if (language === "en") {
      // Remove any cached translated DOM (autoTranslatePage is a no-op for en)
      try { autoTranslatePage("en").catch(() => {}); } catch(e){}
    }
    return () => {
      if (translateDebounceRef.current) clearTimeout(translateDebounceRef.current);
    };
  }, [language]);

  // MutationObserver: re-run autoTranslatePage when React mutates big parts of the DOM
  useEffect(() => {
    // Only active when non-English selected
    if (typeof window === "undefined") return;

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const runIfNeeded = () => {
      if (!language || language === "en") return;
      // debounce
      if (translateDebounceRef.current) clearTimeout(translateDebounceRef.current);
      translateDebounceRef.current = setTimeout(() => {
        autoTranslatePage(language).catch(() => {});
      }, 200);
    };

    observerRef.current = new MutationObserver((mutations) => {
      // If many nodes changed, trigger
      let significant = false;
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length > 0) {
          significant = true;
          break;
        }
        if (m.type === "characterData") {
          significant = true;
          break;
        }
      }
      if (significant) runIfNeeded();
    });

    // Observe body subtree
    try {
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    } catch (e) {
      // ignore if body not ready
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = null;
    };
  }, [language]);

  return (
    <TranslationContext.Provider value={{ t, changeLanguage, language, translations }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
