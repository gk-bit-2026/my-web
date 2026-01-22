'use client';

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const roles = [
  { 
    title: 'Digital Marketer', 
    description: 'We get your brand seen by the people who matter most.', 
    color: '#ec4899',
    graphic: '◎' // Target Focus
  },
  { 
    title: 'Video Editor', 
    description: 'We turn raw footage into stories people can’t stop watching.', 
    color: '#8b5cf6',
    graphic: '◰' // Viewfinder
  },
  { 
    title: 'Brand Strategist', 
    description: 'We build a personality for your business that customers trust.', 
    color: '#3b82f6',
    graphic: '◇' // Structure
  },
  { 
    title: 'Growth Hacker', 
    description: 'We find the fastest shortcuts to scale your revenue.', 
    color: '#22c55e',
    graphic: '⇮' // Scale
  },
  { 
    title: 'Creative Director', 
    description: 'We ensure every visual detail aligns with your ultimate vision.', 
    color: '#f59e0b',
    graphic: '✷' // Vision
  },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  
  // High-performance mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(clientX - rect.left);
      mouseY.set(clientY - rect.top);
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] text-black cursor-none"
    >
      {/* 1. DYNAMIC BACKGROUND MESH */}
      <div 
        className="absolute inset-0 transition-colors duration-[1500ms] opacity-20 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${roles[activeRoleIndex].color}, transparent 75%)` 
        }}
      />

      {/* 2. INTERACTIVE ROLE GRAPHIC (Follows Mouse) */}
      <motion.div
        className="absolute z-20 pointer-events-none flex flex-col items-center justify-center text-[180px] font-thin mix-blend-difference opacity-40"
        style={{ x: cursorX, y: cursorY, left: -90, top: -90 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeRoleIndex}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 2, rotate: 180, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="leading-none"
            style={{ color: roles[activeRoleIndex].color }}
          >
            {roles[activeRoleIndex].graphic}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* 3. HERO CONTENT */}
      <motion.div style={{ opacity, y }} className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        
        {/* Branding Header */}
        <div className="flex items-center gap-4 mb-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400">
            System_Initiated // 0{activeRoleIndex + 1}
          </p>
        </div>

        {/* Main Title */}
        <h1 
          className="text-[14vw] md:text-[11vw] leading-[0.75] font-black uppercase tracking-tighter mix-blend-multiply"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Graphikardia
        </h1>

        {/* ROLES AREA */}
        <div className="min-h-[220px] mt-10 relative w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoleIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h2 
                className="text-5xl md:text-8xl lowercase mb-4 transition-colors duration-500"
                style={{ 
                  fontFamily: '"Playwrite NZ", cursive',
                  color: roles[activeRoleIndex].color 
                }}
              >
                {roles[activeRoleIndex].title}
              </h2>

              <p className="text-sm md:text-lg text-zinc-500 font-medium max-w-lg leading-relaxed font-sans">
                {roles[activeRoleIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 4. DATA METRICS FOOTER */}
      <div className="absolute bottom-10 w-full px-10 flex justify-between items-end font-mono text-[9px] uppercase text-zinc-400 z-30">
        <div className="flex flex-col gap-1">
          <span>Active_Role: {roles[activeRoleIndex].title}</span>
          <span>Core_Engine: v2.4.0</span>
        </div>
        <div className="hidden md:block">
          <span>[Scroll_For_Legacy]</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span>{new Date().getFullYear()} © Graphikardia</span>
          <span className="text-black font-bold">Status: Synchronized</span>
        </div>
      </div>
    </div>
  );
}
