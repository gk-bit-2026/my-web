'use client';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Global Components (Using your @ alias)
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { ImpactSidebar } from '@/components/ImpactSidebar';

// Sections for Home Page
import { HeroSection } from '@/components/HeroSection';
import { KardiaMethodology } from '@/components/KardiaMethodology';
import { ProductVault } from '@/components/ProductVault';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { FooterCTA } from '@/components/FooterCTA';

// New Pages
import TestimonialsPage from './TestimonialsPage';
import WorkPage from './WorkPage';

interface Product {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  category: string;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);

  const handleAddToStrategy = (product: Product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setIsSidebarOpen(true);
    }
  };

  const handlePhaseHover = (phase: number | null) => {
    if (phase === 3) {
      setShowWhiteFlash(true);
      setTimeout(() => setShowWhiteFlash(false), 200);
    }
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="relative bg-black min-h-screen overflow-x-hidden">
        <Navigation />

        {/* Global White Flash Effect */}
        <AnimatePresence>
          {showWhiteFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] pointer-events-none"
              style={{
                background: `repeating-linear-gradient(0deg, white 0px, white 2px, transparent 2px, transparent 50px),
                             repeating-linear-gradient(90deg, white 0px, white 2px, transparent 2px, transparent 50px)`
              }}
            />
          )}
        </AnimatePresence>

        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroSection />
              <KardiaMethodology onPhaseHover={handlePhaseHover} />
              <ProductVault onAddToStrategy={handleAddToStrategy} />
              <BeforeAfterSlider />
              <FooterCTA />
            </motion.div>
          } />

          {/* Dedicated Pages */}
          <Route path="/work" element={<WorkPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>

        <ImpactSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedProducts={selectedProducts}
          onRemoveProduct={(id) => setSelectedProducts(prev => prev.filter(p => p.id !== id))}
        />
      </div>
    </Router>
  );
}
