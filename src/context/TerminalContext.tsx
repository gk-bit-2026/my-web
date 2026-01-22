'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_DATA = {
  hero: { title: "GRAPHIKARDIA", subtitle: "VIRAL_STRATEGY_NODE" },
  about: { text: "Architecting high-conversion brand experiences through brutalist design." },
  work: [
    { id: 1, title: "Project_Alpha", type: "video", url: "https://cdn.example.com/v1.mp4" },
  ],
  testimonials: [
    { name: "Founder_X", quote: "System absolute. Performance unmatched." }
  ],
  stats: { projects: "42", clients: "12", regions: "IN-SOUTH-1" },
  // ADDED: Theme 

  appearance: { 
    accentColor: "#a855f7", 
    isDark: true,
    themeName: "PURPLE_HAZE" 
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

  // INJECT CSS VARIABLES AUTOMATICALLY
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    
    // Set Accent Colors
    root.style.setProperty('--accent-primary', db.appearance.accentColor);
    
    // Handle Dark/Light Mode
    if (db.appearance.isDark) {
      root.style.setProperty('--bg-main', '#050505');
      root.style.setProperty('--text-main', '#ffffff');
      root.classList.add('dark');
    } else {
      root.style.setProperty('--bg-main', '#ffffff');
      root.style.setProperty('--text-main', '#050505');
      root.classList.remove('dark');
    }
    
    // Apply body styles directly since globals.css is missing
    document.body.style.backgroundColor = 'var(--bg-main)';
    document.body.style.color = 'var(--text-main)';
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  }, [db.appearance, mounted]);

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
