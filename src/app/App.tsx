import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react"; // 1. IMPORT VERCEL ANALYTICS

// Components
import { Navigation } from './components/Navigation';
import { LoadingScreen } from './components/LoadingScreen';
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

// 2. SECRET SHORTCUT HOOK (Type 'gk' to open portal)
function useSecretShortcut() {
  const navigate = useNavigate();
  useEffect(() => {
    let keys = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      keys += e.key.toLowerCase();
      if (keys.endsWith('gk')) { 
        navigate('/terminal-x');
        keys = '';
      }
      if (keys.length > 8) keys = '';
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}

function AnimatedRoutes({ 
  isDark, setIsDark, addToStrategy, cart, removeFromStrategy, isSidebarOpen, setIsSidebarOpen 
}: any) {
  const location = useLocation();
  useSecretShortcut();

  const isTerminal = location.pathname.includes('terminal-x');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-zinc-900'}`}>
      {/* Hide UI on Terminal Mode */}
      {!isTerminal && (
        <Navigation isDark={isDark} setIsDark={setIsDark} cartCount={cart.length} openSidebar={() => setIsSidebarOpen(true)} />
      )}

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <HeroSection {...({ isDark } as any)} />
                <KardiaMethodology {...({ isDark } as any)} />
                <ProductVault onAdd={addToStrategy} selectedIds={cart.map((i: any) => i.id)} />
                <BeforeAfterSlider {...({ isDark } as any)} />
                <FooterCTA {...({ isDark } as any)} />
              </PageTransition>
            } />
            <Route path="/work" element={<PageTransition><WorkPage {...({ isDark } as any)} /></PageTransition>} />
            <Route path="/testimonials" element={<PageTransition><TestimonialsPage {...({ isDark } as any)} /></PageTransition>} />
            <Route path="/terminal-x" element={<AdminPortal />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isTerminal && (
        <ImpactSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} items={cart} onRemove={removeFromStrategy} />
      )}
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor /> 
      <Analytics /> {/* 3. ACTIVATE VERCEL ANALYTICS */}

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <AnimatedRoutes 
          isDark={isDark} setIsDark={setIsDark}
          addToStrategy={(i: any) => {setCart([...cart, i]); setIsSidebarOpen(true);}}
          cart={cart} removeFromStrategy={(id: any) => setCart(cart.filter(c => c.id !== id))}
          isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </Router>
  );
}
