'use client';

import React, { useState, useMemo } from 'react';
import GnbHeader from '@/components/site-a/GnbHeader';
import SectionCard from '@/components/site-a/SectionCard';
import Footer from '@/components/site-a/Footer';
import DustCanvas from '@/components/site-a/DustCanvas';
import { MapPin, Calendar, Layers, Users, MessageCircle, ArrowUpRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import ArtistGrid from '@/components/site-a/ArtistGrid';
import { getVenues } from '@/lib/artists';
import { getLocalizedVenueName } from '@/lib/artistLocalization';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function SiteAPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko';
  const isKo = validLocale === 'ko';

  const [communityPage, setCommunityPage] = useState(1);
  const [aboutTab, setAboutTab] = useState<'overview' | 'theme'>('overview');
  const [programTab, setProgramTab] = useState(0);
  const communityPerPage = 3;

  const t = {
    ko: {
      heroAlt: '제8회 안양공공예술프로젝트(APAP8) 공식 포스터',
      ticker: 'APAP8 2026.09.14 OPEN ● 안양공공예술프로젝트 ● 무료 관람 ● ARCHIVE → APAP.OR.KR',
    },
    en: {
      heroAlt: 'The 8th Anyang Public Art Project (APAP8) Official Poster',
      ticker: 'APAP8 OPEN 2026.09.14 ● ANYANG PUBLIC ART ● FREE ADMISSION ● ARCHIVE → APAP.OR.KR',
    },
  }[validLocale];

  // ─── Exhibition Data ───
  const venues = useMemo(() => getVenues(), []);
  const categories = useMemo(() => {
    return venues.map((v) => ({
      id: v.venue_slug,
      label: getLocalizedVenueName(v.venue_slug, validLocale),
      items: v.artists,
    }));
  }, [venues, validLocale]);

  // ─── Program Data ───
  const programs = [
    {
      num: '01',
      category: isKo ? '퍼블릭 프로그램' : 'PUBLIC PROGRAM',
      title: isKo ? 'APAP8 개막 국제 컨퍼런스' : 'APAP8 Opening International Conference',
      desc: isKo
        ? '국내외 참여 작가, 건축가, 큐레이터들이 한자리에 모여 ‘공존의 균형과 디지털 무릉도원’을 주제로 동시대 공공예술의 새로운 지형을 논의하는 오프닝 라운드테이블입니다.'
        : 'An opening roundtable symposium bringing together participating artists, architects, and international curators to deliberate on the evolving landscapes of contemporary public art.',
      date: isKo ? '2026년 9월 개막 주간 (상세 일정 공지 예정)' : 'Opening Week, Sept. 2026 (Schedule TBA)',
      venue: isKo ? '안양파빌리온 메인홀' : 'Anyang Pavilion Main Hall',
      target: isKo ? '일반 시민, 예술계 종사자 및 연구자' : 'Open to the Public, Researchers, and Artists',
    },
    {
      num: '02',
      category: isKo ? '도슨트 투어' : 'DOCENT TOUR',
      title: isKo ? 'APAP8 공식 전문 도슨트 투어' : 'APAP8 Guided Docent Tour',
      desc: isKo
        ? '전문 해설사와 함께 안양예술공원 숲속 산책로와 도심 하천을 따라 설치된 1회부터 8회까지의 주요 야외 공공조각 및 신작 커미션을 깊이 있게 감상하는 도보 투어 프로그램입니다.'
        : 'A guided architectural and artistic walking tour exploring the open-air sculptures and new commissions of APAP8 alongside historical highlights across Anyang Art Park.',
      date: isKo ? '전시 기간 중 주말 상시 운영 (회당 60분)' : 'Weekends throughout Exhibition Period (60 min)',
      venue: isKo ? '안양예술공원 일원 (출발: 안양파빌리온)' : 'Anyang Art Park (Departs from Anyang Pavilion)',
      target: isKo ? '시민 및 관람객 누구나 (현장 및 사전 접수)' : 'All Visitors (Walk-in & Online reservation)',
    },
    {
      num: '03',
      category: isKo ? '시민 워크숍' : 'WORKSHOP',
      title: isKo ? '작가 연계 공공예술 창작 워크숍' : 'Artist-Led Community Creative Workshop',
      desc: isKo
        ? '참여 작가와 함께 천연 안료, 전통 옻칠, 디지털 매체 등을 직접 체험하며 일상 공간에 어우러지는 작은 예술적 오브제를 제작해보는 참여형 예술 교육입니다.'
        : 'Hands-on creative educational workshops collaborating with participating artists using natural materials, traditional lacquerware, and digital interactive mediums.',
      date: isKo ? '2026년 10월 중 주말 4회 운영' : 'Four Sessions in Oct. 2026',
      venue: isKo ? '안양파빌리온 교육실' : 'Anyang Pavilion Education Studio',
      target: isKo ? '어린이, 청소년 및 가족 단위 관람객' : 'Youth & Family Audiences',
    },
  ];

  // ─── Community Data ───
  const communityItems = [
    {
      cat: isKo ? '공지' : 'Notice',
      title: isKo ? 'APAP8 공식 홈페이지 오픈 및 참여 작가 공개' : 'APAP8 Official Website Launch & Artist Announcement',
      date: '2026.09.14',
      desc: isKo
        ? '제8회 안양공공예술프로젝트 공식 웹사이트가 정식 오픈되었습니다. 야외전시 및 특별기획전에 참여하는 총 21명 작가 정보와 주요 출품작을 확인하실 수 있습니다.'
        : 'The official platform for APAP8 has launched. Discover details on 21 participating artists across all venues.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      title: isKo ? '[보도자료] 제8회 안양공공예술프로젝트 개막 발표' : '[Press Release] The 8th Anyang Public Art Project Opens',
      date: '2026.09.14',
      desc: isKo
        ? '안양문화예술재단은 ‘공존의 균형과 디지털 무릉도원’을 주제로 3년 만에 개최되는 트리엔날레의 종합 프레스킷을 배포합니다.'
        : 'Anyang Foundation for Culture & Arts distributes the official press kit for the triennial.',
    },
    {
      cat: isKo ? '공지' : 'Notice',
      title: isKo ? '개막 주간 퍼블릭 프로그램 및 도슨트 투어 신청 안내' : 'Opening Week Public Programs & Docent Tour Registration',
      date: '2026.09.07',
      desc: isKo
        ? '개막 국제 컨퍼런스 및 주말 정기 도슨트 투어 참여 접수가 시작됩니다. 전 프로그램은 시민 누구나 무료로 참여하실 수 있습니다.'
        : 'Registration opens for the international symposium and weekend guided tours. Free for all citizens.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      title: isKo ? '[보도자료] 김덕한 작가 APAP8 신작 조각 야외 설치 완료' : '[Press] Artist Kim Deok Han Installs New Outdoor Sculpture',
      date: '2026.08.30',
      desc: isKo
        ? '한국 현대미술의 대표 작가 김덕한의 대형 공공조각 <OVERLAID : 공존의 균형>이 안양예술공원 숲속 산책로에 성공적으로 안착했습니다.'
        : 'Kim Deok Han completes installation of his monumental sculpture in Anyang Art Park.',
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white font-sans antialiased">
      <GnbHeader locale={validLocale} />

      {/* Main Container: 100dvh + 100vh fallback, vertical scroll snapping */}
      <main
        className="h-[100dvh] overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory hide-scrollbar"
      >
        {/* ── Section 0: Hero ── */}
        <section
          id="hero"
          className="relative h-[100dvh] snap-start flex flex-col bg-black border-b border-white justify-between overflow-hidden"
        >
          {/* Subtle Dust overlay */}
          <DustCanvas opacity={0.3} />

          {/* Top spacer for fixed header */}
          <div className="h-14 sm:h-16 flex-shrink-0" />

          {/* Banner Container */}
          <div className="flex-1 w-full max-w-[1200px] max-h-[800px] mx-auto flex items-center justify-center px-3 sm:px-8 py-2 sm:py-4 overflow-hidden relative z-10">
            <div className="relative w-full h-full max-w-[1200px] max-h-[800px] aspect-[12/5] max-sm:aspect-square max-sm:max-h-[768px] overflow-hidden flex items-center justify-center bg-black">
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet="/images/APAP8_uniform_square.gif" />
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
          summary={
            <div className="w-full max-w-[1200px] mx-auto">
              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-white/20 mb-6 sm:mb-8">
                <button 
                  onClick={() => setAboutTab('overview')} 
                  className={`pb-3 font-mono text-sm sm:text-base font-bold tracking-wider uppercase transition-colors border-b-2 cursor-pointer ${aboutTab === 'overview' ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                >
                  {isKo ? '01 개요' : '01 OVERVIEW'}
                </button>
                <button 
                  onClick={() => setAboutTab('theme')} 
                  className={`pb-3 font-mono text-sm sm:text-base font-bold tracking-wider uppercase transition-colors border-b-2 cursor-pointer ${aboutTab === 'theme' ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                >
                  {isKo ? '02 전시 주제' : '02 THEME'}
                </button>
              </div>

              {/* Grid Overlay for perfectly fixed tab position */}
              <div className="grid grid-cols-1 grid-rows-1">
                <section className={`col-start-1 row-start-1 space-y-6 transition-all duration-300 ${aboutTab === 'overview' ? 'opacity-100 z-10 pointer-events-auto translate-y-0' : 'opacity-0 z-0 pointer-events-none translate-y-4'}`}>
                  <div className="flex items-center gap-3 font-mono text-caption font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
                    <span className="bg-white text-black px-2 py-0.5 text-badge font-black">01</span>
                    <span>{isKo ? '개요' : 'OVERVIEW'}</span>
                  </div>
                  <h2 className="text-title font-extrabold leading-snug">
                    {isKo ? (
                      <>도시 전체가 전시장이 되는<br />여덟 번째 안양<span className="text-white/40">.</span></>
                    ) : (
                      <>The Eighth Anyang,<br />Where the entire city becomes an open museum<span className="text-white/40">.</span></>
                    )}
                  </h2>
                  <div className="text-body text-[#B9B9B9] leading-relaxed space-y-4 font-light">
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
                  <div className="flex flex-wrap gap-2 pt-4">
                    {['#공공예술', '#트리엔날레', '#안양예술공원', '#커미션신작', '#김덕한', '#공존의균형'].map((tag) => (
                      <span key={tag} className="text-caption font-mono border border-white/20 text-white/70 px-3.5 py-1.5 bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>

                <section className={`col-start-1 row-start-1 space-y-6 transition-all duration-300 ${aboutTab === 'theme' ? 'opacity-100 z-10 pointer-events-auto translate-y-0' : 'opacity-0 z-0 pointer-events-none translate-y-4'}`}>
                  <div className="flex items-center gap-3 font-mono text-caption font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
                    <span className="bg-white text-black px-2 py-0.5 text-badge font-black">02</span>
                    <span>{isKo ? '전시 주제' : 'EXHIBITION THEME'}</span>
                  </div>
                  <h3 className="text-title font-extrabold text-white">
                    {isKo ? '공존의 균형과 디지털 무릉도원' : 'Balance in Coexistence & Digital Peach Blossom Spring'}
                  </h3>
                  <div className="text-body text-[#B9B9B9] leading-relaxed space-y-4 font-light">
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
          contentAlign="start"
          summary={
            <div className="w-full max-w-[1200px] mx-auto">
              <ArtistGrid
                categories={categories}
                allLabel={isKo ? '전체 부문 (ALL)' : 'ALL VENUES'}
                theme="blackwhite"
                locale={validLocale}
              />
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
          summary={
            <div className="w-full max-w-[1200px] mx-auto">
              {/* Program Tabs */}
              <div className="flex items-center gap-4 sm:gap-6 border-b border-white/20 mb-6 sm:mb-8 overflow-x-auto hide-scrollbar snap-x">
                {programs.map((prog, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setProgramTab(idx)} 
                    className={`pb-3 font-mono text-sm sm:text-base font-bold tracking-wider uppercase transition-colors border-b-2 whitespace-nowrap snap-start flex-shrink-0 cursor-pointer ${programTab === idx ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                  >
                    {prog.num} {prog.category}
                  </button>
                ))}
              </div>

              {/* Program Tab Content with Grid Overlay */}
              <div className="grid grid-cols-1 grid-rows-1">
                {programs.map((prog, idx) => (
                  <div
                    key={idx}
                    className={`col-start-1 row-start-1 flex flex-col gap-6 sm:gap-8 transition-all duration-300 ${programTab === idx ? 'opacity-100 z-10 pointer-events-auto translate-y-0' : 'opacity-0 z-0 pointer-events-none translate-y-4'}`}
                  >
                    <div>
                      <h2 className="text-title font-extrabold text-white mb-4 leading-snug">
                        {prog.title}
                      </h2>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed">
                        {prog.desc}
                      </p>
                    </div>
                    
                    <div className="grid gap-3 text-caption font-mono text-white/70 bg-white/[0.03] border border-white/10 p-5 sm:p-6 mt-auto max-w-3xl">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                        <span>{prog.date}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                        <span>{prog.venue}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                        <span>{prog.target}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
          summary={
            <div className="w-full max-w-[1200px] mx-auto space-y-12">
              <div className="space-y-4">
                <div className="divide-y divide-white/15 border-y border-white/20 min-h-[460px] sm:min-h-[480px]">
                  {communityItems.slice((communityPage - 1) * communityPerPage, communityPage * communityPerPage).map((item, idx) => (
                    <div key={idx} className="py-6 hover:bg-white/[0.02] px-3 -mx-3 transition-colors space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 flex-shrink-0 ${
                            item.cat === '프레스' || item.cat === 'Press' ? 'bg-white text-black' : 'border border-white text-white'
                          }`}>
                            {item.cat}
                          </span>
                          <span className="font-mono text-xs text-[#8C8C8C]">{item.date}</span>
                        </div>
                      </div>
                      <h3 className="text-base sm:text-card-title font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-caption text-[#B9B9B9] leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {Math.ceil(communityItems.length / communityPerPage) > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      onClick={() => setCommunityPage(p => Math.max(1, p - 1))}
                      disabled={communityPage === 1}
                      className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xs text-white/50">
                      {communityPage} / {Math.ceil(communityItems.length / communityPerPage)}
                    </span>
                    <button
                      onClick={() => setCommunityPage(p => Math.min(Math.ceil(communityItems.length / communityPerPage), p + 1))}
                      disabled={communityPage === Math.ceil(communityItems.length / communityPerPage)}
                      className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Minimal Inquiry Card */}
              <div className="bg-white/[0.03] border border-white/20 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span className="text-body font-bold text-white">{isKo ? '실시간 문의 및 안내' : 'Direct Inquiry & Q&A'}</span>
                </div>
                <a
                  href="https://pf.kakao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white hover:bg-white hover:text-black transition-colors font-mono font-bold text-xs px-4 py-2.5 flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-center"
                >
                  <span>{isKo ? '카카오톡 채널' : 'KAKAO CHANNEL'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
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
          summary={
            <div className="w-full max-w-[1200px] mx-auto space-y-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Card 1: Admission & Hours */}
                <div className="border border-white/20 p-6 sm:p-8 space-y-4 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-white" />
                    <span>{isKo ? '관람시간 및 관람료' : 'HOURS & ADMISSION'}</span>
                  </div>
                  <div className="text-2xl font-black text-white">
                    {isKo ? '관람료 전액 무료' : 'Free Admission'}
                  </div>
                  <div className="text-sm text-[#B9B9B9] space-y-2 leading-relaxed">
                    <p>
                      <strong className="text-white">{isKo ? '야외 공공조각 전시' : 'Outdoor Sculptures'}:</strong>{' '}
                      {isKo ? '연중 상시 개방 (24시간 관람 가능)' : 'Open 24/7 year-round'}
                    </p>
                    <p>
                      <strong className="text-white">{isKo ? '실내 전시관 (안양파빌리온)' : 'Indoor Pavilions'}:</strong>{' '}
                      {isKo ? '화요일 – 일요일 10:00 – 18:00 (입장 마감 17:30)' : 'Tue–Sun 10:00–18:00 (Last entry 17:30)'}
                    </p>
                    <p className="font-mono text-xs text-[#8C8C8C]">
                      {isKo ? '※ 매주 월요일 휴관 (공휴일인 경우 익일 휴관)' : '※ Closed Mondays'}
                    </p>
                  </div>
                </div>

                {/* Card 2: Location */}
                <div className="border border-white/20 p-6 sm:p-8 space-y-4 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-white" />
                    <span>{isKo ? '전시 장소 및 주소' : 'LOCATION & ADDRESS'}</span>
                  </div>
                  <div className="text-2xl font-black text-white">
                    {isKo ? '안양예술공원 일원' : 'Anyang Art Park'}
                  </div>
                  <div className="text-sm text-[#B9B9B9] space-y-2 leading-relaxed">
                    <p className="text-white font-medium">
                      {isKo
                        ? '경기도 안양시 만안구 예술공원로 180 (안양파빌리온)'
                        : '180, Yesulgongwon-ro, Manan-gu, Anyang-si, Gyeonggi-do (Anyang Pavilion)'}
                    </p>
                    <p className="text-xs text-[#8C8C8C]">
                      {isKo
                        ? '안양예술공원 산책로, 안양파빌리온 메인홀, 안양천 변 야외 공간'
                        : 'Anyang Art Park trails, Anyang Pavilion, and open urban spaces along Anyang Stream'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Historical Archive Banner */}
              <div className="border border-white/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/[0.04]">
                <div className="space-y-2">
                  <div className="font-mono text-[10px] font-bold text-[#8C8C8C] uppercase tracking-widest">
                    APAP ARCHIVE HUB
                  </div>
                  <h4 className="text-card-title font-bold text-white">
                    {isKo ? '역대 APAP (1회~7회) 아카이브 둘러보기' : 'Explore APAP Editions 1–7 Archives'}
                  </h4>
                  <p className="text-caption text-[#B9B9B9] max-w-xl leading-relaxed">
                    {isKo
                      ? '2005년 제1회부터 축적된 역대 APAP의 모든 영구 설치 작품 및 전시 기록을 통합 아카이브에서 확인하실 수 있습니다.'
                      : 'Browse permanent installations and documentation across past editions from 2005 to 2023.'}
                  </p>
                </div>
                <Link
                  href={`/archive/${validLocale}`}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold px-6 py-3 bg-white text-black hover:bg-white/80 transition-colors flex-shrink-0"
                >
                  <span>{isKo ? '역대 아카이브 열기' : 'OPEN ARCHIVE'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
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
