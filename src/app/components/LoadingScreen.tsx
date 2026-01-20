import { motion, AnimatePresence } from 'framer-motion'; // Using framer-motion for stability
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
          setTimeout(onComplete, 1500);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafafa] text-black overflow-hidden"
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* Organic Background */}
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ 
            opacity: progress > 20 ? 1 : 0,
            scale: progress > 20 ? 1 : 0.5,
            rotate: progress > 20 ? 0 : -10
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <img src={logoImage} alt="Logo" className="w-56 h-56 object-contain" />
          <motion.div
            className="absolute inset-0 border-2 border-black/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ scale: 1.2 }}
          />
        </motion.div>

        <div className="text-center">
          <div className="overflow-hidden mb-2">
            <motion.h2
              animate={{ y: progress > 40 ? "0%" : "110%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black tracking-[0.15em] uppercase"
            >
              Graphikardia
            </motion.h2>
          </div>
          
          {/* Tagline Sequence: Text made darker/bold for readability */}
          <div className="mt-8 flex flex-col gap-3 text-xl font-serif italic text-black font-medium">
            <div className="overflow-hidden h-8">
              <motion.p
                animate={{ y: progress > 60 ? "0%" : "100%", opacity: progress > 60 ? 1 : 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Design is my <span className="font-black border-b-2 border-black">language</span>
              </motion.p>
            </div>
            <div className="overflow-hidden h-8">
              <motion.p
                animate={{ y: progress > 75 ? "0%" : "100%", opacity: progress > 75 ? 1 : 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Impact is my <span className="font-black border-b-2 border-black">voice</span>
              </motion.p>
            </div>
          </div>

          {/* Accent Text: CHANGED TO BLACK */}
          <motion.div
            animate={{ opacity: progress > 85 ? 1 : 0, y: progress > 85 ? 0 : 10 }}
            className="mt-10"
          >
            <p className="text-[12px] font-mono tracking-[0.5em] uppercase text-black font-bold">
              Perspective / Purpose / Perfection
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-200 z-20 overflow-hidden">
        <motion.div 
          className="h-full bg-black"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Progress Percentage: MOVED HIGHER (bottom-20) and BIGGER (text-2xl) */}
      <motion.div 
        className="absolute bottom-20 right-10 z-20"
      >
        <motion.p 
          className="text-2xl font-mono text-black font-black tabular-nums tracking-tighter"
          animate={{ scale: progress % 10 === 0 ? [1, 1.1, 1] : 1 }}
        >
          {progress.toString().padStart(2, '0')}%
        </motion.p>
        <div className="w-full h-[2px] bg-black mt-1" />
      </motion.div>
    </motion.div>
  );
}
