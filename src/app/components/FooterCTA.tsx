import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FooterCTA({ isDark }: { isDark: boolean }) {
  return (
    <footer className="py-40 px-6 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10vw] md:text-[6rem] leading-[0.8] font-black uppercase tracking-tighter italic mb-12"
        >
          Ready to be<br/><span className="text-purple-600">Inevitable?</span>
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-0 max-w-lg mx-auto border-2 border-current p-1">
          <input 
            type="text" 
            placeholder="BRAND URL" 
            className="flex-1 bg-transparent p-4 outline-none font-mono text-sm uppercase placeholder:text-current/40"
          />
          <button className="bg-current text-background px-8 py-4 font-black uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center justify-center gap-2">
            Audit Me <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center opacity-40 font-mono text-[10px] uppercase tracking-widest">
          <span>&copy; 2026 Graphikardia</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-500">Instagram</a>
            <a href="#" className="hover:text-purple-500">LinkedIn</a>
            <a href="#" className="hover:text-purple-500">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
