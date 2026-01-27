// 1. PRE-REACT LOG - This MUST show up if the file is being read
console.log("CRITICAL: AdminPortal.tsx file is being read by the browser.");

if (typeof window !== 'undefined') {
  (window as any).global = window;
  window.onerror = function(msg, url, line) {
    console.log("GLOBAL_ERROR_CAUGHT: ", msg, " at line: ", line);
    return false;
  };
}

'use client';
import { useState } from 'react';

export default function AdminPortal() {
  const [otp, setOtp] = useState('');

  // 2. RENDER LOG
  console.log("Portal Component is rendering.");

  const handleImmediateTest = () => {
    // 3. EVENT LOG
    console.log("CLICK DETECTED - TIME:", Date.now());
    alert("Logic is alive. Check console.");
  };

  return (
    <div style={{ height: '100vh', background: 'maroon', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>SYSTEM_DIAGNOSTIC_MODE</h1>
      <p>If you see a Maroon background, the UI is rendering.</p>
      <button 
        onClick={handleImmediateTest}
        style={{ padding: '20px', background: 'white', color: 'black', fontWeight: 'bold', fontSize: '20px' }}
      >
        TEST_CONSOLE_LOG
      </button>
    </div>
  );
}
