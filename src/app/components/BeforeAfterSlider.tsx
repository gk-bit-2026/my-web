import { motion } from 'motion/react';
import { useState } from 'react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-6xl text-white mb-4 uppercase font-bold tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Performance & Development
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          The Lab: <span className="text-white/80">Slide to compare Before and After Graphikardia</span>
        </p>
      </motion.div>

      <div className="relative w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
        <div
          className="relative w-full h-full select-none cursor-ew-resize"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* --- AFTER SLIDE (Revealed from Right, White BG) --- */}
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="w-64 h-64 bg-black rounded-lg mb-4 mx-auto flex items-center justify-center shadow-2xl">
                <div className="text-white text-6xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>GK</div>
              </div>
              <p className="text-black text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Impact</p>
              <p className="text-zinc-600 text-sm mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>High conversion • Elite branding • Dominant presence</p>
            </div>
            <div className="absolute top-4 right-4 bg-black px-4 py-2 rounded-lg">
              <span className="text-white uppercase text-sm font-bold">After</span>
            </div>
          </div>

          {/* --- BEFORE SLIDE (Masked on Left, Black BG) --- */}
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="text-center opacity-50 filter blur-[1px]">
              <div className="w-64 h-64 bg-zinc-800 rounded-lg mb-4 mx-auto border border-zinc-700"></div>
              <p className="text-white text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Generic Design</p>
              <p className="text-zinc-500 text-sm mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Low impact • Poor engagement • No brand identity</p>
            </div>
            <div className="absolute top-4 left-4 bg-red-600 px-4 py-2 rounded-lg">
              <span className="text-white uppercase text-sm font-bold">Before</span>
            </div>
          </motion.div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-black">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-black" />
                <div className="w-1 h-4 bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl w-full relative z-10">
        {[
          { value: '+250%', label: 'Engagement', color: '#ff0000' },
          { value: '+180%', label: 'Conversion', color: '#ffffff' },
          { value: '+95%', label: 'Brand Recall', color: '#ffffff' },
          { value: '24/7', label: 'Support', color: '#ffffff' }
        ].map((stat, index) => (
          <div key={index} className="text-center bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-white/60 uppercase text-xs tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}