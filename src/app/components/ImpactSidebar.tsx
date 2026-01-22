'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// ⚠️ REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT URL AFTER DEPLOYING (See Step 4 below)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztfYnOUTNXbgTBIfj0w2hMjpmsPKAp5HPQRa7tj1VBFD9rFc2s5HHJAXiQ89X6qcK2zA/exec";

export function ImpactSidebar({ isOpen, onClose, items, onRemove }: any) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!email.includes('@')) return alert('ENTER_VALID_EMAIL_ADDRESS');
    setStatus('loading');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('strategy', JSON.stringify(items.map((i: any) => i.title)));
      
      // mode: 'no-cors' is required for Google Scripts
      await fetch(SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors' });
      
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
        setEmail('');
      }, 2000);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[500]" 
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#050505] border-l border-white/10 z-[501] flex flex-col p-8 md:p-12 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Strategy_Vault</h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform text-white"><X/></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-8 custom-scrollbar">
              {items.length === 0 && (
                <div className="text-center opacity-30 font-mono text-xs uppercase tracking-widest mt-20 text-white">Vault Empty</div>
              )}
              {items.map((i:any) => (
                <div key={i.id} className="p-4 border border-white/10 bg-white/5 flex justify-between items-center group text-white">
                  <div>
                     <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest block mb-1">{i.category}</span>
                     <span className="font-bold uppercase italic text-sm">{i.title}</span>
                  </div>
                  <button onClick={()=>onRemove(i.id)} className="opacity-20 group-hover:opacity-100 hover:text-red-500 transition-all"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-4 border-t border-white/10">
              <input 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                placeholder="ENTER_WORK_EMAIL" 
                className="w-full bg-transparent border border-white/20 p-4 font-mono text-sm outline-none focus:border-purple-500 transition-colors text-white placeholder:text-white/20" 
              />
              <button 
                onClick={handleSubmit} 
                disabled={status === 'loading' || items.length === 0}
                className={cn(
                  "w-full py-5 font-black uppercase tracking-widest text-xs flex justify-center gap-3 transition-all",
                  status === 'success' ? "bg-green-500 text-black" : "bg-white text-black hover:bg-purple-500 hover:text-white"
                )}
              >
                {status === 'loading' ? 'Transmitting...' : status === 'success' ? 'Strategy_Sent' : <><Send size={14}/> Launch_Protocol</>}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
