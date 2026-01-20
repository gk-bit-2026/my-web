import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

// PASTE YOUR DEPLOYED WEB APP URL HERE
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwXuoYFVbytBFKXImg7MFZWIVYdk4q740KmBjtqvhAVPthAWXsVSV-t3dmSwNLlomZsQ/exec';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', brand: '' });

  const handleSubmit = async () => {
    if (!userInfo.name || !userInfo.email) {
      alert("Please provide at least a name and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      // mode: 'no-cors' allows the request to succeed even if Google 
      // doesn't return the standard CORS headers.
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfo,
          products: selectedProducts.map(p => ({ title: p.title, category: p.category }))
        }),
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-black border-l-2 border-white/20 z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-white" />
                  <h2 className="text-2xl text-white uppercase font-bold tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Your Strategy
                  </h2>
                </div>
                <button onClick={onClose} className="text-white hover:text-white/60 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-bold mb-2">STRATEGY SENT</h3>
                  <p className="text-white/60">Check your email. Our team is reviewing your selection.</p>
                </motion.div>
              ) : (
                <>
                  {/* Products List */}
                  <div className="space-y-4 mb-10">
                    {selectedProducts.map((product) => (
                      <motion.div key={product.id} layout className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-start justify-between group">
                        <div>
                          <h3 className="text-white font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.title}</h3>
                          <p className="text-white/60 text-sm">{product.category}</p>
                        </div>
                        <button onClick={() => onRemoveProduct(product.id)} className="text-white/40 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {selectedProducts.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-8 border-t border-white/20">
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="FULL NAME" 
                          className="w-full bg-transparent border-b border-white/30 py-3 text-white focus:border-white outline-none transition-all uppercase text-sm tracking-widest"
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        />
                        <input 
                          type="email" 
                          placeholder="WORK EMAIL" 
                          className="w-full bg-transparent border-b border-white/30 py-3 text-white focus:border-white outline-none transition-all uppercase text-sm tracking-widest"
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                        <input 
                          type="text" 
                          placeholder="BRAND / WEBSITE" 
                          className="w-full bg-transparent border-b border-white/30 py-3 text-white focus:border-white outline-none transition-all uppercase text-sm tracking-widest"
                          onChange={(e) => setUserInfo({...userInfo, brand: e.target.value})}
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || selectedProducts.length === 0}
                        className="w-full py-5 bg-white text-black font-bold uppercase hover:bg-black hover:text-white border-2 border-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {isSubmitting ? "TRANSMITTING..." : (
                          <>
                            <Send className="w-4 h-4" />
                            Request Consultation
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
