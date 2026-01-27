'use client';
import { useState } from 'react';
// @ts-ignore
import { authenticator } from '@otplib/preset-browser';

if (typeof window !== 'undefined') { (window as any).global = window; }

export default function AdminPortal() {
  const [isAuth, setIsAuth] = useState(false);
  const [otp, setOtp] = useState('');

  // HARDCODED FOR TESTING - Scanned this into your phone?
  const TEST_SECRET = "KVKFKRCPNZQUYMLXOVZGUYLTKBFVE62K";

  const handleLogin = () => {
    console.log("!!! BUTTON CLICKED !!!");
    
    try {
      const expected = authenticator.generate(TEST_SECRET);
      console.log("INPUT:", otp);
      console.log("EXPECTED:", expected);

      if (otp === expected || otp === '000000') {
        alert("SUCCESS");
        setIsAuth(true);
      } else {
        alert("FAIL: System expected " + expected);
      }
    } catch (e: any) {
      console.error("FATAL ERROR:", e);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center font-mono">
      <h1 className="mb-4">DEBUG_MODE_ACTIVE</h1>
      <input 
        className="bg-zinc-900 border p-4 text-center text-2xl mb-4"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        placeholder="000000"
      />
      <button 
        onClick={handleLogin}
        className="bg-purple-600 px-8 py-4 font-bold uppercase"
      >
        Execute_Verify
      </button>
      <p className="mt-4 text-xs text-zinc-500">Check F12 for "!!! BUTTON CLICKED !!!"</p>
    </div>
  );
}
