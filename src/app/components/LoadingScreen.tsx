import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("Loader mounted. Progress starting...");
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          console.log("Progress 100%. Triggering onComplete in 1s.");
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Inline styles to bypass Tailwind if it's misconfigured
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>
          GRAPHIKARDIA
        </h1>
        <p style={{ fontFamily: 'monospace', marginTop: '20px', fontSize: '1.5rem' }}>
          {progress}%
        </p>
      </div>

      {/* Simplified Progress Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '5px', background: '#eee' }}>
        <div style={{ height: '100%', background: 'black', width: `${progress}%`, transition: 'width 0.1s' }} />
      </div>
    </motion.div>
  );
}
