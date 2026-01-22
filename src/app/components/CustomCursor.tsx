'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e: any) => {
      const target = e.target as HTMLElement;
      // Detect buttons, links, or anything clickable
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      animate={{ 
        x: pos.x - 12, 
        y: pos.y - 12,
        scale: hovered ? 2.5 : 1,
        backgroundColor: hovered ? 'white' : 'transparent'
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
    />
  );
}
