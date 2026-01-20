import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: string;
}

interface ImpactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: Product[];
  onRemoveProduct: (id: number) => void;
}

export function ImpactSidebar({ isOpen, onClose, selectedProducts, onRemoveProduct }: ImpactSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-black border-l-2 border-white/20 z-50 overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-white" />
                  <h2 
                    className="text-2xl text-white uppercase"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.1em'
                    }}
                  >
                    Your Strategy
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-white/60 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Products List */}
              {selectedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-white/40 mb-4">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      No services selected yet.
                    </p>
                    <p className="text-sm mt-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Browse the Product Vault and add services to build your impact strategy.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-start justify-between group hover:border-white/30 transition-all"
                    >
                      <div className="flex-grow">
                        <h3 
                          className="text-white mb-1"
                          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                        >
                          {product.title}
                        </h3>
                        <p 
                          className="text-white/60 text-sm"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="text-white/40 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Summary */}
              {selectedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-white/20"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span 
                      className="text-white/60"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Total Services
                    </span>
                    <span 
                      className="text-white text-2xl"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
                    >
                      {selectedProducts.length}
                    </span>
                  </div>

                  <button
                    className="w-full py-4 bg-white text-black uppercase hover:bg-black hover:text-white border-2 border-white transition-all duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.1em'
                    }}
                  >
                    Request Consultation
                  </button>

                  <p 
                    className="text-white/40 text-xs text-center mt-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Our team will craft a custom impact strategy for your brand
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
