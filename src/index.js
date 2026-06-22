import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { initGA4 } from './analytics';

// Init GA4 early (only in production)
if (process.env.NODE_ENV === 'production') {
  initGA4();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
