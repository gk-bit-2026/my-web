'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use MotionValues for high-performance updates (skips React render cycle)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for that "liquid" lag feel
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.style.cursor = 'none'; // Hide default cursor globally

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* Primary Dot */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white mix-blend-difference"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 4 : 1,
          opacity: 1
        }}
      />
      
      {/* Liquid Ring / Outer Glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-white/30 mix-blend-difference"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 1 }}
        animate={{
          scale: hovered ? 1.5 : 1,
          borderWidth: hovered ? '1px' : '2px',
        }}
      />
    </div>
  );
}
