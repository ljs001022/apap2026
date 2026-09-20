'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface SectionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  title: string;
  children: React.ReactNode;
  /** 모달 내 이미지 갤러리 (선택). 여러 장 추가 가능한 확장 구조 */
  images?: string[];
}

export default function SectionDetailModal({
  isOpen,
  onClose,
  category,
  title,
  children,
  images = [],
}: SectionDetailModalProps) {
  const [imgIdx, setImgIdx] = React.useState(0);

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

  // 이미지 인덱스 리셋
  useEffect(() => {
    if (isOpen) setImgIdx(0);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-2.5 sm:p-6 md:p-10"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(14px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-[#121212] border border-white/20 shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-3.5 sm:p-6 border-b border-white/10 bg-[#161616]">
              <div className="space-y-1 pr-4 sm:pr-6">
                <span className="font-mono text-caption text-[#8C8C8C] uppercase tracking-wider font-bold">
                  {category}
                </span>
                <h3 className="text-base sm:text-2xl font-black text-white leading-snug">
                  {title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors flex-shrink-0 cursor-pointer text-white"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 text-body text-[#B9B9B9] hide-scrollbar">
              {/* 이미지 갤러리 (images가 있을 때만) */}
              {images.length > 0 && (
                <div className="relative w-full aspect-[4/3] bg-black border border-white/10 overflow-hidden">
                  <Image
                    src={images[imgIdx]}
                    alt={`${title} 이미지 ${imgIdx + 1}`}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-black flex items-center justify-center border border-white/20 hover:border-white transition-colors"
                        aria-label="이전 이미지"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-black flex items-center justify-center border border-white/20 hover:border-white transition-colors"
                        aria-label="다음 이미지"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 right-3 font-mono text-[10px] text-white/60 bg-black/50 px-1.5 py-0.5">
                        {imgIdx + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>
              )}
              {children}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-white/10 bg-[#161616] flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono text-xs font-bold transition-colors cursor-pointer text-white"
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
