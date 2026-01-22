import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Added this
import logoBlack from '@/assets/logo1.png';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // To detect which page we are on

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // UPDATED: Added real paths for the new pages
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Methodology', href: '/#methodology' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-black/10 shadow-lg' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - Uses Link instead of a */}
        <Link to="/" className="flex items-center gap-3">
          <motion.img 
            src={logoBlack} 
            alt="Graphikardia" 
            className="h-10 w-auto"
            animate={{ filter: isScrolled ? 'brightness(1)' : 'brightness(1.1)' }}
          />
          <motion.span
            className="text-black text-xl hidden sm:block"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '0.05em' }}
          >
            GRAPHIKARDIA
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`relative uppercase text-sm font-semibold tracking-widest transition-colors group ${
                location.pathname === item.href ? 'text-black' : 'text-black/50 hover:text-black'
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.label}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-black"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
              />
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-black">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-black/70 hover:text-black uppercase text-sm py-4 px-4 font-bold tracking-tighter"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
