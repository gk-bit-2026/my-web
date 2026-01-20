import { motion } from 'framer-motion';
import { useState } from 'react';
import { Youtube, Instagram, FileText, Smartphone, TrendingUp, Search } from 'lucide-react';

const products = [
  {
    id: 1,
    category: "Organic",
    title: "Short-Form Content",
    description: "High-retention Reels & TikToks built for virality.",
    metric: "+240% Reach",
    icon: <Smartphone className="w-6 h-6" />
  },
  {
    id: 2,
    category: "Paid",
    title: "Performance Ads",
    description: "Meta and Google campaigns with a focus on ROAS.",
    metric: "4.5x ROAS",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 3,
    category: "Brand",
    title: "Visual Identity",
    description: "Premium design systems for market authority.",
    metric: "Instant Recognition",
    icon: <Instagram className="w-6 h-6" />
  },
  {
    id: 4,
    category: "Growth",
    title: "Funnel Strategy",
    description: "Full-stack conversion rate optimization (CRO).",
    metric: "-30% CAC",
    icon: <Search className="w-6 h-6" />
  }
];

interface Product {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  category: string;
}

interface ProductVaultProps {
  onAddToStrategy: (product: Product) => void;
}

export function ProductVault({ onAddToStrategy }: ProductVaultProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-20 bg-[#fafafa] relative overflow-hidden">
      <div className="text-center mb-16 relative z-10 px-4">
        <h2 className="text-4xl md:text-6xl text-black font-black uppercase tracking-widest mb-4">Product Vault</h2>
        <p className="text-black/60 max-w-2xl mx-auto text-lg">Elite services engineered for impact.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
            className="relative group cursor-pointer"
          >
            <motion.div 
              className="bg-white border-2 border-black/5 p-6 rounded-2xl shadow-xl h-full flex flex-col"
              animate={{ y: hoveredProduct === product.id ? -10 : 0 }}
            >
              <div className="text-xs text-black/40 mb-2 uppercase">{product.category}</div>
              <div className="text-black mb-4">{product.icon}</div>
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-black/70 text-sm mb-6 flex-grow">{product.description}</p>
              
              <motion.div
                animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                className="bg-black text-white p-3 rounded-lg mb-4 text-xs font-bold text-center"
              >
                {product.metric}
              </motion.div>

              <button 
                onClick={() => onAddToStrategy(product)}
                className="w-full py-3 bg-black text-white text-xs font-bold rounded-lg uppercase hover:bg-zinc-800 transition-colors"
              >
                Add to Strategy
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
