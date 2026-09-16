'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArchiveHeaderProps {
  locale: string;
  locales: string[];
}

export default function ArchiveHeader({ locale, locales }: ArchiveHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const menuItems = [
    { name: locale === 'ko' ? 'APAP 소개' : 'About APAP', path: `/${locale}` },
    { name: locale === 'ko' ? '안양파빌리온' : 'Anyang Pavilion', path: `/${locale}/pavilion` },
    { name: locale === 'ko' ? '역대 아카이브' : 'Archives', path: `/${locale}/archive/8` },
    { name: locale === 'ko' ? '작품 지도' : 'Artwork Map', path: `/${locale}/works` },
    { name: locale === 'ko' ? '소식' : 'News', path: `/${locale}/news` },
    { name: locale === 'ko' ? '관람 안내' : 'Visit', path: `/${locale}/visit` },
  ];

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-sm" : "bg-white border-slate-100"
      )}>
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-1.5 flex-shrink-0 group">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              APAP <span className="text-blue-600 font-light">Archive</span>
            </span>
          </Link>

          {/* Desktop GNB */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-slate-500 hover:text-blue-600 transition-colors relative group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher – desktop */}
            <div className="hidden sm:flex border border-slate-200 rounded-lg overflow-hidden text-[10px] sm:text-xs font-semibold divide-x divide-slate-200">
              {locales.filter(loc => loc === 'ko' || loc === 'en').map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={cn(
                    "px-2.5 py-1.5 transition-colors uppercase",
                    locale === loc ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>

            {/* APAP8 shortcut – desktop */}
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition-all group"
            >
              <span>{locale === 'ko' ? 'APAP 8 홈' : 'APAP 8 Home'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Hamburger – mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors active:scale-95"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col md:hidden">
          {/* Header mirror */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 flex-shrink-0">
            <Link href={`/${locale}`} onClick={() => setIsOpen(false)} className="text-lg font-bold tracking-tight">
              APAP <span className="text-blue-600 font-light">Archive</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col overflow-y-auto px-6 py-4">
            {menuItems.map((item, idx) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-slate-100 text-slate-700 hover:text-blue-600 transition-colors"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span className="text-xl font-bold">{item.name}</span>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="px-6 py-5 border-t border-slate-100 space-y-3 flex-shrink-0">
            {/* Language row */}
            <div className="flex border border-slate-200 rounded-xl overflow-hidden text-xs font-bold divide-x divide-slate-200 w-full">
              {locales.filter(loc => loc === 'ko' || loc === 'en').map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex-1 text-center py-3 transition-colors uppercase",
                    locale === loc ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>

            {/* APAP8 home button */}
            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-blue-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all"
            >
              {locale === 'ko' ? 'APAP 8 공식 홈페이지' : 'APAP 8 Official Site'}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
