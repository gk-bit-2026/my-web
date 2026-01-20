import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { KardiaMethodology } from './components/KardiaMethodology';
import { ProductVault } from './components/ProductVault';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { FooterCTA } from './components/FooterCTA';
import { ImpactSidebar } from './components/ImpactSidebar';

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
    // Phase 1: Red glow on slogan (handled in KardiaMethodology)
    if (phase === 1) {
      setSloganGlow(true);
    } else {
      setSloganGlow(false);
    }

    // Phase 3: White flash
    if (phase === 3) {
      setShowWhiteFlash(true);
      setTimeout(() => setShowWhiteFlash(false), 200);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="relative bg-black min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <Navigation />

        {/* White Flash Effect for Phase 3 */}
        {showWhiteFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
              0deg,
              white 0px,
              white 2px,
              transparent 2px,
              transparent 50px
            ),
            repeating-linear-gradient(
              90deg,
              white 0px,
              white 2px,
              transparent 2px,
              transparent 50px
            )`
            }}
          />
        )}

        {/* Main Content */}
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

        {/* Impact Sidebar */}
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
            style={{
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
            }}
          >
            <div className="text-center">
              <div 
                className="text-xs uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                {selectedProducts.length}
              </div>
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
}