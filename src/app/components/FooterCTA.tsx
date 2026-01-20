import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import logoWhite from '@/assets/logo2.png';

export function FooterCTA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.25, 0.1],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-white/15 to-transparent rounded-full blur-3xl"
      />

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="text-center relative z-10 max-w-5xl">
        {/* Logo with Pulsing Animation */}
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
              animate={{
                filter: ['drop-shadow(0 0 0px rgba(255,255,255,0))', 'drop-shadow(0 0 20px rgba(255,255,255,0.3))', 'drop-shadow(0 0 0px rgba(255,255,255,0))']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            letterSpacing: '-0.02em'
          }}
        >
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffffff, #d4d4d4, #ffffff)',
              backgroundSize: '200% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Is your brand's heart beating,
          </motion.span>
          <br />
          <span className="text-white/60">or just existing?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-white/70 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Transform your brand from <span className="text-white font-semibold italic">Invisible</span> to <span className="text-white font-semibold italic">Inevitable</span>. 
          Let Graphikardia inject the pulse your business needs.
        </motion.p>

        {/* Magnetic Button with Enhanced Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.button
            ref={buttonRef}
            animate={{
              x: mousePosition.x,
              y: mousePosition.y
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="relative px-12 py-5 text-xl uppercase transition-all duration-500 overflow-hidden group"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.1em',
              backgroundColor: isHovering ? '#ffffff' : 'transparent',
              color: isHovering ? '#000000' : '#ffffff',
              border: '3px solid #ffffff',
              borderRadius: '12px'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background expanding circle animation */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, borderRadius: '50%' }}
              animate={{ 
                scale: isHovering ? 2 : 0,
                borderRadius: isHovering ? '0%' : '50%'
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              <motion.span
                animate={{ x: isHovering ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                Initialize Impact
              </motion.span>
              <motion.span
                animate={{ x: isHovering ? 5 : 0, rotate: isHovering ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </span>

            {/* Glow Effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 opacity-60"
                style={{
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(255, 255, 255, 0.4)'
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Decorative Elements - Bouncing Dots */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-white/40 rounded-full"
            />
          ))}
        </div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mb-16 text-white/50 text-sm"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {['500+ Projects', '98% Success Rate', '24/7 Support', 'Global Reach'].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, color: '#ffffff' }}
              className="flex items-center gap-2"
            >
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer Info with Line Decoration */}
      <div className="absolute bottom-8 left-0 right-0 text-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6"
          />
          
          <p className="text-white/30 text-sm mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            © 2026 Graphikardia. All rights reserved.
          </p>
          <motion.p 
            className="text-white/40 text-xs italic" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            animate={{
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Design is my language, Impact is my voice.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
