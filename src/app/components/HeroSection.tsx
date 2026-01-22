'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function HeroSection({ isDark }: { isDark: boolean }) {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // 1. STATE FOR DYNAMIC HEADLINE
  const [displayTitle, setDisplayTitle] = useState("Graphikardia");

  // 2. SYNC WITH TERMINAL-X
  useEffect(() => {
    const savedTitle = localStorage.getItem('gk_hero_title');
    if (savedTitle) {
      setDisplayTitle(savedTitle);
    }
  }, []);
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Dynamic Pulse Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[120px] ${isDark ? 'bg-purple-600' : 'bg-purple-400'}`} 
        />
        {/* EKG Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center w-full max-w-[100vw]">
        {/* Top HUD Display */}
        <div className="flex justify-center gap-12 mb-12 overflow-hidden">
          {["System_Active", "Region_IN", "Narrative_Engaged"].map((stat) => (
            <motion.span key={stat} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.4 }}
              className="font-mono text-[9px] uppercase tracking-[0.3em]">{stat}</motion.span>
          ))}
        </div>

        {/* MAIN TITLE: Linked to Terminal-X State */}
        <div className="relative group">
          <motion.h1 
            key={displayTitle} // Key forces re-animation when you commit changes
            initial={{ letterSpacing: "0.5em", opacity: 0, filter: "blur(10px)" }}
            animate={{ letterSpacing: "-0.02em", opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10vw] md:text-[9vw] font-black uppercase italic leading-none tracking-tighter break-words px-4"
          >
            {displayTitle}
            {/* The Animated "Heartbeat" Scanline */}
            <motion.div 
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-1 bg-purple-500 shadow-[0_0_20px_#a855f7] z-20 mix-blend-screen"
            />
          </motion.h1>
          
          {/* Ghost Reflection */}
          <h1 className="absolute top-0 left-0 w-full text-[10vw] md:text-[9vw] font-black uppercase italic leading-none tracking-tighter opacity-[0.03] blur-sm translate-x-2 translate-y-2 pointer-events-none break-words px-4">
            {displayTitle}
          </h1>
        </div>

        {/* Roles with "Scanning" effect */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-2xl mx-auto px-6">
          {["Viral Strategy", "UI/UX Architecture", "Motion Systems"].map((role, i) => (
            <motion.div key={role} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 1 + (i * 0.2) }}
              className="flex items-center gap-3">
              <span className="w-1 h-1 bg-purple-600 rounded-full animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-widest">{role}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Side HUD Elements */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-20 opacity-20 font-mono text-[9px] uppercase vertical-text">
        <p>Innovation_Standard_2026</p>
        <p>Brutalist_Vibration_Scale: 0.98</p>
      </div>
    </section>
  );
}
