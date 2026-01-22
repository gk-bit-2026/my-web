'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoBlack from '@/assets/logo1.png';

interface NavProps {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  region: 'IN' | 'INTL';
  setRegion: (v: 'IN' | 'INTL') => void;
}

export function Navigation({ isDark, setIsDark, region, setRegion }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '/work' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? (isDark ? 'bg-zinc-950/90 border-b border-white/10' : 'bg-white/90 border-b border-black/10') 
          : 'bg-transparent'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoBlack} alt="Graphikardia" className={`h-8 w-auto ${isDark ? 'invert' : ''}`} />
          <span className="font-black text-lg tracking-tighter hidden sm:block">GRAPHIKARDIA</span>
        </Link>

        {/* Desktop Controls & Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.href} 
              className={`text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-100 transition-opacity ${location.pathname === item.href ? 'opacity-100' : 'opacity-50'}`}
            >
              {item.label}
            </Link>
          ))}

          <div className="h-4 w-[1px] bg-current opacity-20" />

          {/* TOGGLES */}
          <div className="flex items-center gap-4 bg-current/5 px-3 py-1.5 rounded-full">
            <button onClick={() => setRegion(region === 'IN' ? 'INTL' : 'IN')} className="flex items-center gap-2 text-[9px] font-bold uppercase">
              <Globe size={12} /> {region}
            </button>
            <button onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.nav>
  );
}
