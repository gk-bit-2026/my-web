'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Quote, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CMO',
    company: 'Aether Intel',
    type: 'video',
    content: "Graphikardia decoded our entire market position. The growth was immediate and measurable.",
    videoSrc: '/testimonials/sarah.mp4', // Place in public/testimonials/
    size: 'large',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'Founder',
    company: 'Pulse Media',
    type: 'text',
    content: "The editing style is aggressive, clean, and impossible to scroll past. They are the 1% in this industry.",
    size: 'small',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Director',
    company: 'Luminary Co',
    type: 'video',
    content: "I've never seen a team move this fast without breaking the vision. Pure creative efficiency.",
    videoSrc: '/testimonials/elena.mp4',
    size: 'medium',
  },
  {
    id: 4,
    name: 'James Wu',
    role: 'Product Lead',
    company: 'Nexus Tech',
    type: 'text',
    content: "They don't just deliver assets; they deliver a strategy that actually converts followers into customers.",
    size: 'small',
  }
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleInteraction = (play: boolean) => {
    if (item.type === 'video' && videoRef.current) {
      if (play) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => {
        handleInteraction(false);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
        }
      }}
      onClick={() => handleInteraction(!isPlaying)}
      className={`relative bg-zinc-900/50 border border-white/5 p-8 rounded-[32px] overflow-hidden flex flex-col justify-between transition-all hover:shadow-2xl hover:border-white/20 group cursor-pointer min-h-[300px]
        ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
        ${item.size === 'medium' ? 'md:row-span-2' : ''}`}
    >
      {/* Video Background Layer */}
      {item.type === 'video' && (
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-60 transition-opacity duration-700">
          <video
            ref={videoRef}
            src={item.videoSrc}
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
      )}

      {/* Sound Toggle */}
      {item.type === 'video' && isPlaying && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleSound}
          className="absolute top-6 right-6 z-30 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-green-400" />}
        </motion.button>
      )}

      {/* Content */}
      <div className="relative z-10">
        <Quote className="text-zinc-700 mb-4 group-hover:text-white/20 transition-colors" size={40} />
        <p className="text-xl md:text-2xl text-white leading-tight font-medium">
          {item.content}
        </p>
      </div>

      <div className="relative z-10 mt-8">
        <h4 
          className="text-2xl md:text-3xl text-white lowercase leading-none"
          style={{ fontFamily: '"Playwrite NZ", cursive' }}
        >
          {item.name}
        </h4>
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-zinc-300 font-bold">{item.company}</span>
          <span className="mx-2">/</span>
          {item.role}
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        {/* Header */}
        <header className="mb-20">
          <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-6">
            The<br />Echo<span className="text-zinc-800">.</span>
          </h1>
          <p 
            className="text-3xl md:text-5xl text-zinc-500 lowercase max-w-2xl"
            style={{ fontFamily: '"Playwrite NZ", cursive' }}
          >
            Real results from real partners.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="mt-40 text-center py-20 border-t border-white/5">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
            ready to be the next success story?
          </h2>
          <Link 
            to="/#contact" 
            className="inline-block px-12 py-5 bg-white text-black font-black uppercase tracking-widest hover:invert transition-all rounded-full"
          >
            Start Your Impact
          </Link>
        </section>
      </div>
    </main>
  );
}
