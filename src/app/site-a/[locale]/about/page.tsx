'use client';

import React from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function AboutPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale = ['ko', 'en'].includes(locale) ? locale : 'ko';
  const isKo = validLocale === 'ko';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased flex flex-col justify-between">
      <GnbHeader locale={validLocale} />

      <main className="flex-1 pt-24 pb-20 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href={`/${validLocale}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isKo ? '메인으로 돌아가기' : 'BACK TO MAIN'}</span>
          </Link>
        </div>

        {/* Page Title & Section Header */}
        <div className="border-b border-white pb-6 mb-12 flex justify-between items-baseline">
          <div>
            <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-widest uppercase">
              {isKo ? '제8회 안양공공예술프로젝트' : 'THE 8TH ANYANG PUBLIC ART PROJECT'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              {isKo ? '소개' : 'ABOUT'}
            </h1>
          </div>
          <span
            className="font-mono font-black text-5xl sm:text-7xl text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
          >
            01
          </span>
        </div>

        {/* 2 Main Blocks: Overview & Theme */}
        <div className="space-y-16">
          {/* Block 1: Overview */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">01</span>
              <span>{isKo ? '개요' : 'OVERVIEW'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold leading-snug">
              {isKo ? (
                <>도시 전체가 전시장이 되는<br />여덟 번째 안양<span className="text-white/40">.</span></>
              ) : (
                <>The Eighth Anyang,<br />Where the entire city becomes an open museum<span className="text-white/40">.</span></>
              )}
            </h2>

            <div className="text-base sm:text-lg text-[#B9B9B9] leading-relaxed space-y-4 font-light">
              <p>
                {isKo
                  ? '제8회 안양공공예술프로젝트(APAP8)는 2005년 시작된 한국 유일의 공공예술 트리엔날레의 여덟 번째 에디션입니다. 3년마다 안양의 역사와 장소성, 시민의 삶을 현대 미술과 접목하여 도시 곳곳을 열린 야외 미술관으로 변모시켜 왔습니다.'
                  : 'The 8th Anyang Public Art Project (APAP8) is the eighth edition of Korea’s premier public art triennial, held continuously since 2005. Every three years, APAP transforms the urban landscape of Anyang into an open-air public museum by connecting contemporary art with local history and communal memories.'}
              </p>
              <p>
                {isKo
                  ? '이번 APAP8은 안양예술공원을 중심축으로 도심 녹지 공간, 하천, 유휴 공간 등 일상의 영역으로 공공예술의 지평을 넓힙니다. 국내외 21명의 현대미술 작가들이 안양의 고유한 맥락 속에서 제작한 사이트 스페시픽(Site-specific) 신작을 공개합니다.'
                  : 'Focusing on Anyang Art Park and extending into urban green zones and public spaces, APAP8 introduces site-specific commissions created by 21 leading contemporary artists from Korea and abroad.'}
              </p>
            </div>

            {/* Keyword Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['#공공예술', '#트리엔날레', '#안양예술공원', '#커미션신작', '#김덕한', '#공존의균형'].map((tag) => (
                <span key={tag} className="text-xs font-mono border border-white/20 text-white/70 px-3.5 py-1.5 bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Block 2: Theme */}
          <section className="space-y-6 pt-10 border-t border-white/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">02</span>
              <span>{isKo ? '전시 주제' : 'EXHIBITION THEME'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isKo ? '공존의 균형과 디지털 무릉도원' : 'Balance in Coexistence & Digital Peach Blossom Spring'}
            </h3>

            <div className="text-sm sm:text-base text-[#B9B9B9] leading-relaxed space-y-4">
              <p>
                {isKo
                  ? '안양(安養)이라는 지명이 담고 있는 ‘몸과 마음이 편안하고 자유로운 극락정토’라는 인문학적 기원에서 출발합니다. 기술 문명과 자연 생태, 전통과 미래가 교차하는 오늘의 전환기에서 공공예술이 제시할 수 있는 새로운 공존의 균형을 사유합니다.'
                  : 'Deriving its concept from the historical etymology of Anyang—signifying an idyllic sanctuary where body and mind find peace—the theme contemplates a harmonious equilibrium between technological evolution, ecological sanctuary, and collective human memory.'}
              </p>
              <p>
                {isKo
                  ? '야외 조각, 뉴미디어 인스톨레이션, 시민 참여형 프로젝트를 통해 가상과 실재, 전통 옻칠과 첨단 디지털 기술이 어우러지는 현대적 의미의 무릉도원을 시민들과 함께 구현합니다.'
                  : 'Through outdoor sculptures, immersive media installations, and community-engaged workshops, APAP8 realizes a contemporary utopia where tactile craft and digital frontier meet in the shared public sphere.'}
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}