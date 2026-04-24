import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import App from './App.tsx';

// Bump this string whenever seed data changes to clear stale localStorage
const DATA_VERSION = 'v2.2';
if (localStorage.getItem('giftvibes_data_version') !== DATA_VERSION) {
  localStorage.clear();
  localStorage.setItem('giftvibes_data_version', DATA_VERSION);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
