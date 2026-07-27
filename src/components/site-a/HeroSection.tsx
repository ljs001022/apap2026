'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  t: (key: string) => string;
  locale: string;
}

export default function HeroSection({ t, locale }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x: dx, y: dy });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="intro" className="relative min-h-[100svh] flex flex-col justify-center items-center px-5 sm:px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A] z-0" 
      />
      
      {/* Ambient glows */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.15, 0.1] }}
        style={{ x: -mousePos.x * 60, y: -mousePos.y * 60 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] sm:left-[20%] w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] max-w-[500px] max-h-[500px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.12, 0.1] }}
        style={{ x: -mousePos.x * 40, y: -mousePos.y * 40 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] right-[5%] sm:right-[10%] w-[50vw] h-[50vw] sm:w-[30vw] sm:h-[30vw] max-w-[400px] max-h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0" 
      />

      <motion.div 
        style={{ x: -mousePos.x * 18, y: -mousePos.y * 18 }}
        className="relative z-10 flex flex-col items-center space-y-6 sm:space-y-8 w-full max-w-5xl text-center"
      >
        {/* Eyebrow */}
        <motion.span 
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[10px] sm:text-xs md:text-sm lg:text-base font-mono tracking-[0.25em] sm:tracking-[0.3em] text-white/50 uppercase px-4 text-center"
        >
          {t('subtitle')}
        </motion.span>
        
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-[2.8rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight uppercase text-white drop-shadow-2xl px-2 break-keep"
        >
          {locale === 'ko' || locale === 'zh' ? '' : 'Digital '}
          <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </motion.h1>
        
        {/* Sub description */}
        <motion.p 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white/55 text-sm sm:text-base md:text-lg xl:text-xl font-light tracking-wide max-w-xs sm:max-w-lg md:max-w-3xl mx-auto leading-relaxed break-keep px-2"
        >
          {t('desc')}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="#about"
            className="w-full sm:w-auto bg-white text-black hover:bg-pink-100 font-extrabold px-8 py-4 sm:px-12 sm:py-4.5 md:px-14 md:py-5 rounded-full transition-all text-sm sm:text-base md:text-lg xl:text-xl uppercase tracking-wider text-center hover:scale-105 active:scale-95 duration-200 shadow-lg shadow-white/5 hover:shadow-pink-500/10 cursor-pointer"
          >
            {t('btnConcept')}
          </a>
          <a
            href="#program"
            className="w-full sm:w-auto bg-white/5 border border-white/20 hover:bg-white/10 text-white hover:text-pink-300 font-extrabold px-8 py-4 sm:px-12 sm:py-4.5 md:px-14 md:py-5 rounded-full transition-all text-sm sm:text-base md:text-lg xl:text-xl uppercase tracking-wider text-center backdrop-blur-md hover:scale-105 active:scale-95 duration-200 cursor-pointer"
          >
            {t('btnProgram')}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator – visible on all sizes on mobile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-5 sm:h-6 bg-gradient-to-b from-white/50 to-transparent rounded-full" 
        />
      </motion.div>
    </section>
  );
}
