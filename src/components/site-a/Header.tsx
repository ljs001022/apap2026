'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { usePathname } from 'next/navigation';

export default function Header({ locale }: { locale: string }) {
  const navT = useTranslations('nav');
  const locales = ['ko', 'en'];
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isConceptB = pathname.endsWith('/concept-b');
  const isConceptC = pathname.endsWith('/concept-c');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { href: '#intro', label: 'Intro' },
    { href: '#exhibition', label: 'Exhibition' },
    { href: '#program', label: 'Program' },
    { href: '#visit', label: 'Visit' },
    { href: '#news', label: 'News' },
  ];

  const filteredNavLinks = isConceptC 
    ? navLinks.filter(link => link.label !== 'Intro') 
    : navLinks;

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled || isOpen ? "bg-[#0A0A0A]/95 backdrop-blur-lg border-white/10 py-3" : "bg-transparent border-transparent py-4 sm:py-5"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-widest text-white">
              APAP 8
            </span>
            <span className="hidden sm:inline-block text-[9px] sm:text-[10px] text-white/50 font-mono tracking-widest border border-white/20 px-2 py-0.5 rounded-full bg-white/5">
              ANYANG PUBLIC ART PROJECT
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-[10px] xl:text-xs font-semibold uppercase tracking-widest text-white/60">
            {filteredNavLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors py-1">{link.label}</a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Language selector – desktop */}
            <div className="hidden sm:flex border border-white/10 rounded-full overflow-hidden text-[10px] font-mono bg-[#0A0A0A]/50">
              {locales.map((loc) => {
                const targetPath = isConceptB 
                  ? `/site-a/${loc}/concept-b` 
                  : isConceptC 
                    ? `/site-a/${loc}/concept-c` 
                    : `/site-a/${loc}`;
                return (
                  <Link
                    key={loc}
                    href={targetPath}
                    className={cn(
                      "px-2.5 py-1.5 transition-colors uppercase",
                      locale === loc ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {loc}
                  </Link>
                );
              })}
            </div>

            {/* Archive button */}
            <Link
              href={`/archive/${locale}`}
              className="hidden sm:flex items-center space-x-1 border border-white/10 bg-white text-black hover:bg-white/90 text-[10px] md:text-[11px] font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all group"
            >
              <span>{navT('archiveBack')}</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Hamburger – mobile */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors active:scale-95"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col lg:hidden"
          >
            {/* Ambient glow in drawer */}
            <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[5%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Drawer header (mirrors main header height) */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <span className="text-xl font-black tracking-widest text-white">APAP 8</span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 py-6 space-y-1 overflow-y-auto">
              {filteredNavLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="group flex items-center justify-between py-4 border-b border-white/5 text-white/60 hover:text-white transition-colors"
                >
                  <span className="text-2xl font-black uppercase tracking-tight group-hover:text-pink-300 transition-colors">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-pink-400 transition-all -translate-x-1 group-hover:translate-x-0" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom bar in drawer */}
            <div className="px-8 py-6 border-t border-white/10 flex flex-col gap-4 flex-shrink-0">
              {/* Language selector */}
              <div className="flex border border-white/10 rounded-full overflow-hidden text-xs font-mono bg-black w-full">
                {locales.map((loc) => {
                  const targetPath = isConceptB 
                    ? `/site-a/${loc}/concept-b` 
                    : isConceptC 
                      ? `/site-a/${loc}/concept-c` 
                      : `/site-a/${loc}`;
                  return (
                    <Link
                      key={loc}
                      href={targetPath}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex-1 text-center py-2.5 transition-colors uppercase",
                        locale === loc ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                      )}
                    >
                      {loc}
                    </Link>
                  );
                })}
              </div>

              {/* Archive button */}
              <Link
                href={`/archive/${locale}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-white text-black font-bold text-sm py-3.5 rounded-full transition-all hover:bg-pink-100 active:scale-95"
              >
                {navT('archiveBack')} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
