'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  altText?: string;
  isKo?: boolean;
}

export default function ImageZoomModal({
  isOpen,
  onClose,
  imageSrc,
  altText = 'Enlarged Image',
  isKo = true,
}: ImageZoomModalProps) {
  const [mounted, setMounted] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom & pan when image changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setZoomScale(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  // Handle mouse wheel zoom
  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    const container = zoomContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setZoomScale((prev) => {
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        const next = Math.min(4, Math.max(1, +(prev + delta).toFixed(2)));
        if (next === 1) setPanOffset({ x: 0, y: 0 });
        return next;
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, imageSrc]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!mounted || !isOpen || !imageSrc) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={zoomContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 z-[120] flex flex-col items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl select-none overscroll-none ${
          zoomScale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget && zoomScale === 1) {
            onClose();
          }
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Top Floating Control Bar */}
        <div
          className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 bg-black/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              setZoomScale((prev) => {
                const next = Math.max(1, +(prev - 0.25).toFixed(2));
                if (next === 1) setPanOffset({ x: 0, y: 0 });
                return next;
              });
            }}
            disabled={zoomScale <= 1}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white disabled:opacity-30 disabled:hover:text-white/80 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title={isKo ? '축소' : 'Zoom Out'}
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs sm:text-caption text-white font-bold min-w-[45px] sm:min-w-[50px] text-center select-none">
            {Math.round(zoomScale * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.min(4, +(prev + 0.25).toFixed(2)))}
            disabled={zoomScale >= 4}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white disabled:opacity-30 disabled:hover:text-white/80 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title={isKo ? '확대' : 'Zoom In'}
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          <button
            type="button"
            onClick={() => {
              setZoomScale(1);
              setPanOffset({ x: 0, y: 0 });
            }}
            disabled={zoomScale === 1 && panOffset.x === 0 && panOffset.y === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white disabled:opacity-30 disabled:hover:text-white/80 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title={isKo ? '원래 크기로 리셋' : 'Reset Zoom'}
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg"
          aria-label={isKo ? '닫기' : 'Close'}
          title={isKo ? '닫기 (ESC)' : 'Close (ESC)'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Display Area */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          onDoubleClick={() => {
            if (zoomScale > 1) {
              setZoomScale(1);
              setPanOffset({ x: 0, y: 0 });
            } else {
              setZoomScale(2);
            }
          }}
        >
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              transformOrigin: 'center center',
            }}
            className="max-w-[92vw] max-h-[84vh] flex items-center justify-center select-none"
          >
            <img
              src={imageSrc}
              alt={altText}
              draggable={false}
              decoding="async"
              className="max-w-full max-h-[82vh] object-contain pointer-events-none select-none shadow-2xl border border-white/10"
            />
          </div>
        </div>

        {/* Bottom Guide Hint */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4 w-full max-w-md">
          <span className="inline-block font-mono text-[11px] sm:text-xs text-white/70 bg-black/75 px-3 py-1 rounded-full border border-white/10 shadow-lg">
            {isKo
              ? '휠 스크롤 확대/축소 · 드래그 이동 · 더블클릭 초기화'
              : 'Scroll to zoom · Drag to pan · Double click to reset'}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
