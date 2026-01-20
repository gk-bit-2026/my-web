import { motion } from 'motion/react';
import { useState } from 'react';
import { Activity, Zap, Target } from 'lucide-react';

interface Phase {
  id: number;
  title: string;
  subtitle: string;
  copy: string;
  icon: React.ReactNode;
  color: string;
}

const phases: Phase[] = [
  {
    id: 1,
    title: 'AUDIT',
    subtitle: 'The Pulse Check',
    copy: "We strip away the noise to find your brand's true baseline. No fluff, just raw data.",
    icon: <Activity className="w-12 h-12" />,
    color: '#ff0000'
  },
  {
    id: 2,
    title: 'SYNTHESIS',
    subtitle: 'The Surge',
    copy: 'We inject elite creative into your strategy. This is where visuals meet conversion.',
    icon: <Zap className="w-12 h-12" />,
    color: '#ffffff'
  },
  {
    id: 3,
    title: 'IMPACT',
    subtitle: 'The Voice',
    copy: "The result is a powerhouse brand that doesn't just look good—it dominates.",
    icon: <Target className="w-12 h-12" />,
    color: '#ffffff'
  }
];

interface KardiaMethodologyProps {
  onPhaseHover: (phase: number | null) => void;
}

export function KardiaMethodology({ onPhaseHover }: KardiaMethodologyProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [kardiaRotation, setKardiaRotation] = useState(0);

  const handlePhaseHover = (phaseId: number | null) => {
    setActivePhase(phaseId);
    onPhaseHover(phaseId);
    if (phaseId === 2) {
      setKardiaRotation(360);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Energy Orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full blur-3xl"
          style={{
            background: i === 0 ? 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      <motion.h2 
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl text-white mb-4 text-center uppercase relative z-10"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.1em'
        }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 20px rgba(255,255,255,0)',
              '0 0 20px rgba(255,255,255,0.3)',
              '0 0 20px rgba(255,255,255,0)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          The 'Kardia' Methodology
        </motion.span>
      </motion.h2>

      <motion.p 
        className="text-white/60 mb-16 text-center max-w-2xl relative z-10" 
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        The Interactive Engine
      </motion.p>

      {/* Central Kardia Circle - Enhanced */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <motion.div
          animate={{ rotate: kardiaRotation }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={() => activePhase !== 2 && setKardiaRotation(0)}
          className="w-32 h-32 border-4 border-white/20 rounded-full flex items-center justify-center relative"
        >
          {/* Pulsing rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-white/10 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            />
          ))}
          
          <motion.div 
            className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm relative overflow-hidden"
            animate={{
              boxShadow: activePhase ? [
                '0 0 20px rgba(255,255,255,0.3)',
                '0 0 40px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.3)'
              ] : 'none'
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white text-xl relative z-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              KARDIA
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-8 relative z-20">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 60, rotateY: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true }}
            onHoverStart={() => handlePhaseHover(phase.id)}
            onHoverEnd={() => handlePhaseHover(null)}
            className="relative group cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl transition-all duration-500 h-full"
              whileHover={{
                scale: 1.05,
                borderColor: phase.color,
                backgroundColor: 'rgba(255,255,255,0.08)',
                boxShadow: phase.id === 1 
                  ? '0 20px 60px rgba(255,0,0,0.3)' 
                  : '0 20px 60px rgba(255,255,255,0.1)',
                y: -10
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Phase Number - Enhanced */}
              <motion.div 
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{
                  backgroundColor: activePhase === phase.id ? phase.color : 'transparent',
                  borderColor: phase.color,
                }}
                animate={{
                  scale: activePhase === phase.id ? [1, 1.2, 1] : 1,
                  boxShadow: activePhase === phase.id && phase.id === 1
                    ? ['0 0 0px rgba(255,0,0,0)', '0 0 30px rgba(255,0,0,0.8)', '0 0 0px rgba(255,0,0,0)']
                    : 'none'
                }}
                transition={{ duration: 0.6, repeat: activePhase === phase.id ? Infinity : 0 }}
              >
                <span className="text-white text-xl" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
                  {phase.id}
                </span>
              </motion.div>

              {/* Icon - Enhanced Animation */}
              <motion.div 
                className="mb-4 transition-all duration-300"
                style={{ 
                  color: activePhase === phase.id ? phase.color : '#ffffff',
                }}
                animate={{
                  scale: activePhase === phase.id ? [1, 1.15, 1] : 1,
                  rotate: activePhase === phase.id ? [0, 5, -5, 0] : 0,
                  textShadow: activePhase === phase.id && phase.id === 1 
                    ? '0 0 20px rgba(255, 0, 0, 0.8)' 
                    : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                {phase.icon}
              </motion.div>

              {/* Title */}
              <motion.h3 
                className="text-2xl mb-2 uppercase"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  color: activePhase === phase.id ? phase.color : '#ffffff',
                  letterSpacing: '0.1em',
                }}
                animate={{
                  x: activePhase === phase.id ? [0, 5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
              >
                {phase.title}
              </motion.h3>

              {/* Subtitle */}
              <p 
                className="text-white/60 mb-4 text-sm uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}
              >
                {phase.subtitle}
              </p>

              {/* Copy */}
              <motion.p 
                className="text-white/80"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                animate={{
                  color: activePhase === phase.id ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)'
                }}
              >
                {phase.copy}
              </motion.p>

              {/* Progress Bar - Enhanced */}
              <motion.div 
                className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ backgroundColor: phase.color }}
                  initial={{ width: 0 }}
                  animate={{ width: activePhase === phase.id ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Glowing edge */}
                  {activePhase === phase.id && (
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-4"
                      style={{
                        background: `linear-gradient(to left, ${phase.color}, transparent)`,
                        filter: 'blur(4px)'
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* White Grid Flash Effect for Phase 3 */}
              {activePhase === phase.id && phase.id === 3 && (
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.5 }}
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}