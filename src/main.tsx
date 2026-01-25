import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './styles/index.css'; 
// 1. IMPORT YOUR CONTEX
import { TerminalProvider } from './context/TerminalContext'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. WRAP THE APP HERE */}
    <TerminalProvider>
      <App />
    </TerminalProvider>
  </React.StrictMode>,
);
