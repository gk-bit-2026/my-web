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

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
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
    <div 
      className="fixed inset-0 pointer-events-none hidden md:block" 
      style={{ zIndex: 1000000, isolation: 'isolate' }}
    >
      {/* 1. THE CORE - Explicitly Black in Light Mode, White in Dark Mode */}
      <motion.div
        className="absolute w-4 h-4 rounded-full border border-white/20 shadow-xl"
        style={{ 
          x, y, translateX: '-50%', translateY: '-50%',
          backgroundColor: isDark ? '#ffffff' : '#000000', // NO MORE BLEND GUESSWORK
        }}
        animate={{ scale: hovered ? 2.5 : 1 }}
      />
      
      {/* 2. THE RING - Contrasts against the core */}
      <motion.div
        className="absolute w-9 h-9 border-[1.5px]"
        style={{ 
          x, y, translateX: '-50%', translateY: '-50%',
          borderColor: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        }}
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
