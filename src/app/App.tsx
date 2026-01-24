import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";

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
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [pathname]);
  return null;
}

function useSecretShortcut() {
  const navigate = useNavigate();
  useEffect(() => {
    let keys = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      keys += e.key.toLowerCase();
      if (keys.endsWith('silent')) { 
        navigate('/terminal-x');
        keys = ''; 
      }
      if (keys.length > 10) keys = keys.slice(-6);
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
            
            <Route path="/work" element={
              <PageTransition>
                <WorkPage isDark={isDark} />
              </PageTransition>
            } />
            
            <Route path="/testimonials" element={
              <PageTransition>
                <TestimonialsPage isDark={isDark} />
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false); // DEFAULT TO LIGHT MODE
  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.backgroundColor = isDark ? '#050505' : '#ffffff';
    // Update data-theme or class for Tailwind if needed
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
