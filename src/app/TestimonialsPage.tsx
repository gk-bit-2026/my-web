'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Quote, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  { id: 1, name: 'Sarah Chen', role: 'CMO', company: 'Aether Intel', content: "Graphikardia decoded our entire market position. Growth was immediate.", videoSrc: '/videos/sarah.mp4', size: 'large' },
  { id: 2, name: 'Marcus Thorne', role: 'Founder', company: 'Pulse Media', content: "The editing is aggressive, clean, and impossible to scroll past.", size: 'small' },
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <motion.div 
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => { videoRef.current?.pause(); setIsMuted(true); }}
      className={`relative bg-zinc-900 border border-white/5 p-8 rounded-[32px] overflow-hidden min-h-[300px] flex flex-col justify-between group
      ${item.size === 'large' ? 'md:col-span-2' : ''}`}
    >
      {item.videoSrc && (
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-50 transition-opacity">
          <video ref={videoRef} src={item.videoSrc} muted={isMuted} loop playsInline className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
        </div>
      )}
      <div className="relative z-10">
        <Quote className="text-zinc-700 mb-4" />
        <p className="text-2xl font-medium leading-tight">{item.content}</p>
      </div>
      <div className="relative z-10 flex items-end justify-between">
        <div>
          <h4 className="text-2xl lowercase font-cursive" style={{ fontFamily: '"Playwrite NZ", cursive' }}>{item.name}</h4>
          <p className="font-mono text-[10px] uppercase text-zinc-500">{item.company} / {item.role}</p>
        </div>
        {item.videoSrc && (
          <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="p-3 bg-white/10 rounded-full">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-green-400" />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-zinc-500 hover:text-white transition-all flex items-center gap-2 font-mono text-xs uppercase mb-12">
          <ArrowLeft size={14} /> Back to Hub
        </Link>
        <h1 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-20">
          The<br />Echo.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => <TestimonialCard key={t.id} item={t} />)}
        </div>
      </div>
    </main>
  );
}
