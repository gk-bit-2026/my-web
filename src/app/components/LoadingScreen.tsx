export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  // ... (Keep your existing useEffect)

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafafa] text-black overflow-hidden p-4"
      exit={{ opacity: 0, filter: 'blur(10px)' }}
    >
      {/* Background Shapes: Reduced opacity on mobile for better text legibility */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute -top-10 -left-10 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-zinc-100 blur-[60px] md:blur-[100px]" 
        />
      </div>

      {/* Main Content: Scaled for Mobile */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm md:max-w-none">
        <motion.div
          animate={{ opacity: progress > 20 ? 1 : 0, scale: progress > 20 ? 1 : 0.8 }}
          className="mb-6 md:mb-12 relative"
        >
          {/* LOGO: Shrunk for mobile (w-32) vs Desktop (w-56) */}
          <img src={logoImage} alt="Logo" className="w-32 h-32 md:w-56 md:h-56 object-contain" />
          
          <motion.div
            className="absolute inset-0 border-[1px] border-black/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ scale: 1.3 }}
          />
        </motion.div>

        <div className="text-center w-full">
          <div className="overflow-hidden">
            {/* TEXT: Smaller on mobile (text-3xl) to prevent line breaking */}
            <motion.h2
              animate={{ y: progress > 40 ? "0%" : "110%" }}
              className="text-3xl md:text-6xl font-black tracking-[0.1em] md:tracking-[0.15em] uppercase leading-none"
            >
              Graphikardia
            </motion.h2>
          </div>
          
          {/* TAGLINES: Flex-col on mobile to prevent horizontal overflow */}
          <div className="mt-6 md:mt-10 flex flex-col gap-2 md:gap-4 text-sm md:text-xl font-serif italic text-black">
            <div className="overflow-hidden h-6 md:h-8">
              <motion.p animate={{ y: progress > 60 ? "0%" : "100%" }}>
                Design is my <span className="font-black">language</span>
              </motion.p>
            </div>
            <div className="overflow-hidden h-6 md:h-8">
              <motion.p animate={{ y: progress > 75 ? "0%" : "100%" }}>
                Impact is my <span className="font-black">voice</span>
              </motion.p>
            </div>
          </div>

          {/* ACCENT TEXT: Extremely tracking for mobile, centered */}
          <motion.p
            animate={{ opacity: progress > 85 ? 1 : 0 }}
            className="mt-8 md:mt-12 text-[10px] md:text-[12px] font-mono tracking-[0.2em] md:tracking-[0.5em] uppercase text-black font-bold px-2"
          >
            Perspective / Purpose / Perfection
          </motion.p>
        </div>
      </div>

      {/* MOBILE PROGRESS INDICATOR: 
          Higher up (bottom-12) to avoid mobile 'home' bars, 
          centered for better thumb-reach visibility. */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:bottom-20 md:translate-x-0 z-20 flex flex-col items-center md:items-end"
      >
        <p className="text-4xl md:text-2xl font-mono text-black font-black tabular-nums">
          {progress}%
        </p>
        <div className="w-12 md:w-full h-[3px] bg-black mt-1" />
      </motion.div>
    </motion.div>
  );
}
