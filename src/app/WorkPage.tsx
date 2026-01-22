import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const works = [
  { id: 1, title: 'Luxury Automotive', cat: 'Reels / Production', size: 'lg', img: '/work1.jpg' },
  { id: 2, title: 'Fintech Identity', cat: 'Branding / UI', size: 'sm', img: '/work2.jpg' },
  { id: 3, title: 'SaaS Data Viz', cat: 'Development', size: 'sm', img: '/work3.jpg' },
  { id: 4, title: 'Viral Campaign', cat: 'Strategy', size: 'md', img: '/work4.jpg' }
];

export default function WorkPage({ isDark }: { isDark: boolean }) {
  return (
    <div className="pt-32 pb-20 px-6 max-w-[1800px] mx-auto">
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter">
            Sel_Work<span className="text-purple-600">.</span>
          </h1>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-60 max-w-xs text-right hidden md:block">
          Curated digital assets designed for maximum market penetration.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[400px]">
        {works.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`relative group overflow-hidden rounded-xl bg-zinc-800
              ${item.size === 'lg' ? 'md:col-span-2 md:row-span-2' : ''}
              ${item.size === 'md' ? 'md:col-span-2' : ''}
            `}
          >
            {/* Placeholder for Image - Replace src with actual assets */}
            <div className={`w-full h-full bg-gradient-to-br transition-all duration-700 group-hover:scale-105
              ${i % 2 === 0 ? 'from-purple-900 to-black' : 'from-blue-900 to-black'}
            `} />
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-2 block">{item.cat}</span>
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold uppercase text-white italic tracking-tighter">{item.title}</h3>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
