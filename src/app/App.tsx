import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";

// Components
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { KardiaMethodology } from './components/KardiaMethodology';
import { ProductVault } from './components/ProductVault';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { FooterCTA } from './components/FooterCTA';
import { ImpactSidebar } from './components/ImpactSidebar';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition'; 
import WorkPage from './WorkPage';
import TestimonialsPage from './TestimonialsPage';
import AdminPortal from './AdminPortal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes({ 
  isDark, setIsDark, addToStrategy, cart, removeFromStrategy, isSidebarOpen, setIsSidebarOpen 
}: any) {
  const location = useLocation();
  const isTerminal = location.pathname.includes('terminal-x');

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${
      isDark ? 'bg-[#050505] text-white' : 'bg-white text-zinc-900'
    }`}>
      {!isTerminal && (
        <Navigation 
          isDark={isDark} 
          setIsDark={setIsDark} 
          cartCount={cart.length} 
          openSidebar={() => setIsSidebarOpen(true)} 
        />
      )}

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <HeroSection isDark={isDark} />
                <KardiaMethodology isDark={isDark} />
                <ProductVault 
                  onAdd={addToStrategy} 
                  selectedIds={cart.map((i: any) => i.id)} 
                />
                <BeforeAfterSlider isDark={isDark} />
                <FooterCTA isDark={isDark} />
              </PageTransition>
            } />
            <Route path="/work" element={<PageTransition><WorkPage isDark={isDark} /></PageTransition>} />
            <Route path="/testimonials" element={<PageTransition><TestimonialsPage isDark={isDark} /></PageTransition>} />
            <Route path="/terminal-x" element={<AdminPortal />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isTerminal && (
        <ImpactSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          items={cart} 
          onRemove={removeFromStrategy} 
        />
      )}
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const themeColor = isDark ? '#050505' : '#ffffff';
    document.documentElement.style.backgroundColor = themeColor;
    
    // Mobile Status Bar Color
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }
    metaTheme.setAttribute('content', themeColor);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor /> 
      <Analytics /> 
      <AnimatedRoutes 
        isDark={isDark} setIsDark={setIsDark}
        cart={cart} setCart={setCart}
        isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
        addToStrategy={(i: any) => {
          if (!cart.find(item => item.id === i.id)) setCart([...cart, i]);
          setIsSidebarOpen(true);
        }}
        removeFromStrategy={(id: any) => setCart(cart.filter(c => c.id !== id))}
      />
    </Router>
  );
}
