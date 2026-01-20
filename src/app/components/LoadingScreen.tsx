import { motion } from 'framer-motion'; // Using standard framer-motion for stability
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
        const next = prev + Math.ceil(Math.random() * 5);
        if (next >= 100) {
          clearInterval(interval);
          // 1s delay so they actually see the 100% and the finish effect
          setTimeout(onComplete, 1000); 
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      // KEY: This 'exit' only works if AnimatePresence is in the PARENT
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#fafafa] text-black overflow-hidden"
    >
      {/* Background Logic */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
        />
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full bg-zinc-100 blur-[100px]" 
        />
      </div>

      {/* Logo & Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ 
            opacity: progress > 20 ? 1 : 0,
            scale: progress > 20 ? 1 : 0.5,
            rotate: progress > 20 ? 0 : -10
          }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative"
        >
          <img src={logoImage} alt="Logo" className="w-56 h-56 object-contain" />
        </motion.div>

        <div className="text-center">
          <div className="overflow-hidden mb-2">
            <motion.h2
              animate={{ y: progress > 40 ? "0%" : "110%" }}
              className="text-5xl md:text-6xl font-black tracking-[0.15em] uppercase"
            >
              Graphikardia
            </motion.h2>
          </div>
          <p className="font-mono text-zinc-400 mt-4">{progress}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-200 z-20 overflow-hidden">
        <motion.div 
          className="h-full bg-black"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}
