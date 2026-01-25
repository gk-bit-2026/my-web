'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_DATA = {
  appearance: { accentColor: "#a855f7", isDark: true },
  hero: { title: "GRAPHIKARDIA", subtitle: "VIRAL_STRATEGY_NODE", buttonText: "INITIALIZE" },
  about: { text: "Architecting high-conversion brand experiences." },
  methodology: [
    { id: 1, title: "PHASE_01", desc: "Deep Scan & Research" },
    { id: 2, title: "PHASE_02", desc: "Brutalist Execution" }
  ],
  work: [{ id: 1, title: "Project_Alpha", type: "video", url: "" }],
  seo: {
    globalKeywords: "design, branding, viral strategy",
    blogs: [{ id: 1, title: "The Future of Brutalism", date: "2026-01-25", content: "..." }],
    research: []
  },
  auth: {
    // DO NOT share this. This is your 2FA Secret. 
    // Use an online TOTP secret generator to get a new one.
    secret: "KVKFKRCPNZQUYMLXOVZGUYLTKBFVE62K" 
  }
};

const TerminalContext = createContext<any>(null);

export const TerminalProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState(DEFAULT_DATA);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('gk_config');
    if (saved) {
      try { setDb(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const updateDb = (newData: any) => {
    setDb(newData);
    localStorage.setItem('gk_config', JSON.stringify(newData));
  };

  if (!mounted) return null;

  return (
    <TerminalContext.Provider value={{ db, updateDb }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => useContext(TerminalContext);
