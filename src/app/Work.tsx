'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { X, Play, Info, ArrowRight } from 'lucide-react'; // Icons

// 1. DATA STRUCTURE (Added Description for Overlay)
const categories = ["all", "reels", "posts", "graphs", "brochures", "carousels", "thumbnails"];

const workItems = [
  { 
    id: 1, type: 'reels', title: 'Luxury Car Promo', src: '/videos/reel1.mp4', isVideo: true, size: 'tall',
    desc: 'High-octane social media campaign for a premium automotive brand. Focused on speed and reflections.'
  },
  { 
    id: 2, type: 'posts', title: 'Brand Launch', src: '/images/post1.jpg', isVideo: false, size: 'square',
    desc: 'Visual identity launch for a tech startup. Minimalist aesthetic with bold typography.'
  },
  { 
    id: 3, type: 'graphs', title: 'Market Analysis', src: '/images/graph1.jpg', isVideo: false, size: 'wide',
    desc: 'Complex data simplified through clean, brutalist information design.'
  },
  { 
    id: 4, type: 'reels', title: 'Fashion Edit', src: '/videos/reel2.mp4', isVideo: true, size: 'tall',
    desc: 'Fast-paced rhythmic editing for a streetwear capsule collection.'
  }
];

// 2. INTERACTIVE MEDIA CARD
function MediaCard({ item, onClick }: { item: typeof workItems[0], onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (item.isVideo && videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (item.isVideo && videoRef.current) videoRef.current.pause();
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl overflow-hidden bg-zinc-100 border border-black/5 group cursor-pointer 
        ${item.size === 'tall' ? 'row-span-2' : ''} 
        ${item.size === 'wide' ? 'col-span-2' : ''}`}
    >
      {item.isVideo ? (
        <video
          ref={videoRef}
          src={item.src}
          muted loop playsInline
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
      ) : (
        <img src={item.src} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
      )}
      
      {/* Visual Indicator for Video */}
      {item.isVideo && (
        <div className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={12} className="fill-white text-white" />
        </div>
      )}

      {/* Hover Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end text-white">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2">{item.type}</p>
        <h3 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h3>
      </div>
    </motion.div>
  );
}

// 3. MAIN PAGE COMPONENT
export default function WorksPage() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<typeof workItems[0] | null>(null);

  const filteredItems = filter === "all" 
    ? workItems 
    : workItems.filter(item => item.type === filter);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fafafa]">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="lg:w-64 lg:fixed lg:h-screen p-8 border-r border-black/5 bg-white z-40 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-12">Graphikardia</h2>
          <nav className="flex flex-col gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-left text-[10px] font-mono uppercase tracking-widest transition-all
                  ${filter === cat ? 'text-black font-bold pl-4 border-l-2 border-black' : 'text-zinc-400 hover:text-black hover:pl-2'}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-8 border-t border-black/5 font-mono text-[9px] text-zinc-400">
          SYSTEM_STATE: READY
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-64 flex-1 p-6 lg:p-12 pb-32">
        <header className="mb-12">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
            Works<span className="text-zinc-200">/</span>
          </h1>
          <p className="text-2xl md:text-4xl lowercase text-zinc-400 mt-4" style={{ fontFamily: '"Playwrite NZ", cursive' }}>
            {filter} projects
          </p>
        </header>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MediaCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* 4. THE PROJECT DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
              onClick={() => setSelectedItem(null)} 
            />

            {/* Content Container */}
            <motion.div 
              initial={{ y: 100, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 100, scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-white rounded-[40px] overflow-hidden flex flex-col lg:flex-row h-full max-h-[85vh] shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black text-white rounded-full hover:scale-110 transition-transform"
              >
                <X size={20} />
              </button>

              {/* Media Side */}
              <div className="w-full lg:w-2/3 bg-zinc-100 relative">
                {selectedItem.isVideo ? (
                  <video 
                    src={selectedItem.src} 
                    autoPlay muted loop playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={selectedItem.src} className="w-full h-full object-cover" alt={selectedItem.title} />
                )}
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/3 p-8 md:p-12 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-mono uppercase tracking-widest">
                      {selectedItem.type}
                    </span>
                    <span className="text-zinc-300 font-mono text-[10px]">ID_{selectedItem.id}00</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6">
                    {selectedItem.title}
                  </h2>
                  <p className="text-zinc-500 text-lg leading-relaxed">
                    {selectedItem.desc}
                  </p>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                   <p 
                    className="text-2xl lowercase mb-6" 
                    style={{ fontFamily: '"Playwrite NZ", cursive' }}
                   >
                    want to build something similar?
                   </p>
                   <button className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:gap-6 transition-all">
                     Start Project <ArrowRight size={18} />
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-full z-50 shadow-2xl flex items-center gap-3">
        <Info size={14} className="text-zinc-500" />
        <select 
          onChange={(e) => setFilter(e.target.value)}
          className="bg-transparent text-[10px] font-mono uppercase tracking-widest focus:outline-none appearance-none cursor-pointer"
        >
          {categories.map(cat => <option key={cat} value={cat} className="text-black">{cat}</option>)}
        </select>
      </div>
    </div>
  );
}
