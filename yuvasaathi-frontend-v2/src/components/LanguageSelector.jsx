import React, { useState, useEffect } from 'react';

// Define the full list of Indian languages supported by most major translation services
const indianLanguages = [
  // Common Languages in India
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' }, // Hindi
  { code: 'bn', name: 'বাংলা' }, // Bengali
  { code: 'mr', name: 'मराठी' }, // Marathi
  { code: 'te', name: 'తెలుగు' }, // Telugu
  { code: 'ta', name: 'தமிழ்' }, // Tamil
  { code: 'gu', name: 'ગુજરાતી' }, // Gujarati
  { code: 'kn', name: 'ಕನ್ನಡ' }, // Kannada
  { code: 'ml', name: 'മലയാളം' }, // Malayalam
  { code: 'pa', name: 'ਪੰਜਾਬੀ' }, // Punjabi
  { code: 'or', name: 'ଓଡ଼ିଆ' }, // Odia (Oriya)
  { code: 'as', name: 'অসমীয়া' }, // Assamese
  { code: 'ur', name: 'اُردُو' }, // Urdu
  { code: 'sa', name: 'संस्कृत' }, // Sanskrit
  { code: 'ne', name: 'नेपाली' } // Nepali
];

const LanguageSelector = () => {
  // Use a state to track the currently selected language
  const [currentLang, setCurrentLang] = useState(
    // Check if window.Weglot exists before trying to get the current language
    typeof window.Weglot !== 'undefined' ? window.Weglot.getCurrentLang() : 'en'
  );

  // Effect to re-fetch the current language after Weglot initializes
  useEffect(() => {
    // Check if the Weglot object is available on the window object
    if (typeof window.Weglot !== 'undefined') {
      const initialLang = window.Weglot.getCurrentLang();
      setCurrentLang(initialLang);

      // Add a listener for language change events
      const handleLangChange = (newLang, oldLang) => {
        setCurrentLang(newLang);
      };

      window.Weglot.on('languageChanged', handleLangChange);

      // Cleanup function to remove the listener
      return () => {
        // Check before calling off()
        if (typeof window.Weglot !== 'undefined') {
          window.Weglot.off('languageChanged', handleLangChange);
        }
      };
    }
  }, []);

  const handleLanguageChange = (event) => {
    const newLangCode = event.target.value;
    setCurrentLang(newLangCode);

    // Call Weglot's API to switch the language
    if (typeof window.Weglot !== 'undefined') {
      window.Weglot.switchTo(newLangCode);
    } else {
      console.warn('Weglot object is not defined. Cannot switch language.');
    }
  };

  return (
    <select
      value={currentLang}
      onChange={handleLanguageChange}
      // Added a small style update for better visibility
      style={{ padding: '8px', borderRadius: '4px', borderColor: '#ccc', minWidth: '150px' }}
    >
      {indianLanguages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;