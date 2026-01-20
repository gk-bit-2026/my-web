import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import logoImage from 'figma:asset/23a08fc2e7fa53ce51f5f86dc55e2fc16af4e83a.png';

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
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fafafa] text-black overflow-hidden"
        exit={{ 
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)',
          transition: { duration: 0.8, ease: "easeInOut" } 
        }}
      >
        {/* Creative Background: Organic Shapes & Grain - Matching Hero */}
        <div className="absolute inset-0 z-0">
          {/* Grain Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
            style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
          />
          
          {/* Animated Gradient Orbs */}
          <motion.div 
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full bg-zinc-100 blur-[100px]" 
          />
          
          <motion.div 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-20 -right-20 w-[50vw] h-[50vw] rounded-full bg-zinc-200/50 blur-[120px]" 
          />

          {/* Floating Particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-black/10 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo with Dramatic Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ 
              opacity: progress > 20 ? 1 : 0,
              scale: progress > 20 ? 1 : 0.5,
              rotate: progress > 20 ? 0 : -10
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 relative"
          >
            <motion.img 
              src={logoImage} 
              alt="Graphikardia Logo" 
              className="w-56 h-56 object-contain"
              animate={{
                filter: progress > 80 ? 'drop-shadow(0 0 20px rgba(0,0,0,0.1))' : 'none'
              }}
            />
            {/* Rotating Ring Around Logo */}
            <motion.div
              className="absolute inset-0 border-2 border-black/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ scale: 1.2 }}
            />
          </motion.div>

          {/* Typography Section */}
          <div className="text-center">
            {/* Main Brand Name with Character Reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: "110%" }}
                animate={{ y: progress > 40 ? "0%" : "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl font-black tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Graphikardia
              </motion.h2>
            </div>
            
            {/* Tagline Sequence - Editorial Style with Stagger */}
            <div className="mt-8 flex flex-col gap-3 text-lg font-serif italic text-zinc-700">
              <div className="overflow-hidden h-7">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ 
                    y: progress > 60 ? "0%" : "100%",
                    opacity: progress > 60 ? 1 : 0
                  }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Design is my <motion.span 
                    className="text-black font-bold border-b-2 border-black/20"
                    animate={{ borderColor: progress > 80 ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)' }}
                  >
                    language
                  </motion.span>
                </motion.p>
              </div>
              <div className="overflow-hidden h-7">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ 
                    y: progress > 75 ? "0%" : "100%",
                    opacity: progress > 75 ? 1 : 0
                  }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Impact is my <motion.span 
                    className="text-black font-bold border-b-2 border-black/20"
                    animate={{ borderColor: progress > 90 ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)' }}
                  >
                    voice
                  </motion.span>
                </motion.p>
              </div>
            </div>

            {/* Small Accent Text with Fade */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: progress > 85 ? 1 : 0, y: progress > 85 ? 0 : 10 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10"
            >
              <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-zinc-400">
                Perspective / Purpose / Perfection
              </p>
            </motion.div>
          </div>
        </div>

        {/* Elegant Progress Indicator with Glow */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-200 z-20 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-black via-zinc-700 to-black relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            {/* Glowing edge */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Progress Percentage with Pulsing Animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 right-8 z-20"
        >
          <motion.p 
            className="text-sm font-mono text-zinc-400 tabular-nums"
            animate={{ 
              scale: progress % 10 === 0 ? [1, 1.1, 1] : 1 
            }}
            transition={{ duration: 0.3 }}
          >
            {progress.toString().padStart(2, '0')}%
          </motion.p>
        </motion.div>

        {/* Corner Accent Elements */}
        <motion.div 
          className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-black/10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: progress > 50 ? 1 : 0, scale: progress > 50 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-black/10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: progress > 50 ? 1 : 0, scale: progress > 50 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}