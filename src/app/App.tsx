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
import WorkPage from './WorkPage';
import TestimonialsPage from './TestimonialsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true); // Default Dark Mode
  const [language, setLanguage] = useState('English (Global)');
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
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`min-h-screen transition-colors duration-700 ease-in-out ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-zinc-900'}`}>
        
        <Navigation 
          isDark={isDark} 
          setIsDark={setIsDark} 
          language={language}
          setLanguage={setLanguage}
          cartCount={cart.length}
          openSidebar={() => setIsSidebarOpen(true)}
        />

        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection isDark={isDark} />
                <KardiaMethodology isDark={isDark} />
                <ProductVault onAdd={addToStrategy} selectedIds={cart.map(i => i.id)} />
                <BeforeAfterSlider isDark={isDark} />
                <FooterCTA isDark={isDark} />
              </>
            } />
            <Route path="/work" element={<WorkPage isDark={isDark} />} />
            <Route path="/testimonials" element={<TestimonialsPage isDark={isDark} />} />
          </Routes>
        </main>

        <ImpactSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          items={cart} 
          onRemove={removeFromStrategy}
        />
        
      </div>
    </Router>
  );
}
