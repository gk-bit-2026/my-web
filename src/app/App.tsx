import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components - Pointing to @/ (which is src/app/)
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { KardiaMethodology } from '@/components/KardiaMethodology';
import { ProductVault } from '@/components/ProductVault';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { FooterCTA } from '@/components/FooterCTA';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ImpactSidebar } from '@/components/ImpactSidebar';
import { cn } from '@/lib/utils'; // This assumes lib is also inside src/app/

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// 1. Defining the Layout Interface to clear TS2322 errors
interface MainLayoutProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  cart: any[];
  setCart: (val: any[]) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}

function MainLayout({ 
  isDark, 
  setIsDark, 
  cart, 
  setCart, 
  isSidebarOpen, 
  setIsSidebarOpen 
}: MainLayoutProps) {
  
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
      <Navigation 
        isDark={isDark} 
        setIsDark={setIsDark} 
        cartCount={cart.length} 
        onOpenSidebar={() => setIsSidebarOpen(true)} 
      />

      <main>
        {/* These components MUST have isDark in their props definition */}
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

      <ImpactSidebar 
        isOpen={isSidebarOpen} 
        items={cart} 
        onRemove={removeFromStrategy} 
        onClose={() => setIsSidebarOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // 2. FORCED LIGHT MODE: Defaulting to false instead of system detection
  const [isDark, setIsDark] = useState(false);

  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 3. Body style sync
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
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}
