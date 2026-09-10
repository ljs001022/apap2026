'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SectionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  title: string;
  children: React.ReactNode;
}

export default function SectionDetailModal({
  isOpen,
  onClose,
  category,
  title,
  children,
}: SectionDetailModalProps) {
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
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#121212] border border-white/20 shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-4 sm:p-6 border-b border-white/10 bg-[#161616]">
              <div className="space-y-1 pr-6">
                <span className="font-mono text-caption text-[#8C8C8C] uppercase tracking-wider font-bold">
                  {category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white leading-snug">
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-body text-[#B9B9B9] hide-scrollbar">
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
