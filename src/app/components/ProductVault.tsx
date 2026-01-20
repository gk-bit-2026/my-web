import { motion } from 'motion/react';
import { useState } from 'react';
import { Youtube, Instagram, FileText, Smartphone, TrendingUp, Search } from 'lucide-react';

// ... (Product interface and data remain same)

export function ProductVault({ onAddToStrategy }: ProductVaultProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-20 bg-[#FFF8E7] relative overflow-hidden">
      {/* Background Orbs & Pattern (Same as your original code) */}
      
      {/* Header Section */}
      <motion.div className="text-center mb-16 relative z-10 px-4">
        <h2 className="text-4xl md:text-6xl text-black font-bold uppercase tracking-widest mb-4">
          The Product Vault
        </h2>
        <p className="text-black/60 max-w-2xl mx-auto text-lg">
          Elite services engineered for impact. Swipe or hover to see metrics.
        </p>
      </motion.div>

      {/* TRANSFORMED CONTAINER:
          Mobile: flex-row, horizontal scroll, snapping.
          Desktop (md): standard grid.
      */}
      <div className="
        flex md:grid 
        overflow-x-auto md:overflow-visible 
        snap-x snap-mandatory md:snap-none
        scrollbar-hide
        grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
        gap-6 max-w-7xl mx-auto relative z-10 
        px-6 pb-12 -mx-2
      ">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            // Mobile: 85% width to show 'overflow' | Desktop: auto width
            className="min-w-[85vw] md:min-w-0 snap-center relative group cursor-pointer h-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            
            // HYBRID INTERACTION
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
            onTouchStart={() => setHoveredProduct(product.id)}
            // Auto-hide metric after 3s on touch so it doesn't stay stuck
            onTouchEnd={() => setTimeout(() => setHoveredProduct(null), 3000)} 
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border-2 border-black/10 p-6 rounded-2xl h-full flex flex-col shadow-lg"
              animate={{ 
                scale: hoveredProduct === product.id ? 1.02 : 1,
                y: hoveredProduct === product.id ? -5 : 0 
              }}
            >
              {/* Category & Icon */}
              <div className="text-xs text-black/40 mb-3 uppercase tracking-tighter">{product.category}</div>
              <div className="text-black mb-4">{product.icon}</div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-black/70 text-sm mb-6 flex-grow">{product.description}</p>

              {/* HIDDEN METRIC: Slides up on Interaction */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredProduct === product.id ? 1 : 0,
                  height: hoveredProduct === product.id ? 'auto' : 0
                }}
                className="overflow-hidden"
              >
                <div className="bg-black text-white px-4 py-3 rounded-lg mb-4 text-sm font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> {product.metric}
                </div>
              </motion.div>

              {/* Action Button */}
              <motion.button
                onClick={() => onAddToStrategy(product)}
                className="w-full py-3 bg-black text-white uppercase text-xs font-bold rounded-lg"
                whileTap={{ scale: 0.95 }}
              >
                Add to Strategy
              </motion.button>
            </motion.div>

            {/* Floating Index Number */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
              {product.id}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
