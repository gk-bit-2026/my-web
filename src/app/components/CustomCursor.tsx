'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [type, setType] = useState('default');

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const handleOver = (e: any) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') setType('pointer');
      else setType('default');
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      animate={{ 
        x: pos.x - 16, 
        y: pos.y - 16,
        scale: type === 'pointer' ? 2.5 : 1,
        backgroundColor: type === 'pointer' ? 'white' : 'transparent'
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
}
