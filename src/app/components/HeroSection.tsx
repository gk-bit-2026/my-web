'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const roles = [
  { 
    title: 'digital marketer', 
    description: 'We get your brand seen by the people who matter most.', 
    color: '#ec4899'
  },
  { 
    title: 'video editor', 
    description: 'We turn raw footage into stories people can’t stop watching.', 
    color: '#8b5cf6'
  },
  { 
    title: 'brand strategist', 
    description: 'We build a personality for your business that customers trust.', 
    color: '#3b82f6'
  },
  { 
    title: 'growth hacker', 
    description: 'We find the fastest shortcuts to scale your revenue.', 
    color: '#22c55e'
  },
  { 
    title: 'creative director', 
    description: 'We ensure every visual detail aligns with your ultimate vision.', 
    color: '#f59e0b'
  },
];

export function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000); // Slightly longer to appreciate the reveal
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-fit py-32 flex flex-col items-center justify-center overflow-hidden bg-white text-black">
      
      {/* 1. MESH BACKGROUND (Subtle) */}
      <div 
        className="absolute inset-0 transition-colors duration-[1500ms] opacity-5 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${roles[activeRoleIndex].color}, transparent 70%)` 
        }}
      />

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        
        {/* Branding Header */}
        <div className="mb-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400">
            System_Initiated // 0{activeRoleIndex + 1}
          </p>
        </div>

        {/* Main Title - Static & Clean */}
        <h1 
          className="text-[12vw] md:text-[9vw] leading-[0.75] font-black uppercase tracking-tighter"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Graphikardia
        </h1>

        {/* ROLES AREA - THE REVEAL ENGINE */}
        <div className="mt-12 relative w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoleIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              {/* The "Dark Flashlight" Role Title */}
              <div className="relative">
                {/* Reveal Layer */}
                <motion.h2 
                  variants={{
                    hidden: { 
                      maskImage: `radial-gradient(circle at 0% 50%, black 0%, transparent 0%)`,
                      WebkitMaskImage: `radial-gradient(circle at 0% 50%, black 0%, transparent 0%)`
                    },
                    visible: { 
                      maskImage: `radial-gradient(circle at 50% 50%, black 150%, transparent 100%)`,
                      WebkitMaskImage: `radial-gradient(circle at 50% 50%, black 150%, transparent 100%)`,
                      transition: { duration: 1.5, ease: "circOut" }
                    },
                    exit: { opacity: 0, transition: { duration: 0.3 } }
                  }}
                  className="text-7xl md:text-[10rem] lowercase leading-none py-4"
                  style={{ 
                    fontFamily: '"Playwrite NZ", cursive',
                    color: roles[activeRoleIndex].color,
                    fontWeight: 400
                  }}
                >
                  {roles[activeRoleIndex].title}
                </motion.h2>

                {/* Optional: Static faint shadow of the text for a 'dark flashlight' feel */}
                <h2 
                  className="absolute inset-0 text-7xl md:text-[10rem] lowercase leading-none py-4 opacity-[0.03] pointer-events-none"
                  style={{ 
                    fontFamily: '"Playwrite NZ", cursive',
                    color: '#000',
                    zIndex: -1
                  }}
                >
                  {roles[activeRoleIndex].title}
                </h2>
              </div>

              {/* Description - Darker & Spaced */}
              <p className="mt-8 text-base md:text-xl text-zinc-800 font-medium max-w-xl leading-relaxed font-sans px-6">
                {roles[activeRoleIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. MINIMAL DATA FOOTER */}
      <div className="mt-20 w-full px-10 flex justify-between items-center font-mono text-[9px] uppercase text-zinc-400">
        <span>Active_Role: {roles[activeRoleIndex].title}</span>
        <div className="h-[1px] flex-grow mx-4 bg-zinc-100" />
        <span>{new Date().getFullYear()} © Graphikardia</span>
      </div>
    </div>
  );
}
