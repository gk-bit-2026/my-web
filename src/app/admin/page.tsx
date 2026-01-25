'use client';
import { useState, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { authenticator } from 'otplib';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, Layout, Eye, Save, Download, Upload, AlertTriangle
} from 'lucide-react';

// --- FIXED: Internal 'cn' helper to kill TS2304 errors ---
function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminPortal() {
  const { db, updateDb } = useTerminal();
  const [activeTab, setActiveTab] = useState('surveillance');
  const [isAuth, setIsAuth] = useState(false);
  const [otp, setOtp] = useState('');
  const [showQR, setShowQR] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    // RE-ADDING THE BYPASS (Hotwire)
    if (otp === '000000' || (otp.length === 6 && authenticator.check(otp, db.auth.secret))) {
      setIsAuth(true);
    } else { 
      alert("ACCESS_DENIED: INVALID_HANDSHAKE"); 
      console.log("Debug Info:", { entered: otp, secret: db.auth.secret }); // Helps you see what's wrong
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `gk_dump_${Date.now()}.json`; a.click();
  };

  if (!isAuth) return (
    <div className="h-screen bg-black flex items-center justify-center font-mono text-white">
      <div className="w-full max-w-sm border border-purple-500/20 p-8 bg-zinc-900/10 backdrop-blur-md">
        <ShieldCheck className="mx-auto mb-6 text-purple-600" size={40} />
        <h2 className="text-center text-[9px] tracking-[0.4em] mb-6 opacity-40 uppercase">Handshake_Required</h2>
        <input 
          autoFocus type="text" placeholder="CODE" 
          className="w-full bg-transparent border-b border-purple-500/30 text-center text-3xl outline-none mb-6 tracking-[0.3em]" 
          onChange={e => setOtp(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="w-full py-3 bg-purple-600 text-[10px] font-bold hover:bg-purple-500 transition-all">INITIALIZE</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* SIDEBAR */}
      <nav className="w-64 border-r border-white/5 bg-black p-6 space-y-1">
        <h1 className="text-lg font-black italic text-purple-600 mb-8 tracking-tighter underline underline-offset-8 decoration-white/10">TERMINAL_X</h1>
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'maint'} onClick={() => setActiveTab('maint')} icon={<Save size={14}/>} label="Maintenance" />
      </nav>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'surveillance' && (
          <div className="space-y-6 max-w-5xl">
            <h2 className="text-purple-500 text-[10px] font-black tracking-[0.4em] mb-10">LIVE_SYSTEM_FEED</h2>
            <div className="border border-white/5 bg-zinc-900/10 divide-y divide-white/5">
              {db.surveillance?.map((log: any) => (
                <div key={log.id} className="p-4 flex items-center justify-between group hover:bg-white/[0.02]">
                  <div className="flex items-center gap-6 text-[10px]">
                    <span className="opacity-30">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={cn("px-2 py-0.5 font-black", log.is_india ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500")}>
                      {log.location?.toUpperCase() || "UNKNOWN_LOC"}
                    </span>
                    <span className="opacity-60">{log.device}</span>
                    <span className="opacity-20">→</span>
                    <span className="text-white/80">{log.path}</span>
                  </div>
                  {log.is_india && <span className="text-[8px] bg-orange-600 px-2 py-0.5 font-bold">DOMESTIC_HIT</span>}
                </div>
              ))}
              {(!db.surveillance || db.surveillance.length === 0) && (
                <div className="p-10 text-center opacity-20 text-[10px]">NO_DATA_STREAM</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'maint' && (
          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 border border-white/5 bg-white/[0.02]">
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest">PERSISTENCE_BRIDGE</h3>
                <div className="flex gap-4">
                  <button onClick={exportData} className="flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-black hover:bg-zinc-200"><Download size={14}/> EXPORT_JSON</button>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border border-white/20 px-4 py-2 text-[10px] font-black hover:bg-white/5"><Upload size={14}/> IMPORT</button>
                  <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={(e:any) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => { 
                      try {
                        updateDb(JSON.parse(ev.target?.result as string)); 
                        alert("SYSTEM_RELOAD_SUCCESS"); 
                      } catch { alert("ERROR: INVALID_JSON"); }
                    };
                    reader.readAsText(e.target.files[0]);
                  }} />
                </div>
              </div>

              <div className="p-6 border border-white/5 bg-white/[0.02]">
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest">2FA_CONFIG</h3>
                <button onClick={() => setShowQR(!showQR)} className="text-purple-500 text-[10px] font-bold underline underline-offset-4">{showQR ? 'HIDE_QR' : 'SHOW_SETUP_QR'}</button>
                {showQR && (
                  <div className="mt-4 p-2 bg-white inline-block">
                    <QRCodeSVG value={`otpauth://totp/GK?secret=${db.auth.secret}&issuer=Graphikardia`} size={120} />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-[9px] flex items-center gap-4">
              <AlertTriangle size={14} /> WARNING: SYSTEM STATE IS LOCAL. DUMP JSON TO SOURCE CODE BEFORE DEPLOYMENT TO PERSIST CHANGES.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={cn("w-full flex items-center gap-4 p-4 text-[10px] font-black uppercase tracking-widest transition-all", active ? "bg-purple-600/10 text-white border-l-2 border-purple-600" : "text-white/20 border-l-2 border-transparent hover:text-white/50")}>
      {icon} {label}
    </button>
  );
}
