'use client';

import React from 'react';
import GnbHeader from '@/components/site-a/GnbHeader';
import SectionCard from '@/components/site-a/SectionCard';
import Footer from '@/components/site-a/Footer';
import DustCanvas from '@/components/site-a/DustCanvas';
import { MapPin, Calendar, Layers } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function SiteAPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko';
  const isKo = validLocale === 'ko';

  const t = {
    ko: {
      heroAlt: '제8회 안양공공예술프로젝트(APAP8) 공식 포스터',
      ticker: 'APAP8 2026.09.14 OPEN ● 안양공공예술프로젝트 ● 무료 관람 ● ARCHIVE → APAP.OR.KR',
      about: {
        heading: '도시 전체가 전시장이 되는\n여덟 번째 안양.',
        overview: '제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어온 한국 유일의 공공예술 트리엔날레입니다. 안양예술공원과 도심 곳곳에서 국내외 21명 작가의 신작 커미션과 퍼블릭 프로그램을 선보입니다.',
        themeTitle: '공존의 균형과 디지털 무릉도원',
        themeDesc: '공공 공간과 예술의 상호작용을 통해 도시 공동체의 기억과 미래 가치를 재해석합니다.',
      },
      exhibition: {
        artistCount: '21',
        artistLabel: '참여 작가',
        venueCount: '4',
        venueLabel: '전시 부문',
        body: '야외전시 · 한중특별전 · e-파빌리온 미디어 · 308 아트 크루 — 안양예술공원과 도심 공간에 설치된 신작 조각 및 미디어 아트를 선보입니다.',
      },
      program: {
        heading: '개막 국제 컨퍼런스 & APAP8 도슨트 투어',
        body: '참여 작가 및 국내외 기획진이 함께하는 라운드테이블, 전문 도슨트와 함께 안양예술공원 야외 공공조각을 탐방하는 시민 참여 걷기 프로그램.',
        date: '2026.09 (예정) · 안양파빌리온 / 안양예술공원',
      },
      community: {
        heading: '공지사항 & 보도자료',
        notices: [
          { cat: '공지', title: 'APAP8 공식 홈페이지 오픈 및 참여 작가 공개', date: '2026.09.14' },
          { cat: '프레스', title: '제8회 안양공공예술프로젝트 개막 보도자료', date: '2026.09.14' },
          { cat: '공지', title: '개막 주간 퍼블릭 프로그램 및 도슨트 투어 안내', date: '2026.09.07' },
        ],
      },
      visit: {
        admission: '관람료 무료',
        location: '안양예술공원 · 경기도 안양시',
        hours: '야외: 상시 관람 / 실내: 화–일 10:00–18:00 (월요일 휴관)',
        access: '지하철 1호선 관악역 / 안양역 하차 후 마을버스 환승',
      },
    },
    en: {
      heroAlt: 'The 8th Anyang Public Art Project (APAP8) Official Poster',
      ticker: 'APAP8 OPEN 2026.09.14 ● ANYANG PUBLIC ART ● FREE ADMISSION ● ARCHIVE → APAP.OR.KR',
      about: {
        heading: 'The Eighth Anyang,\nWhere the entire city becomes an open museum.',
        overview: 'The 8th Anyang Public Art Project (APAP8) is Korea’s premier public art triennial running continuously since 2005. It presents newly commissioned site-specific works and public programs across Anyang.',
        themeTitle: 'Balance in Coexistence & Digital Peach Blossom Spring',
        themeDesc: 'Reinterpreting urban memories and futuristic communal values through public art interventions.',
      },
      exhibition: {
        artistCount: '21',
        artistLabel: 'Participating Artists',
        venueCount: '4',
        venueLabel: 'Exhibition Venues',
        body: 'Outdoor Exhibition · Korea–China Special · E-Pavilion Media · 308 Art Crew — site-specific sculptures and media artworks across Anyang Art Park.',
      },
      program: {
        heading: 'Opening International Conference & Docent Tour',
        body: 'Curatorial roundtables with international artists, alongside docent-guided walking tours throughout the public sculpture paths.',
        date: 'Sept. 2026 · Anyang Pavilion / Anyang Art Park',
      },
      community: {
        heading: 'Notice & Press Releases',
        notices: [
          { cat: 'Notice', title: 'APAP8 Website Launch & Participating Artists Announced', date: '2026.09.14' },
          { cat: 'Press', title: 'Press Release: Opening of the 8th Anyang Public Art Project', date: '2026.09.14' },
          { cat: 'Notice', title: 'Opening Week Programs & Docent Tour Information', date: '2026.09.07' },
        ],
      },
      visit: {
        admission: 'Free Admission',
        location: 'Anyang Art Park · Anyang, Gyeonggi-do',
        hours: 'Outdoor: Always open / Indoor: Tue–Sun 10:00–18:00 (Closed Mon)',
        access: 'Subway Line 1 Gwanak / Anyang Station → Village Bus Transfer',
      },
    },
  }[validLocale];

  return (
    <div className="bg-[#0A0A0A] text-white font-sans antialiased">
      <GnbHeader locale={validLocale} />

      {/* Main Container: 100dvh + 100vh fallback, vertical scroll snapping */}
      <main
        className="h-screen h-[100dvh] overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory hide-scrollbar"
        style={{ height: '100vh', minHeight: '100dvh' }}
      >
        {/* ── Section 0: Hero ── */}
        <section
          id="hero"
          className="relative h-screen h-[100dvh] snap-start flex flex-col bg-black border-b border-white justify-between overflow-hidden"
          style={{ height: '100vh', minHeight: '100dvh' }}
        >
          {/* Subtle Dust overlay */}
          <DustCanvas opacity={0.3} />

          {/* Top spacer for fixed header */}
          <div className="h-14 sm:h-16 flex-shrink-0" />

          {/* Banner Container */}
          <div className="flex-1 w-full max-w-[1920px] max-h-[800px] mx-auto flex items-center justify-center px-3 sm:px-8 py-2 sm:py-4 overflow-hidden relative z-10">
            <div className="relative w-full h-full max-w-[1920px] max-h-[800px] aspect-[12/5] max-sm:aspect-square max-sm:max-h-[768px] overflow-hidden flex items-center justify-center bg-black">
              <picture className="w-full h-full block">
                <source type="image/webp" srcSet="/images/apap8_uniform.webp" />
                <img
                  src="/images/APAP8_uniform.gif"
                  alt={t.heroAlt}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          {/* Ticker Bar */}
          <div className="flex-shrink-0 bg-white text-black py-2 sm:py-2.5 overflow-hidden whitespace-nowrap select-none border-t border-black relative z-10">
            <div className="inline-flex animate-[ticker_30s_linear_infinite] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider gap-8 sm:gap-12">
              <span>{t.ticker}</span>
              <span>{t.ticker}</span>
              <span>{t.ticker}</span>
            </div>
          </div>
        </section>

        {/* ── Section 01: About (Overview + Theme) ── */}
        <SectionCard
          id="about"
          index="01"
          labelKo="소개"
          labelEn="ABOUT"
          subtitle="OVERVIEW / THEME"
          isKo={isKo}
          href={`/${validLocale}/about`}
          summary={
            <div className="max-w-4xl space-y-3 sm:space-y-6">
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight whitespace-pre-line">
                {t.about.heading}
              </h3>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-6 pt-2 border-t border-white/20">
                <div className="space-y-1 sm:space-y-2">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase">
                    OVERVIEW
                  </span>
                  <p className="text-xs sm:text-sm text-[#B9B9B9] leading-relaxed">
                    {t.about.overview}
                  </p>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase">
                    THEME
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {t.about.themeTitle}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#B9B9B9] leading-relaxed">
                    {t.about.themeDesc}
                  </p>
                </div>
              </div>
            </div>
          }
        />

        {/* ── Section 02: Exhibition ── */}
        <SectionCard
          id="exhibition"
          index="02"
          labelKo="전시"
          labelEn="EXHIBITION"
          subtitle="ARTISTS / WORKS / VENUES"
          isKo={isKo}
          href={`/${validLocale}/exhibition`}
          summary={
            <div className="space-y-3 sm:space-y-6 max-w-4xl">
              {/* Stats Block: compact mobile numbers & gap */}
              <div className="flex gap-8 sm:gap-16 lg:gap-20">
                <div>
                  <div className="font-mono font-black text-4xl sm:text-7xl md:text-8xl text-white leading-none">
                    {t.exhibition.artistCount}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-[#8C8C8C] mt-1.5 sm:mt-3 uppercase tracking-wider">
                    {t.exhibition.artistLabel}
                  </div>
                </div>
                <div className="border-l border-[#2E2E2E] pl-8 sm:pl-16 lg:pl-20">
                  <div className="font-mono font-black text-4xl sm:text-7xl md:text-8xl text-white leading-none">
                    {t.exhibition.venueCount}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-[#8C8C8C] mt-1.5 sm:mt-3 uppercase tracking-wider">
                    {t.exhibition.venueLabel}
                  </div>
                </div>
              </div>

              <p className="text-[#B9B9B9] text-xs sm:text-sm leading-relaxed max-w-2xl">
                {t.exhibition.body}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-white/70">
                <span className="border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1 bg-white/5">야외전시 Outdoor</span>
                <span className="border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1 bg-white/5">한중특별전 Special</span>
                <span className="border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1 bg-white/5">e-파빌리온 Media</span>
                <span className="border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1 bg-white/5">308 아트 크루 Crew</span>
              </div>
            </div>
          }
        />

        {/* ── Section 03: Program ── */}
        <SectionCard
          id="program"
          index="03"
          labelKo="프로그램"
          labelEn="PROGRAM"
          subtitle="PUBLIC / WORKSHOP / TOUR"
          isKo={isKo}
          href={`/${validLocale}/program`}
          summary={
            <div className="space-y-3 sm:space-y-5 max-w-3xl">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold leading-snug">
                {t.program.heading}
              </h3>
              <p className="text-[#B9B9B9] text-xs sm:text-sm leading-relaxed">
                {t.program.body}
              </p>
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white/70 border border-white/20 p-2 sm:p-2.5 w-fit bg-white/5">
                <Calendar className="w-3.5 h-3.5 text-white flex-shrink-0" />
                <span>{t.program.date}</span>
              </div>
            </div>
          }
        />

        {/* ── Section 04: Community ── */}
        <SectionCard
          id="community"
          index="04"
          labelKo="커뮤니티"
          labelEn="COMMUNITY"
          subtitle="NOTICE / PRESS"
          isKo={isKo}
          href={`/${validLocale}/community`}
          summary={
            <div className="space-y-2 sm:space-y-3 w-full max-w-3xl">
              <h3 className="text-[10px] sm:text-xs font-bold text-[#8C8C8C] font-mono uppercase tracking-widest">
                {t.community.heading}
              </h3>
              <ul className="divide-y divide-[#2E2E2E] border-y border-[#2E2E2E]">
                {t.community.notices.map((n, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 py-2.5 sm:py-3.5 hover:bg-white/[0.03] px-1 sm:px-2 transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-[9px] sm:text-[10px] font-bold font-mono px-1.5 py-0.5 flex-shrink-0 ${
                        n.cat === '프레스' || n.cat === 'Press'
                          ? 'bg-white text-black'
                          : 'border border-white text-white'
                      }`}>
                        {n.cat}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white truncate">{n.title}</span>
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8C8C8C] flex-shrink-0">{n.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
        />

        {/* ── Section 05: Visit ── */}
        <SectionCard
          id="visit"
          index="05"
          labelKo="관람안내"
          labelEn="VISIT"
          subtitle="ADMISSION / LOCATION / HOURS"
          isKo={isKo}
          href={`/${validLocale}/visit`}
          summary={
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 max-w-3xl">
              <div className="space-y-1 sm:space-y-2 border-l-2 border-white pl-3 sm:pl-4">
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8C8C8C]">ADMISSION & HOURS</div>
                <div className="text-lg sm:text-2xl font-extrabold">{t.visit.admission}</div>
                <div className="text-xs sm:text-sm text-[#B9B9B9]">{t.visit.hours}</div>
              </div>
              <div className="space-y-1 sm:space-y-2 border-l-2 border-white pl-3 sm:pl-4">
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8C8C8C]">LOCATION & ACCESS</div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white mt-1 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-[#B9B9B9] leading-relaxed">
                    <span className="text-white font-bold">{t.visit.location}</span>
                    <br />
                    {t.visit.access}
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* Footer */}
        <div className="snap-start">
          <Footer locale={validLocale} />
        </div>
      </main>
    </div>
  );
}