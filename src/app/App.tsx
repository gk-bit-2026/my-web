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

/**
 * Ensures page starts at top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [pathname]);
  return null;
}

/**
 * 2. SECRET SHORTCUT HOOK (Type 'gk' to open portal)
 */
function useSecretShortcut() {
  const navigate = useNavigate();
  useEffect(() => {
    let keys = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // We check for 'gk' at the end of the string
      keys += e.key.toLowerCase();
      if (keys.endsWith('silent')) { 
        navigate('/terminal-x');
        keys = ''; // Reset after success
      }
      // Keep memory light
      if (keys.length > 10) keys = keys.slice(-5);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}

/**
 * Handles main UI rendering and route transitions
 */
function AnimatedRoutes({ 
  isDark, setIsDark, addToStrategy, cart, removeFromStrategy, isSidebarOpen, setIsSidebarOpen 
}: any) {
  const location = useLocation();
  useSecretShortcut(); // Listen for the secret command 'gk'

  const isTerminal = location.pathname.includes('terminal-x');

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${
      isDark ? 'bg-[#050505] text-white' : 'bg-white text-zinc-900'
    }`}>
      
      {/* Hide standard UI when inside the Secret Admin Portal */}
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
                <HeroSection {...({ isDark } as any)} />
                <KardiaMethodology {...({ isDark } as any)} />
                <ProductVault 
                  onAdd={addToStrategy} 
                  selectedIds={cart.map((i: any) => i.id)} 
                />
                <BeforeAfterSlider {...({ isDark } as any)} />
                <FooterCTA {...({ isDark } as any)} />
              </PageTransition>
            } />
            
            <Route path="/work" element={
              <PageTransition>
                <WorkPage {...({ isDark } as any)} />
              </PageTransition>
            } />
            
            <Route path="/testimonials" element={
              <PageTransition>
                <TestimonialsPage {...({ isDark } as any)} />
              </PageTransition>
            } />
            
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

/**
 * Root App Component
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync background color with theme state
  useEffect(() => {
    document.documentElement.style.backgroundColor = isDark ? '#050505' : '#ffffff';
  }, [isDark]);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor /> 
      
      {/* 3. ACTIVATE VERCEL ANALYTICS - Placed globally within the Router */}
      <Analytics /> 

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loader" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <AnimatedRoutes 
          isDark={isDark} 
          setIsDark={setIsDark}
          addToStrategy={(i: any) => {
            if (!cart.find(item => item.id === i.id)) {
                setCart([...cart, i]);
            }
            setIsSidebarOpen(true);
          }}
          cart={cart} 
          removeFromStrategy={(id: any) => setCart(cart.filter(c => c.id !== id))}
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </Router>
  );
}
