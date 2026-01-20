import { motion } from 'motion/react';
import { useState } from 'react';
import { Youtube, Instagram, FileText, Smartphone, TrendingUp, Search } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'YouTube Thumbnails',
    description: 'Eye-catching thumbnails designed to maximize clicks and views.',
    metric: 'Targeting +15% CTR',
    icon: <Youtube className="w-8 h-8" />,
    category: 'Video Marketing'
  },
  {
    id: 2,
    title: 'Instagram Reels',
    description: 'Viral-ready reels that drive engagement and build community.',
    metric: 'Boosting +40% Engagement',
    icon: <Instagram className="w-8 h-8" />,
    category: 'Social Media'
  },
  {
    id: 3,
    title: 'SEO Blogs',
    description: 'Data-driven content that ranks and converts.',
    metric: 'Delivering +25% Traffic',
    icon: <FileText className="w-8 h-8" />,
    category: 'Content Strategy'
  },
  {
    id: 4,
    title: 'Mobile UI/UX',
    description: 'Intuitive interfaces that users love and remember.',
    metric: 'Improving +30% Retention',
    icon: <Smartphone className="w-8 h-8" />,
    category: 'Product Design'
  },
  {
    id: 5,
    title: 'Brand Strategy',
    description: 'Comprehensive brand positioning that cuts through the noise.',
    metric: 'Achieving +50% Recognition',
    icon: <TrendingUp className="w-8 h-8" />,
    category: 'Strategy'
  },
  {
    id: 6,
    title: 'SEO Optimization',
    description: 'Technical and on-page SEO that dominates search results.',
    metric: 'Ranking +35% Keywords',
    icon: <Search className="w-8 h-8" />,
    category: 'Digital Marketing'
  },
  {
    id: 7,
    title: 'Video Ads',
    description: 'Performance-focused video ads that convert viewers to customers.',
    metric: 'Increasing +20% Conversions',
    icon: <Youtube className="w-8 h-8" />,
    category: 'Advertising'
  },
  {
    id: 8,
    title: 'Social Graphics',
    description: 'Scroll-stopping visuals for every platform.',
    metric: 'Generating +45% Shares',
    icon: <Instagram className="w-8 h-8" />,
    category: 'Creative Design'
  }
];

interface ProductVaultProps {
  onAddToStrategy: (product: Product) => void;
}

export function ProductVault({ onAddToStrategy }: ProductVaultProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-20 px-4 bg-[#FFF8E7] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Accent Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full bg-amber-100/30 blur-3xl"
          style={{
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-4xl md:text-6xl text-black mb-4 uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.1em'
            }}
          >
            The Product Vault
          </h2>
        </motion.div>
        <motion.p 
          className="text-black/60 max-w-2xl mx-auto text-lg" 
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Elite services engineered for impact. Hover to see performance metrics.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
            className="relative group cursor-pointer h-full"
            style={{ perspective: '1000px' }}
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border-2 border-black/10 p-6 rounded-2xl transition-all duration-500 h-full flex flex-col shadow-lg"
              whileHover={{ 
                scale: 1.03,
                borderColor: 'rgba(0,0,0,0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                y: -8
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Category Tag with Slide Animation */}
              <motion.div 
                className="text-xs text-black/40 mb-3 uppercase tracking-wider overflow-hidden" 
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <motion.span
                  animate={{ 
                    x: hoveredProduct === product.id ? [0, 5, 0] : 0 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {product.category}
                </motion.span>
              </motion.div>

              {/* Icon with Enhanced Animation */}
              <motion.div 
                className="text-black mb-4"
                animate={{ 
                  scale: hoveredProduct === product.id ? 1.15 : 1,
                  rotate: hoveredProduct === product.id ? [0, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.4 }}
              >
                {product.icon}
              </motion.div>

              {/* Title with Character Animation */}
              <h3 
                className="text-xl mb-2 text-black"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700
                }}
              >
                {product.title}
              </h3>

              {/* Description */}
              <p 
                className="text-black/70 text-sm mb-4 flex-grow"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {product.description}
              </p>

              {/* Metric - Shows on Hover with Slide Up */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredProduct === product.id ? 1 : 0,
                  height: hoveredProduct === product.id ? 'auto' : 0
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <motion.div 
                  className="bg-black/5 px-3 py-3 rounded-lg mb-3 border border-black/10"
                  initial={{ y: 10 }}
                  animate={{ y: hoveredProduct === product.id ? 0 : 10 }}
                >
                  <p className="text-black text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    📊 {product.metric}
                  </p>
                </motion.div>
              </motion.div>

              {/* Button with Advanced Hover */}
              <motion.button
                onClick={() => onAddToStrategy(product)}
                className="w-full py-3 px-4 bg-black text-white uppercase text-sm border-2 border-black rounded-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.05em'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="relative z-10"
                  animate={{
                    x: hoveredProduct === product.id ? [0, 2, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Add to Strategy
                </motion.span>
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: hoveredProduct === product.id ? '100%' : '-100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </motion.div>

            {/* Floating number indicator */}
            <motion.div
              className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.08 + 0.3, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              animate={{
                scale: hoveredProduct === product.id ? 1.15 : 1,
              }}
            >
              {product.id}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}