'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ locale }: { locale: string }) {
  const navT = useTranslations('nav');
  const locales = ['ko', 'en', 'ja', 'zh'];
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled || isOpen ? "bg-[#0A0A0A]/90 backdrop-blur-lg border-white/10 py-3" : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl md:text-2xl font-black tracking-widest text-white">
            APAP 8
          </span>
          <span className="hidden sm:inline-block text-[10px] text-white/50 font-mono tracking-widest border border-white/20 px-2 py-0.5 rounded-full bg-white/5">
            ANYANG PUBLIC ART PROJECT
          </span>
        </div>

        <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-[10px] xl:text-xs font-semibold uppercase tracking-widest text-white/60">
          <a href="#hero" className="hover:text-white transition-colors">Hero</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#artists" className="hover:text-white transition-colors">Artists</a>
          <a href="#works" className="hover:text-white transition-colors">Works</a>
          <a href="#program" className="hover:text-white transition-colors">Program</a>
          <a href="#visit" className="hover:text-white transition-colors">Visit</a>
          <a href="#news" className="hover:text-white transition-colors">News</a>
        </nav>

        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="hidden sm:flex border border-white/10 rounded-full overflow-hidden text-[10px] font-mono bg-[#0A0A0A]/50">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={cn(
                  "px-2.5 py-1.5 transition-colors uppercase",
                  locale === loc ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                )}
              >
                {loc}
              </Link>
            ))}
          </div>

          <Link
            href={`/archive/${locale}`}
            className="flex items-center space-x-1 border border-white/10 bg-white text-black hover:bg-white/90 text-[10px] md:text-[11px] font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all group"
          >
            <span>{navT('archiveBack')}</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Hamburger button for mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-[#0A0A0A] overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-4 text-xs font-semibold uppercase tracking-widest text-white/60">
              <a href="#hero" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">Hero</a>
              <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">About</a>
              <a href="#artists" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">Artists</a>
              <a href="#works" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">Works</a>
              <a href="#program" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">Program</a>
              <a href="#visit" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2 border-b border-white/5">Visit</a>
              <a href="#news" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors py-2">News</a>
              
              {/* Mobile Language Selector */}
              <div className="flex border border-white/10 rounded-full overflow-hidden text-[10px] font-mono bg-black w-fit mt-4">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    className={cn(
                      "px-3.5 py-2 transition-colors uppercase",
                      locale === loc ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                    )}
                  >
                    {loc}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
