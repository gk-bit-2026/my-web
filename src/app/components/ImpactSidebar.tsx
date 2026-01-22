'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send, Zap, ShieldCheck, Activity } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztfYnOUTNXbgTBIfj0w2hMjpmsPKAp5HPQRa7tj1VBFD9rFc2s5HHJAXiQ89X6qcK2zA/exec";

export function ImpactSidebar({ isOpen, onClose, items, onRemove }: any) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const impactScore = items.length * 15.5; // Arbitrary high-tech metric

  const handleSubmit = async () => {
    if (!email.includes('@')) return alert('ACCESS_DENIED: ENTER_VALID_EMAIL');
    setStatus('loading');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('strategy', JSON.stringify(items.map((i: any) => i.title)));
      
      await fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
        setEmail('');
      }, 2500);
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[500]" 
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[550px] bg-[#050505] border-l border-white/10 z-[501] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-purple-900/10 to-transparent">
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Strategy_Vault</h2>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1">Status: Ready for Transmission</p>
              </div>
              <button onClick={onClose} className="hover:rotate-90 transition-transform p-2 bg-white/5 rounded-full text-white"><X size={20}/></button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <Activity size={48} className="mb-4 animate-pulse" />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-white">No Modules Initialized</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Strategy Summary Block */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-4 bg-white/5 border border-white/10">
                      <span className="block font-mono text-[9px] uppercase text-purple-400 mb-1">Modules</span>
                      <span className="text-2xl font-black text-white italic">{items.length}</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10">
                      <span className="block font-mono text-[9px] uppercase text-purple-400 mb-1">Impact_Score</span>
                      <span className="text-2xl font-black text-white italic">{impactScore.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* List */}
                  <div className="space-y-3">
                    <p className="font-mono text-[10px] uppercase text-white/30 tracking-widest mb-4">Selected_Payload</p>
                    {items.map((i:any) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        key={i.id} 
                        className="group p-4 border border-white/10 bg-white/[0.02] flex justify-between items-center text-white hover:border-purple-500/50 transition-colors"
                      >
                        <div>
                           <span className="font-mono text-[8px] text-purple-500 uppercase tracking-widest block mb-0.5">{i.category}</span>
                           <span className="font-bold uppercase italic text-sm tracking-tight">{i.title}</span>
                        </div>
                        <button onClick={()=>onRemove(i.id)} className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all p-2"><Trash2 size={14}/></button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            <div className="p-8 md:p-12 bg-white/[0.02] border-t border-white/10 space-y-6">
              {items.length > 0 && (
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-[10px] font-mono uppercase text-white/40">
                      <ShieldCheck size={14} className="text-green-500" />
                      Encrypted End-to-End Transmission
                   </div>
                  <div className="relative group">
                    <input 
                      value={email} 
                      onChange={e=>setEmail(e.target.value)} 
                      placeholder="ENTER_WORK_EMAIL" 
                      className="w-full bg-black border border-white/10 p-5 font-mono text-xs outline-none focus:border-purple-500 transition-all text-white placeholder:text-white/20" 
                    />
                    <Zap size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                </div>
              )}

              <button 
                onClick={handleSubmit} 
                disabled={status === 'loading' || items.length === 0}
                className={cn(
                  "w-full py-6 font-black uppercase tracking-[0.3em] text-xs flex justify-center items-center gap-3 transition-all duration-500",
                  status === 'success' 
                    ? "bg-green-500 text-black translate-y-[-2px] shadow-[0_10px_30px_rgba(34,197,94,0.3)]" 
                    : "bg-white text-black hover:bg-purple-600 hover:text-white"
                )}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear" }}><Activity size={16}/></motion.span>
                    Transmitting_Data...
                  </span>
                ) : status === 'success' ? (
                  <>Strategy_Deployed</>
                ) : (
                  <><Send size={14}/> Launch_Protocol</>
                )}
              </button>
              
              {items.length > 0 && (
                <p className="text-center font-mono text-[8px] uppercase text-white/20 tracking-tighter">
                  By launching, you agree to receive a custom digital architecture audit.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
