import { motion } from 'framer-motion';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Original Content Preserved
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
        <h2 className="text-[10vw] leading-[0.8] font-black uppercase tracking-tighter mb-20 italic opacity-20">
          The Vault<span className="text-purple-500">_</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {products.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-50px" }}
                className={cn(
                  "group relative p-8 md:p-12 border border-current/10 flex flex-col justify-between min-h-[450px] transition-all duration-500",
                  isSelected ? "bg-current/5" : "hover:bg-current/5"
                )}
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 mb-8 block">{p.category}</span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase italic mb-8 tracking-tighter">{p.title}</h3>
                  <ul className="space-y-3 mb-8">
                    {p.points.map(pt => (
                      <li key={pt} className="flex items-center gap-3 font-mono text-[10px] md:text-xs uppercase tracking-wide opacity-70 group-hover:opacity-100">
                        <ArrowRight size={12} className="text-purple-500" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => onAdd(p)}
                  disabled={isSelected}
                  className={cn(
                    "w-full py-4 border border-current uppercase font-black tracking-widest text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02]",
                    isSelected ? "bg-green-500 border-green-500 text-white" : "hover:bg-current hover:text-background"
                  )}
                >
                  {isSelected ? <><Check size={16} /> Added to Strategy</> : <><Plus size={16} /> Initialize</>}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
