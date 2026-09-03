'use client';

import React, { useState } from 'react';
import { CardTheme } from './ArtistCard';
import { Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PosterBannerProps {
  locale?: string;
  theme?: CardTheme;
  className?: string;
}

export default function PosterBannerSection({
  locale = 'ko',
  theme = 'lime',
  className = '',
}: PosterBannerProps) {
  const isKo = locale === 'ko';
  const [isZoomed, setIsZoomed] = useState(false);

  const themeStyles = {
    lime: {
      container: 'border-[#B4FF39]/30 hover:border-[#B4FF39]/60 shadow-[0_0_40px_rgba(180,255,57,0.08)] rounded-xl',
      header: 'border-[#B4FF39]/20 bg-[#B4FF39]/5 text-white/90',
      badge: 'bg-[#B4FF39] text-black font-bold',
      btn: 'hover:bg-[#B4FF39]/20 text-[#B4FF39] border-[#B4FF39]/30',
    },
    cyan: {
      container: 'border-[#00E5FF]/30 hover:border-[#00E5FF]/60 shadow-[0_0_40px_rgba(0,229,255,0.1)] rounded-sm',
      header: 'border-[#00E5FF]/20 bg-[#00E5FF]/5 text-white/90',
      badge: 'bg-[#00E5FF] text-black font-bold',
      btn: 'hover:bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/30',
    },
    peach: {
      container: 'border-white/20 hover:border-rose-400/50 shadow-[0_8px_32px_rgba(244,63,94,0.12)] rounded-2xl backdrop-blur-md',
      header: 'border-white/10 bg-white/5 text-white/90',
      badge: 'bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold',
      btn: 'hover:bg-white/10 text-rose-300 border-rose-400/30',
    },
    blackwhite: {
      container: 'border-white hover:border-white rounded-none bg-black',
      header: 'border-white bg-[#141414] text-white',
      badge: 'bg-[#002FA7] text-white font-bold',
      btn: 'hover:bg-white hover:text-black text-white border-white',
    },
  }[theme];

  return (
    <>
      <section className={`relative py-10 md:py-14 px-5 sm:px-6 max-w-6xl mx-auto z-10 ${className}`}>
        <div className={`relative border overflow-hidden transition-all duration-300 group ${themeStyles.container}`}>
          {/* Header row */}
          <div className={`flex flex-wrap items-center justify-between px-5 sm:px-8 py-3.5 border-b font-mono text-xs gap-3 ${themeStyles.header}`}>
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider ${themeStyles.badge}`}>
                {isKo ? '공식 포스터' : 'OFFICIAL POSTER'}
              </span>
              <span className="font-bold tracking-tight text-white/90 text-xs sm:text-sm">
                {isKo ? 'APAP8 공식 키 비주얼 & 포스터' : 'APAP8 KEY VISUAL & POSTER'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-white/60 hidden sm:inline">
                {isKo ? '2026.09.30 — 11.29 · 안양파빌리온' : '2026.09.30 — 11.29 · Anyang Pavilion'}
              </span>
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-mono transition-colors cursor-pointer ${themeStyles.btn}`}
                title={isKo ? '포스터 크게 보기' : 'View Full Image'}
              >
                <Maximize2 className="w-3 h-3" />
                <span>{isKo ? '확대' : 'ZOOM'}</span>
              </button>
            </div>
          </div>

          {/* Poster Image Container */}
          <div
            onClick={() => setIsZoomed(true)}
            className="relative aspect-[16/9] w-full overflow-hidden bg-[#FAF7D3] cursor-pointer"
          >
            <picture className="w-full h-full block">
              <source type="image/webp" srcSet="/images/apap8_uniform.webp" />
              <img
                src="/images/APAP8_uniform.gif"
                alt={isKo ? "제8회 안양공공예술프로젝트(APAP8) 공식 포스터 - ARTEX: 예술대전환" : "The 8th Anyang Public Art Project (APAP8) Official Poster"}
                className="w-full h-full object-contain sm:object-cover group-hover:scale-[1.012] transition-transform duration-700 ease-out"
                loading="eager"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-colors z-50 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] aspect-[16/9] w-full border border-white/20 rounded-lg overflow-hidden shadow-2xl bg-[#FAF7D3]"
            >
              <picture className="w-full h-full flex items-center justify-center">
                <source type="image/webp" srcSet="/images/apap8_uniform.webp" />
                <img
                  src="/images/APAP8_uniform.gif"
                  alt={isKo ? "제8회 안양공공예술프로젝트(APAP8) 공식 포스터" : "The 8th Anyang Public Art Project (APAP8) Official Poster"}
                  className="w-full h-full object-contain"
                />
              </picture>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
