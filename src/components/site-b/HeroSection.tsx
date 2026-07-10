'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  t: (key: string) => string;
  locale: string;
}

export default function HeroSection({ t, locale }: HeroProps) {
  return (
    <section id="hero" className="relative h-[85vh] min-h-[600px] max-h-[900px] flex flex-col justify-center items-center px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A] z-0" 
      />
      
      {/* Subtle Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.12, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-0" 
      />

      <div className="relative z-10 flex flex-col items-center space-y-6 md:space-y-8 max-w-4xl text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs md:text-sm font-mono tracking-[0.3em] text-white/50 uppercase"
        >
          {t('subtitle')}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight uppercase text-white drop-shadow-2xl"
        >
          {locale === 'ko' || locale === 'zh' ? '' : 'Digital '}
          <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 text-sm md:text-base lg:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
        >
          {t('desc')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="#about"
            className="w-full sm:w-auto bg-white text-black hover:bg-white/90 font-bold px-8 py-3.5 rounded-full transition-all text-xs md:text-sm uppercase tracking-wider text-center"
          >
            {t('btnConcept')}
          </a>
          <a
            href="#programs"
            className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-full transition-all text-xs md:text-sm uppercase tracking-wider text-center backdrop-blur-md"
          >
            {t('btnProgram')}
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10 hidden md:flex"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-6 bg-gradient-to-b from-white/50 to-transparent rounded-full" 
        />
      </motion.div>
    </section>
  );
}
