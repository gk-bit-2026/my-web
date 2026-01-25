'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send, Activity } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

interface ImpactSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemove: (id: number) => void;
}

export function ImpactSidebar({ isOpen, onClose, items, onRemove }: ImpactSidebarProps) {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[500]" />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className={cn(
              "fixed top-0 right-0 h-full w-full md:w-[550px] border-l z-[501] flex flex-col",
              isDark ? "bg-[#050505] border-white/10 text-white" : "bg-white border-black/10 text-black"
            )}
          >
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black italic uppercase">Strategy_Vault</h2>
              <button onClick={onClose}><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {items.map(i => (
                <div key={i.id} className="flex justify-between p-4 border border-current/10 mb-2">
                  <span>{i.title}</span>
                  <button onClick={() => onRemove(i.id)}><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
            <div className="p-8 border-t">
              <input 
                value={email} onChange={e => setEmail(e.target.value)} placeholder="WORK_EMAIL" 
                className={cn("w-full p-4 border mb-4", isDark ? "bg-black border-white/10" : "bg-white border-black/10")} 
              />
              <button className="w-full py-4 bg-purple-600 text-white font-black uppercase">Launch_Protocol</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
