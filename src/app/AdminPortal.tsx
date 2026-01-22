'use client';
import { useState, useEffect } from 'react';
import { 
  BarChart3, Target, PlusCircle, Globe, ShieldCheck, 
  Zap, Instagram, Eye, Users, Search, TrendingUp, ExternalLink 
} from 'lucide-react';

export default function AdminPortal() {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState('traffic');

  // Content Generator States
  const [newWork, setNewWork] = useState({ title: '', url: '', category: '' });
  const [instaLink, setInstaLink] = useState('');

  // 1. LOGIN SCREEN UI
  if (!isAuth) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center font-mono p-4">
        <div className="border border-purple-500/30 p-8 md:p-12 bg-zinc-900/40 backdrop-blur-3xl w-full max-w-md text-center shadow-[0_0_50px_rgba(168,85,247,0.15)]">
          <ShieldCheck className="mx-auto mb-6 text-purple-500 animate-pulse" size={48} />
          <h2 className="text-[10px] uppercase tracking-[0.5em] mb-10 text-white/60">System_Identity_Challenge</h2>
          
          <div className="relative mb-8">
            <input 
              type="password" 
              placeholder="ENTER_CLEARANCE_KEY" 
              className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-center text-white tracking-[1em] focus:border-purple-500 transition-all uppercase"
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && pass === 'GK2026' && setIsAuth(true)}
              autoFocus
            />
          </div>

          <button 
            onClick={() => pass === 'prakruthi.p' && setIsAuth(true)}
            className="w-full py-4 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
          >
            Execute_Handshake
          </button>
          
          <p className="mt-8 text-[8px] opacity-30 uppercase tracking-widest">Unauthorized_access_is_logged_to_ip</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono p-4 md:p-10">
      {/* HUD HEADER */}
      <header className="border-b border-white/10 pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-green-500 uppercase">System_Online</span>
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Terminal_X <span className="text-purple-600 text-sm">v1.0.4</span></h1>
        </div>
        <div className="text-[9px] opacity-40 text-left md:text-right leading-relaxed uppercase tracking-widest">
          Node: Secure_Vercel_Edge<br/>Access_Level: Founder_Prime<br/>Session: {new Date().toLocaleTimeString()}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* SIDEBAR NAVIGATION */}
        <nav className="col-span-12 lg:col-span-3 flex flex-col gap-2">
          <NavBtn active={activeTab === 'traffic'} onClick={() => setActiveTab('traffic')} icon={<Users size={16}/>} label="Live_Surveillance" />
          <NavBtn active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} icon={<TrendingUp size={16}/>} label="Search_Intelligence" />
          <NavBtn active={activeTab === 'injector'} onClick={() => setActiveTab('injector')} icon={<Zap size={16}/>} label="Narrative_Injector" />
          <NavBtn active={activeTab === 'competitors'} onClick={() => setActiveTab('competitors')} icon={<Target size={16}/>} label="Competitor_Pulse" />
        </nav>

        {/* MAIN COMMAND INTERFACE */}
        <main className="col-span-12 lg:col-span-9 border border-white/5 bg-zinc-900/10 p-6 md:p-8 min-h-[600px] backdrop-blur-sm">
          
          {/* 1. TRAFFIC SURVEILLANCE (PostHog & Vercel) */}
          {activeTab === 'traffic' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 border border-white/5 bg-black/40">
                    <h4 className="text-[10px] font-bold mb-4 opacity-50 uppercase tracking-widest">User_Heatmaps</h4>
                    <p className="text-xs mb-6">Visual tracking of where users click on "Graphikardia" branding.</p>
                    <a href="https://app.posthog.com/" target="_blank" className="text-[9px] border border-purple-500/50 px-4 py-2 hover:bg-purple-500 transition-all flex items-center gap-2 w-fit uppercase font-bold">Launch_PostHog_Engine <ExternalLink size={10}/></a>
                  </div>
                  <div className="p-6 border border-white/5 bg-black/40">
                    <h4 className="text-[10px] font-bold mb-4 opacity-50 uppercase tracking-widest">Vercel_Edge_Analytics</h4>
                    <p className="text-xs mb-6">Real-time unique visitors and geographic location tracking.</p>
                    <a href="https://vercel.com/dashboard" target="_blank" className="text-[9px] border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2 w-fit uppercase font-bold">Access_Vercel_Node <ExternalLink size={10}/></a>
                  </div>
               </div>
               <div className="p-8 border border-white/5 bg-zinc-950 text-center italic opacity-30 text-[10px] tracking-widest">
                  [LIVE_LOCATION_MAP_DATA_STREAMING...]
               </div>
            </div>
          )}

          {/* 2. SEO INTELLIGENCE (Google Search Console) */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="p-6 border border-purple-500/20 bg-purple-500/5">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Google_Search_Console_Sync</h3>
                <p className="text-[10px] opacity-60 mb-6">Your keyword rankings for "Viral Strategy" and "Brutalist Web" are monitored here.</p>
                <a href="https://search.google.com/search-console" target="_blank" className="bg-white text-black text-[9px] px-6 py-3 font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Open_SEO_Command_Center</a>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["Keywords", "CTR", "Impressions"].map(stat => (
                  <div key={stat} className="p-4 border border-white/5 text-center">
                    <p className="text-[8px] opacity-40 uppercase mb-1">{stat}</p>
                    <p className="text-xl font-bold tracking-tighter animate-pulse">SYNC...</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. NARRATIVE INJECTOR (Content Gen) */}
          {activeTab === 'injector' && (
            <div className="space-y-10 animate-in fade-in">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2"><PlusCircle size={14}/> Generate_Work_Asset</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="PROJECT_TITLE" className="bg-black/50 border border-white/10 p-4 text-[10px] outline-none focus:border-purple-500" onChange={e => setNewWork({...newWork, title: e.target.value})} />
                  <input type="text" placeholder="CDN_IMAGE_URL" className="bg-black/50 border border-white/10 p-4 text-[10px] outline-none focus:border-purple-500" onChange={e => setNewWork({...newWork, url: e.target.value})} />
                </div>
                <div className="p-4 bg-purple-600/5 border border-purple-500/20 text-[10px]">
                  <p className="text-purple-400 mb-2 font-bold">// INJECT_THIS_INTO_PRODUCTVAULT.TSX</p>
                  <code className="break-all opacity-80">{`{ id: Date.now(), title: "${newWork.title || 'NAME'}", image: "${newWork.url || 'URL'}", category: "Narrative" },`}</code>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2"><Instagram size={14}/> Social_Link_Injector</h3>
                <input type="text" placeholder="PASTE_INSTAGRAM_REEL_LINK" className="w-full bg-black/50 border border-white/10 p-4 text-[10px] outline-none focus:border-purple-500" onChange={e => setInstaLink(e.target.value)} />
                <button className="bg-white text-black text-[9px] px-8 py-3 font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Force_Social_Sync</button>
              </div>
            </div>
          )}

          {/* 4. COMPETITOR PULSE */}
          {activeTab === 'competitors' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-purple-500"><Globe size={16}/> Market_Dominance_Scan</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px]">
                  <thead className="bg-white/5 border-b border-white/10 opacity-50 uppercase tracking-widest">
                    <tr><th className="p-4">Rival_Entity</th><th className="p-4">Strategy_Gap</th><th className="p-4">Traffic_Node</th><th className="p-4">Action</th></tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Digital_Rival_01", gap: "Poor_Motion", traffic: "10k+", color: "text-red-500" },
                      { name: "Creative_Node_X", gap: "No_Brutalist_Design", traffic: "5k+", color: "text-orange-500" }
                    ].map(rival => (
                      <tr key={rival.name} className="border-b border-white/5 opacity-80 hover:opacity-100 transition-all">
                        <td className="p-4 font-bold">{rival.name}</td>
                        <td className="p-4 tracking-widest">{rival.gap}</td>
                        <td className="p-4">{rival.traffic}</td>
                        <td className="p-4"><button className="text-purple-500 hover:underline">Scan_Target</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 p-5 border transition-all text-[10px] font-bold uppercase tracking-[0.2em] group ${
      active ? 'border-purple-600 bg-purple-600/10 text-white' : 'border-white/5 text-white/40 hover:border-white/20'
    }`}>
      <span className={`${active ? 'text-purple-500' : 'group-hover:text-purple-400'}`}>{icon}</span>
      {label}
    </button>
  );
}
