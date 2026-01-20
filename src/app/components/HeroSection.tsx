import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth parallax and scaling
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] text-black">
      
      {/* 1. Creative Background: Organic Shapes & Grain */}
      <div className="absolute inset-0 z-0">
        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
        
        {/* Soft Organic Blob 1 */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full bg-zinc-100 blur-[100px]" 
        />
        
        {/* Soft Organic Blob 2 */}
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-20 -right-20 w-[50vw] h-[50vw] rounded-full bg-zinc-200/50 blur-[120px]" 
        />
      </div>

     {/* 2. Top Slogan: Brutalist Bold Style */}
<motion.div
  style={{ opacity }}
  className="relative z-10 text-center mb-8 px-4"
>
  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    /* UPDATED: 
       - text-black: for the requested color 
       - border-black/10: changed from white/10 so the underline is visible
    */
    className="text-xs md:text-sm tracking-[0.5em] uppercase font-black text-black border-b border-black/10 pb-2 inline-block"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    Perspective / Purpose / Perfection
  </motion.p>
</motion.div>

      {/* 3. Main Heading: The "Graphikardia" Reveal */}
      <motion.div
        style={{ y, rotate, opacity }}
        className="relative z-10 text-center px-4"
      >
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[8vw] md:text-[7vw] leading-[0.85] font-black uppercase tracking-tighter"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Graphikardia
          </motion.h1>
        </div>

        {/* The Voice Line: High Contrast Serif */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="text-xl md:text-3xl font-serif italic text-zinc-800 max-w-2xl leading-relaxed">
            "Translating your <span className="text-black font-bold border-b-2 border-black/10">VISION</span>, <br />
            into a digital <span className="text-black font-bold border-b-2 border-black/10">LEGACY</span>."
          </p>
        </motion.div>
      </motion.div>

      {/* 4. Scroll Indicator: Minimalist Line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 80 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-zinc-300 to-black z-10"
      >
        <motion.div 
          animate={{ y: [0, 80] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-1/4 bg-black"
        />
      </motion.div>

      {/* 5. Signature Accent */}
      <div className="absolute top-12 right-12 z-10 hidden md:block">
        <p className="text-[10px] font-mono tracking-[0.5em] vertical-text rotate-90 origin-right text-zinc-400">
          EST. 2026 / CREATIVE_DIR
        </p>
      </div>
    </div>
  );
}
