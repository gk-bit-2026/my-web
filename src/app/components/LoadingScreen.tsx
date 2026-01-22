'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import logoImage from '@/assets/logo1.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000); // Wait for final reveal
          return 100;
        }
        // Organic loading speed: fast start, slow middle, fast finish
        const increment = prev < 30 ? 3 : prev < 70 ? 1 : 4;
        return Math.min(prev + increment, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5, filter: 'blur(40px)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center z-[99999] bg-black text-white overflow-hidden"
    >
      {/* 1. KINETIC BACKGROUND (Neural Mesh) */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-transparent to-transparent"
        />
        {/* Moving Scanline */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
        />
      </div>

      {/* 2. LOGO & BRAND (The Core) */}
      <div className="relative z-20 flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-12"
        >
          {/* Reactive Aura */}
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 blur-[80px] rounded-full bg-white/20"
          />
          <motion.img
            src={logoImage}
            alt="Logo"
            className="w-24 md:w-32 h-auto relative z-10 invert brightness-200"
          />
        </motion.div>

        {/* GLITCH TEXT REVEAL */}
        <div className="relative">
          <motion.h2 
            className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-display"
          >
            Graphikardia
          </motion.h2>
          {/* Progress Overlap Mask */}
          <motion.div 
            className="absolute top-0 left-0 text-zinc-900 overflow-hidden select-none pointer-events-none"
            style={{ width: `${progress}%` }}
          >
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-display text-white">
              Graphikardia
            </h2>
          </motion.div>
        </div>

        {/* 3. TECHNICAL METRICS */}
        <div className="mt-8 flex flex-col items-center font-mono text-[10px] md:text-xs tracking-[0.4em] text-zinc-500 uppercase">
          <span className="mb-2">Synchronizing_Market_Data</span>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  opacity: (progress / 10) >= i ? 1 : 0.2,
                  backgroundColor: (progress / 10) >= i ? '#fff' : '#333'
                }}
                className="w-4 md:w-8 h-1"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. DATA COUNTER (Bottom Corner) */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end font-mono">
        <span className="text-[10px] text-zinc-600 uppercase mb-1">Packet_Loss: 0.00%</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl md:text-6xl font-black tabular-nums">{progress}%</span>
          <span className="text-zinc-500 text-xs">LOAD</span>
        </div>
      </div>

      {/* 5. BRAND SLOGAN (Left Side Vertical) */}
      <div className="absolute left-10 bottom-10 hidden md:flex flex-col gap-1 origin-left -rotate-90">
        <span className="text-[8px] font-mono tracking-[0.5em] text-zinc-700 uppercase">
          Visual_Intelligence // 2026_EDITION
        </span>
      </div>
    </motion.div>
  );
}
