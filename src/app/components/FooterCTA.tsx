'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Instagram, AtSign, User, Mail, Check, Copy, Send, Loader2 } from 'lucide-react';
import logoWhite from '@/assets/logo2.png';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztfYnOUTNXbgTBIfj0w2hMjpmsPKAp5HPQRa7tj1VBFD9rFc2s5HHJAXiQ89X6qcK2zA/exec";
const EMAIL = "impact@graphikardia.com";

export function FooterCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const socials = [
    { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://instagram.com/graphikardia' },
    { name: 'Threads', icon: <AtSign size={18} />, url: 'https://threads.net/@graphikardia' },
    { name: 'Founder', icon: <User size={18} />, url: 'https://instagram.com/mr.gk_gokul' },
  ];

  const handleInitializeImpact = async () => {
    if (!userEmail || !userEmail.includes('@')) {
      alert("Please enter a valid work email.");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          userInfo: { name: "Direct Lead", email: userEmail, brand: "Footer Section" },
          products: [{ title: "General Impact Inquiry" }],
          source: "Footer CTA"
        }),
      });
      alert("Signal Received. Impact Initialized.");
      setUserEmail("");
    } catch (error) {
      alert("Transmission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && isHovering) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({ x: (e.clientX - centerX) * 0.15, y: (e.clientY - centerY) * 0.15 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  return (
    <footer className="relative min-h-screen bg-black flex flex-col items-center justify-center px-6 py-32 overflow-hidden">
      {/* Dynamic Background Noise/Gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.img 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          src={logoWhite} 
          className="w-64 md:w-80 mx-auto mb-16 grayscale brightness-200"
          alt="Graphikardia"
        />

        <motion.h2 className="text-[8vw] md:text-[6vw] font-black uppercase italic tracking-tighter leading-[0.85] text-white mb-16">
          Is your brand's heart beating,<br/>
          <span className="text-zinc-800">or just existing?</span>
        </motion.h2>

        {/* Professional Lead Capture */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 max-w-2xl mx-auto">
          <input 
            type="email" 
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="ENTER_WORK_EMAIL" 
            className="flex-1 bg-white/5 border border-white/10 px-8 py-6 rounded-2xl font-mono text-xs tracking-widest focus:border-white outline-none transition-all text-white w-full"
          />
          <motion.button
            ref={buttonRef}
            onClick={handleInitializeImpact}
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setMousePosition({ x: 0, y: 0 }); }}
            animate={{ x: mousePosition.x, y: mousePosition.y }}
            className="px-10 py-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:invert transition-all flex items-center gap-3 whitespace-nowrap w-full md:w-auto justify-center"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <>Initialize Impact <Send size={14}/></>}
          </motion.button>
        </div>

        {/* Social Matrix */}
        <div className="flex flex-wrap justify-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors">
              {s.icon} {s.name}
            </a>
          ))}
        </div>

        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600">
          <span>Graphikardia © 2026</span>
          <span className="hidden md:block">•</span>
          <span>Invisible_To_Inevitable</span>
        </div>
      </div>
    </footer>
  );
}
