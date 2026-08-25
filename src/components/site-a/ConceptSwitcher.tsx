'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Settings, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConceptSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  // Determine active concept
  const isConceptB = pathname.endsWith('/concept-b');
  const isConceptC = pathname.endsWith('/concept-c');
  const isConceptBW = pathname.includes('/concept-blackwhite') || pathname.includes('/concept-bw');
  const activeConcept = isConceptBW ? 'bw' : isConceptB ? 'b' : isConceptC ? 'c' : 'a';

  useEffect(() => {
    const saved = localStorage.getItem('apap8_switcher_minimized');
    if (saved === 'true') {
      setIsMinimized(true);
    }
  }, []);

  const handleMinimize = (val: boolean) => {
    setIsMinimized(val);
    localStorage.setItem('apap8_switcher_minimized', String(val));
  };

  const handleSwitch = (concept: 'a' | 'b' | 'c' | 'bw') => {
    if (concept === 'a') {
      router.push(`/${locale}`);
    } else if (concept === 'b') {
      router.push(`/${locale}/concept-b`);
    } else if (concept === 'c') {
      router.push(`/${locale}/concept-c`);
    } else {
      router.push(`/${locale}/concept-blackwhite`);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans pointer-events-auto">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => handleMinimize(false)}
            className="w-12 h-12 rounded-full bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/40 hover:border-white text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,255,255,0.25)] cursor-pointer active:scale-90 transition-all duration-300"
            title="Expand Concept Switcher"
          >
            <Settings className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-col gap-2.5 max-w-[280px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-white animate-[spin_8s_linear_infinite]" />
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase select-none">
                  Concept Switcher
                </span>
              </div>
              <button
                onClick={() => handleMinimize(true)}
                className="text-white/40 hover:text-white/80 p-0.5 rounded transition-colors cursor-pointer"
                title="Minimize Switcher"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1.5 w-56">
              <button
                onClick={() => handleSwitch('bw')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeConcept === 'bw' 
                    ? 'bg-white/20 text-white border border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>Concept BW: Black &amp; White (신규)</span>
                {activeConcept === 'bw' && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />}
              </button>

              <button
                onClick={() => handleSwitch('a')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeConcept === 'a' 
                    ? 'bg-lime-500/20 text-lime-300 border border-lime-500/35 shadow-[0_0_15px_rgba(180,255,57,0.15)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>Concept A: Landing A (기본)</span>
                {activeConcept === 'a' && <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_#b4ff39]" />}
              </button>

              <button
                onClick={() => handleSwitch('b')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeConcept === 'b' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/35 shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>Concept B: 미래지향</span>
                {activeConcept === 'b' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />}
              </button>

              <button
                onClick={() => handleSwitch('c')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeConcept === 'c' 
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/35 shadow-[0_0_15px_rgba(236,72,153,0.15)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>Concept C: 무릉도원</span>
                {activeConcept === 'c' && <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_#ec4899]" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
