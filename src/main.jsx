import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function mountApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    try {
      createRoot(rootElement).render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    } catch (err) {
      console.error("Failed to render React root:", err);
    }
  } else {
    console.error("Root element #root not found during mountApp execution");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
