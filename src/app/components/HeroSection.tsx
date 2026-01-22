import { motion } from 'framer-motion';

export function HeroSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-20 animate-pulse
          ${isDark ? 'bg-purple-900' : 'bg-purple-300'}
        `} />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-10 opacity-60"
        >
          Global Digital Narrative Engine
        </motion.div>
        
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-b from-current to-current/50"
        >
          Graphi<br/>Kardia<span className="text-purple-600">.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-xl mx-auto text-sm md:text-lg font-light leading-relaxed opacity-80"
        >
          We transform brands from <span className="font-bold italic">Invisible</span> to <span className="font-bold italic">Inevitable</span>. 
          Specializing in high-velocity content, brutalist web design, and market dominance.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest opacity-40"
      >
        Scroll_to_Explore
      </motion.div>
    </section>
  );
}
