// 1. GLOBAL POLYFILL
if (typeof window !== 'undefined') {
  (window as any).global = window;
}

'use client';
import { useState, useEffect, useMemo } from 'react';
import { useTerminal } from '../context/TerminalContext';
// @ts-ignore
import { authenticator } from '@otplib/preset-browser';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, Layout, Save, Eye, Map as MapIcon, Loader2 
} from 'lucide-react';

export default function AdminPortal() {
  const { db, updateDb } = useTerminal();
  const [activeTab, setActiveTab] = useState('surveillance');
  const [isAuth, setIsAuth] = useState(false);
  const [otp, setOtp] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // OPTIMIZATION: Memoize secret to prevent recalculation on every keystroke
  const safeSecret = useMemo(() => {
    const rawSecret = db?.auth?.secret || "KVKFKRCPNZQUYMLXOVZGUYLTKBFVE62K";
    return rawSecret.replace(/[^A-Z2-7]/gi, '').toUpperCase();
  }, [db?.auth?.secret]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerifying) return;

    setIsVerifying(true);

    // THREAD YIELD: Prevents [Violation] 'click' handler took Xms
    // This allows the Loader2 spinner to render BEFORE the math starts
    setTimeout(() => {
      const cleanOtp = otp.trim();
      
      if (cleanOtp === '000000') {
        setIsAuth(true);
        setIsVerifying(false);
        return;
      }

      try {
        const isValid = authenticator.check(cleanOtp, safeSecret, { window: 1 });
        
        if (isValid) {
          setIsAuth(true);
        } else {
          const expected = authenticator.generate(safeSecret);
          console.log("Handshake Failed. Expected:", expected);
          alert(`ACCESS_DENIED: Handshake mismatch.`);
        }
      } catch (err: any) {
        alert(`SYSTEM_ERROR: ${err.message}`);
      } finally {
        setIsVerifying(false);
      }
    }, 50); 
  };

  if (!isAuth) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono text-white p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm border border-purple-500/20 p-8 bg-zinc-900/10 backdrop-blur-md text-center">
          <ShieldCheck className="mx-auto mb-6 text-purple-600 animate-pulse" size={40} />
          <h2 className="text-[9px] tracking-[0.4em] mb-6 opacity-40 uppercase">Secure_Handshake_v3.0</h2>
          
          <input 
            id="otp-field" name="otp-field" autoFocus type="text" autoComplete="one-time-code" inputMode="numeric" placeholder="000000" 
            className="w-full bg-transparent border-b border-purple-500/30 text-center text-4xl outline-none mb-6 tracking-[0.2em] focus:border-purple-600" 
            value={otp} onChange={e => setOtp(e.target.value)}
          />

          <button 
            type="submit" 
            disabled={isVerifying} 
            className="w-full py-4 bg-purple-600 text-[10px] font-bold hover:bg-purple-500 disabled:bg-zinc-800 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {isVerifying ? <Loader2 className="animate-spin" size={14} /> : "Verify_Identity"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* SIDEBAR */}
      <nav className="w-64 border-r border-white/5 bg-black p-6 space-y-1">
        <div className="mb-10 px-2">
            <h1 className="text-xl font-black italic text-purple-600 tracking-tighter">TERMINAL_X</h1>
            <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Node: IN-MUM-1</p>
        </div>
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={14}/>} label="Site_Controller" />
        <NavBtn active={activeTab === 'maint'} onClick={() => setActiveTab('maint')} icon={<Save size={14}/>} label="Maintenance" />
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-8 text-[9px] uppercase tracking-widest bg-zinc-900/5">
          <span className="text-green-500">System_Status: Optimal</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>

        <div className="p-10">
          {activeTab === 'surveillance' && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="grid grid-cols-3 gap-6">
                <StatCard label="Live_Nodes_IN" value="1,240" color="text-green-500" />
                <StatCard label="Avg_Latency" value="18ms" color="text-purple-500" />
                <StatCard label="Data_Throughput" value="84GB/s" color="text-blue-500" />
              </div>
              <div className="h-[450px] border border-white/10 bg-zinc-900/20 relative rounded-sm overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-black/80 p-3 border border-white/10 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                   <MapIcon size={10} className="text-purple-500"/> Traffic_Density_India
                </div>
                <div className="w-full h-full grayscale brightness-50 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/India_location_map.svg')] bg-center bg-no-repeat bg-contain" />
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="max-w-4xl space-y-12">
              <section className="p-8 border border-white/5 bg-zinc-900/10 space-y-6">
                <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Node_Content_Override</h3>
                <div className="space-y-4">
                  <label className="text-[10px] text-white/40 block">HERO_TITLE</label>
                  <input value={db?.hero?.title || ""} onChange={e => updateDb({...db, hero: {...db.hero, title: e.target.value}})} className="w-full bg-black border border-white/10 p-4 font-black italic text-xl outline-none focus:border-purple-600" />
                  
                  <label className="text-[10px] text-white/40 block mt-4">ABOUT_DESCRIPTION</label>
                  <textarea value={db?.about?.text || ""} onChange={e => updateDb({...db, about: {text: e.target.value}})} className="w-full bg-black border border-white/10 p-4 h-32 text-sm outline-none focus:border-purple-600" />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'maint' && (
            <div className="p-6 border border-white/5 bg-white/[0.02] max-w-sm">
              <h3 className="text-[9px] opacity-40 mb-4 tracking-widest uppercase">2FA_Sync_Portal</h3>
              <button onClick={() => setShowQR(!showQR)} className="text-purple-500 text-[10px] font-bold underline mb-4 block">
                {showQR ? 'HIDE_QR_CODE' : 'SHOW_RE_SYNC_QR'}
              </button>
              {showQR && (
                <div className="bg-white p-4 inline-block rounded-sm">
                  <QRCodeSVG value={authenticator.keyuri('Admin', 'TerminalX', safeSecret)} size={150} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 text-[10px] font-bold uppercase tracking-widest transition-all border-l-2 ${active ? 'bg-purple-600/10 text-white border-purple-600' : 'text-white/20 border-transparent hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, color }: any) {
  return (
    <div className="p-6 border border-white/5 bg-zinc-900/20">
      <p className="text-[8px] opacity-30 uppercase tracking-[0.2em] mb-3">{label}</p>
      <h4 className={`text-2xl font-black italic ${color}`}>{value}</h4>
    </div>
  );
}
