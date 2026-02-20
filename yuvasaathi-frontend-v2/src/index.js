// src/index.js
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// 💡 This import initializes i18next asynchronously.
import './i18n'; 

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* CRITICAL FIX: 
        We wrap the entire application in <Suspense>. 
        The react-i18next library is configured (in your i18n.js) to tell 
        React to "suspend" (pause rendering) until the translation files are loaded.
        If they fail to load (a promise rejection), Suspense handles it gracefully.
    */}
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);