'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '../../lib/ThemeContext';

export function CustomCursor() {
  const { isDark } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.clickable')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000000] hidden md:block" style={{ isolation: 'isolate' }}>
      {/* 1. Theme Halo: Subtle glow that changes color */}
      <motion.div
        className="absolute w-24 h-24 rounded-full blur-3xl"
        style={{ 
          x, y, translateX: '-50%', translateY: '-50%',
          background: isDark ? '#A855F7' : '#3B82F6',
          opacity: isDark ? 0.2 : 0.15 
        }}
      />

      {/* 2. Main Core: White + Difference = Black on Light Mode */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white mix-blend-difference border-[0.5px] border-white/10"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 2.5 : 1 }}
      />
      
      {/* 3. Morphing Ring: thicker border for visibility */}
      <motion.div
        className="absolute w-9 h-9 border-[1.5px] border-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 1.6 : 1,
          borderRadius: hovered ? '20%' : '50%',
          rotate: hovered ? 45 : 0
        }}
        transition={{ type: 'spring', damping: 20 }}
      />
    </div>
  );
}
