'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { motion } from 'framer-motion';

import Header from '@/components/site-b/Header';
import HeroSection from '@/components/site-b/HeroSection';
import ConceptSection from '@/components/site-b/ConceptSection';
import ArtistSection from '@/components/site-b/ArtistSection';
import WorksSection from '@/components/site-b/WorksSection';
import ProgramSection from '@/components/site-b/ProgramSection';
import VisitSection from '@/components/site-b/VisitSection';
import NewsSection from '@/components/site-b/NewsSection';
import SponsorsSection from '@/components/site-b/SponsorsSection';
import Footer from '@/components/site-b/Footer';
import ConceptSwitcher from '@/components/site-b/ConceptSwitcher';
import BlossomCanvas from '@/components/site-b/BlossomCanvas';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function SiteBPage({ params }: PageProps) {
  const { locale } = React.use(params);
  const t = useTranslations('site-b');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 overflow-x-hidden relative">
      {/* 흩날리는 복사꽃 & 에메랄드 신선 기운 배경 애니메이션 */}
      <BlossomCanvas />
      {/* 무릉도원(Peach Blossom Spring) 신비로운 배경 광원 효과 */}
      <motion.div 
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[38vw] h-[38vw] bg-pink-500/20 rounded-full blur-[130px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed top-[-5%] right-[-10%] w-[32vw] h-[32vw] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ opacity: [0.25, 0.4, 0.25], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="fixed top-[45%] left-[-15%] w-[42vw] h-[42vw] bg-violet-600/20 rounded-full blur-[140px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ opacity: [0.15, 0.28, 0.15], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="fixed top-[35%] right-[-15%] w-[35vw] h-[35vw] bg-amber-500/12 rounded-full blur-[130px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ opacity: [0.3, 0.48, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-500/22 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.12, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="fixed bottom-[-5%] right-[-10%] w-[35vw] h-[35vw] bg-cyan-500/18 rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className="relative z-10">
        <Header locale={locale} />
        
        <main>
          <HeroSection t={t} locale={locale} />
          <ConceptSection t={t} locale={locale} />
          <ArtistSection t={t} locale={locale} />
          <WorksSection t={t} locale={locale} />
          <ProgramSection t={t} locale={locale} />
          <VisitSection t={t} locale={locale} />
          <NewsSection t={t} locale={locale} />
          <SponsorsSection />
        </main>

        <Footer locale={locale} />

        {/* 컨셉 선택용 플로팅 위젯 */}
        <ConceptSwitcher locale={locale} />
      </div>
    </div>
  );
}
