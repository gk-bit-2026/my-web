'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// The "Neural Manifest" - Every single piece of content on your site
const DEFAULT_DATA = {
  hero: { title: "GRAPHIKARDIA", subtitle: "VIRAL_STRATEGY_NODE" },
  about: { text: "Architecting high-conversion brand experiences through brutalist design." },
  work: [
    { id: 1, title: "Project_Alpha", type: "video", url: "https://cdn.example.com/video1.mp4", thumbnail: "" },
  ],
  testimonials: [
    { name: "Founder_X", quote: "System absolute. Performance unmatched." }
  ],
  appearance: { accent: "#a855f7", scanSpeed: "2.5s" }
};

const TerminalContext = createContext<any>(null);

export const TerminalProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState(DEFAULT_DATA);

  useEffect(() => {
    const saved = localStorage.getItem('gk_config');
    if (saved) setDb(JSON.parse(saved));
  }, []);

  const updateDb = (newData: any) => {
    setDb(newData);
    localStorage.setItem('gk_config', JSON.stringify(newData));
  };

  return (
    <TerminalContext.Provider value={{ db, updateDb }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => useContext(TerminalContext);
