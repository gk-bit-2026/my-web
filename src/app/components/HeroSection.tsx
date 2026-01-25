'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { cn } from '../../lib/utils';

export function HeroSection() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [displayTitle] = useState("Graphikardia");
  
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[120px]",
            isDark ? "bg-purple-600" : "bg-purple-400 opacity-40"
          )} 
        />
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
               backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, 
               backgroundSize: '50px 50px' 
             }} 
        />
      </div>

      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center w-full max-w-[100vw]">
        <div className="flex justify-center gap-6 md:gap-12 mb-12">
          {["System_Active", "Region_IN", "Narrative_Engaged"].map((stat) => (
            <motion.span 
              key={stat} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.4 }} 
              className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em]"
            >
              {stat}
            </motion.span>
          ))}
        </div>

        <div className="relative group">
          <motion.h1 className="text-[14vw] md:text-[9vw] font-black uppercase italic leading-none tracking-tighter break-words px-4">
            {displayTitle}
            <motion.div 
              animate={{ left: ['-10%', '110%'] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-1 bg-purple-500 shadow-[0_0_20px_#a855f7] z-20 mix-blend-screen" 
            />
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}
