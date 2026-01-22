'use client';
import { useState, useEffect } from 'react';
import { useTerminal } from '../context/TerminalContext';
import { 
  ShieldCheck, Layout, Target, Save, Video, Image as ImageIcon, 
  MessageSquare, Plus, Trash2, Search, Loader2, Eye, Map as MapIcon
} from 'lucide-react';

export default function AdminPortal() {
  const { db, updateDb } = useTerminal();
  const [activeTab, setActiveTab] = useState('surveillance');
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  
  // Analytics State
  const [targetUrl, setTargetUrl] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  if (!isAuth) return (
    <div className="h-screen bg-black flex items-center justify-center font-mono">
      <div className="border border-purple-500/20 p-10 bg-zinc-900/10 text-center">
        <ShieldCheck className="mx-auto mb-4 text-purple-500 animate-pulse" />
        <input type="password" placeholder="HANDSHAKE_KEY" className="bg-transparent border-b border-white/20 text-center outline-none uppercase tracking-[1em]" onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && pass === 'GK2026' && setIsAuth(true)} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* SIDEBAR NAVIGATION */}
      <nav className="w-64 border-r border-white/5 bg-black p-6 space-y-1">
        <div className="mb-10 px-2">
            <h1 className="text-xl font-black italic text-purple-600 tracking-tighter">TERMINAL_X</h1>
            <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Node: IN-MUM-1</p>
        </div>
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={14}/>} label="Site_Controller" />
        <NavBtn active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Target size={14}/>} label="Target_Analysis" />
      </nav>

      {/* MAIN COMMAND INTERFACE */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-8 text-[9px] uppercase tracking-widest bg-zinc-900/5">
          <span>System_Status: Optimal</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>

        <div className="p-10">
          {/* TAB 1: SURVEILLANCE & INDIA TRAFFIC MAP */}
          {activeTab === 'surveillance' && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="grid grid-cols-3 gap-6">
                <StatCard label="Live_Nodes_IN" value="1,240" color="text-green-500" />
                <StatCard label="Avg_Latency" value="18ms" color="text-purple-500" />
                <StatCard label="Data_Throughput" value="84GB/s" color="text-blue-500" />
              </div>

              <div className="h-[500px] border border-white/10 bg-zinc-900/20 relative rounded-sm overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-black/80 p-3 border border-white/10">
                    <p className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <MapIcon size={10} className="text-purple-500"/> Traffic_Density_Mumbai_Bengaluru_Delhi
                    </p>
                </div>
                {/*  */}
                <div className="w-full h-full grayscale brightness-50 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/India_location_map.svg')] bg-center bg-no-repeat bg-contain shadow-inner" />
                
                {/* Simulated Pings */}
                <div className="absolute top-1/2 left-[45%] w-2 h-2 bg-purple-500 rounded-full animate-ping" title="Mumbai Node" />
                <div className="absolute top-[65%] left-[52%] w-2 h-2 bg-purple-500 rounded-full animate-ping" title="Bengaluru Node" />
                <div className="absolute top-[30%] left-[48%] w-2 h-2 bg-purple-500 rounded-full animate-ping" title="Delhi Node" />
              </div>
            </div>
          )}

          {/* TAB 2: FULL CMS EDITOR */}
          {activeTab === 'editor' && (
            <div className="max-w-4xl space-y-12 animate-in slide-in-from-bottom-4">
              {/* HERO & ABOUT */}
              <section className="p-8 border border-white/5 bg-zinc-900/10 space-y-6">
                <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Node_Content_Override</h3>
                <div>
                  <label className="text-[9px] opacity-30 uppercase block mb-2">Main Headline</label>
                  <input value={db.hero.title} onChange={e => updateDb({...db, hero: {...db.hero, title: e.target.value}})} className="w-full bg-black border border-white/10 p-4 font-black italic text-xl outline-none focus:border-purple-600" />
                </div>
                <div>
                  <label className="text-[9px] opacity-30 uppercase block mb-2">About_Narrative</label>
                  <textarea value={db.about.text} onChange={e => updateDb({...db, about: {text: e.target.value}})} className="w-full bg-black border border-white/10 p-4 h-32 text-sm outline-none focus:border-purple-600" />
                </div>
              </section>

              {/* MEDIA WORK VAULT */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Media_Work_Vault</h3>
                <div className="grid gap-4">
                  {db.work.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4 p-4 border border-white/5 bg-zinc-900/10 items-center">
                      <div className="p-2 bg-white/5">{item.type === 'video' ? <Video size={14}/> : <ImageIcon size={14}/>}</div>
                      <input value={item.title} onChange={e => {
                        const newWork = [...db.work]; newWork[i].title = e.target.value; updateDb({...db, work: newWork});
                      }} className="bg-transparent border-b border-white/10 text-xs flex-1 outline-none" placeholder="Project Name" />
                      <input value={item.url} onChange={e => {
                        const newWork = [...db.work]; newWork[i].url = e.target.value; updateDb({...db, work: newWork});
                      }} className="bg-transparent border-b border-white/10 text-[9px] flex-1 outline-none opacity-40" placeholder="CDN URL (Cloudinary/Vercel Blob)" />
                      <button onClick={() => {
                        const newWork = db.work.filter((_: any, idx: number) => idx !== i); updateDb({...db, work: newWork});
                      }} className="text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  ))}
                  <button onClick={() => updateDb({...db, work: [...db.work, {id: Date.now(), title: "New_Asset", type: "video", url: ""}]})} className="w-full py-4 border border-dashed border-white/10 text-[9px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:bg-white/5">+ Inject_New_Asset_Slot</button>
                </div>
              </section>

              {/* TESTIMONIALS */}
              <section className="p-8 border border-white/5 bg-zinc-900/10 space-y-4">
                <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Social_Proof_Sync</h3>
                {db.testimonials.map((t: any, i: number) => (
                  <div key={i} className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <input value={t.name} onChange={e => {
                      const nt = [...db.testimonials]; nt[i].name = e.target.value; updateDb({...db, testimonials: nt});
                    }} className="bg-black border border-white/5 p-3 text-[10px]" placeholder="Client Name" />
                    <textarea value={t.quote} onChange={e => {
                      const nt = [...db.testimonials]; nt[i].quote = e.target.value; updateDb({...db, testimonials: nt});
                    }} className="bg-black border border-white/5 p-3 text-[10px] h-20" placeholder="Quote" />
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* TAB 3: COMPETITOR ANALYSIS */}
          {activeTab === 'market' && (
            <div className="space-y-8 max-w-2xl">
              <h3 className="text-xs font-bold uppercase text-purple-500 tracking-[0.4em]">Rival_Entity_Intelligence</h3>
              <div className="flex gap-2">
                <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)} className="flex-1 bg-black border border-white/10 p-4 text-xs" placeholder="ENTER_URL (e.g. competitor.in)" />
                <button onClick={async () => {
                  setIsScanning(true);
                  const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
                  const data = await res.json();
                  const title = data.contents.match(/<title>(.*?)<\/title>/)?.[1] || "Unknown";
                  const desc = data.contents.match(/<meta name="description" content="(.*?)"/)?.[1] || "No Meta";
                  setScanResult({ title, desc });
                  setIsScanning(false);
                }} className="bg-white text-black px-8 text-[10px] font-black uppercase">
                  {isScanning ? <Loader2 className="animate-spin"/> : 'Execute_Scan'}
                </button>
              </div>
              {scanResult && (
                <div className="p-10 border border-white/5 bg-zinc-900/30">
                  <h4 className="text-xl font-bold italic text-purple-400">{scanResult.title}</h4>
                  <p className="mt-4 text-xs opacity-60 leading-relaxed">{scanResult.desc}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// UI HELPERS
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
