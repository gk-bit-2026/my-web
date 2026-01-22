'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztfYnOUTNXbgTBIfj0w2hMjpmsPKAp5HPQRa7tj1VBFD9rFc2s5HHJAXiQ89X6qcK2zA/exec";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemove: (id: number) => void;
}

export function ImpactSidebar({ isOpen, onClose, items, onRemove }: SidebarProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', brand: '' });

  const handleLaunch = async () => {
    if (!formData.email || items.length === 0) return;
    
    setStatus('submitting');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          userInfo: formData,
          products: items.map(i => ({ title: i.title, category: i.category })),
          source: "Sidebar Strategy Vault"
        }),
      });
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
    } catch (error) {
      alert("Transmission failed. Please check connection.");
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[500]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 30 }} className="fixed top-0 right-0 h-full w-full md:w-[500px] z-[501] bg-black text-white border-l border-white/10 flex flex-col shadow-2xl">
            
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-950">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Tactical_Vault</h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={64} className="text-white mb-6" />
                  <h3 className="text-3xl font-black uppercase italic">Transmitted</h3>
                  <p className="text-zinc-500 font-mono text-xs mt-4 uppercase tracking-widest">Our engineers are reviewing your strategy.</p>
                </motion.div>
              ) : (
                <>
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 border-2 border-dashed border-white/10 rounded-3xl">
                      <span className="font-mono text-[10px] uppercase tracking-[0.5em]">Vault_Empty</span>
                    </div>
                  ) : (
                    items.map(item => (
                      <motion.div layout key={item.id} className="p-6 bg-zinc-900 border border-white/5 rounded-2xl flex justify-between items-center group hover:border-white/20 transition-all">
                        <div>
                          <h4 className="font-black uppercase italic text-lg leading-none">{item.title}</h4>
                          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest mt-2 block">{item.category}</span>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                      </motion.div>
                    ))
                  )}
                </>
              )}
            </div>

            {items.length > 0 && status !== 'success' && (
              <div className="p-8 border-t border-white/5 bg-zinc-950 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <input type="text" placeholder="NAME / BRAND" className="w-full bg-zinc-900 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white outline-none transition-all" onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="email" placeholder="WORK EMAIL" className="w-full bg-zinc-900 border border-white/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-white outline-none transition-all" onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <button 
                  disabled={status === 'submitting'}
                  onClick={handleLaunch} 
                  className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-200 transition-all flex justify-center items-center gap-3"
                >
                  {status === 'submitting' ? <Loader2 className="animate-spin" /> : "Initialize Impact"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
