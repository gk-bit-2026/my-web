'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function GrowthMatrix() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={container} className="py-40 bg-white text-black overflow-hidden">
      <div className="px-6 mb-20">
        <span className="font-mono text-xs tracking-widest uppercase opacity-40">[ Attention_Arbitrage ]</span>
        <h2 className="text-[10vw] font-black italic leading-none uppercase mt-4">Stop Scrolling.<br/>Start Scaling.</h2>
      </div>

      <div className="relative h-[400px] bg-zinc-100 flex items-end">
        <motion.div style={{ width }} className="h-full bg-black relative flex items-center justify-end px-10">
          <span className="text-white text-[15vw] font-black italic leading-none">+240%</span>
        </motion.div>
        <div className="absolute top-1/2 left-10 -translate-y-1/2 mix-blend-difference text-white">
          <p className="max-w-xs font-mono text-xs uppercase tracking-widest">Our viral ecosystem forces retention, ensuring your brand stays at the top of the algorithmic feed.</p>
        </div>
      </div>
    </section>
  );
}
