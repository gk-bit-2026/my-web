import { motion } from 'framer-motion';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Full Service Catalog
const products = [
  {
    id: 1,
    title: "YouTube Dominance",
    category: "Video Strategy",
    points: ["High CTR Thumbnails", "Retention-Based Editing", "A/B Hook Testing", "SEO Metadata"]
  },
  {
    id: 2,
    title: "Viral Ecosystem",
    category: "Social Media",
    points: ["Aggressive Reel Editing", "Trending Audio Mapping", "Multi-Platform Sync", "Color Grading"]
  },
  {
    id: 3,
    title: "Content Engine",
    category: "Strategy",
    points: ["SEO-First Blogs", "Thought Leadership", "Content Calendars", "Newsletter Funnels"]
  },
  {
    id: 4,
    title: "Digital Real Estate",
    category: "Development",
    points: ["Brutalist UI/UX", "Conversion Landing Pages", "Next.js Performance", "Mobile-First Arch"]
  },
  {
    id: 5,
    title: "Brand Nucleus",
    category: "Identity",
    points: ["Visual Systems", "Narrative Positioning", "Motion Guidelines", "Competitor Audit"]
  },
  {
    id: 6,
    title: "Visibility Matrix",
    category: "Growth",
    points: ["Keyword Dominance", "Backlink Acquisition", "Technical SEO", "Local Authority"]
  }
];

export function ProductVault({ onAdd, selectedIds }: { onAdd: (item: any) => void, selectedIds: number[] }) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <motion.h2 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 0.2 }}
            transition={{ duration: 1 }}
            className="text-[10vw] leading-[0.8] font-black uppercase tracking-tighter italic"
          >
            The Vault<span className="text-purple-500">_</span>
          </motion.h2>
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] mt-4 opacity-50">
            Select modules to build your custom strategy
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-current/10">
          {products.map((p, index) => {
            const isSelected = selectedIds.includes(p.id);
            
            return (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative p-8 md:p-12 bg-background flex flex-col justify-between min-h-[500px] transition-all duration-700 overflow-hidden",
                  isSelected ? "ring-1 ring-inset ring-green-500" : "hover:bg-current/[0.02]"
                )}
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-[60px] font-black italic pointer-events-none">
                  0{p.id}
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-500 mb-8 block">
                    [{p.category}]
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-8 tracking-tighter leading-none">
                    {p.title}
                  </h3>
                  
                  <ul className="space-y-4 mb-8">
                    {p.points.map(pt => (
                      <li key={pt} className="flex items-start gap-3 font-mono text-[11px] uppercase tracking-wide opacity-60 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={14} className="text-purple-500 shrink-0 mt-0.5" /> 
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <button 
                    onClick={() => onAdd(p)}
                    disabled={isSelected}
                    className={cn(
                      "w-full py-5 border uppercase font-black tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all duration-300",
                      isSelected 
                        ? "bg-green-500 border-green-500 text-white cursor-default" 
                        : "border-current hover:bg-current hover:text-background"
                    )}
                  >
                    {isSelected ? (
                      <><Check size={16} /> Strategy Initialized</>
                    ) : (
                      <><Plus size={16} /> Deploy Module</>
                    )}
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                   <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
