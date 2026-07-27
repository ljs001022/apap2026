'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  const navT = useTranslations('nav');

  return (
    <footer className="border-t border-white/5 bg-[#050505] py-12 px-6 relative z-10 text-[11px] md:text-xs text-white/40">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        <div className="space-y-2 text-center md:text-left">
          <p className="font-extrabold text-white/80 tracking-wider">APAP 8 (안양공공예술프로젝트)</p>
          <p>안양문화예술재단 APAP 사무국 | 경기도 안양시 만안구 예술공원로 103</p>
          <p className="text-[10px] text-white/30 pt-2">© 2026 Anyang Foundation for Culture & Arts. All rights reserved.</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <Link
            href={`/archive/${locale}`}
            className="text-white/60 hover:text-white transition-colors font-semibold"
          >
            {navT('archiveBack')}
          </Link>
          <span className="w-1 h-1 bg-white/20 rounded-full hidden sm:block" />
          <a href="https://www.ayac.or.kr" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-semibold">
            재단 홈페이지
          </a>
        </div>
      </div>
    </footer>
  );
}
