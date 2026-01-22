'use client';
import { useState } from 'react';
import { ShieldCheck, Eye, Layout, Target, Save, Search, Globe, ExternalLink, Loader2 } from 'lucide-react';

export default function AdminPortal() {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  
  // Editor State
  const [heroTitle, setHeroTitle] = useState(localStorage.getItem('gk_hero_title') || "WE BUILD DIGITAL NARRATIVES");
  
  // Competitor Scanner State
  const [targetUrl, setTargetUrl] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // 1. COMPETITOR GHOST SCANNER LOGIC
  const scanTarget = async () => {
    if (!targetUrl) return;
    setIsScanning(true);
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
      const data = await response.json();
      const html = data.contents;

      // Extract Intel via Regex
      const title = html.match(/<title>(.*?)<\/title>/)?.[1] || "Not Found";
      const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1] || "No Meta Description Detected";
      const keywords = html.match(/<meta name="keywords" content="(.*?)"/)?.[1] || "None specified";
      
      setScanResult({ title, desc, keywords, url: targetUrl });
    } catch (err) {
      alert("UPLINK_ERROR: Check URL format");
    } finally {
      setIsScanning(false);
    }
  };

  const handleCommit = () => {
    localStorage.setItem('gk_hero_title', heroTitle);
    window.location.reload(); // Refreshes to sync preview
  };

  if (!isAuth) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center font-mono">
        <div className="border border-white/10 p-12 bg-zinc-900/20 backdrop-blur-3xl w-80 text-center">
          <ShieldCheck className="mx-auto mb-6 text-purple-500" size={40} />
          <input type="password" placeholder="KEY" className="w-full bg-transparent border-b border-white/20 py-2 outline-none text-center text-white mb-8 uppercase tracking-widest" onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && pass === 'GK2026' && setIsAuth(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* SIDEBAR */}
      <nav className="w-64 border-r border-white/5 bg-black p-6 flex flex-col gap-2">
        <h1 className="text-xl font-black italic mb-10 text-purple-500 tracking-tighter uppercase">Terminal_X</h1>
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={16}/>} label="Site_Editor" />
        <NavBtn active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Target size={16}/>} label="Target_Scan" />
      </nav>

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP STATUS */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-8 text-[9px] uppercase tracking-widest bg-zinc-900/10 opacity-60">
          <span>Node: India_South_Edge</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* TAB: LIVE EDITOR + PREVIEW */}
          {activeTab === 'editor' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
              <div className="space-y-8">
                <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest">Interface_Override</h3>
                <div className="space-y-4">
                  <label className="text-[10px] opacity-40 uppercase">Hero Headline</label>
                  <textarea 
                    value={heroTitle} 
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full bg-black border border-white/10 p-4 text-xl font-bold italic outline-none focus:border-purple-600 h-40"
                  />
                  <button onClick={handleCommit} className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-purple-600 hover:text-white transition-all">
                    <Save size={14}/> Commit_Changes
                  </button>
                </div>
              </div>

              {/* LIVE PREVIEW WINDOW */}
              <div className="relative border border-white/10 rounded bg-zinc-900/30 overflow-hidden h-[600px] hidden lg:block">
                <div className="bg-zinc-900 p-2 text-[8px] uppercase tracking-widest text-center border-b border-white/10 text-white/40 italic">
                  Preview_Mode_Active
                </div>
                <iframe src="/" className="w-full h-full scale-[0.9] origin-top opacity-80" />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
              </div>
            </div>
          )}

          {/* TAB: COMPETITOR INTELLIGENCE */}
          {activeTab === 'market' && (
            <div className="max-w-4xl space-y-10 animate-in fade-in duration-500">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest">Target_Intelligence_Uplink</h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://competitor-site.in" 
                    className="flex-1 bg-black border border-white/10 p-4 text-xs outline-none focus:border-purple-500"
                    onChange={(e) => setTargetUrl(e.target.value)}
                  />
                  <button onClick={scanTarget} className="bg-purple-600 px-8 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-50" disabled={isScanning}>
                    {isScanning ? <Loader2 className="animate-spin" size={14}/> : 'Initiate_Scan'}
                  </button>
                </div>
              </div>

              {scanResult && (
                <div className="border border-white/10 bg-zinc-900/20 p-8 space-y-6">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <p className="text-[8px] opacity-40 uppercase mb-1">Target_Identity</p>
                      <h4 className="text-xl font-bold text-purple-400">{scanResult.title}</h4>
                    </div>
                    <a href={scanResult.url} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 text-white transition-all"><ExternalLink size={14}/></a>
                  </div>
                  
                  <div>
                    <p className="text-[8px] opacity-40 uppercase mb-2">Meta_Description_Intel</p>
                    <p className="text-xs leading-relaxed italic opacity-80">"{scanResult.desc}"</p>
                  </div>

                  <div>
                    <p className="text-[8px] opacity-40 uppercase mb-2">Captured_Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {scanResult.keywords.split(',').map((k: string) => (
                        <span key={k} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-[9px] text-purple-400 font-mono lowercase">{k.trim()}</span>
                      ))}
                    </div>
                  </div>
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
    <button onClick={onClick} className={`flex items-center gap-4 p-4 transition-all text-[10px] font-bold uppercase tracking-widest border-l-2 ${
      active ? 'bg-purple-600/10 text-white border-purple-600' : 'text-white/20 border-transparent hover:text-white'
    }`}>
      {icon} {label}
    </button>
  );
}
