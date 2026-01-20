import { motion } from 'framer-motion';
import { useState } from 'react';
import { Activity, Zap, Target, Search } from 'lucide-react';

const phases = [
  {
    id: 1,
    title: "Discovery",
    copy: "Deep dive into your brand DNA and market positioning.",
    color: "#ff3333", 
    icon: <Search className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Strategy",
    copy: "Engineered roadmaps designed for maximum conversion.",
    color: "#ffffff",
    icon: <Target className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Impact",
    copy: "High-fidelity execution with measurable results.",
    color: "#22c55e",
    icon: <Zap className="w-8 h-8" />
  }
];

interface KardiaMethodologyProps {
  onPhaseHover: (phase: number | null) => void;
}

export function KardiaMethodology({ onPhaseHover }: KardiaMethodologyProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [kardiaRotation, setKardiaRotation] = useState(0);

  const handlePhaseInteraction = (phaseId: number | null) => {
    setActivePhase(phaseId);
    onPhaseHover(phaseId);
    if (phaseId === 2) {
      setKardiaRotation(prev => prev + 360);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <motion.div
          animate={{ rotate: kardiaRotation }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center relative"
        >
          <motion.div 
            className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md"
            animate={{ boxShadow: activePhase ? '0 0 40px rgba(255,255,255,0.4)' : 'none' }}
          >
            <span className="text-white text-xs font-bold tracking-tighter">KARDIA</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-8 relative z-20">
        {phases.map((phase) => (
          <motion.div
            key={phase.id}
            onHoverStart={() => handlePhaseInteraction(phase.id)}
            onHoverEnd={() => handlePhaseInteraction(null)}
            className="relative group cursor-pointer"
          >
            <motion.div 
              className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl h-full"
              animate={{
                scale: activePhase === phase.id ? 1.05 : 1,
                borderColor: activePhase === phase.id ? phase.color : 'rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ color: activePhase === phase.id ? phase.color : 'white' }} className="mb-4">
                {phase.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
              <p className="text-zinc-400 text-sm">{phase.copy}</p>
              <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: phase.color }}
                  initial={{ width: 0 }}
                  animate={{ width: activePhase === phase.id ? '100%' : '0%' }}
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
