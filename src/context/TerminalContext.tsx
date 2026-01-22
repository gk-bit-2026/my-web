'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// This is your default content. If the portal is empty, the site shows this.
const DEFAULT_DATA = {
  hero: { title: "GRAPHIKARDIA", subtitle: "VIRAL_STRATEGY_NODE" },
  about: { text: "Architecting high-conversion brand experiences through brutalist design." },
  work: [
    { id: 1, title: "Project_Alpha", type: "video", url: "https://cdn.example.com/v1.mp4" },
  ],
  testimonials: [
    { name: "Founder_X", quote: "System absolute. Performance unmatched." }
  ],
  stats: { projects: "42", clients: "12", regions: "IN-SOUTH-1" }
};

const TerminalContext = createContext<any>(null);

export const TerminalProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState(DEFAULT_DATA);

  // Load data from browser memory on startup
  useEffect(() => {
    const saved = localStorage.getItem('gk_config');
    if (saved) {
      try {
        setDb(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse config", e);
      }
    }
  }, []);

  // Function to update the data and save it
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

// Custom hook to use this data in any section (Hero, About, etc.)
export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) throw new Error("useTerminal must be used within a TerminalProvider");
  return context;
};
