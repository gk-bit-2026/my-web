// src/app/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import { Navigation } from '@/components/Navigation'; // You likely need to create/update this too
import { HeroSection } from '@/components/HeroSection';
import { KardiaMethodology } from '@/components/KardiaMethodology';
import { ProductVault } from '@/components/ProductVault';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { FooterCTA } from '@/components/FooterCTA';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ImpactSidebar } from '@/components/ImpactSidebar'; // Assuming you have this or need it
import { cn } from '@/lib/utils';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function MainLayout({ isDark, setIsDark, cart, setCart, isSidebarOpen, setIsSidebarOpen }: any) {
  // Add to cart handler
  const addToStrategy = (item: any) => {
    if (!cart.find((i: any) => i.id === item.id)) {
      setCart([...cart, item]);
      setIsSidebarOpen(true);
    }
  };

  const removeFromStrategy = (id: number) => {
    setCart(cart.filter((i: any) => i.id !== id));
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-700 ease-in-out",
      isDark ? "bg-[#050505] text-white" : "bg-white text-zinc-900"
    )}>
      {/* Navigation would go here, passing isDark */}
      {/* <Navigation isDark={isDark} setIsDark={setIsDark} cartCount={cart.length} ... /> */}

      <main>
        <HeroSection isDark={isDark} />
        <KardiaMethodology isDark={isDark} />
        <ProductVault 
          isDark={isDark}
          onAdd={addToStrategy} 
          selectedIds={cart.map((i: any) => i.id)} 
        />
        <BeforeAfterSlider isDark={isDark} />
        <FooterCTA isDark={isDark} />
      </main>

      {/* Sidebar would go here */}
      {/* <ImpactSidebar isOpen={isSidebarOpen} items={cart} onRemove={removeFromStrategy} ... /> */}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // 1. System Preference Detection
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark if unknown
  });

  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. Handle Body Background Color Change
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#050505';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [isDark]);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <Routes>
            <Route path="/" element={
              <MainLayout 
                isDark={isDark} 
                setIsDark={setIsDark}
                cart={cart}
                setCart={setCart}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            } />
            {/* Add other routes like /work or /terminal-x here */}
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}
