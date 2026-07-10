'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [direction, setDirection] = useState(0); // -1: left, 1: right

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % works.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  return (
    <section id="works" className="py-24 px-6 border-t border-white/5 relative bg-transparent overflow-hidden">
      {/* Background Neon Decor */}
      <div className="absolute top-1/2 right-[-10%] w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl space-y-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase block">Exhibition Gallery</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">Works / Projects</h2>
        </motion.div>

        {/* Carousel Window */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl border border-white/10 overflow-hidden bg-white/[0.01] backdrop-blur-sm group">
          
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 group-hover:scale-102"
                style={{ backgroundImage: `url(${works[currentIndex].img})` }}
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20">
                <div className="space-y-2">
                  <span className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-wider block uppercase">APAP8 Highlight</span>
                  <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">{works[currentIndex].title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm md:text-lg font-light">{works[currentIndex].artist}</p>
                </div>
                
                <span className="font-mono text-white/50 text-[10px] sm:text-xs md:text-sm border border-white/20 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/30 backdrop-blur-md">
                  YEAR {works[currentIndex].year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons (Left/Right Arrows - Hidden on mobile, shown on desktop) */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-30 pointer-events-none hidden md:flex">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 transition-all pointer-events-auto backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 transition-all pointer-events-auto backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Indicators and Progress */}
        <div className="flex items-center justify-between gap-6 px-4">
          {/* Left Arrow (Mobile only) */}
          <button 
            onClick={handlePrev}
            className="md:hidden w-9 h-9 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex space-x-2">
            {works.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <span className="font-mono text-xs text-white/40 tracking-wider">
            {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
          </span>

          {/* Right Arrow (Mobile only) */}
          <button 
            onClick={handleNext}
            className="md:hidden w-9 h-9 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
