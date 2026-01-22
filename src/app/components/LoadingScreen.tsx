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
          setTimeout(onComplete, 800); 
          return 100;
        }
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
      {/* FIXED: Changed 'size' to 'backgroundSize' to resolve TS2353 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />

      <div className="w-full max-w-lg px-10 relative z-10">
        <div className="flex justify-between font-mono text-[10px] uppercase mb-4 tracking-[0.3em]">
          <motion.span 
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Establishing_Connection...
          </motion.span>
          <span className="text-purple-500 font-bold">{count}%</span>
        </div>

        <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-transparent via-purple-500 to-white" 
            initial={{ width: 0 }} 
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

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

      <div className="absolute bottom-10 left-10 w-20 h-[1px] bg-white/20" />
      <div className="absolute bottom-10 left-10 w-[1px] h-20 bg-white/20" />
      <div className="absolute top-10 right-10 w-20 h-[1px] bg-white/20" />
      <div className="absolute top-10 right-10 w-[1px] h-20 bg-white/20" />
    </motion.div>
  );
}
