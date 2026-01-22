'use client';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Explicit Relative Paths (Fixed for your directory structure)
import { LoadingScreen } from './components/LoadingScreen.tsx';
import { Navigation } from './components/Navigation.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { KardiaMethodology } from './components/KardiaMethodology.tsx';
import { ProductVault } from './components/ProductVault.tsx';
import { BeforeAfterSlider } from './components/BeforeAfterSlider.tsx';
import { FooterCTA } from './components/FooterCTA.tsx';
import { ImpactSidebar } from './components/ImpactSidebar.tsx';

// Page Components
import WorkPage from './WorkPage.tsx';
import TestimonialsPage from './TestimonialsPage.tsx';

interface Product {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  category: string;
}

const Home = ({ 
  handlePhaseHover, 
  handleAddToStrategy 
}: { 
  handlePhaseHover: (p: number | null) => void, 
  handleAddToStrategy: (p: Product) => void 
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section id="hero" className="relative"><HeroSection /></section>
    <section id="methodology" className="relative"><KardiaMethodology onPhaseHover={handlePhaseHover} /></section>
    <section id="services" className="relative"><ProductVault onAddToStrategy={handleAddToStrategy} /></section>
    <section id="results" className="relative"><BeforeAfterSlider /></section>
    <section id="contact" className="relative"><FooterCTA /></section>
  </motion.div>
);

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

        <AnimatePresence>
          {showWhiteFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(0deg, white 0px, white 2px, transparent 2px, transparent 50px),
                            repeating-linear-gradient(90deg, white 0px, white 2px, transparent 2px, transparent 50px)`
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home handlePhaseHover={handlePhaseHover} handleAddToStrategy={handleAddToStrategy} />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
          </Routes>
        </AnimatePresence>

        <ImpactSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedProducts={selectedProducts}
          onRemoveProduct={(id) => setSelectedProducts(selectedProducts.filter(p => p.id !== id))}
        />

        {selectedProducts.length > 0 && !isSidebarOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-lg z-30 font-bold"
          >
            {selectedProducts.length}
          </motion.button>
        )}
      </div>
    </Router>
  );
}
