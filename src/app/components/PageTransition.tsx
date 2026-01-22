'use client';

import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
