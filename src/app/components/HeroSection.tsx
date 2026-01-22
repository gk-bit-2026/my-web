'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const roles = [
  { word: "GRAPHIKARDIA", sub: "Visual Narrative", desc: "Crafting unique visual stories that resonate.", color: "#ec4899" },
  { word: "PERFORMANCE", sub: "Growth Hacking", desc: "Dominating the digital space with data-driven ROI.", color: "#22c55e" },
  { word: "STRATEGIZING", sub: "Brand Identity", desc: "Building personalities that customers trust.", color: "#3b82f6" },
  { word: "ACCELERATION", sub: "Market Entry", desc: "Fast-tracking your brand into new territories.", color: "#f59e0b" },
  { word: "OUTSMARTING", sub: "Digital Edge", desc: "Using advanced tech to lead the competition.", color: "#06b6d4" }
];

export function HeroSection({ isDark }: { isDark: boolean }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ROTATION_TIME = 4500;
  const maxChars = 12;

  // MOUSE PHYSICS
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, ROTATION_TIME);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize values from -0.5 to 0.5
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const handleManualNav = (direction: 'next' | 'prev') => {
    if (direction === 'next') setIndex((prev) => (prev + 1) % roles.length);
    else setIndex((prev) => (prev - 1 + roles.length) % roles.length);
    startTimer();
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative min-h-[75vh] py-16 flex flex-col items-center justify-center overflow-hidden cursor-crosshair"
    >
      {/* 1. SLOGAN */}
      <div className="max-w-4xl text-center mb-16 px-6 pointer-events-none">
        <motion.p 
          key={index}
          className="text-xl md:text-3xl font-black leading-tight bg-clip-text text-transparent"
          style={{ 
            backgroundImage: `linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 0%, ${roles[index].color} 50%, ${isDark ? '#fff' : '#000'} 100%)`,
            WebkitBackgroundClip: 'text',
            backgroundSize: '200% auto',
            animation: 'shimmer 4s linear infinite'
          }}
        >
          "Crafting a unique visual narrative for your business that resonates with your audience and dominates the digital space."
        </motion.p>
      </div>

      {/* 2. 3D GRID WITH TILT */}
      <div className="relative group flex items-center gap-4 md:gap-12">
        <button onClick={() => handleManualNav('prev')} className={`p-2 rounded-full border transition-all ${isDark ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/10'} opacity-0 group-hover:opacity-100 hidden md:block`}>
          <ChevronLeft size={32} />
        </button>

        <div className="relative">
          <div className="flex gap-1 md:gap-2" style={{ perspective: '1200px' }}>
            {Array.from({ length: maxChars }).map((_, charIdx) => {
              // Individual Tilt Logic
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const rotateY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const rotateX = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

              return (
                <motion.div 
                  key={charIdx} 
                  className="w-7 h-11 md:w-16 md:h-24 relative" 
                  style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${index}-${charIdx}`}
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: -90, opacity: 0 }}
                      transition={{ duration: 0.6, delay: charIdx * 0.04, ease: [0.23, 1, 0.32, 1] }}
                      className={`absolute inset-0 flex items-center justify-center border-2 ${
                        isDark ? 'border-white/10 bg-zinc-900/50 text-white' : 'border-black/10 bg-zinc-100 text-black'
                      } font-black text-xl md:text-6xl rounded-md shadow-xl select-none`}
                    >
                      {roles[index].word.padEnd(maxChars, " ")[charIdx]}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* PROGRESS BAR */}
          <div className="absolute -bottom-6 left-0 w-full h-[2px] bg-current opacity-10">
            <motion.div key={index} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: ROTATION_TIME / 1000, ease: "linear" }}
              className="h-full" style={{ backgroundColor: roles[index].color }} />
          </div>
        </div>

        <button onClick={() => handleManualNav('next')} className={`p-2 rounded-full border transition-all ${isDark ? 'border-white/10 hover:bg-white/10' : 'border-black/10 hover:bg-black/10'} opacity-0 group-hover:opacity-100 hidden md:block`}>
          <ChevronRight size={32} />
        </button>
      </div>

      {/* 3. SYNCED DESCRIPTION */}
      <div className="mt-20 text-center min-h-[120px] px-8">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center">
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-widest" style={{ color: roles[index].color }}>
              {roles[index].sub}
            </h3>
            <p className="text-base md:text-xl font-medium opacity-70 max-w-lg leading-relaxed mt-4">
              {roles[index].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
      `}</style>
    </div>
  );
}
