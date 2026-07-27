'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlurFade from './BlurFade';

interface WorksProps {
  t: (key: string) => string;
  locale: string;
}

export default function WorksSection({ t, locale }: WorksProps) {
  const works = [
    { title: 'The Infinite Canvas', artist: 'Refik Anadol', year: '2026', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Digital Biosphere', artist: 'Ian Cheng', year: '2026', img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Synthetic Horizons', artist: 'Ayoung Kim', year: '2025', img: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Artificial Garden', artist: 'Hito Steyerl', year: '2025', img: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Robotic Forest', artist: 'Lee Bul', year: '2026', img: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1200&auto=format&fit=crop' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % works.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, zIndex: 1, transition: { x: { type: 'spring' as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } } },
    exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, scale: 0.96, zIndex: 0, transition: { x: { type: 'spring' as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.25 } } })
  };

  return (
    <section id="works" className="relative min-h-screen flex flex-col justify-center py-20 md:py-28 px-5 sm:px-6 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 right-[-10%] w-[40vw] h-[40vw] bg-pink-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl space-y-8 sm:space-y-10 relative z-10">
        
        <BlurFade className="text-center space-y-3">
          <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase block">Exhibition Gallery</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">Works / Projects</h2>
        </BlurFade>

        {/* Carousel window */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden bg-black group hover:shadow-[0_10px_35px_rgba(236,72,153,0.12)] transition-all duration-500">
          
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) handleNext();
                else if (info.offset.x > 50) handlePrev();
              }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${works[currentIndex].img})` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/20" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-12 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-6 z-20">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-pink-400 tracking-wider block uppercase">APAP8 Highlight</span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                    {works[currentIndex].title}
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base font-light">{works[currentIndex].artist}</p>
                </div>
                <span className="font-mono text-white/50 text-[10px] sm:text-xs border border-white/20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm flex-shrink-0">
                  {works[currentIndex].year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop prev/next overlay arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/60 hover:bg-pink-500/20 text-white rounded-full hidden md:flex items-center justify-center border border-white/10 hover:border-pink-400/50 transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Previous work"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/60 hover:bg-pink-500/20 text-white rounded-full hidden md:flex items-center justify-center border border-white/10 hover:border-pink-400/50 transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Next work"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between gap-4 px-2">
          {/* Mobile arrow left */}
          <button 
            onClick={handlePrev}
            className="md:hidden w-10 h-10 bg-white/5 hover:bg-pink-500/20 text-white rounded-full flex items-center justify-center border border-white/10 hover:border-pink-400/30 transition-colors cursor-pointer active:scale-90 flex-shrink-0"
            aria-label="Previous work"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center space-x-2 flex-1 md:flex-none">
            {works.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-pink-400 shadow-[0_0_8px_#f472b6]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to work ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="font-mono text-xs text-white/40 tracking-wider flex-shrink-0">
            {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
          </span>

          {/* Mobile arrow right */}
          <button 
            onClick={handleNext}
            className="md:hidden w-10 h-10 bg-white/5 hover:bg-pink-500/20 text-white rounded-full flex items-center justify-center border border-white/10 hover:border-pink-400/30 transition-colors cursor-pointer active:scale-90 flex-shrink-0"
            aria-label="Next work"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
