'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlurFade from './BlurFade';

interface ArtistProps {
  t: (key: string) => string;
  locale: string;
}

export default function ArtistSection({ t, locale }: ArtistProps) {
  const artists = [
    { name: locale === 'ko' ? '김아영' : 'Ayoung Kim', type: 'Media Art', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '레픽 아나돌' : 'Refik Anadol', type: 'AI Installation', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '히토 슈타이어얼' : 'Hito Steyerl', type: 'Video Essay', img: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '백남준 아트센터' : 'NJP Art Center', type: 'Archival', img: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '이불' : 'Lee Bul', type: 'Sculpture', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '이안 쳉' : 'Ian Cheng', type: 'Live Simulation', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const DESKTOP_VISIBLE = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % artists.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % artists.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const getVisibleIndices = () => {
    return Array.from({ length: DESKTOP_VISIBLE }, (_, i) => (currentIndex + i) % artists.length);
  };

  return (
    <section id="artists" className="relative min-h-screen flex flex-col justify-center py-20 md:py-28 px-5 sm:px-6 bg-transparent">
      <div className="container mx-auto max-w-6xl space-y-8 sm:space-y-10">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <BlurFade className="space-y-2">
            <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase block">Artists</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">Participating Artists</h2>
          </BlurFade>
          
          {/* Navigation arrows */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button 
              onClick={handlePrev}
              className="w-11 h-11 border border-white/10 hover:border-pink-400 bg-white/5 hover:bg-pink-500/10 text-white rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Previous artist"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-11 h-11 border border-white/10 hover:border-pink-400 bg-white/5 hover:bg-pink-500/10 text-white rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90"
              aria-label="Next artist"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop: 3-card grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
          {getVisibleIndices().map((artistIdx, index) => {
            const artist = artists[artistIdx];
            return (
              <motion.div
                key={`${artistIdx}-${index}`}
                layout
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-pink-500/40 aspect-[4/5] hover:shadow-[0_15px_35px_rgba(236,72,153,0.18)] transition-all duration-500"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-70 transition-opacity duration-700 scale-100 group-hover:scale-105"
                  style={{ backgroundImage: `url(${artist.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-pink-300 border border-pink-400/30 bg-pink-500/10 px-2.5 py-0.5 rounded-full inline-block">
                    {artist.type}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-pink-200 transition-colors duration-300">
                    {artist.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: single swipeable card (full-width) */}
        <div className="md:hidden relative overflow-hidden w-full">
          <div className="flex justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, scale: 0.95, x: direction > 0 ? '80%' : '-80%' }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: direction < 0 ? '80%' : '-80%' }}
                transition={{ x: { type: "spring", stiffness: 280, damping: 28 }, opacity: { duration: 0.25 } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) handleNext();
                  else if (info.offset.x > 50) handlePrev();
                }}
                className="group cursor-grab active:cursor-grabbing relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 w-full max-w-sm aspect-[3/4] hover:shadow-[0_15px_35px_rgba(236,72,153,0.18)]"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                  style={{ backgroundImage: `url(${artists[currentIndex].img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                
                {/* Swipe hint */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest uppercase">
                  ← swipe →
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-pink-300 border border-pink-400/30 bg-pink-500/10 px-2.5 py-0.5 rounded-full inline-block">
                    {artists[currentIndex].type}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {artists[currentIndex].name}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center space-x-2 pt-2">
          {artists.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-pink-400 shadow-[0_0_8px_#f472b6]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to artist ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
