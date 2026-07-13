'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConceptSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // Check if Concept B is active (pathname ends with /concept-b)
  const isConceptB = pathname.endsWith('/concept-b');

  const handleSwitch = (concept: 'a' | 'b') => {
    if (concept === 'a') {
      router.push(`/${locale}`);
    } else {
      router.push(`/${locale}/concept-b`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-col gap-2.5 max-w-[280px] font-sans pointer-events-auto"
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <Settings className="w-4 h-4 text-[#00E5FF] animate-[spin_8s_linear_infinite]" />
        <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase select-none">
          Landing Concept Switcher
        </span>
      </div>
      
      <div className="flex flex-col gap-1.5 w-48">
        <button
          onClick={() => handleSwitch('a')}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
            !isConceptB 
              ? 'bg-pink-500/20 text-pink-300 border border-pink-500/35 shadow-[0_0_15px_rgba(236,72,153,0.15)]' 
              : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <span>Concept A: 무릉도원</span>
          {!isConceptB && <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899]" />}
        </button>

        <button
          onClick={() => handleSwitch('b')}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
            isConceptB 
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35 shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
              : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <span>Concept B: 미래지향</span>
          {isConceptB && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />}
        </button>
      </div>
    </motion.div>
  );
}
