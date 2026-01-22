'use client';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import { LoadingScreen } from './components/LoadingScreen.tsx';
import { Navigation } from './components/Navigation.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { KardiaMethodology } from './components/KardiaMethodology.tsx';
import { ProductVault } from './components/ProductVault.tsx';
import { BeforeAfterSlider } from './components/BeforeAfterSlider.tsx';
import { FooterCTA } from './components/FooterCTA.tsx';
import { ImpactSidebar } from './components/ImpactSidebar.tsx';
import WorkPage from './WorkPage.tsx';
import TestimonialsPage from './TestimonialsPage.tsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);
  
  // GLOBAL STATES
  const [isDark, setIsDark] = useState(true); // Default to Dark
  const [region, setRegion] = useState<'IN' | 'INTL'>('IN');

  const handleAddToStrategy = (product: any) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setIsSidebarOpen(true);
    }
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-black'}`}>
        
        {/* Pass states to Navigation */}
        <Navigation 
          isDark={isDark} 
          setIsDark={setIsDark} 
          region={region} 
          setRegion={setRegion} 
        />

        <Routes>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroSection isDark={isDark} region={region} />
              <KardiaMethodology onPhaseHover={(p) => p === 3 && setShowWhiteFlash(true)} />
              <ProductVault onAddToStrategy={handleAddToStrategy} />
              <BeforeAfterSlider />
              <FooterCTA />
            </motion.div>
          } />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>

        <ImpactSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedProducts={selectedProducts}
          onRemoveProduct={(id) => setSelectedProducts(selectedProducts.filter(p => p.id !== id))}
        />
      </div>
    </Router>
  );
}
