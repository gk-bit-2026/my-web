'use client';
import { useState, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { authenticator } from 'otplib';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, Eye, Save, Download, Upload, AlertTriangle 
} from 'lucide-react';

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

  authenticator.options = { window: 1 };

  const handleLogin = () => {
    // 1. STRIP WHITESPACE
    const cleanOtp = otp.trim();

    // 2. IMMEDIATE BYPASS (Always works even if DB is broken)
    if (cleanOtp === '000000') {
      console.log("BYPASS_AUTHORIZED");
      setIsAuth(true);
      return;
    }

    // 3. DEFENSIVE SECRET RETRIEVAL
    const currentSecret = db?.auth?.secret || 'KARDIA_SECRET_2026';

    try {
      if (cleanOtp.length === 6 && authenticator.check(cleanOtp, currentSecret)) {
        setIsAuth(true);
      } else {
        alert("ACCESS_DENIED: INVALID_HANDSHAKE");
        console.log("DEBUG", { expected: authenticator.generate(currentSecret), secret: currentSecret });
      }
    } catch (e) {
      alert("SYSTEM_ERROR: Check console.");
      console.error(e);
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
          autoFocus 
          type="text" 
          placeholder="ENTER_CODE" 
          className="w-full bg-transparent border-b border-purple-500/30 text-center text-3xl outline-none mb-6 tracking-[0.3em]" 
          value={otp}
          onChange={e => setOtp(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="w-full py-3 bg-purple-600 text-[10px] font-bold hover:bg-purple-500 transition-all uppercase tracking-widest">Verify_Identity</button>
        <p className="mt-4 text-[8px] text-center opacity-30">EMERGENCY_BYPASS: 000000</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      <nav className="w-64 border-r border-white/5 bg-black p-6 space-y-1">
        <h1 className="text-lg font-black italic text-purple-600 mb-8 tracking-tighter underline underline-offset-8 decoration-white/10 text-center">TERMINAL_X</h1>
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'maint'} onClick={() => setActiveTab('maint')} icon={<Save size={14}/>} label="Maintenance" />
      </nav>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'surveillance' && (
          <div className="space-y-6 max-w-5xl">
            <h2 className="text-purple-500 text-[10px] font-black tracking-[0.4em] mb-10 uppercase">System_Access_Logs</h2>
            <div className="border border-white/5 bg-zinc-900/10 divide-y divide-white/5">
              {db?.surveillance?.map((log: any) => (
                <div key={log.id} className="p-4 flex items-center justify-between group hover:bg-white/[0.02]">
                  <div className="flex items-center gap-6 text-[10px]">
                    <span className="opacity-30">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={cn("px-2 py-0.5 font-black uppercase", log.is_india ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500")}>
                      {log.location || "UNKNOWN_IP"}
                    </span>
                    <span className="opacity-60">{log.device}</span>
                    <span className="opacity-20">→</span>
                    <span className="text-white/80">{log.path}</span>
                  </div>
                  {log.is_india && <span className="text-[8px] bg-orange-600 px-2 py-0.5 font-bold">IN_ORIGIN</span>}
                </div>
              ))}
              {(!db?.surveillance || db.surveillance.length === 0) && (
                <div className="p-10 text-center opacity-20 text-[10px]">NO_LOG_DATA_IN_BUFFER</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'maint' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-white/5 bg-white/[0.02]">
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest">DATABASE_PERSISTENCE</h3>
                <div className="flex gap-4">
                  <button onClick={exportData} className="flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-black hover:bg-zinc-200"><Download size={14}/> EXPORT_DB</button>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border border-white/20 px-4 py-2 text-[10px] font-black hover:bg-white/5"><Upload size={14}/> IMPORT_DB</button>
                  <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={(e:any) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => { 
                      try {
                        updateDb(JSON.parse(ev.target?.result as string)); 
                        window.location.reload();
                      } catch { alert("CRITICAL: INVALID_DATA_STRUCTURE"); }
                    };
                    reader.readAsText(e.target.files[0]);
                  }} />
                </div>
              </div>

              <div className="p-6 border border-white/5 bg-white/[0.02]">
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest uppercase">2FA_Synchronization</h3>
                <div className="flex flex-col gap-4">
                   <div className="text-[10px]">
                      <span className="opacity-40 uppercase">Secret:</span> <code className="text-purple-400 ml-2">{db?.auth?.secret || 'NONE'}</code>
                   </div>
                   <button onClick={() => setShowQR(!showQR)} className="w-fit text-purple-500 text-[10px] font-bold underline underline-offset-4 decoration-purple-500/30">
                     {showQR ? 'HIDE_SECURITY_QR' : 'GENERATE_NEW_SYNC_QR'}
                   </button>
                   {showQR && (
                    <div className="mt-4 p-3 bg-white inline-block rounded-sm">
                      <QRCodeSVG 
                        value={authenticator.keyuri('Admin', 'Graphikardia', db?.auth?.secret || 'KARDIA_SECRET_2026')} 
                        size={150} 
                        level="H"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={cn(
      "w-full flex items-center gap-4 p-4 text-[10px] font-black uppercase tracking-widest transition-all", 
      active ? "bg-purple-600/10 text-white border-l-2 border-purple-600" : "text-white/20 border-l-2 border-transparent hover:text-white/50 hover:bg-white/[0.01]"
    )}>
      {icon} {label}
    </button>
  );
}
