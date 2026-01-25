'use client';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages & Components
import WorkPage from './WorkPage';
import TestimonialsPage from './TestimonialsPage';
import AdminPortal from './admin/page'; 
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { KardiaMethodology } from './components/KardiaMethodology';
import { ProductVault } from './components/ProductVault';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { FooterCTA } from './components/FooterCTA';
import { LoadingScreen } from './components/LoadingScreen';
import { ImpactSidebar } from './components/ImpactSidebar';
import { CustomCursor } from './components/CustomCursor';

// Context
import { ThemeProvider, useTheme } from '../lib/ThemeContext'; 
import { cn } from '../lib/utils';

// --- SECRET SHORTCUTS & TRACKING ---
function GlobalSystems() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. KEYBOARD SHORTCUT (Ctrl + Alt + X)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        navigate('/admin');
      }
    };

    // 2. SILENT LOCATION TRACKING (No Permission Popup)
    const traceVisitor = async () => {
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geo = await geoRes.json();
        
        const log = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          device: navigator.userAgent.includes('Mobi') ? 'MOBILE' : 'DESKTOP',
          location: `${geo.city}, ${geo.country_name}`,
          is_india: geo.country_code === 'IN',
          path: window.location.pathname
        };

        const saved = localStorage.getItem('gk_terminal_db');
        if (saved) {
          const db = JSON.parse(saved);
          const updatedLogs = [log, ...(db.surveillance || [])].slice(0, 50);
          localStorage.setItem('gk_terminal_db', JSON.stringify({ ...db, surveillance: updatedLogs }));
        }
      } catch (e) { console.error("TRACE_FAILED"); }
    };

    window.addEventListener('keydown', handleKeyDown);
    traceVisitor();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

function ThemeGate({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    isDark ? root.classList.remove('light') : root.classList.add('light');
  }, [isDark]);
  return <div className={cn(isDark ? "dark" : "light")}>{children}</div>;
}

function MainLayout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // MOBILE SECRET: Hold Logo/Nav for 3 seconds
  const startHold = () => { timerRef.current = setTimeout(() => navigate('/admin'), 3000); };
  const endHold = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  return (
    <div className="min-h-screen">
      <div onMouseDown={startHold} onMouseUp={endHold} onTouchStart={startHold} onTouchEnd={endHold}>
        <Navigation cartCount={cart.length} openSidebar={() => setIsSidebarOpen(true)} />
      </div>
      <main>
        {children || (
          <>
            <HeroSection />
            <KardiaMethodology />
            <ProductVault 
               onAdd={(item) => { if (!cart.find(i => i.id === item.id)) { setCart([...cart, item]); setIsSidebarOpen(true); }}} 
               selectedIds={cart.map(i => i.id)} 
            />
            <BeforeAfterSlider />
          </>
        )}
      </main>
      <FooterCTA />
      <ImpactSidebar isOpen={isSidebarOpen} items={cart} onRemove={(id) => setCart(cart.filter(i => i.id !== id))} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <ThemeProvider>
      <ThemeGate>
        <CustomCursor />
        <Router>
          <GlobalSystems />
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
            ) : (
              <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/work" element={<MainLayout><WorkPage /></MainLayout>} />
                <Route path="/testimonials" element={<MainLayout><TestimonialsPage /></MainLayout>} />
                <Route path="/admin" element={<AdminPortal />} />
              </Routes>
            )}
          </AnimatePresence>
        </Router>
      </ThemeGate>
    </ThemeProvider>
  );
}
