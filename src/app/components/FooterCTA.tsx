import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import logoWhite from '@/assets/logo2.png';

export function FooterCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW: Track submission status
  const buttonRef = useRef<HTMLButtonElement>(null);

  // --- START NEW LOGIC ---
  const handleInitializeImpact = async () => {
    if (isSubmitting) return; // Prevent double clicks

    setIsSubmitting(true);
    
    // REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztfYnOUTNXbgTBIfj0w2hMjpmsPKAp5HPQRa7tj1VBFD9rFc2s5HHJAXiQ89X6qcK2zA/exec";

    // Since this is a Footer CTA, we might not have the full sidebar products,
    // so we send a "General Inquiry" payload.
    const payload = {
      userInfo: {
        name: "General Lead",
        email: "Check Footer", // Or open a modal to collect email first
        brand: "General Inquiry"
      },
      products: [{ title: "General Strategy Consultation" }]
    };

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      alert("Impact Initialized! Check your inbox.");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Connection failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- END NEW LOGIC ---

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && isHovering) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) * 0.2,
          y: (e.clientY - centerY) * 0.2
        });
      }
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  const handleHover = () => setIsHovering(true);
  const handleLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* ... (Keep your background and particles code the same) ... */}

      <div className="text-center relative z-10 max-w-5xl">
        {/* ... (Keep your logo and h2/p sections the same) ... */}

        {/* Updated Button */}
        <motion.div className="mb-16">
          <motion.button
            ref={buttonRef}
            onClick={handleInitializeImpact} // NEW: Trigger the mail
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
              opacity: isSubmitting ? 0.6 : 1 // Visual feedback for loading
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            disabled={isSubmitting} // Disable while sending
            className="relative px-12 py-5 text-xl uppercase transition-all duration-500 overflow-hidden group cursor-pointer"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.1em',
              backgroundColor: isHovering ? '#ffffff' : 'transparent',
              color: isHovering ? '#000000' : '#ffffff',
              border: '3px solid #ffffff',
              borderRadius: '12px'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, borderRadius: '50%' }}
              animate={{ 
                scale: isHovering ? 2 : 0,
                borderRadius: isHovering ? '0%' : '50%'
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              <span>
                {isSubmitting ? "Sending..." : "Initialize Impact"}
              </span>
              {!isSubmitting && (
                <motion.span
                  animate={{ x: isHovering ? 5 : 0, rotate: isHovering ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              )}
            </span>
          </motion.button>
        </motion.div>

        {/* ... (Keep the rest of your decorative elements) ... */}
      </div>
    </div>
  );
}
