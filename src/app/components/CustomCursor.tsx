'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '../../lib/ThemeContext';

export function CustomCursor() {
  const { isDark } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Innovation: Velocity Stretching
  // The faster you move, the more the cursor "stretches"
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
      const isClickable = target.closest('button') || target.closest('a') || target.closest('.clickable');
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] hidden md:block" style={{ isolation: 'isolate' }}>
      {/* INNOVATION: The Trailing Glow */}
      <motion.div
        className="absolute w-12 h-12 rounded-full blur-2xl opacity-30"
        style={{ 
          x, y, 
          translateX: '-50%', translateY: '-50%',
          background: isDark ? '#A855F7' : '#3B82F6' // Purple in Dark, Blue in Light
        }}
      />

      {/* Main Cursor Core */}
      <motion.div
        className="absolute w-4 h-4 rounded-full mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 2.5 : 1,
          backgroundColor: isDark ? '#ffffff' : '#ffffff', // Mix-blend handles the inversion
        }}
      />
      
      {/* INNOVATION: Reactive Ring */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovered ? 1.8 : 1,
          borderColor: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.8)',
          rotate: hovered ? 90 : 0,
          borderRadius: hovered ? '30%' : '50%' // Becomes a rounded square on hover
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />

      {/* Label Tooltip (Optional/Innovative) */}
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -40 }}
          className="absolute font-mono text-[8px] uppercase tracking-[0.3em] font-bold px-2 py-1 bg-purple-600 text-white rounded"
          style={{ x, y, translateX: '-50%' }}
        >
          Interact
        </motion.span>
      )}
    </div>
  );
}
