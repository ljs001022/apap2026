'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  isKo: boolean;
}

export default function MapModal({ isOpen, onClose, isKo }: MapModalProps) {
  // Close on ESC and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 md:p-10"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(14px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-5xl h-[88vh] bg-[#121212] border border-white/20 shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-[#161616] flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                  {isKo ? '전시장소 지도' : 'Exhibition Venues Map'}
                </h3>
                <span className="font-mono text-[10px] sm:text-xs text-[#8C8C8C] border border-white/15 px-2 py-0.5 hidden xs:inline-block">
                  APAP8 VENUES MAP
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/images/map-venues.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-bold border border-white/25 hover:border-white hover:bg-white hover:text-black transition-colors px-2.5 py-1 text-white"
                  title={isKo ? '새 창에서 원본 이미지 보기' : 'Open full image in new tab'}
                >
                  <span>{isKo ? '원본 크게보기' : 'FULL IMAGE'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <button
                  onClick={onClose}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors flex-shrink-0 cursor-pointer text-white ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body - Image */}
            <div className="flex-1 overflow-auto bg-[#080808] p-2 sm:p-4 md:p-6 flex items-center justify-center relative min-h-0">
              <div className="relative w-full h-full max-w-[880px] max-h-[880px] flex items-center justify-center">
                <Image
                  src="/images/map-venues.png"
                  alt={isKo ? '제8회 안양공공예술프로젝트(APAP8) 전시장소 지도' : 'APAP8 Exhibition Venues Map'}
                  width={1556}
                  height={1590}
                  className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 sm:px-6 sm:py-3 border-t border-white/10 bg-[#161616] flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#8C8C8C] flex-shrink-0">
              <span className="truncate">
                {isKo
                  ? '안양예술공원 일원 · 안양파빌리온 · 오픈 그라운드 · 아르테자이 상가'
                  : 'Anyang Art Park & City Venues'}
              </span>
              <button
                onClick={onClose}
                className="px-3 py-1 border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono text-[11px] sm:text-xs font-bold transition-colors cursor-pointer text-white flex-shrink-0 ml-2"
              >
                CLOSE [ESC]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

