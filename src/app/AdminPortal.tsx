'use client';
import { useState, useEffect } from 'react';
import { 
  Target, PlusCircle, Globe, ShieldCheck, 
  Zap, Eye, Users, TrendingUp, Layout, Save, Search, barChart3
} from 'lucide-react';

export default function AdminPortal() {
  const [isAuth, setIsAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState('surveillance');

  // --- LIVE EDITOR STATES ---
  const [heroTitle, setHeroTitle] = useState(localStorage.getItem('gk_hero_title') || "WE BUILD DIGITAL NARRATIVES");
  const [projectCount, setProjectCount] = useState(localStorage.getItem('gk_proj_count') || "42");

  const handleCommit = () => {
    localStorage.setItem('gk_hero_title', heroTitle);
    localStorage.setItem('gk_proj_count', projectCount);
    alert("CRITICAL: Local Node Updated. Refresh site to view changes.");
  };

  if (!isAuth) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center font-mono">
        <div className="border border-white/10 p-12 bg-zinc-900/20 backdrop-blur-3xl w-80 text-center shadow-2xl">
          <ShieldCheck className="mx-auto mb-6 text-purple-500 animate-pulse" size={40} />
          <input 
            type="password" 
            autoFocus
            className="w-full bg-transparent border-b border-white/20 py-2 outline-none text-center text-white mb-8 tracking-[1em]"
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && pass === 'GK2026' && setIsAuth(true)}
          />
          <button onClick={() => pass === 'GK2026' && setIsAuth(true)} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-purple-500">Initialize_Access</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col md:flex-row">
      {/* SIDEBAR: NAVIGATION */}
      <aside className="w-full md:w-72 border-r border-white/5 bg-black p-6 flex flex-col gap-2">
        <div className="mb-12">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">TERMINAL_X</h1>
          <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Region: IN-SOUTH-1</p>
        </div>
        
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={18}/>} label="Market_Intelligence" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={18}/>} label="Live_Site_Editor" />
        <NavBtn active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<Target size={18}/>} label="Competitor_Scan" />
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HUD TOP BAR */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-8 text-[9px] uppercase tracking-[0.3em] bg-zinc-900/10">
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"/> System_Secure</span>
            <span className="opacity-40 hidden md:block">Node_Latency: 14ms</span>
          </div>
          <div className="opacity-40">{new Date().toLocaleDateString()} // {new Date().toLocaleTimeString()}</div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* TAB 1: SURVEILLANCE (Direct Tracking) */}
          {activeTab === 'surveillance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatBox label="Daily_Unique_IN" value="1.4k" trend="+18%" />
                <StatBox label="Avg_Engagement" value="2m 45s" trend="+4%" />
                <StatBox label="Bounce_Rate" value="22%" trend="-5%" />
              </div>
              
              <div className="h-[500px] border border-white/10 bg-zinc-900/20 rounded p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Live_User_Flow_India</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/5 text-[8px] rounded-full">Mumbai_Node</span>
                    <span className="px-3 py-1 bg-white/5 text-[8px] rounded-full">Bengaluru_Node</span>
                  </div>
                </div>
                {/* Embedded Vercel/Google Analytics View */}
                <div className="flex-1 bg-black/40 border border-white/5 flex items-center justify-center italic text-white/20 text-xs tracking-widest">
                  [REPLACING_POSTHOG_WITH_VERCEL_INDIA_EDGE_FEED...]
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE EDITOR (Direct Site Control) */}
          {activeTab === 'editor' && (
            <div className="max-w-3xl space-y-12">
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-purple-500 mb-8">Narrative_Control_Override</h2>
                <div className="space-y-8 p-8 border border-white/5 bg-zinc-900/10">
                  <div>
                    <label className="text-[9px] opacity-30 uppercase block mb-3">Main_Hero_Headline</label>
                    <textarea 
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full bg-black border border-white/10 p-6 text-2xl font-black italic text-white outline-none focus:border-purple-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] opacity-30 uppercase block mb-3">Project_Counter_Value</label>
                    <input 
                      type="text"
                      value={projectCount}
                      onChange={(e) => setProjectCount(e.target.value)}
                      className="w-full bg-black border border-white/10 p-4 text-sm font-bold text-purple-500 outline-none focus:border-purple-600"
                    />
                  </div>
                  <button 
                    onClick={handleCommit}
                    className="flex items-center gap-4 bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all"
                  >
                    <Save size={14}/> Commit_to_Live_Production
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: COMPETITOR SCAN */}
          {activeTab === 'market' && (
            <div className="space-y-6">
               <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-purple-500">Target_Analysis</h2>
               <div className="grid gap-4">
                  <div className="flex gap-2">
                    <input type="text" placeholder="ENTER_COMPETITOR_URL" className="flex-1 bg-black border border-white/10 p-4 text-xs outline-none focus:border-purple-500" />
                    <button className="bg-white text-black px-8 text-[10px] font-bold uppercase tracking-widest">Scan</button>
                  </div>
                  <div className="border border-white/5 p-20 text-center opacity-10 text-xs tracking-[1em] uppercase">
                    Awaiting_Target_Data
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// UI HELPER COMPONENTS
function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-5 p-5 transition-all text-[10px] font-bold uppercase tracking-widest border-l-2 ${
      active ? 'bg-purple-600/10 text-white border-purple-600' : 'text-white/20 border-transparent hover:text-white hover:bg-white/5'
    }`}>
      {icon} <span className="hidden md:block">{label}</span>
    </button>
  );
}

function StatBox({ label, value, trend }: any) {
  return (
    <div className="p-6 border border-white/5 bg-zinc-900/30">
      <p className="text-[8px] opacity-30 uppercase mb-3 tracking-widest">{label}</p>
      <div className="flex justify-between items-end">
        <h4 className="text-3xl font-black italic">{value}</h4>
        <span className={`text-[9px] font-bold ${trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{trend}</span>
      </div>
    </div>
  );
}
