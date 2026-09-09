'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface GnbHeaderProps {
  locale: string;
}

const NAV_ITEMS = [
  { href: 'about',      labelKo: '소개',     labelEn: 'ABOUT' },
  { href: 'exhibition', labelKo: '전시',     labelEn: 'EXHIBITION' },
  { href: 'program',    labelKo: '프로그램', labelEn: 'PROGRAM' },
  { href: 'community',  labelKo: '커뮤니티', labelEn: 'COMMUNITY' },
  { href: 'visit',      labelKo: '관람안내', labelEn: 'VISIT' },
];

export default function GnbHeader({ locale }: GnbHeaderProps) {
  const isKo = locale === 'ko';
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    const scrollContainer = document.querySelector('main');
    
    const handleScroll = () => {
      const scrollPos = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      setScrolled(scrollPos > 10);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer for ScrollSpy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: document.querySelector('main'),
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href);
      if (el) observer.observe(el);
    });
    
    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => { setDrawerOpen(false); }, [pathname, activeSection]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === `/${locale}`) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
        setDrawerOpen(false);
      }
    }
  };

  const navHref = (slug: string) => `/${locale}/#${slug}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-[#2E2E2E]'
            : 'bg-[#0A0A0A]/80 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[64px] px-6 sm:px-10 lg:px-16">
          <Link href={`/${locale}`} className="flex items-center gap-3 group" onClick={(e) => handleNavClick(e, 'hero')}>
            <span className="font-mono font-black text-xl tracking-tighter border-2 border-white px-2 py-0.5 leading-none group-hover:bg-white group-hover:text-black transition-colors">
              APAP<b>8</b>
            </span>
            <span className="hidden sm:block text-[11px] font-semibold text-[#B9B9B9] leading-snug">
              제8회 안양공공예술프로젝트
              <br />
              <span className="font-mono text-[9px] text-[#8C8C8C]">
                The 8th Anyang Public Art Project
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.href;
              return (
                <Link
                  key={item.href}
                  href={navHref(item.href)}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-xs font-bold tracking-wide py-1 group transition-colors ${
                    active ? 'text-white' : 'text-[#8C8C8C] hover:text-white'
                  }`}
                >
                  <span>{item.labelEn}</span>
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-white transition-all duration-200 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
              <Link
                href={`/ko${pathname.replace(`/${locale}`, '')}`}
                className={`transition-colors ${isKo ? 'text-white' : 'text-[#5C5C5C] hover:text-white'}`}
              >
                KR
              </Link>
              <span className="text-[#2E2E2E]">|</span>
              <Link
                href={`/en${pathname.replace(`/${locale}`, '')}`}
                className={`transition-colors ${!isKo ? 'text-white' : 'text-[#5C5C5C] hover:text-white'}`}
              >
                EN
              </Link>
            </div>
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="md:hidden font-mono text-[11px] font-bold tracking-widest px-3 py-1.5 border border-[#2E2E2E] hover:border-white transition-colors"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            >
              {drawerOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-[64px] flex flex-col md:hidden"
          >
            <nav className="flex-1 px-8 pt-10 space-y-1 divide-y divide-[#1E1E1E]">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.href;
                return (
                  <Link
                    key={item.href}
                    href={navHref(item.href)}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-baseline justify-between py-5 transition-colors ${
                      active ? 'text-white' : 'text-[#8C8C8C]'
                    }`}
                  >
                    <span className="text-2xl font-black">
                      {isKo ? item.labelKo : item.labelEn}
                    </span>
                    <span className="font-mono text-xs text-[#5C5C5C]">{item.labelEn}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="px-8 pb-10 border-t border-[#1E1E1E] pt-6 font-mono text-xs text-[#5C5C5C]">
              APAP 2026 · BLACK &amp; WHITE EDITION
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
