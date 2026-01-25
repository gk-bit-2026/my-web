'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send, Zap, ShieldCheck, Activity } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Props Interface to fix TS2322
interface ImpactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemove: (id: number) => void;
  isDark: boolean; // Added this to match App.tsx
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztfYnOUTNXbgTBIfj0w2hMjpmsPKAp5HPQRa7tj1VBFD9rFc2s5HHJAXiQ89X6qcK2zA/exec";

export function ImpactSidebar({ isOpen, onClose, items, onRemove, isDark }: ImpactSidebarProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const impactScore = items.length * 15.5;

  const handleSubmit = async () => {
    if (!email.includes('@')) return alert('ACCESS_DENIED: ENTER_VALID_EMAIL');
    setStatus('loading');

    try {
      const payload = {
        userInfo: {
          name: email.split('@')[0],
          email: email,
          brand: "Strategy_Vault_Request"
        },
        products: items.map((i: any) => ({
          title: i.title,
          category: i.category
        }))
      };

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
        setEmail('');
      }, 2500);
    } catch (e) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
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
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[500]" 
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className={cn(
              "fixed top-0 right-0 h-full w-full md:w-[550px] border-l z-[501] flex flex-col shadow-2xl",
              isDark ? "bg-[#050505] border-white/10" : "bg-white border-black/10 text-black"
            )}
          >
            {/* Header */}
            <div className={cn("p-8 md:p-12 border-b flex justify-between items-center", isDark ? "border-white/5 bg-purple-900/10" : "border-black/5 bg-purple-50")}>
              <div>
                <h2 className={cn("text-3xl font-black italic uppercase tracking-tighter", isDark ? "text-white" : "text-black")}>Strategy_Vault</h2>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] opacity-40 mt-1">
                  Status: {status === 'loading' ? 'Transmitting...' : 'Ready_for_Transmission'}
                </p>
              </div>
              <button onClick={onClose} className={cn("p-2 rounded-full", isDark ? "bg-white/5 text-white" : "bg-black/5 text-black")}>
                <X size={20}/>
              </button>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <Activity size={48} className="mb-4 animate-pulse" />
                  <p className="font-mono text-xs uppercase tracking-[0.2em]">No Modules Initialized</p>
                </div>
              ) : (
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className={cn("p-4 border", isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10")}>
                      <span className="block font-mono text-[9px] uppercase text-purple-500 mb-1">Modules</span>
                      <span className="text-2xl font-black italic">{items.length}</span>
                    </div>
                    <div className={cn("p-4 border", isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10")}>
                      <span className="block font-mono text-[9px] uppercase text-purple-500 mb-1">Impact_Score</span>
                      <span className="text-2xl font-black italic">{impactScore.toFixed(1)}%</span>
                    </div>
                  </div>
                  {/* ... mapped items code ... */}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={cn("p-8 md:p-12 border-t", isDark ? "bg-white/[0.02] border-white/10" : "bg-black/[0.02] border-black/10")}>
              <input 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="ENTER_WORK_EMAIL" 
                className={cn(
                  "w-full border p-5 font-mono text-xs outline-none focus:border-purple-500 mb-6",
                  isDark ? "bg-black text-white border-white/10" : "bg-white text-black border-black/10"
                )}
              />
              <button 
                onClick={handleSubmit}
                className={cn(
                  "w-full py-6 font-black uppercase tracking-[0.3em] text-xs transition-all",
                  status === 'success' ? "bg-green-500 text-black" : isDark ? "bg-white text-black" : "bg-black text-white"
                )}
              >
                {status === 'loading' ? 'Transmitting...' : 'Launch_Protocol'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
