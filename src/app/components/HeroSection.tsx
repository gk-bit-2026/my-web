'use client';

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const roles = [
  { title: 'digital marketer', description: 'We get your brand seen by the people who matter most.', color: '#ec4899' },
  { title: 'video editor', description: 'We turn raw footage into stories people can’t stop watching.', color: '#8b5cf6' },
  { title: 'brand strategist', description: 'We build a personality for your business that customers trust.', color: '#3b82f6' },
  { title: 'growth hacker', description: 'We find the fastest shortcuts to scale your revenue.', color: '#22c55e' },
  { title: 'creative director', description: 'We ensure every visual detail aligns with your ultimate vision.', color: '#f59e0b' },
];

export function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse/Touch tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    setIsHovering(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsHovering(false)}
      className="relative h-fit py-32 flex flex-col items-center justify-center overflow-hidden bg-white text-black cursor-none"
    >
      {/* 1. MESH BACKGROUND (Subtle) */}
      <div 
        className="absolute inset-0 transition-colors duration-[1500ms] opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${roles[activeRoleIndex].color}, transparent 70%)` }}
      />

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full select-none">
        <div className="mb-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400">
            System_Initiated // 0{activeRoleIndex + 1}
          </p>
        </div>

        <h1 
          className="text-[12vw] md:text-[9vw] leading-[0.75] font-black uppercase tracking-tighter"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Graphikardia
        </h1>

        <div className="mt-12 relative w-full flex flex-col items-center min-h-[250px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoleIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                {/* THE MASKED REVEAL LAYER */}
                <motion.h2 
                  className="text-7xl md:text-[12rem] lowercase leading-none py-4 pointer-events-none"
                  style={{ 
                    fontFamily: '"Playwrite NZ", cursive',
                    color: roles[activeRoleIndex].color,
                    fontWeight: 400,
                    // The "Flashlight" logic
                    WebkitMaskImage: isHovering 
                      ? `radial-gradient(circle 150px at var(--x) var(--y), black 0%, transparent 100%)`
                      : `radial-gradient(circle 0px at 0% 0%, black 0%, transparent 0%)`,
                    maskImage: isHovering 
                      ? `radial-gradient(circle 150px at var(--x) var(--y), black 0%, transparent 100%)`
                      : `radial-gradient(circle 0px at 0% 0%, black 0%, transparent 0%)`,
                  } as any}
                  animate={{
                    "--x": `${smoothX.get()}px`,
                    "--y": `${smoothY.get()}px`,
                  } as any}
                >
