import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Instagram, AtSign, User, Mail, Check, Copy, ExternalLink } from 'lucide-react';
import logoWhite from '@/assets/logo2.png';

export function FooterCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // --- CONFIGURATION ---
  const EMAIL = "impact@graphikardia.com";
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztfYnOUTNXbgTBIfj0w2hMjpmsPKAp5HPQRa7tj1VBFD9rFc2s5HHJAXiQ89X6qcK2zA/exec";
  
  const socials = [
    { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://instagram.com/graphikardia' },
    { name: 'Threads', icon: <AtSign size={18} />, url: 'https://threads.net/@graphikardia' },
    { name: 'Founder', icon: <User size={18} />, url: 'https://instagram.com/mr.gk_gokul' },
  ];

  // --- LOGIC: Copy Email ---
  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  // --- LOGIC: Google Sheets Submission ---
  const handleInitializeImpact = async () => {
    const userEmail = prompt("Enter your email to initialize impact:");
    if (!userEmail || !userEmail.includes('@')) return;

    setIsSubmitting(true);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify({
          userInfo: { name: "CTA Lead", email: userEmail, brand: "Footer Inquiry" },
          products: [{ title: "Direct Impact Request" }]
        }),
      });
      alert("Impact Initialized! Check your inbox.");
    } catch (error) {
      alert("Connection failed. Try again.");
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
        setMousePosition({ x: (e.clientX - centerX) * 0.2, y: (e.clientY - centerY) * 0.2 });
      }
    };
    if (isHovering) window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* (Keep your existing Grid Background, Orbs, and Particles code here) */}

      <div className="text-center relative z-10 max-w-5xl">
        {/* Logo Section */}
        <div className="mb-12 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <motion.img
              src={logoWhite}
              alt="Graphikardia"
              className="w-82 h-82 mx-auto"
              animate={{ filter: ['drop-shadow(0 0 0px #fff0)', 'drop-shadow(0 0 20px #fff5)', 'drop-shadow(0 0 0px #fff0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Headline */}
        <motion.h2 className="text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight font-black tracking-tighter uppercase italic" style={{ fontFamily: "'Inter', sans-serif" }}>
          Is your brand's heart beating, <br />
          <span className="text-white/40">or just existing?</span>
        </motion.h2>

        {/* --- NEW: SOCIALS & INTERACTIVE EMAIL --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Professional Email Pill */}
          <div className="group flex items-center bg-white/5 border border-white/20 rounded-full backdrop-blur-md overflow-hidden transition-all hover:border-white/40">
            <a href={`mailto:${EMAIL}`} className="px-5 py-3 text-white/80 hover:text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Mail size={16} />
              {EMAIL}
            </a>
            <button 
              onClick={copyToClipboard}
              className="bg-white/10 hover:bg-white/20 p-3 border-l border-white/20 transition-colors text-white/60 hover:text-white"
              title="Copy to clipboard"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={16} className="text-green-400" /></motion.div>
                ) : (
                  <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={16} /></motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Social Icons */}
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white transition-all backdrop-blur-md"
            >
              {social.icon}
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Magnetic Button */}
        <motion.div className="mb-16">
          <motion.button
            ref={buttonRef}
            onClick={handleInitializeImpact}
            disabled={isSubmitting}
            animate={{ x: mousePosition.x, y: mousePosition.y }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => { setIsHovering(false); setMousePosition({ x: 0, y: 0 }); }}
            className="relative px-12 py-5 text-xl uppercase transition-all duration-500 overflow-hidden border-3 border-white rounded-xl font-black cursor-pointer"
            style={{ backgroundColor: isHovering ? '#fff' : 'transparent', color: isHovering ? '#000' : '#fff', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isSubmitting ? "Processing..." : "Initialize Impact"}
              {!isSubmitting && <span>→</span>}
            </span>
          </motion.button>
        </motion.div>

        {/* Social Proof & Footer Info (Original) */}
        <div className="flex justify-center gap-8 text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase mb-12">
           <span>Graphikardia © 2026</span>
           <span>•</span>
           <span>Invisible to Inevitable</span>
        </div>
      </div>
    </div>
  );
}
