'use client';
import { useState, useRef } from 'react';
import { useTerminal } from '../../context/TerminalContext';
import { authenticator } from 'otplib';
import { QRCodeSVG } from 'qrcode.react'; // npm install qrcode.react
import { 
  ShieldCheck, Layout, Target, Plus, Trash2, Eye, 
  Globe, Database, Save, Download, Upload, AlertTriangle
} from 'lucide-react';

export default function AdminPortal() {
  const { db, updateDb } = useTerminal();
  const [activeTab, setActiveTab] = useState('surveillance');
  const [isAuth, setIsAuth] = useState(false);
  const [otp, setOtp] = useState('');
  const [showQR, setShowQR] = useState(false);
  
  // Scraper/Intel State
  const [targetUrl, setTargetUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [intelReport, setIntelReport] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

const handleLogin = () => {
    try {
      // THE HOTWIRE: Added 'otp === "000000"' 
      // This allows you to enter six zeros to bypass the check.
      const isValid = authenticator.check(otp, db.auth.secret) || otp === "000000";
      
      if (isValid) {
        setIsAuth(true);
      } else {
        alert("INVALID_HANDSHAKE_CODE");
      }
    } catch (e) { 
      alert("AUTH_ENGINE_ERROR"); 
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(db, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `gk_config_${Date.now()}.json`);
    linkElement.click();
  };

  const importData = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        updateDb(json);
        alert("SYSTEM_RELOADED_SUCCESSFULLY");
      } catch (err) { alert("IMPORT_FAILED_INVALID_JSON"); }
    };
    reader.readAsText(file);
  };

  if (!isAuth) return (
    <div className="h-screen bg-black flex items-center justify-center font-mono p-6 text-white">
      <div className="w-full max-w-md border border-purple-500/30 p-10 bg-zinc-900/10 backdrop-blur-3xl">
        <ShieldCheck className="mx-auto mb-6 text-purple-500" size={48} />
        <h2 className="text-center text-[10px] tracking-[0.5em] mb-8 opacity-50 uppercase">Identity_Handshake_Required</h2>
        <input 
          type="text" placeholder="000 000" 
          className="w-full bg-transparent border-b-2 border-purple-500/20 text-center text-4xl outline-none mb-8 tracking-[0.5em]" 
          onChange={e => setOtp(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="w-full py-4 bg-purple-600 text-[10px] font-black tracking-widest hover:bg-purple-500 transition-all uppercase">Initialize_Access</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* SIDEBAR */}
      <nav className="w-64 border-r border-white/5 bg-black p-6 space-y-1">
        <h1 className="text-xl font-black italic text-purple-600 mb-10 tracking-tighter">TERMINAL_X</h1>
        <NavBtn active={activeTab === 'surveillance'} onClick={() => setActiveTab('surveillance')} icon={<Eye size={14}/>} label="Surveillance" />
        <NavBtn active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} icon={<Layout size={14}/>} label="Site_Controller" />
        <NavBtn active={activeTab === 'seo'} onClick={() => setActiveTab('seo')} icon={<Globe size={14}/>} label="SEO_Optimizer" />
        <NavBtn active={activeTab === 'intel'} onClick={() => setActiveTab('intel')} icon={<Database size={14}/>} label="Market_Intel" />
        <NavBtn active={activeTab === 'maint'} onClick={() => setActiveTab('maint')} icon={<Save size={14}/>} label="Maintenance" />
      </nav>

      <main className="flex-1 p-10 overflow-y-auto">
        {/* MAINTENANCE TAB: EXPORT/IMPORT & 2FA SETUP */}
        {activeTab === 'maint' && (
          <div className="space-y-12 max-w-4xl animate-in slide-in-from-bottom-4">
            <h2 className="text-yellow-500 text-[10px] font-black tracking-[0.4em]">SYSTEM_MAINTENANCE</h2>
            
            <section className="p-8 border border-white/5 bg-zinc-900/10 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest uppercase">Data_Persistence</h3>
                <div className="flex gap-4">
                  <button onClick={exportData} className="flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-bold">
                    <Download size={14}/> EXPORT_JSON
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border border-white/20 px-4 py-2 text-[10px] font-bold hover:bg-white/5">
                    <Upload size={14}/> IMPORT_JSON
                  </button>
                  <input type="file" ref={fileInputRef} onChange={importData} className="hidden" accept=".json" />
                </div>
              </div>

              <div>
                <h3 className="text-[9px] opacity-40 mb-4 tracking-widest uppercase">2FA_Security_Setup</h3>
                <button onClick={() => setShowQR(!showQR)} className="text-[10px] text-purple-500 underline underline-offset-4">
                  {showQR ? "HIDE_QR_CODE" : "SHOW_SETUP_QR"}
                </button>
                {showQR && (
                  <div className="mt-4 p-4 bg-white inline-block">
                    <QRCodeSVG value={`otpauth://totp/TERMINAL_X?secret=${db.auth.secret}&issuer=Graphikardia`} size={128} />
                    <p className="text-black text-[8px] mt-2 text-center font-bold">SCAN IN GOOGLE AUTH</p>
                  </div>
                )}
              </div>
            </section>

            <div className="flex items-center gap-4 p-4 border border-red-500/20 bg-red-500/5 text-red-500 text-[10px]">
              <AlertTriangle size={16} />
              <span>WARNING: CHANGES ARE STORED LOCALLY. ALWAYS EXPORT JSON BEFORE CLEARING BROWSER CACHE.</span>
            </div>
          </div>
        )}

        {/* SEO & INTEL TABS REMAIN SAME AS PREVIOUS RESPONSE (Inject into this structure) */}
        {activeTab === 'seo' && ( <div className="text-xs opacity-50 underline cursor-pointer" onClick={() => setActiveTab('editor')}>[REUSING_SEO_LOGIC_FROM_LAST_STEP]</div> )}
        {activeTab === 'intel' && ( <div className="text-xs opacity-50 underline cursor-pointer" onClick={() => setActiveTab('editor')}>[REUSING_INTEL_LOGIC_FROM_LAST_STEP]</div> )}
        {activeTab === 'editor' && ( <div className="text-xs opacity-50 underline cursor-pointer" onClick={() => setActiveTab('maint')}>[REUSING_EDITOR_LOGIC_FROM_LAST_STEP]</div> )}
      </main>
    </div>
  );
}

function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 text-[10px] font-bold uppercase tracking-widest transition-all border-l-2 ${active ? 'bg-purple-600/10 text-white border-purple-600' : 'text-white/20 border-transparent hover:text-white hover:bg-white/5'}`}>{icon} {label}</button>
  );
}
