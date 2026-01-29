'use client';

import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { cn } from '../../lib/utils';
// Assuming you have these assets, otherwise replace with placeholders
import logoWhite from '../../assets/logo2.png'; 
import logoBlack from '../../assets/logo1.png'; // Assuming logo1 is the dark version

const ROLES = [
  "SEO Specialist",
  "Grphic Designer",
  "Content Strategist",
  "Brand Identity",
  "Social Media Lead",
  "Web Designer",
  "Data Analyst"
];

export function HeroSection() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const textRef = useRef(null);
  
  // Scroll parallax for the whole container
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animation State
  const [roleIndex, setRoleIndex] = useState(0);
  const progress = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Track previous position to detect center crossing
  const prevProgress = useRef(0);

  // The Infinite Loop Logic
  useAnimationFrame((time, delta) => {
    if (!pathRef.current) return;

    const duration = 8000; // ms to complete one loop
    // Calculate 0-1 progress based on time
    const t = (time % duration) / duration;
    
    // Get path length and point
    const pathLength = pathRef.current.getTotalLength();
    const point = pathRef.current.getPointAtLength(t * pathLength);
    
    // Center the coordinates relative to the SVG viewbox (400x200)
    // We want the 0,0 of the div to be the center of the screen
    // SVG center is 200, 100.
    const offsetX = point.x - 200; 
    const offsetY = point.y - 100;

    x.set(offsetX);
    y.set(offsetY);

    // Logic to switch text when reaching the "center" (the cross point)
    // The infinity path crosses itself roughly at t=0, t=0.5, and t=1
    // We add a small buffer so it doesn't flicker
    const centerThreshold = 0.01;
    
    // Check if we passed the 50% mark or looped back to 0
    const crossedMiddle = (prevProgress.current < 0.5 && t >= 0.5);
    const crossedStart = (prevProgress.current > 0.9 && t < 0.1);

    if (crossedMiddle || crossedStart) {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    prevProgress.current = t;
  });

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden px-4">
      
      {/* --- Background Ambient Glow --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[100px]",
            isDark ? "bg-purple-900/40" : "bg-purple-200/60"
          )} 
        />
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
               backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }} 
        />
      </div>

      <motion.div style={{ y: y1, opacity }} className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        
        {/* --- Top Stats --- */}
        <div className="absolute top-[15%] flex justify-center gap-6 md:gap-12 w-full">
          {["AGENCY_MODE", "EST_2024", "REGION_GLOBAL"].map((stat) => (
            <motion.span 
              key={stat} 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.5 }}
              className={cn(
                "font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em]",
                isDark ? "text-white" : "text-black"
              )}
            >
              {stat}
            </motion.span>
          ))}
        </div>

        {/* --- The Center Stage --- */}
        <div className="relative w-[300px] h-[150px] md:w-[600px] md:h-[300px] flex items-center justify-center">
          
          {/* 1. The Infinity SVG Loop (Behind Logo) */}
          <svg 
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 400 200"
          >
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />   {/* Purple */}
                <stop offset="50%" stopColor="#ec4899" />  {/* Pink */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* The Invisible Path for Calculation */}
            <path
              ref={pathRef}
              d="M 200, 100 C 200, 100 150, 180 100, 180 C 50, 180 20, 140 20, 100 C 20, 60 50, 20 100, 20 C 150, 20 200, 100 200, 100 C 200, 100 250, 20 300, 20 C 350, 20 380, 60 380, 100 C 380, 140 350, 180 300, 180 C 250, 180 200, 100 200, 100 Z"
              fill="none"
              stroke="transparent"
            />

            {/* The Visible Glowing Path */}
            <motion.path
              d="M 200, 100 C 200, 100 150, 180 100, 180 C 50, 180 20, 140 20, 100 C 20, 60 50, 20 100, 20 C 150, 20 200, 100 200, 100 C 200, 100 250, 20 300, 20 C 350, 20 380, 60 380, 100 C 380, 140 350, 180 300, 180 C 250, 180 200, 100 200, 100 Z"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter={isDark ? "url(#glow)" : ""}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* 2. The Moving Role Text */}
          <motion.div 
            style={{ x, y }}
            className="absolute z-20 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              key={roleIndex} // Triggers animation on change
              initial={{ scale: 0.8, opacity: 0, filter: "blur(5px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "px-3 py-1 rounded-full text-xs md:text-sm font-bold whitespace-nowrap border shadow-lg backdrop-blur-md",
                isDark 
                  ? "bg-black/50 border-purple-500/50 text-white shadow-purple-500/20" 
                  : "bg-white/80 border-purple-200 text-purple-900 shadow-purple-200/50"
              )}
            >
              {ROLES[roleIndex]}
            </motion.div>
          </motion.div>

          {/* 3. The Central Logo */}
          <motion.div 
            className="relative z-30 p-6 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
             {/* Logo Glow Effect */}
             <div className={cn(
               "absolute inset-0 rounded-full blur-[40px] opacity-40",
               isDark ? "bg-white" : "bg-purple-600"
             )} />
             
             {/* The Image */}
             <img 
               src={isDark ? logoWhite.src : logoBlack.src} 
               alt="Graphikardia Logo" 
               className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 drop-shadow-2xl"
             />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
