import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logoImage from '@/assets/logo1.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#fafafa] text-black"
      style={{ zIndex: 99999 }} // Maximum z-index
    >
      {/* Background Decor - Simplified for stability */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-zinc-100 rounded-full blur-[80px] opacity-50" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full text-center">
        
        {/* Logo - Size responsive for Mobile (w-32) vs Desktop (md:w-52) */}
        <motion.img
          src={logoImage}
          alt="Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 md:w-52 h-auto mb-10 object-contain"
        />

        {/* Brand Name - Text sizes adjusted for mobile safety */}
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-6xl font-black uppercase tracking-tighter"
          >
            Graphikardia
          </motion.h2>
        </div>

        {/* Tagline - Responsive scaling */}
        <div className="mt-6 space-y-2 text-base md:text-xl font-serif italic text-zinc-800">
          <p>Design is my <span className="font-bold border-b border-black">language</span></p>
          <p>Impact is my <span className="font-bold border-b border-black">voice</span></p>
        </div>

        {/* Brutalist Slogan - Hidden on very small screens to avoid overlap */}
        <p className="mt-12 hidden xs:block text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase font-bold text-black">
          Perspective / Purpose / Perfection
        </p>
      </div>

      {/* Progress Counter - Bold and Mobile Central */}
      <div className="absolute bottom-12 md:bottom-20 md:right-12 flex flex-col items-center md:items-end">
        <span className="text-5xl md:text-3xl font-mono font-black tabular-nums">
          {progress}%
        </span>
        <div className="w-16 md:w-24 h-1 bg-black mt-2" />
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200">
        <motion.div 
          className="h-full bg-black"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
