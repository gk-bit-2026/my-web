'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../../lib/ThemeContext';
import { cn } from '../../lib/utils';

const steps = [
  { id: '01', title: 'Deconstruction', desc: 'We strip your brand to its core logic, identifying every friction point holding back your revenue.' },
  { id: '02', title: 'Narrative Sync', desc: 'We align your visual output with the psychological triggers of your ideal high-ticket client.' },
  { id: '03', title: 'Kinetic Launch', desc: 'Deploying high-velocity assets across the digital matrix to trigger immediate growth.' }
];

export function KardiaMethodology() {
  const { isDark } = useTheme();

  return (
    <section className={cn(
      "py-32 px-6 border-t transition-colors duration-500",
      isDark ? "border-white/10" : "border-black/5"
    )}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-mono uppercase tracking-[0.5em] mb-20 opacity-50">The Methodology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className={cn(
                "text-[5rem] font-black leading-none transition-all duration-500 mb-6",
                isDark ? "opacity-10 text-white" : "opacity-10 text-black",
                "group-hover:opacity-100 group-hover:text-purple-600"
              )}>
                {step.id}
              </div>
              <h3 className="text-3xl font-bold uppercase italic tracking-tighter mb-4">{step.title}</h3>
              <p className="text-sm leading-loose opacity-70 font-mono uppercase tracking-wide">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
