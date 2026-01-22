import { motion } from 'framer-motion';
import { Quote, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  { id: 1, name: 'Sarah Chen', role: 'CMO', company: 'Aether Intel', quote: "Graphikardia decoded our entire market position. Growth was immediate and sustained.", stat: "+140% ROI" },
  { id: 2, name: 'Marcus Thorne', role: 'Founder', company: 'Pulse Media', quote: "The editing is aggressive, clean, and impossible to scroll past. Elite-tier performance.", stat: "2.4M Views" },
  { id: 3, name: 'Elena Rossi', role: 'Brand Lead', company: 'Vanguard', quote: "They don't just build sites; they build digital empires.", stat: "5.2x Leads" }
];

export default function TestimonialsPage({ isDark }: { isDark: boolean }) {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <Link to="/" className="text-xs font-mono uppercase tracking-widest opacity-50 hover:opacity-100 flex items-center gap-2 mb-8">
          <ArrowUpRight className="rotate-180" size={14} /> Back to Hub
        </Link>
        <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter italic">
          The Echo<span className="text-purple-500">.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div 
            key={r.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-10 rounded-2xl border flex flex-col justify-between min-h-[400px] group transition-all duration-500 hover:-translate-y-2
              ${isDark ? 'bg-zinc-900/50 border-white/10 hover:bg-zinc-900' : 'bg-zinc-50 border-black/5 hover:bg-white hover:shadow-xl'}
            `}
          >
            <div>
              <Quote className="mb-6 opacity-30 w-12 h-12" />
              <p className="text-2xl font-bold leading-tight mb-8">"{r.quote}"</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-cursive text-2xl mb-1" style={{ fontFamily: '"Playwrite NZ", cursive' }}>{r.name}</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">{r.company} / {r.role}</p>
              </div>
              <div className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {r.stat}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
