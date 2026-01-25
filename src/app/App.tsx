'use client';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages & Components
import WorkPage from './WorkPage';
import TestimonialsPage from './TestimonialsPage';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { KardiaMethodology } from './components/KardiaMethodology';
import { ProductVault } from './components/ProductVault';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { FooterCTA } from './components/FooterCTA';
import { LoadingScreen } from './components/LoadingScreen';
import { ImpactSidebar } from './components/ImpactSidebar';
import { CustomCursor } from './components/CustomCursor';

// Context
import { ThemeProvider, useTheme } from '../lib/ThemeContext'; 
import { cn } from '../lib/utils';

// CRITICAL: This component syncs isDark to the HTML class for CSS variables to work
function ThemeGate({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  return <div className={cn(isDark ? "dark" : "light")}>{children}</div>;
}

function MainLayout({ children }: { children?: React.ReactNode }) {
  const { isDark } = useTheme();
  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addToStrategy = (item: any) => {
    if (!cart.find((i: any) => i.id === item.id)) {
      setCart([...cart, item]);
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation cartCount={cart.length} openSidebar={() => setIsSidebarOpen(true)} />
      
      <main>
        {children || (
          <>
            <HeroSection />
            <KardiaMethodology />
            <ProductVault onAdd={addToStrategy} selectedIds={cart.map((i: any) => i.id)} />
            <BeforeAfterSlider />
          </>
        )}
      </main>

      <FooterCTA />
      
      <ImpactSidebar 
        isOpen={isSidebarOpen} 
        items={cart} 
        onRemove={(id) => setCart(cart.filter(i => i.id !== id))} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <ThemeGate>
        <CustomCursor /> {/* CURSOR INJECTED GLOBALLY */}
        <Router>
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
            ) : (
              <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/work" element={<MainLayout><WorkPage /></MainLayout>} />
                <Route path="/testimonials" element={<MainLayout><TestimonialsPage /></MainLayout>} />
              </Routes>
            )}
          </AnimatePresence>
        </Router>
      </ThemeGate>
    </ThemeProvider>
  );
}
