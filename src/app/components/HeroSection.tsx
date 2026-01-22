'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Configuration: Roles + "General Public" Explanations
const roles = [
  { 
    title: 'Digital Marketer', 
    description: 'We get your brand seen by the people who matter most.', 
    color: '#ec4899' 
  },
  { 
    title: 'Video Editor', 
    description: 'We turn raw footage into stories people can’t stop watching.', 
    color: '#8b5cf6' 
  },
  { 
    title: 'Brand Strategist', 
    description: 'We build a personality for your business that customers trust.', 
    color: '#3b82f6' 
  },
  { 
    title: 'Growth Hacker', 
    description: 'We find the fastest shortcuts to scale your revenue.', 
    color: '#22c55e' 
  },
  { 
    title: 'Creative Director', 
    description: 'We ensure every visual detail aligns with your ultimate vision.', 
    color: '#f59e0b' 
  },
];

// Lightweight Scramble Effect Component
const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3; 
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] text-black"
    >
      {/* 1. CSS BACKGROUND */}
      <div 
        className="absolute inset-0 transition-colors duration-[2000ms] ease-in-out opacity-20"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${roles[activeRoleIndex].color}, transparent 70%)` 
        }}
      />
      
      {/* CSS Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
        <svg className='fixed inset-0 w-full h-full'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.6' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>

      {/* 2. HERO CONTENT */}
      <motion.div style={{ opacity, y }} className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-4 mb-8 overflow-hidden">
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className="h-[1px] w-12 bg-black/20" />
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500">
            Agency_OS v2.0
          </p>
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className="h-[1px] w-12 bg-black/20" />
        </div>

        {/* Main Title */}
        <h1 
          className="text-[13vw] md:text-[10vw] leading-[0.8] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black to-zinc-400 select-none mix-blend-multiply"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Graphikardia
        </h1>

        {/* 3. ROLES & EXPLANATIONS */}
        <div className="min-h-[200px] flex flex-col items-center justify-start mt-6 relative w-full max-w-4xl px-4">
          
          {/* Highlight Line */}
          <motion.div 
            layoutId="highlight"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px]"
            style={{ backgroundColor: roles[activeRoleIndex].color }}
            transition={{ duration: 1.5 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoleIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="text-center flex flex-col items-center"
            >
              {/* Role ID Tag */}
              <span 
                className="mb-2 text-[10px] font-mono px-2 py-0.5 rounded text-white inline-block"
                style={{ backgroundColor: roles[activeRoleIndex].color }}
              >
                0{activeRoleIndex + 1}
              </span>

              {/* Cursive Role Title */}
              <h2 
                className="text-4xl md:text-6xl lowercase mb-3"
                style={{ 
                  fontFamily: '"Playwrite NZ", cursive',
                  fontWeight: 100,
                  color: '#18181b'
                }}
              >
                <ScrambleText key={`t-${activeRoleIndex}`} text={roles[activeRoleIndex].title} />
              </h2>

              {/* The Explanation */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }} // Delays text so user reads title first
                className="text-sm md:text-base text-zinc-500 font-medium max-w-md mx-auto leading-relaxed"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {roles[activeRoleIndex].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Metrics */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 text-zinc-400 font-mono text-[10px] uppercase tracking-widest">
          <div className="flex flex-col items-center gap-1">
            <span className="text-black font-bold">EST.</span><span>2026</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-black font-bold">LOC.</span><span>Global</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-black font-bold">STATUS</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Online</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ height: 0 }} animate={{ height: 60 }} transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/10"
      >
        <motion.div animate={{ y: [0, 60] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-full h-1/2 bg-black" />
      </motion.div>
    </div>
  );
}
