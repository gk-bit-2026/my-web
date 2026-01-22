'use client';
import { useState } from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { 
  ShieldCheck, Layout, Target, Plus, Trash2, Loader2, Eye, Map as MapIcon, ExternalLink, Palette, Sun, Moon 
} from 'lucide-react';

export default function AdminPage() {
  const { db, updateDb } = useTerminal();
  const [activeTab, setActiveTab] = useState('surveillance');
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanTarget = async () => {
    if (!targetUrl) return;
    setIsScanning(true);
    try {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();
      const title = data.contents.match(/<title>(.*?)<\/title>/)?.[1] || "Target_Identity_Unknown";
      const desc = data.contents.match(/<meta name="description" content="(.*?)"/)?.[1] || "No_Description_Found";
      setScanResult({ title, desc, url: targetUrl });
    } catch (e) { alert("UPLINK_FAILED"); } finally { setIsScanning(false); }
  };

  if (!isAuth) return (
    <div className="h-screen bg-black flex items-center justify-center font-mono p-4 text-white">
      <div className="border border-purple-500/20 p-10 bg-zinc-900/5 backdrop-blur-xl text-center w-full max-w-sm">
        <ShieldCheck className="mx-auto mb-6 text-purple-500 animate-pulse" size={40} />
        <input type="password" placeholder="ENTER_KEY" className="w-full bg-transparent border-b border-white/20 text-center outline-none mb-8 uppercase tracking-[1em]" onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && pass === 'GK2026' && setIsAuth(true)} />
        <button onClick={() => pass === 'GK2026' && setIsAuth(true)} className="text-[9px] font-black text-purple-500 uppercase tracking-widest">Initialize_Handshake</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col md:flex-row">
      <nav className="w-full md:w-64 border-r border-white/5 bg-black p-6 space-y-1 shrink-0">
        <div className="mb-10 px-2">
            <h1 className="text-xl font-black italic text-purple-600 tracking-tighter">TERMINAL_X</h1>
            <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Region: IN-BOM-1</p>
        </div>
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={14}/>} label="Site_Editor" />
        <NavBtn active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Target size={14}/>} label="Target_Intel" />
      </nav>

      <main className="flex-1 overflow-y-auto">
        <header className="h-12 border-b border-white/5 flex items-center justify-between px-8 text-[9px] uppercase tracking-widest bg-zinc-900/5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"/> Connected</span>
          </div>
          <span className="opacity-30">{new Date().toLocaleTimeString()}</span>
        </header>

        <div className="p-8 lg:p-12">
          {activeTab === 'surveillance' && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Live_Nodes_IN" value="1,240" color="text-green-500" />
                <StatCard label="Edge_Efficiency" value="98.2%" color="text-purple-500" />
                <StatCard label="Uptime" value="99.9%" color="text-blue-400" />
              </div>
              <div className="h-[450px] border border-white/10 relative bg-zinc-950 flex items-center justify-center grayscale opacity-50">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/India_location_map.svg')] bg-center bg-no-repeat bg-contain" />
                <PulsePoint top="55%" left="42%" label="BOM_CORE" />
                <PulsePoint top="75%" left="48%" label="BLR_NODE" />
                <PulsePoint top="30%" left="46%" label="DEL_UP" />
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div className="max-w-4xl space-y-12 animate-in slide-in-from-bottom-4">
              {/* THEME OVERRIDE */}
              <section className="space-y-4">
                <h3 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-2">
                  <Palette size={12}/> 01_Visual_Style_Override
                </h3>
                <div className="p-6 border border-white/5 bg-zinc-900/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] opacity-30 uppercase block">Accent_Color</label>
                    <div className="flex gap-4 items-center">
                      <input type="color" value={db.appearance.accentColor} onChange={e => updateDb({...db, appearance: {...db.appearance, accentColor: e.target.value}})} className="w-12 h-12 bg-transparent cursor-pointer" />
                      <span className="text-xs font-bold uppercase">{db.appearance.accentColor}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] opacity-30 uppercase block">Environment_Mode</label>
                    <div className="flex gap-2">
                      <button onClick={() => updateDb({...db, appearance: {...db.appearance, isDark: true}})} className={`flex-1 p-3 text-[9px] border flex items-center justify-center gap-2 ${db.appearance.isDark ? 'border-purple-500 bg-purple-500/10' : 'border-white/10'}`}><Moon size={10}/> Dark</button>
                      <button onClick={() => updateDb({...db, appearance: {...db.appearance, isDark: false}})} className={`flex-1 p-3 text-[9px] border flex items-center justify-center gap-2 ${!db.appearance.isDark ? 'border-black bg-white text-black' : 'border-white/10'}`}><Sun size={10}/> Light</button>
                    </div>
                  </div>
                </div>
              </section>

              {/* NARRATIVE */}
              <section className="space-y-4">
                <h3 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">02_Narrative_Override</h3>
                <div className="grid gap-6 p-6 border border-white/5 bg-zinc-900/10">
                  <input value={db.hero.title} onChange={e => updateDb({...db, hero: {...db.hero, title: e.target.value.toUpperCase()}})} className="w-full bg-black border border-white/10 p-4 font-black italic text-xl outline-none" placeholder="HEADLINE" />
                  <textarea value={db.about.text} onChange={e => updateDb({...db, about: {text: e.target.value}})} className="w-full bg-black border border-white/10 p-4 h-32 text-sm outline-none" placeholder="MISSION" />
                </div>
              </section>

              {/* PORTFOLIO */}
              <section className="space-y-4">
                <h3 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">03_Portfolio_Vault</h3>
                {db.work.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 border border-white/5 bg-zinc-900/10 items-center">
                    <input value={item.title} onChange={e => {const n = [...db.work]; n[i].title = e.target.value; updateDb({...db, work: n})}} className="bg-transparent border-b border-white/10 text-xs flex-1 outline-none" placeholder="Project_Title" />
                    <input value={item.url} onChange={e => {const n = [...db.work]; n[i].url = e.target.value; updateDb({...db, work: n})}} className="bg-transparent border-b border-white/10 text-[9px] flex-1 outline-none opacity-40" placeholder="CDN_URL" />
                    <button onClick={() => {const n = db.work.filter((_: any, x: number) => x !== i); updateDb({...db, work: n})}} className="text-red-500/40 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button onClick={() => updateDb({...db, work: [...db.work, {id: Date.now(), title: "NEW_NODE", type: "video", url: ""}]})} className="w-full py-6 border border-dashed border-white/10 text-[9px] uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center justify-center gap-2"><Plus size={14}/> Inject_Asset</button>
              </section>
            </div>
          )}

          {activeTab === 'market' && (
            <div className="space-y-8 max-w-3xl">
               <h3 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">Rival_Entity_Analysis</h3>
               <div className="flex gap-2 p-2 border border-white/10 bg-black">
                 <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)} className="flex-1 bg-transparent p-4 text-xs outline-none" placeholder="SCAN_URL" />
                 <button onClick={scanTarget} className="bg-white text-black px-10 font-black text-[10px]">{isScanning ? 'SCANNING...' : 'EXECUTE'}</button>
               </div>
               {scanResult && (
                 <div className="p-10 border border-white/5 bg-zinc-900/10">
                   <h4 className="text-2xl font-black italic text-purple-400">{scanResult.title}</h4>
                   <p className="text-sm opacity-60 mt-4 italic">"{scanResult.desc}"</p>
                 </div>
               )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// HELPERS
function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 text-[10px] font-bold uppercase tracking-widest transition-all border-l-2 ${active ? 'bg-purple-600/10 text-white border-purple-600' : 'text-white/20 border-transparent hover:text-white hover:bg-white/5'}`}>{icon} {label}</button>
  );
}
function StatCard({ label, value, color }: any) {
  return (
    <div className="p-6 border border-white/5 bg-zinc-900/10">
      <p className="text-[8px] opacity-30 uppercase tracking-widest mb-3">{label}</p>
      <h4 className={`text-2xl font-black italic ${color}`}>{value}</h4>
    </div>
  );
}
function PulsePoint({ top, left, label }: any) {
  return (
    <div className="absolute" style={{ top, left }}>
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
      <div className="w-2 h-2 bg-purple-500 rounded-full relative -top-2" />
      <span className="absolute left-4 -top-1 text-[7px] text-white/40 tracking-widest">{label}</span>
    </div>
  );
}
