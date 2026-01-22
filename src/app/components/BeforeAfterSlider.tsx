import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export function BeforeAfterSlider({ isDark }: { isDark: boolean }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">The Impact Shift</h2>
        <p className="font-mono text-xs opacity-60 uppercase tracking-widest">Drag to witness the transformation</p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl border border-current/10 select-none">
        {/* BEFORE IMAGE (Background) */}
        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
          <span className="text-zinc-600 text-[10vw] font-black opacity-20 uppercase">Dormant</span>
        </div>

        {/* AFTER IMAGE (Foreground) - Clipped */}
        <div 
          className="absolute inset-0 bg-purple-900 flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <span className="text-white text-[10vw] font-black opacity-40 uppercase tracking-tighter italic">Dominant</span>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
            <ArrowLeftRight size={16} />
          </div>
        </div>

        {/* Invisible Input for Interaction */}
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPosition} 
          onChange={handleDrag}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label="Before and after comparison slider"
        />
      </div>
    </section>
  );
}
