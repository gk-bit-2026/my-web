import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function Navigation({ isDark, setIsDark, cartCount, openSidebar }: any) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4",
        isScrolled 
          ? (isDark ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-white/80 backdrop-blur-xl border-b border-black/10") 
          : "bg-transparent"
      )}>
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-black tracking-tighter uppercase relative z-[105]">
            GK<span className="text-purple-500">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link to="/work" className="text-xs font-mono uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">Work</Link>
            <Link to="/testimonials" className="text-xs font-mono uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">Echo</Link>
            
            <div className="h-4 w-[1px] bg-current opacity-20" />

            <div className="flex items-center gap-6">
              <button onClick={() => setIsDark(!isDark)} className="hover:rotate-45 transition-transform p-2">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={openSidebar} className="relative p-2 bg-current text-background rounded-full hover:scale-105 transition-transform">
                <ShoppingBag size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
             <button onClick={openSidebar} className="relative p-2">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full" />}
             </button>
             <button onClick={() => setMobileMenu(true)} className="z-[105] p-2">
                <Menu size={24} />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
                "fixed inset-0 z-[200] flex flex-col p-8", 
                isDark ? "bg-[#050505] text-white" : "bg-white text-zinc-900"
            )}
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black italic">GK.</span>
              <div className="flex items-center gap-6">
                <button onClick={() => setIsDark(!isDark)} className="p-2 border border-current rounded-full">
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button onClick={() => setMobileMenu(false)}><X size={32} /></button>
              </div>
            </div>
            
            <div className="flex flex-col gap-8">
              <Link to="/" onClick={() => setMobileMenu(false)} className="text-5xl font-black uppercase italic tracking-tighter">Home</Link>
              <Link to="/work" onClick={() => setMobileMenu(false)} className="text-5xl font-black uppercase italic tracking-tighter">Work</Link>
              <Link to="/testimonials" onClick={() => setMobileMenu(false)} className="text-5xl font-black uppercase italic tracking-tighter">Echo</Link>
            </div>

            <div className="mt-auto pb-8 opacity-50 font-mono text-xs">
              © 2024 GABRIEL KARDIA — ALL RIGHTS RESERVED
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
