'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const roles = [
  { 
    word: "GRAPHIKARDIA", 
    sub: "Visual Narrative", 
    desc: "Crafting unique visual stories that resonate.", 
    color: "#ec4899",
    media: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920" // Placeholder: Abstract Digital
  },
  { 
    word: "PERFORMANCE", 
    sub: "Growth Hacking", 
    desc: "Dominating the digital space with data-driven ROI.", 
    color: "#22c55e",
    media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920" // Placeholder: Data/Metrics
  },
  { 
    word: "STRATEGIZING", 
    sub: "Brand Identity", 
    desc: "Building personalities that customers trust.", 
    color: "#3b82f6",
    media: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1920" // Placeholder: Design/Architectural
  },
  { 
    word: "ACCELERATION", 
    sub: "Market Entry", 
    desc: "Fast-tracking your brand into new territories.", 
    color: "#f59e0b",
    media: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920" // Placeholder: Speed/Cyber
  }
];

export function HeroSection({ isDark }: { isDark: boolean }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ROTATION_TIME = 4500;
  const maxChars = 12;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-crosshair text-white"
    >
      {/* 1. BACKGROUND MEDIA LAYER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay for readability */}
          <img 
            src={roles[index].media} 
            alt="background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. CONTENT LAYER (Z-INDEXed above BG) */}
      <div className="relative z-20 flex flex-col items-center w-full px-4">
        
        {/* SLOGAN */}
        <div className="max-w-4xl text-center mb-12 pointer-events-none">
          <motion.p 
            key={index}
            className="text-lg md:text-3xl font-black leading-tight bg-clip-text text-transparent"
            style={{ 
              backgroundImage: `linear-gradient(90deg, #fff 0%, ${roles[index].color} 50%, #fff 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundSize: '200% auto',
              animation: 'shimmer 4s linear infinite'
            }}
          >
            "Crafting a unique visual narrative for your business that resonates with your audience and dominates the digital space."
          </motion.p>
        </div>

        {/* 3D GRID WITH MOBILE SCALING */}
        <div className="relative group flex items-center gap-2 md:gap-12 w-full justify-center">
          <button onClick={() => handleManualNav('prev')} className="p-2 rounded-full border border-white/20 hover:bg-white/10 opacity-0 group-hover:opacity-100 hidden md:block transition-all">
            <ChevronLeft size={32} />
          </button>

          <div className="relative scale-[0.65] sm:scale-75 md:scale-100">
            <div className="flex gap-1 md:gap-2" style={{ perspective: '1200px' }}>
              {Array.from({ length: maxChars }).map((_, charIdx) => {
                const rotateY = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
                const rotateX = useTransform(smoothY, [-0.5, 0.5], [25, -25]);

                return (
                  <motion.div 
                    key={charIdx} 
                    className="w-8 h-12 md:w-16 md:h-24 relative" 
                    style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${index}-${charIdx}`}
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{ duration: 0.6, delay: charIdx * 0.04 }}
                        className="absolute inset-0 flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-sm font-black text-2xl md:text-6xl rounded-md shadow-2xl"
                      >
                        {roles[index].word.padEnd(maxChars, " ")[charIdx]}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* PROGRESS BAR */}
            <div className="absolute -bottom-8 left-0 w-full h-[3px] bg-white/10">
              <motion.div key={index} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: ROTATION_TIME / 1000, ease: "linear" }}
                className="h-full" style={{ backgroundColor: roles[index].color }} />
            </div>
          </div>

          <button onClick={() => handleManualNav('next')} className="p-2 rounded-full border border-white/20 hover:bg-white/10 opacity-0 group-hover:opacity-100 hidden md:block transition-all">
            <ChevronRight size={32} />
          </button>
        </div>

        {/* SYNCED DESCRIPTION */}
        <div className="mt-20 text-center min-h-[140px] px-8">
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center">
              <h3 className="text-2xl md:text-5xl font-black uppercase tracking-widest italic" style={{ color: roles[index].color }}>
                {roles[index].sub}
              </h3>
              <p className="text-base md:text-xl font-medium opacity-80 max-w-xl leading-relaxed mt-4 drop-shadow-lg">
                {roles[index].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className="flex md:hidden absolute bottom-10 gap-20 z-30 opacity-60">
         <ChevronLeft size={30} onClick={() => handleManualNav('prev')} />
         <ChevronRight size={30} onClick={() => handleManualNav('next')} />
      </div>

      <style jsx>{`
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
      `}</style>
    </div>
  );
}
