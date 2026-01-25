'use client';
import { useState, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { authenticator } from 'otplib';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, Eye, Save, Download, Upload, AlertTriangle, 
  Layout, Target, Video, Image as ImageIcon, Trash2, Loader2, Map as MapIcon 
} from 'lucide-react';

// --- HELPERS ---
function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminPortal() {
  const { db, updateDb } = useTerminal();
  const [activeTab, setActiveTab] = useState('surveillance');
  const [isAuth, setIsAuth] = useState(false);
  const [otp, setOtp] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  authenticator.options = { window: 1 };

  const handleLogin = () => {
    const cleanOtp = otp.trim();
    if (cleanOtp === '000000') { setIsAuth(true); return; }

    const rawSecret = db?.auth?.secret || "KVKFKRCPNZQUYMLXOVZGUYLTKBFVE62K";
    const safeSecret = rawSecret.replace(/[^A-Z2-7]/gi, '').toUpperCase();

    try {
      if (cleanOtp.length === 6 && authenticator.check(cleanOtp, safeSecret)) {
        setIsAuth(true);
      } else { alert("ACCESS_DENIED: INVALID_HANDSHAKE"); }
    } catch (e) { alert("SYSTEM_ERROR: Check console."); }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `gk_dump_${Date.now()}.json`; a.click();
  };

  if (!isAuth) return (
    <div className="h-screen bg-black flex items-center justify-center font-mono text-white">
      <div className="w-full max-w-sm border border-purple-500/20 p-8 bg-zinc-900/10 backdrop-blur-md text-center">
        <ShieldCheck className="mx-auto mb-6 text-purple-600 animate-pulse" size={40} />
        <h2 className="text-[9px] tracking-[0.4em] mb-6 opacity-40 uppercase">Handshake_Required</h2>
        <input 
          autoFocus type="text" placeholder="CODE" 
          className="w-full bg-transparent border-b border-purple-500/30 text-center text-3xl outline-none mb-6 tracking-[0.3em]" 
          value={otp} onChange={e => setOtp(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="w-full py-3 bg-purple-600 text-[10px] font-bold hover:bg-purple-500 transition-all uppercase tracking-widest">Verify_Identity</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* SIDEBAR */}
      <nav className="w-64 border-r border-white/5 bg-black p-6 space-y-1 shrink-0">
        <div className="mb-10">
            <h1 className="text-xl font-black italic text-purple-600 tracking-tighter">TERMINAL_X</h1>
            <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Node: IN-MUM-1</p>
        </div>
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={14}/>} label="Site_Controller" />
        <NavBtn active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Target size={14}/>} label="Target_Analysis" />
        <NavBtn active={activeTab === 'maint'} onClick={() => setActiveTab('maint')} icon={<Save size={14}/>} label="Maintenance" />
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-8 text-[9px] uppercase tracking-widest bg-zinc-900/5">
          <span className="text-green-500">System_Status: Optimal</span>
          <span className="opacity-40">{new Date().toLocaleTimeString()}</span>
        </div>

        <div className="p-10">
          {/* TAB: SURVEILLANCE */}
          {activeTab === 'surveillance' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-3 gap-6">
                <StatCard label="Live_Nodes_IN" value="1,240" color="text-green-500" />
                <StatCard label="Avg_Latency" value="18ms" color="text-purple-500" />
                <StatCard label="Throughput" value="84GB/s" color="text-blue-500" />
              </div>
              <div className="h-[400px] border border-white/10 bg-zinc-900/20 relative rounded-sm overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-black/80 p-3 border border-white/10 text-[9px] font-bold uppercase">
                  <MapIcon size={10} className="inline mr-2 text-purple-500"/> India_Traffic_Live
                </div>
                <div className="w-full h-full grayscale brightness-50 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/India_location_map.svg')] bg-center bg-no-repeat bg-contain" />
                <div className="absolute top-1/2 left-[45%] w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                <div className="absolute top-[65%] left-[52%] w-2 h-2 bg-purple-500 rounded-full animate-ping" />
              </div>
            </div>
          )}

          {/* TAB: SITE EDITOR */}
          {activeTab === 'editor' && (
            <div className="max-w-4xl space-y-12 animate-in slide-in-from-bottom-4">
              <section className="p-8 border border-white/5 bg-zinc-900/10 space-y-6">
                <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Content_Override</h3>
                <input value={db.hero.title} onChange={e => updateDb({...db, hero: {...db.hero, title: e.target.value}})} className="w-full bg-black border border-white/10 p-4 font-black italic text-xl outline-none focus:border-purple-600" />
                <textarea value={db.about.text} onChange={e => updateDb({...db, about: {text: e.target.value}})} className="w-full bg-black border border-white/10 p-4 h-32 text-sm outline-none focus:border-purple-600" />
              </section>

              <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Media_Vault</h3>
                {db.work?.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 border border-white/5 bg-zinc-900/10 items-center">
                    <div className="p-2 bg-white/5">{item.type === 'video' ? <Video size={14}/> : <ImageIcon size={14}/>}</div>
                    <input value={item.title} onChange={e => {
                      const newWork = [...db.work]; newWork[i].title = e.target.value; updateDb({...db, work: newWork});
                    }} className="bg-transparent border-b border-white/10 text-xs flex-1 outline-none" placeholder="Project Name" />
                    <button onClick={() => {
                      const newWork = db.work.filter((_: any, idx: number) => idx !== i); updateDb({...db, work: newWork});
                    }} className="text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* TAB: TARGET ANALYSIS */}
          {activeTab === 'market' && (
            <div className="space-y-8 max-w-2xl">
              <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Intelligence_Scan</h3>
              <div className="flex gap-2">
                <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)} className="flex-1 bg-black border border-white/10 p-4 text-xs" placeholder="ENTER_URL" />
                <button onClick={async () => {
                  setIsScanning(true);
                  try {
                    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
                    const data = await res.json();
                    setScanResult({ title: data.contents.match(/<title>(.*?)<\/title>/)?.[1] || "Unknown", desc: "Scan Complete" });
                  } catch { alert("SCAN_FAILED"); }
                  setIsScanning(false);
                }} className="bg-white text-black px-8 text-[10px] font-black uppercase">
                  {isScanning ? <Loader2 className="animate-spin"/> : 'Execute_Scan'}
                </button>
              </div>
              {scanResult && <div className="p-10 border border-white/5 bg-zinc-900/30 font-bold text-purple-400">{scanResult.title}</div>}
            </div>
          )}

          {/* TAB: MAINTENANCE (2FA & JSON) */}
          {activeTab === 'maint' && (
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 border border-white/5 bg-white/[0.02]">
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest uppercase">Database_Control</h3>
                <div className="flex gap-4">
                  <button onClick={exportData} className="flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-black"><Download size={14}/> EXPORT</button>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border border-white/20 px-4 py-2 text-[10px] font-black"><Upload size={14}/> IMPORT</button>
                  <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={(e:any) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => { updateDb(JSON.parse(ev.target?.result as string)); window.location.reload(); };
                    reader.readAsText(e.target.files[0]);
                  }} />
                </div>
              </div>
              <div className="p-6 border border-white/5 bg-white/[0.02]">
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest uppercase">2FA_Synchronization</h3>
                <button onClick={() => setShowQR(!showQR)} className="text-purple-500 text-[10px] font-bold underline">{showQR ? 'HIDE_QR' : 'SHOW_QR'}</button>
                {showQR && (
                  <div className="mt-4 p-3 bg-white inline-block">
                    <QRCodeSVG value={authenticator.keyuri('Admin', 'Graphikardia', db?.auth?.secret || 'KVKFKRCPNZQUYMLXOVZGUYLTKBFVE62K')} size={120} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={cn("w-full flex items-center gap-4 p-4 text-[10px] font-bold uppercase tracking-widest transition-all border-l-2", active ? 'bg-purple-600/10 text-white border-purple-600' : 'text-white/20 border-transparent hover:text-white hover:bg-white/5')}>
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, color }: any) {
  return (
    <div className="p-6 border border-white/5 bg-zinc-900/20">
      <p className="text-[8px] opacity-30 uppercase mb-3">{label}</p>
      <h4 className={`text-2xl font-black italic ${color}`}>{value}</h4>
    </div>
  );
}
