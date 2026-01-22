'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Data mapping for Regions
const content = {
  IN: [
    { title: 'digital marketer', description: 'Helping Indian brands dominate the local market with precision.', color: '#ec4899' },
    { title: 'growth hacker', description: 'Scaling startups across the subcontinent at lightning speed.', color: '#22c55e' }
  ],
  INTL: [
    { title: 'global strategist', description: 'Positioning your brand for the international stage.', color: '#3b82f6' },
    { title: 'creative director', description: 'World-class visual storytelling for global audiences.', color: '#f59e0b' }
  ]
};

interface HeroProps { isDark: boolean; region: 'IN' | 'INTL'; }

export function HeroSection({ isDark, region }: HeroProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRoles = content[region];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % currentRoles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [region, currentRoles.length]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
      containerRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
      containerRef.current.style.setProperty('--op', '1');
    }
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => containerRef.current?.style.setProperty('--op', '0')}
      className="relative h-fit py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden cursor-none"
      style={{ '--x': '0px', '--y': '0px', '--op': '0' } as any}
    >
      {/* Lag-free Background Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(circle 350px at var(--x) var(--y), ${currentRoles[index].color}, transparent 80%)`,
          opacity: 'calc(var(--op) * 0.15)'
        }}
      />

      <div className="relative z-10 text-center px-4 w-full select-none">
        <h1 className="text-[14vw] md:text-[9vw] font-black uppercase tracking-tighter leading-[0.8]">
          Graphikardia
        </h1>

        <div className="mt-8 relative min-h-[180px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={`${region}-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="relative">
                <h2 
                  className="text-5xl md:text-[10rem] lowercase leading-none py-4"
                  style={{ 
                    fontFamily: '"Playwrite NZ", cursive', 
                    color: currentRoles[index].color,
                    WebkitMaskImage: `radial-gradient(circle 180px at var(--x) var(--y), black 20%, transparent 100%)`,
                    maskImage: `radial-gradient(circle 180px at var(--x) var(--y), black 20%, transparent 100%)`
                  }}
                >
                  {currentRoles[index].title}
                </h2>
                <h2 className="absolute inset-0 text-5xl md:text-[10rem] lowercase leading-none py-4 opacity-[0.05] pointer-events-none flex items-center justify-center"
                    style={{ fontFamily: '"Playwrite NZ", cursive', color: isDark ? '#fff' : '#000', zIndex: -1 }}>
                  {currentRoles[index].title}
                </h2>
              </div>
              <p className={`mt-4 text-sm md:text-xl font-bold max-w-lg transition-colors ${isDark ? 'text-zinc-500' : 'text-zinc-800'}`}>
                {currentRoles[index].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Cursor */}
      <div className="fixed top-0 left-0 w-6 h-6 border border-current rounded-full pointer-events-none z-50 transition-opacity"
           style={{ transform: 'translate(calc(var(--x) - 50%), calc(var(--y) - 50%))', opacity: 'var(--op)' }} />
    </div>
  );
}
