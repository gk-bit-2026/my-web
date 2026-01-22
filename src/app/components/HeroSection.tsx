'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

const roles = [
  'Digital Marketer',
  'Video Editor',
  'Brand Strategist',
  'Growth Hacker',
  'Creative Director',
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = containerRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 150);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '900 120px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    roles.forEach((role, index) => {
      const yOffset = (index - activeRoleIndex) * 120;
      const targetY = centerY + yOffset;
      const dist = Math.sqrt(Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - targetY, 2));
      const textOpacity = Math.max(0, 1 - dist / 200);

      if (textOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = textOpacity * 0.1;
        ctx.strokeText(role.toUpperCase(), centerX, targetY);
        ctx.restore();
      }
    });
  }, [mousePos, activeRoleIndex]);

  useEffect(() => {
    const animate = () => {
      drawCanvas();
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [drawCanvas]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) setActiveRoleIndex((p) => (p + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] text-black"
    >
      {/* 1. MOVING BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-zinc-200 to-transparent blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -120, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-zinc-300/40 to-transparent blur-[140px]" 
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-40" />

      {/* 2. Top Slogan */}
      <motion.div style={{ opacity }} className="relative z-20 text-center mb-6">
        <p className="text-xs tracking-[0.6em] uppercase font-black text-black border-b border-black/10 pb-2 inline-block font-sans">
          Strategy / Content / Growth
        </p>
      </motion.div>

      {/* 3. Main Heading & 3D Roles */}
      <motion.div style={{ y, rotate, opacity }} className="relative z-20 text-center px-4">
        <div className="overflow-hidden mb-2">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10vw] md:text-[8vw] leading-[0.8] font-black uppercase tracking-tighter font-sans"
          >
            Graphikardia
          </motion.h1>
        </div>

        <div className="relative h-20 md:h-32 flex items-center justify-center" style={{ perspective: '1000px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoleIndex}
              initial={{ opacity: 0, y: 40, rotateX: -90, filter: "blur(10px)" }}
              animate={{
