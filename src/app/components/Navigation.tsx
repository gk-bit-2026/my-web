import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoBlack from 'https://raw.githubusercontent.com/gk-bit-2026/my-web/0c69840730966728c32a1e2598807aac53999334/src/assets/logo-1';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Services', href: '#services' },
    { label: 'Results', href: '#results' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-black/10 shadow-lg' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo with Creative Animation */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <motion.img 
            src={logoBlack} 
            alt="Graphikardia" 
            className="h-10 w-auto"
            animate={{ 
              filter: isScrolled ? 'brightness(1)' : 'brightness(1.1)' 
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="text-black text-xl hidden sm:block"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: '0.05em' }}
            animate={{ opacity: isScrolled ? 1 : 0.8 }}
          >
            GRAPHIKARDIA
          </motion.span>
        </motion.a>

        {/* Desktop Navigation with Staggered Reveal */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                transition: { duration: 0.2 }
              }}
              className="relative text-black/70 hover:text-black transition-colors uppercase text-sm group"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em', fontWeight: 600 }}
            >
              {item.label}
              {/* Animated Underline */}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-black"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button with Creative Animation */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-black relative"
          whileTap={{ scale: 0.9, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu with Slide Animation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden bg-white/98 backdrop-blur-lg border-t border-black/10"
        >
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileTap={{ scale: 0.95, x: 5 }}
                className="block text-black/70 hover:text-black transition-colors uppercase text-sm py-3 px-4 hover:bg-black/5 rounded-lg"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em', fontWeight: 600 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
