import { motion } from 'framer-motion';
import { useState } from 'react';
import { Target, Zap, Search } from 'lucide-react';

const phases = [
  {
    id: 1,
    title: "Discovery",
    copy: "Mapping your current market position and brand DNA.",
    color: "#ff0000",
    icon: <Search className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Strategy",
    copy: "Developing high-conversion roadmaps and visual systems.",
    color: "#ffffff",
    icon: <Target className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Impact",
    copy: "High-fidelity execution with measurable scale.",
    color: "#22c55e",
    icon: <Zap className="w-8 h-8" />
  }
];

export function KardiaMethodology({ onPhaseHover }: { onPhaseHover: (id: number | null) => void }) {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-black py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
            The Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              onMouseEnter={() => { setActivePhase(phase.id); onPhaseHover(phase.id); }}
              onMouseLeave={() => { setActivePhase(null); onPhaseHover(null); }}
              className="relative p-8 rounded-3xl border border-white/10 bg-zinc-900/30 backdrop-blur-xl cursor-crosshair"
              whileHover={{ y: -10, borderColor: phase.color }}
            >
              <div className="mb-6" style={{ color: phase.color }}>
                {phase.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{phase.copy}</p>
              
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-white"
                initial={{ width: 0 }}
                animate={{ width: activePhase === phase.id ? "100%" : "0%", backgroundColor: phase.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
