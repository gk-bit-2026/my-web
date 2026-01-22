'use client';

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Existing Components
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { KardiaMethodology } from './components/KardiaMethodology';
import { ProductVault } from './components/ProductVault';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { FooterCTA } from './components/FooterCTA';
import { ImpactSidebar } from './components/ImpactSidebar';

// New Page Components
import WorksPage from './pages/WorksPage';
import TestimonialsPage from './pages/TestimonialsPage';

interface Product {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  category: string;
}

// --- HOME PAGE COMPONENT (Your current main layout) ---
const Home = ({ 
  handlePhaseHover, 
  handleAddToStrategy 
}: { 
  handlePhaseHover: (p: number | null) => void, 
  handleAddToStrategy: (p: Product) => void 
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section id="hero" className="relative">
      <HeroSection />
    </section>
    <section id="methodology" className="relative">
      <KardiaMethodology onPhaseHover={handlePhaseHover} />
    </section>
    <section id="services" className="relative">
      <ProductVault onAddToStrategy={handleAddToStrategy} />
    </section>
    <section id="results" className="relative">
      <BeforeAfterSlider />
    </section>
    <section id="contact" className="relative">
      <FooterCTA />
    </section>
  </motion.div>
);

// --- MAIN APP ENTRY ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);
  const [sloganGlow, setSloganGlow] = useState(false);

  const handleAddToStrategy = (product: Product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setIsSidebarOpen(true);
    }
  };

  const handleRemoveProduct = (id: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const handlePhaseHover = (phase: number | null) => {
    if (phase === 1) setSloganGlow(true);
    else setSloganGlow(false);

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
        {/* Navigation - Stays visible across all routes */}
        <Navigation />

        {/* Global White Flash Effect */}
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

        {/* ROUTING ENGINE */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={<Home handlePhaseHover={handlePhaseHover} handleAddToStrategy={handleAddToStrategy} />} 
            />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
          </Routes>
        </AnimatePresence>

        {/* Impact Sidebar - Global State */}
        <ImpactSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedProducts={selectedProducts}
          onRemoveProduct={handleRemoveProduct}
        />

        {/* Fixed Strategy Button */}
        {selectedProducts.length > 0 && !isSidebarOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-lg z-30"
            style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)' }}
          >
            <div className="text-center">
              <div className="text-xs uppercase font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {selectedProducts.length}
              </div>
            </div>
          </motion.button>
        )}
      </div>
    </Router>
  );
}
