'use client';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import WorkPage from './WorkPage'; // Ensure these match your filenames exactly
import TestimonialsPage from './TestimonialsPage';

// Context & Utils
import { ThemeProvider, useTheme } from '../lib/ThemeContext'; 
import { cn } from '../lib/utils';

// Components
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { KardiaMethodology } from './components/KardiaMethodology';
import { ProductVault } from './components/ProductVault';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { FooterCTA } from './components/FooterCTA';
import { LoadingScreen } from './components/LoadingScreen';
import { ImpactSidebar } from './components/ImpactSidebar';

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
    <div className={cn(
      "min-h-screen transition-colors duration-700",
      isDark ? "bg-[#050505] text-white" : "bg-white text-zinc-900"
    )}>
      {/* FIX: Changed onOpenSidebar to openSidebar to match your Navigation.tsx */}
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
      <Router>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <Routes>
              {/* HOME */}
              <Route path="/" element={<MainLayout />} />
              
              {/* WORK */}
              <Route path="/work" element={
                <MainLayout><WorkPage /></MainLayout>
              } />
              
              {/* TESTIMONIALS */}
              <Route path="/testimonials" element={
                <MainLayout><TestimonialsPage /></MainLayout>
              } />
            </Routes>
          )}
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}
