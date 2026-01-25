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
    <div className="fixed inset-0 pointer-events-none z-[999999] hidden md:block" style={{ isolation: 'isolate' }}>
      {/* Theme Halo */}
      <motion.div
        className="absolute w-16 h-16 rounded-full blur-3xl opacity-20"
        style={{ 
          x, y, translateX: '-50%', translateY: '-50%',
          background: isDark ? '#A855F7' : '#3B82F6' 
        }}
      />

      {/* Main Core (White + Mix Blend = Auto Invert) */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 2.5 : 1 }}
      />
      
      {/* Morphing Ring */}
      <motion.div
        className="absolute w-8 h-8 border border-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 1.8 : 1,
          borderRadius: hovered ? '20%' : '50%',
          rotate: hovered ? 45 : 0
        }}
        transition={{ type: 'spring', damping: 20 }}
      />
    </div>
  );
}
