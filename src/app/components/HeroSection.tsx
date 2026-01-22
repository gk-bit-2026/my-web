'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const roles = [
  { title: 'Digital Marketer', description: 'We get your brand seen by the people who matter most.', color: '#ec4899' },
  { title: 'Video Editor', description: 'We turn raw footage into stories people can’t stop watching.', color: '#8b5cf6' },
  { title: 'Brand Strategist', description: 'We build a personality for your business that customers trust.', color: '#3b82f6' },
  { title: 'Growth Preformance', description: 'We find the fastest shortcuts to scale your revenue.', color: '#22c55e' },
  { title: 'Creative Director', description: 'We ensure every visual detail aligns with your ultimate vision.', color: '#f59e0b' },
];

export function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3X SPEED CONFIG
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 450 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 450 });

  // Dynamic Opacity based on interaction
  const bgOpacity = useSpring(isHovering ? 0.15 : 0.03, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      setIsHovering(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setIsHovering(false)}
      className="relative h-fit py-32 flex flex-col items-center justify-center overflow-hidden bg-white text-black cursor-none"
    >
      {/* 1. INTERACTIVE MESH BACKGROUND */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle 600px at var(--mx) var(--my), ${roles[activeRoleIndex].color}, transparent 80%)`,
          opacity: bgOpacity
        } as any}
        animate={{
          "--mx": `${smoothX.get()}px`,
          "--my": `${smoothY.get()}px`,
        } as any}
      />

      {/* 2. CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 border border-black/20 rounded-full pointer-events-none z-50 flex items-center justify-center"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%', opacity: isHovering ? 1 : 0 }}
      >
        <motion.div 
          animate={{ scale: isHovering ? [1, 1.5, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-1.5 h-1.5 bg-black rounded-full" 
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full select-none">
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 mb-4">
          Engine_Active // 0{activeRoleIndex + 1}
        </p>

        <h1 
          className="text-[12vw] md:text-[9vw] leading-[0.75] font-black uppercase tracking-tighter"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Graphikardia
        </h1>

        <div className="mt-12 relative w-full flex flex-col items-center min-h-[300px] justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoleIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                {/* 3. AGGRESSIVE FLASHLIGHT GLOW */}
                <motion.h2 
                  className="text-7xl md:text-[11rem] lowercase leading-none py-8 pointer-events-none"
                  style={{ 
                    fontFamily: '"Playwrite NZ", cursive',
                    color: roles[activeRoleIndex].color,
                    fontWeight: 400,
                  }}
                  animate={{
                    WebkitMaskImage: isHovering 
                      ? `radial-gradient(circle 380px at ${smoothX.get()}px ${smoothY.get()}px, black 20%, transparent 100%)`
                      : `radial-gradient(circle 0px at 0px 0px, black 0%, transparent 0%)`,
                    maskImage: isHovering 
                      ? `radial-gradient(circle 380px at ${smoothX.get()}px ${smoothY.get()}px, black 20%, transparent 100%)`
                      : `radial-gradient(circle 0px at 0px 0px, black 0%, transparent 0%)`,
                  }}
                >
                  {roles[activeRoleIndex].title}
                </motion.h2>

                {/* GHOST TEXT */}
                <h2 
                  className="absolute inset-0 text-7xl md:text-[11rem] lowercase leading-none py-8 opacity-[0.05] pointer-events-none flex items-center justify-center text-center"
                  style={{ fontFamily: '"Playwrite NZ", cursive', color: '#000', zIndex: -1 }}
                >
                  {roles[activeRoleIndex].title}
                </h2>
              </div>

              <p className="mt-12 text-zinc-900 text-lg md:text-2xl font-bold max-w-xl leading-relaxed font-sans px-6">
                {roles[activeRoleIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-20 w-full px-10 flex justify-between items-center font-mono text-[9px] uppercase text-zinc-400">
        <div className="flex gap-4">
          <span>{roles[activeRoleIndex].title}</span>
          <span className="text-black/20">|</span>
          <span>{isHovering ? "Tracking_Input" : "Idle_Scan"}</span>
        </div>
        <div className="h-[1px] flex-grow mx-4 bg-zinc-100" />
        <span>{new Date().getFullYear()} © Graphikardia</span>
      </div>
    </div>
  );
}
