import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-full max-w-md px-10">
        <div className="flex justify-between font-mono text-xs uppercase mb-2 opacity-50">
          <span>System_Init</span>
          <span>{count}%</span>
        </div>
        <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white" 
            initial={{ width: 0 }} 
            animate={{ width: `${count}%` }} 
          />
        </div>
        <h1 className="mt-8 text-center text-4xl font-black tracking-tightest uppercase italic">
          Graphikardia<span className="animate-pulse">_</span>
        </h1>
      </div>
    </motion.div>
  );
}
