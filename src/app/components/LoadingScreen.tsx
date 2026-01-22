'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // A slight delay at 100% feels more "intentional" for high-end sites
          setTimeout(onComplete, 800); 
          return 100;
        }
        // Randomize increment slightly for a more "organic" loading feel
        const increment = Math.random() > 0.8 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Grid Pattern (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', size: '40px 40px' }} 
      />

      <div className="w-full max-w-lg px-10 relative z-10">
        {/* Top Status Bar */}
        <div className="flex justify-between font-mono text-[10px] uppercase mb-4 tracking-[0.3em]">
          <motion.span 
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Establishing_Connection...
          </motion.span>
          <span className="text-purple-500 font-bold">{count}%</span>
        </div>

        {/* The Progress Bar Architecture */}
        <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-transparent via-purple-500 to-white" 
            initial={{ width: 0 }} 
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Branding Logo & Glitch Effect */}
        <div className="mt-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tightest uppercase italic leading-none"
          >
            Graphikardia<span className="text-purple-600 animate-pulse">_</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-mono text-[9px] uppercase tracking-[1em]"
          >
            Narrative_Deployment_In_Progress
          </motion.div>
        </div>
      </div>

      {/* Decorative Corner Tech-Lines */}
      <div className="absolute bottom-10 left-10 w-20 h-[1px] bg-white/20" />
      <div className="absolute bottom-10 left-10 w-[1px] h-20 bg-white/20" />
      <div className="absolute top-10 right-10 w-20 h-[1px] bg-white/20" />
      <div className="absolute top-10 right-10 w-[1px] h-20 bg-white/20" />
    </motion.div>
  );
}
