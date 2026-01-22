import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * AnimatedRoutes handles the actual routing and triggers 
 * the AnimatePresence based on the location key.
 */
function AnimatedRoutes({ 
  isDark, 
  setIsDark, 
  addToStrategy, 
  cart, 
  removeFromStrategy, 
  isSidebarOpen, 
  setIsSidebarOpen 
}: any) {
  const location = useLocation();

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${
      isDark ? 'bg-[#050505] text-white' : 'bg-white text-zinc-900'
    }`}>
      
      <Navigation 
        isDark={isDark} 
        setIsDark={setIsDark} 
        cartCount={cart.length}
        openSidebar={() => setIsSidebarOpen(true)}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                {/* THE FIX: We use spread and 'as any' here to ensure the 
                   Vercel build bypasses strict IntrinsicAttributes checks.
                */}
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
          </Routes>
        </AnimatePresence>
      </main>

      <ImpactSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        items={cart} 
        onRemove={removeFromStrategy}
      />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Theme Toggler Effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#050505';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#ffffff';
    }
  }, [isDark]);

  const addToStrategy = (item: any) => {
    if (!cart.find((i) => i.id === item.id)) {
      setCart([...cart, item]);
    }
    setIsSidebarOpen(true);
  };

  const removeFromStrategy = (id: number) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor /> 

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
          addToStrategy={addToStrategy}
          cart={cart}
          removeFromStrategy={removeFromStrategy}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </Router>
  );
}
