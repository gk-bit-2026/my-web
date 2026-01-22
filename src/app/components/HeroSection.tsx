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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

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
      <div 
        className="absolute inset-0 transition-colors duration-[1500ms] opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${roles[activeRoleIndex].color}, transparent 70%)` }}
      />

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
                {/* THE MASKED REVEAL LAYER */}
                <motion.h2 
                  className="text-7xl md:text-[11rem] lowercase leading-none py-8 pointer-events-none"
                  style={{ 
                    fontFamily: '"Playwrite NZ", cursive',
                    color: roles[activeRoleIndex].color,
                    fontWeight: 400,
                  }}
                  animate={{
                    WebkitMaskImage: isHovering 
                      ? `radial-gradient(circle 120px at ${smoothX.get()}px ${smoothY.get()}px, black 0%, transparent 100%)`
                      : `radial-gradient(circle 0px at 0px 0px, black 0%, transparent 0%)`,
                    maskImage: isHovering 
                      ? `radial-gradient(circle 120px at ${smoothX.get()}px ${smoothY.get()}px, black 0%, transparent 100%)`
                      : `radial-gradient(circle 0px at 0px 0px, black 0%, transparent 0%)`,
                  }}
                >
                  {roles[activeRoleIndex].title}
                </motion.h2>

                {/* GHOST TEXT */}
                <h2 
                  className="absolute inset-0 text-7xl md:text-[11rem] lowercase leading-none py-8 opacity-[0.04] pointer-events-none flex items-center justify-center"
                  style={{ fontFamily: '"Playwrite NZ", cursive', color: '#000', zIndex: -1 }}
                >
                  {roles[activeRoleIndex].title}
                </h2>
              </div>

              <p className="mt-12 text-zinc-900 text-lg md:text-2xl font-bold max-w-xl leading-relaxed font-sans px-6 opacity-90">
                {roles[activeRoleIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-20 w-full px-10 flex justify-between items-center font-mono text-[9px] uppercase text-zinc-400">
        <span>Active_Role: {roles[activeRoleIndex].title}</span>
        <div className="h-[1px] flex-grow mx-4 bg-zinc-100" />
        <span>{new Date().getFullYear()} © Graphikardia</span>
      </div>
    </div>
  );
}
