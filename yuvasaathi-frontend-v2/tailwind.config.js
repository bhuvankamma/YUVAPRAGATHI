// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This is a common setup for React, make sure your paths match your project
    "./public/index.html",
  ],
  theme: {
    extend: {
      // 🔑 UPDATED: Custom font family using Poppins, Roboto, or Verdana as fallbacks
      fontFamily: {
        // This maps the utility class 'font-sans-alt' to your preferred font stack
        'sans-alt': ['Poppins', 'Roboto', 'Verdana', 'sans-serif'],
      },
      // Note: The previous 'noto' entry has been removed/replaced.
    },
  },
  plugins: [],
};