'use client';
import { useState, useEffect } from 'react';
import { 
  BarChart3, Target, PlusCircle, Globe, ShieldCheck, 
  Zap, Instagram, Eye, Users, Search, TrendingUp, Layout 
} from 'lucide-react';

export default function AdminPortal() {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState('surveillance');

  // CMS Simulation State
  const [heroText, setHeroText] = useState("We Build Digital Narratives");
  const [newWork, setNewWork] = useState({ title: '', url: '' });

  // Save changes locally so you see them immediately
  const handleSaveCMS = () => {
    localStorage.setItem('gk_hero_text', heroText);
    alert("SYSTEM: Changes cached. Note: For permanent public updates, copy the generated JSON to your code.");
  };

  if (!isAuth) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center font-mono p-4">
        <div className="border border-purple-500/30 p-12 bg-zinc-900/40 backdrop-blur-3xl w-full max-w-md text-center">
          <ShieldCheck className="mx-auto mb-6 text-purple-500 animate-pulse" size={48} />
          <h2 className="text-[10px] uppercase tracking-[0.5em] mb-10 text-white/60">System_Identity_Challenge</h2>
          <input 
            type="password" 
            placeholder="PASSCODE" 
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-center text-white mb-8"
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && pass === 'GK2026' && setIsAuth(true)}
          />
          <button onClick={() => pass === 'GK2026' && setIsAuth(true)} className="w-full py-4 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest">Authenticate</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* LEFT SIDEBAR NAVIGATION */}
      <nav className="w-64 border-r border-white/10 flex flex-col gap-1 p-4 bg-black">
        <div className="mb-10 px-2">
            <h1 className="text-xl font-black italic tracking-tighter text-purple-500">TERMINAL_X</h1>
            <p className="text-[8px] opacity-40 uppercase tracking-widest">Node: Secure_Edge_V1</p>
        </div>
        
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={16}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={16}/>} label="Site_Editor" />
        <NavBtn active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} icon={<TrendingUp size={16}/>} label="Search_Console" />
        <NavBtn active={activeTab === 'injector'} onClick={() => setActiveTab('injector')} icon={<Zap size={16}/>} label="Work_Injector" />
      </nav>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 overflow-hidden flex flex-col">
        
        {/* TOP STATUS BAR */}
        <div className="h-12 border-b border-white/10 bg-zinc-900/20 flex items-center justify-between px-8 text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"/> Live_Feed</span>
                <span className="opacity-40">Active_Users: 14</span>
            </div>
            <div className="opacity-40">{new Date().toLocaleTimeString()}</div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          
          {/* 1. SURVEILLANCE (POSTHOG EMBED) */}
          {activeTab === 'surveillance' && (
            <div className="h-full flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Heatmap_&_Session_Surveillance</h3>
              </div>
              {/* Replace URL with your PostHog Dashboard Share Link */}
              <div className="flex-1 border border-white/10 rounded bg-zinc-900/50 relative min-h-[500px]">
                <iframe 
                    src="https://app.posthog.com/embedded/YOUR_DASHBOARD_ID" 
                    className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 transition-all"
                    frameBorder="0"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20 shadow-inner"></div>
              </div>
            </div>
          )}

          {/* 2. DIRECT SITE EDITOR (CMS SIMULATION) */}
          {activeTab === 'editor' && (
            <div className="max-w-4xl space-y-10">
              <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Hero_Section_Controller</h3>
                <div className="p-6 border border-white/5 bg-zinc-900/20">
                    <label className="text-[9px] opacity-40 uppercase block mb-2">Main Headline</label>
                    <textarea 
                        value={heroText}
                        onChange={(e) => setHeroText(e.target.value)}
                        className="w-full bg-black border border-white/10 p-4 text-xl font-bold italic outline-none focus:border-purple-500 h-32"
                    />
                    <button onClick={handleSaveCMS} className="mt-4 px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">
                        Update_Live_Hero
                    </button>
                </div>
              </section>

              <section className="p-6 border border-white/5 bg-zinc-900/20">
                <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4">JSON_Configuration_Output</h3>
                <p className="text-[9px] opacity-40 mb-4">Paste this into your `config.json` to make changes permanent across the server.</p>
                <code className="block bg-black p-4 text-[10px] text-green-400 border border-white/5">
                    {`{ "hero": "${heroText}", "timestamp": "${Date.now()}" }`}
                </code>
              </section>
            </div>
          )}

          {/* 3. SEO ENGINE (GOOGLE EMBED) */}
          {activeTab === 'seo' && (
            <div className="h-full flex flex-col gap-4">
               <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Search_Console_Intelligence</h3>
               <div className="flex-1 border border-white/10 rounded overflow-hidden min-h-[500px]">
                 {/* Google Search Console cannot be embedded easily due to security, so we use a Proxy or simplified stat view */}
                 <div className="p-20 text-center opacity-20 italic text-xs uppercase tracking-[1em]">
                    [Awaiting_Search_Console_API_Handshake]
                 </div>
               </div>
            </div>
          )}

          {/* 4. WORK INJECTOR */}
          {activeTab === 'injector' && (
            <div className="max-w-2xl space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Inject_New_Narrative</h3>
                <div className="grid gap-4">
                    <input type="text" placeholder="Project Name" className="bg-black border border-white/10 p-4 text-xs outline-none focus:border-purple-500" onChange={e => setNewWork({...newWork, title: e.target.value})} />
                    <input type="text" placeholder="Media URL (Video/Image)" className="bg-black border border-white/10 p-4 text-xs outline-none focus:border-purple-500" onChange={e => setNewWork({...newWork, url: e.target.value})} />
                    <button className="bg-purple-600 p-4 text-[10px] font-black uppercase tracking-widest">Inject_To_Vault</button>
                </div>
                <div className="p-6 border border-dashed border-white/10 text-[10px] opacity-60">
                    Generated Code Segment:<br/>
                    <code className="text-purple-400">{`{ title: "${newWork.title}", url: "${newWork.url}" }`}</code>
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
    <button onClick={onClick} className={`flex items-center gap-4 p-4 transition-all text-[10px] font-bold uppercase tracking-widest ${
      active ? 'bg-purple-600/10 text-white border-l-2 border-purple-600' : 'text-white/30 hover:text-white'
    }`}>
      {icon} {label}
    </button>
  );
}
