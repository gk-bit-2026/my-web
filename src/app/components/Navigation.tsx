import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  language: string;
  setLanguage: (val: string) => void;
  cartCount: number;
  openSidebar: () => void;
}

const languages = [
  "English (Global)", "Español", "Français", "Deutsch", "日本語", "中文", "हिन्दी"
];

export function Navigation({ isDark, setIsDark, language, setLanguage, cartCount, openSidebar }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [langMenu, setLangMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', path: '/work' },
    { label: 'Echo', path: '/testimonials' }
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4",
        isScrolled ? "backdrop-blur-xl border-b border-current/5" : "bg-transparent"
      )}>
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-black tracking-tighter uppercase relative z-[105]">
            GK<span className="text-purple-500">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map(link => (
              <Link key={link.label} to={link.path} className="text-xs font-mono uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">
                {link.label}
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-current opacity-20" />

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Language */}
              <div className="relative">
                <button onClick={() => setLangMenu(!langMenu)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-purple-500">
                  <Globe size={14} /> {language.split(' ')[0]}
                </button>
                <AnimatePresence>
                  {langMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className={cn("absolute top-full mt-4 -left-4 p-2 rounded-lg border min-w-[140px] shadow-2xl", isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200")}
                    >
                      {languages.map(l => (
                        <button key={l} onClick={() => { setLanguage(l); setLangMenu(false); }} className="block w-full text-left px-3 py-2 text-[10px] uppercase font-mono hover:bg-current/10 rounded">
                          {l}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme */}
              <button onClick={() => setIsDark(!isDark)} className="hover:rotate-45 transition-transform">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Cart */}
              <button onClick={openSidebar} className="relative p-2 bg-current text-background rounded-full hover:scale-105 transition-transform">
                <ShoppingBag size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileMenu(true)} className="md:hidden z-[105]">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={cn("fixed inset-0 z-[200] flex flex-col p-8", isDark ? "bg-black" : "bg-white")}
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black">MENU</span>
              <button onClick={() => setMobileMenu(false)}><X size={32} /></button>
            </div>

            <div className="flex flex-col gap-8">
              <Link to="/" onClick={() => setMobileMenu(false)} className="text-5xl font-black uppercase italic tracking-tighter">Home</Link>
              {navLinks.map(link => (
                <Link key={link.label} to={link.path} onClick={() => setMobileMenu(false)} className="text-5xl font-black uppercase italic tracking-tighter">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto border-t border-current/10 pt-8 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs uppercase">Appearance</span>
                <button onClick={() => setIsDark(!isDark)} className="p-2 border rounded-full">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs uppercase">Region</span>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent font-bold text-sm outline-none text-right"
                >
                  {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
