'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext'; 
import { cn } from '../lib/utils';

const works = [
  { id: 1, title: 'Luxury Automotive', cat: 'Reels / Production', size: 'lg', img: '/work1.jpg' },
  { id: 2, title: 'Fintech Identity', cat: 'Branding / UI', size: 'sm', img: '/work2.jpg' },
  { id: 3, title: 'SaaS Data Viz', cat: 'Development', size: 'sm', img: '/work3.jpg' },
  { id: 4, title: 'Viral Campaign', cat: 'Strategy', size: 'md', img: '/work4.jpg' },
  { id: 5, title: 'E-com Evolution', cat: 'Architecture', size: 'sm', img: '/work5.jpg' }
];

export default function WorkPage() {
  const { isDark } = useTheme(); 

  return (
    <div className={cn(
      "pt-32 pb-20 px-6 max-w-[1800px] mx-auto min-h-screen",
      isDark ? "bg-[#050505]" : "bg-white"
    )}>
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter italic">
            Sel_Work<span className="text-purple-600">.</span>
          </h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.5em] opacity-30">Archive_v2.06</p>
        </motion.div>
        
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 max-w-xs text-right leading-relaxed hidden md:block">
          High-performance digital assets engineered for market dominance and visual impact.
        </p>
      </header>

      {/* Grid: 4 columns on large screens, auto-rows set to 400px for consistency */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[450px]">
        {works.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className={cn(
              "relative group overflow-hidden rounded-2xl bg-zinc-900 cursor-none",
              item.size === 'lg' ? 'md:col-span-2 md:row-span-2' : '',
              item.size === 'md' ? 'md:col-span-2' : ''
            )}
          >
            {/* Background Layer */}
            <div className={cn(
              "absolute inset-0 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1",
              i % 2 === 0 ? "bg-gradient-to-br from-purple-900/40 to-black" : "bg-gradient-to-br from-blue-900/40 to-black"
            )} />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
            
            {/* Content Container */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-400 mb-3 block">
                  [{item.cat}]
                </span>
                <div className="flex justify-between items-end">
                  <h3 className="text-4xl font-black uppercase text-white italic tracking-tighter leading-none max-w-[80%]">
                    {item.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
