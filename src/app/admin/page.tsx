'use client';
import { useState } from 'react';
// Correct relative path: Up two levels to src, then into context
import { useTerminal } from '../../context/TerminalContext';
import { 
  ShieldCheck, Layout, Target, Save, Video, Image as ImageIcon, 
  MessageSquare, Plus, Trash2, Search, Loader2, Eye, Map as MapIcon,
  ExternalLink
} from 'lucide-react';

export default function AdminPage() {
  const { db, updateDb } = useTerminal();
  const [activeTab, setActiveTab] = useState('surveillance');
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  
  // Intelligence States
  const [targetUrl, setTargetUrl] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // COMPETITOR SCAN LOGIC
  const scanTarget = async () => {
    if (!targetUrl) return;
    setIsScanning(true);
    try {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();
      const title = data.contents.match(/<title>(.*?)<\/title>/)?.[1] || "Target_Identity_Unknown";
      const desc = data.contents.match(/<meta name="description" content="(.*?)"/)?.[1] || "No_Description_Found";
      setScanResult({ title, desc, url: targetUrl });
    } catch (e) {
      alert("UPLINK_FAILED: Terminal could not reach target.");
    } finally {
      setIsScanning(false);
    }
  };

  if (!isAuth) return (
    <div className="h-screen bg-black flex items-center justify-center font-mono p-4">
      <div className="border border-purple-500/20 p-10 bg-zinc-900/5 backdrop-blur-xl text-center w-full max-w-sm">
        <ShieldCheck className="mx-auto mb-6 text-purple-500 animate-pulse" size={40} />
        <h2 className="text-[10px] text-white/40 uppercase tracking-[0.4em] mb-8">Authorization_Required</h2>
        <input 
          type="password" 
          autoFocus
          placeholder="ENTER_KEY" 
          className="w-full bg-transparent border-b border-white/20 text-center outline-none text-white mb-8 uppercase tracking-[1em]" 
          onChange={e => setPass(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && pass === 'GK2026' && setIsAuth(true)} 
        />
        <button 
          onClick={() => pass === 'GK2026' && setIsAuth(true)}
          className="text-[9px] font-black text-purple-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          Initialize_Handshake
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <nav className="w-full md:w-64 border-r border-white/5 bg-black p-6 space-y-1 shrink-0">
        <div className="mb-10 px-2">
            <h1 className="text-xl font-black italic text-purple-600 tracking-tighter">TERMINAL_X</h1>
            <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Region: IN-BOM-1</p>
        </div>
        
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={14}/>} label="Site_Editor" />
        <NavBtn active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Target size={14}/>} label="Target_Intel" />
      </nav>

      {/* MAIN COMMAND PANEL */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-12 border-b border-white/5 flex items-center justify-between px-8 text-[9px] uppercase tracking-widest bg-zinc-900/5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"/> Connected</span>
            <span className="opacity-30">Latency: 14ms</span>
          </div>
          <span className="opacity-30">{new Date().toLocaleDateString()}</span>
        </header>

        <div className="p-8 lg:p-12">
          
          {/* TAB 1: SURVEILLANCE & INDIA MAP */}
          {activeTab === 'surveillance' && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Live_Active_Users" value="842" color="text-green-500" />
                <StatCard label="India_Edge_Cache" value="98.2%" color="text-purple-500" />
                <StatCard label="System_Uptime" value="99.99%" color="text-blue-400" />
              </div>

              <div className="border border-white/10 bg-zinc-900/20 rounded-sm overflow-hidden p-1">
                <div className="bg-black/40 p-4 border-b border-white/5 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-white/60 flex items-center gap-2">
                    <MapIcon size={12}/> Domestic_Traffic_Density_India
                  </span>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[8px]"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Primary_Nodes</div>
                  </div>
                </div>
                <div className="h-[450px] relative bg-zinc-950 flex items-center justify-center grayscale">
                  {/* Geographic Layout Visualization */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/India_location_map.svg')] bg-center bg-no-repeat bg-contain" />
                  
                  {/* Mumbai Node */}
                  <PulsePoint top="55%" left="42%" label="BOM_CORE" />
                  {/* Bengaluru Node */}
                  <PulsePoint top="75%" left="48%" label="BLR_NODE" />
                  {/* Delhi Node */}
                  <PulsePoint top="30%" left="46%" label="DEL_UP" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GLOBAL SITE EDITOR */}
          {activeTab === 'editor' && (
            <div className="max-w-4xl space-y-10">
              {/* HERO CONTENT */}
              <section className="space-y-4">
                <h3 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">01_Narrative_Override</h3>
                <div className="grid gap-6 p-6 border border-white/5 bg-zinc-900/10">
                  <div className="space-y-2">
                    <label className="text-[9px] opacity-30 uppercase">Main_Headline</label>
                    <input 
                      value={db.hero.title} 
                      onChange={e => updateDb({...db, hero: {...db.hero, title: e.target.value.toUpperCase()}})} 
                      className="w-full bg-black border border-white/10 p-4 font-black italic text-xl focus:border-purple-500 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] opacity-30 uppercase">Mission_Statement</label>
                    <textarea 
                      value={db.about.text} 
                      onChange={e => updateDb({...db, about: {text: e.target.value}})} 
                      className="w-full bg-black border border-white/10 p-4 h-32 text-sm focus:border-purple-500 outline-none" 
                    />
                  </div>
                </div>
              </section>

              {/* MEDIA WORK VAULT */}
              <section className="space-y-4">
                <h3 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">02_Portfolio_Vault</h3>
                <div className="grid gap-3">
                  {db.work.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border border-white/5 bg-zinc-900/10 items-center">
                      <div className="flex gap-4 flex-1">
                        <select 
                          value={item.type} 
                          onChange={e => {
                            const newWork = [...db.work]; newWork[i].type = e.target.value; updateDb({...db, work: newWork});
                          }}
                          className="bg-black border border-white/10 text-[9px] p-2"
                        >
                          <option value="video">VIDEO</option>
                          <option value="image">IMAGE</option>
                        </select>
                        <input value={item.title} onChange={e => {
                          const newWork = [...db.work]; newWork[i].title = e.target.value; updateDb({...db, work: newWork});
                        }} className="bg-transparent border-b border-white/10 text-xs flex-1 outline-none" placeholder="Project_Title" />
                      </div>
                      <input value={item.url} onChange={e => {
                        const newWork = [...db.work]; newWork[i].url = e.target.value; updateDb({...db, work: newWork});
                      }} className="bg-transparent border-b border-white/10 text-[9px] flex-1 outline-none opacity-40 italic" placeholder="CDN_Link_Direct" />
                      <button onClick={() => {
                        const newWork = db.work.filter((_: any, idx: number) => idx !== i); updateDb({...db, work: newWork});
                      }} className="text-red-500/30 hover:text-red-500 transition-colors p-2"><Trash2 size={16}/></button>
                    </div>
                  ))}
                  <button onClick={() => updateDb({...db, work: [...db.work, {id: Date.now(), title: "NEW_PROJECT", type: "video", url: ""}]})} className="w-full py-6 border border-dashed border-white/10 text-[9px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <Plus size={14}/> Inject_New_Media_Node
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: TARGET INTELLIGENCE */}
          {activeTab === 'market' && (
            <div className="space-y-8 max-w-3xl animate-in fade-in duration-500">
               <h3 className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.4em]">Rival_Entity_Analysis</h3>
               <div className="flex gap-2 p-2 border border-white/10 bg-black">
                 <input 
                  value={targetUrl} 
                  onChange={e => setTargetUrl(e.target.value)} 
                  className="flex-1 bg-transparent p-4 text-xs outline-none" 
                  placeholder="SCAN_TARGET_URL (e.g. agency-site.in)" 
                 />
                 <button onClick={scanTarget} className="bg-white text-black px-10 font-black uppercase text-[10px] hover:bg-purple-600 hover:text-white transition-all">
                   {isScanning ? <Loader2 className="animate-spin"/> : 'EXECUTE_SCAN'}
                 </button>
               </div>

               {scanResult && (
                 <div className="p-10 border border-white/5 bg-zinc-900/10 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-20"><Target size={80}/></div>
                   <p className="text-[9px] opacity-40 uppercase mb-6 tracking-widest flex items-center gap-2">
                     <div className="w-1 h-1 bg-red-500 rounded-full" /> Captured_Intel_Report
                   </p>
                   <h4 className="text-2xl font-black italic text-purple-400 mb-2">{scanResult.title}</h4>
                   <p className="text-sm opacity-60 leading-relaxed max-w-xl italic mb-6">"{scanResult.desc}"</p>
                   <a href={scanResult.url} target="_blank" className="inline-flex items-center gap-2 text-[10px] text-white/40 hover:text-white transition-colors">
                     OPEN_ORIGIN_SOURCE <ExternalLink size={10}/>
                   </a>
                 </div>
               )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// UI COMPONENT HELPERS
function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-l-2 ${active ? 'bg-purple-600/10 text-white border-purple-600' : 'text-white/20 border-transparent hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, color }: any) {
  return (
    <div className="p-6 border border-white/5 bg-zinc-900/10 hover:bg-zinc-900/20 transition-colors">
      <p className="text-[8px] opacity-30 uppercase tracking-widest mb-3">{label}</p>
      <h4 className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</h4>
    </div>
  );
}

function PulsePoint({ top, left, label }: any) {
  return (
    <div className="absolute" style={{ top, left }}>
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
      <div className="w-2 h-2 bg-purple-500 rounded-full relative -top-2" />
      <span className="absolute left-4 -top-1 text-[7px] text-white/40 whitespace-nowrap tracking-widest">{label}</span>
    </div>
  );
}
