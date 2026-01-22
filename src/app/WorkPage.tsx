'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const workItems = [
  { id: 1, type: 'reels', title: 'Luxury Car Promo', src: '/videos/reel1.mp4', isVideo: true, size: 'tall', desc: 'Aggressive pacing meets high-end automotive aesthetics.' },
  { id: 2, type: 'posts', title: 'Brand Identity', src: '/images/post1.jpg', isVideo: false, size: 'square', desc: 'Minimalist brand system for a fintech disruptor.' },
  { id: 3, type: 'graphs', title: 'Data Viz', src: '/images/graph1.jpg', isVideo: false, size: 'wide', desc: 'Complex market metrics simplified into brutalist visual assets.' },
];

export default function WorkPage() {
  const [selectedItem, setSelectedItem] = useState<typeof workItems[0] | null>(null);

  return (
    <main className="pt-32 pb-20 px-6 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <Link to="/" className="text-zinc-500 hover:text-white transition-all flex items-center gap-2 font-mono text-xs uppercase mb-8">
            <ArrowLeft size={14} /> Back to Hub
          </Link>
          <h1 className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.75]">
            Works<span className="text-zinc-800">.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {workItems.map((item) => (
            <motion.div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`relative rounded-[32px] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer group
                ${item.size === 'tall' ? 'row-span-2' : ''} ${item.size === 'wide' ? 'col-span-2' : ''}`}
            >
              <img src={item.src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={item.title} />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">{item.type}</p>
                <h3 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OVERLAY MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelectedItem(null)} />
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-full max-w-6xl bg-zinc-900 rounded-[40px] overflow-hidden flex flex-col lg:flex-row h-full max-h-[85vh]">
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-50 p-3 bg-white text-black rounded-full"><X size={20} /></button>
              <div className="lg:w-2/3 bg-black">
                {selectedItem.isVideo ? <video src={selectedItem.src} autoPlay muted loop className="w-full h-full object-cover" /> : <img src={selectedItem.src} className="w-full h-full object-cover" />}
              </div>
              <div className="lg:w-1/3 p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">{selectedItem.title}</h2>
                  <p className="text-zinc-400 leading-relaxed">{selectedItem.desc}</p>
                </div>
                <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-3">
                  Start Project <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
