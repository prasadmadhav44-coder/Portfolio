import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
}

// Note: StrictMode is intentionally not used here (matching the original
// template) because several effects (GSAP timelines, toast timers) are not
// written to be safe under React's double-invoke-in-dev behavior.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
