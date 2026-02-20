// src/utils/recaptcha.js

export async function getRecaptchaToken(action = "global") {
  if (!window.recaptchaSiteKey) {
    console.warn("reCAPTCHA site key not found. Returning null token.");
    return null;
  }

  // 🛑 CRITICAL FIX: Explicitly wait for grecaptcha using a Promise wrapper.
  // This correctly handles the asynchronous loading of the reCAPTCHA script.
  await new Promise((resolve) => {
    if (window.grecaptcha) {
      // Use the standard grecaptcha.ready() method
      window.grecaptcha.ready(resolve);
    } else {
      // Fallback/immediate resolve if grecaptcha is somehow missing
      // (The App.jsx useEffect should prevent this, but it's safer)
      resolve(); 
    }
  });

  try {
    // Check if grecaptcha is actually available before execution
    if (!window.grecaptcha || !window.grecaptcha.execute) {
        throw new Error("reCAPTCHA object or execute method is missing after load.");
    }
    
    // Execute reCAPTCHA for the given action
    const token = await window.grecaptcha.execute(window.recaptchaSiteKey, { action });
    return token;
  } catch (err) {
    // This catches errors from the execute() call or the checks above
    console.error("Error obtaining reCAPTCHA token during execution:", err);
    return null;
  }
}