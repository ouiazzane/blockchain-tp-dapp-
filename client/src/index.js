import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import reportWebVitals from './reportWebVitals';

// Suppress known ENS errors on private Ganache networks to avoid noisy uncaught rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event.reason;
      const msg = typeof reason === 'string' ? reason : reason && reason.message;
      if (msg && (/ENS is not supported/i.test(msg) || /Network not synced; last block was/i.test(msg))) {
        // Prevent known Web3/ENS errors from appearing as uncaught rejections
        console.warn('Suppressed known Web3 error on private network:', msg);
        event.preventDefault();
      }
    } catch (e) {
      // ignore
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
