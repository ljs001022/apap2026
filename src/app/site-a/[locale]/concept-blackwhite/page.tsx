'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, MapPin, Calendar, Clock, Layers, User, ExternalLink, ChevronRight } from 'lucide-react';
import ConceptSwitcher from '@/components/site-a/ConceptSwitcher';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Kim Deok Han real sample data extracted from xlsx
const sampleArtistKim = {
  id: 'kim-deok-han',
  nameKo: '김덕한',
  nameEn: 'Kim Deok Han',
  birth: 'b.1981',
  nationalityKo: '대한민국',
  nationalityEn: 'Republic of Korea',
  fieldKo: '설치 · 조각 · 옻칠',
  fieldEn: 'Installation · Sculpture · Ottchil',
  profileImg: '/images/artist/kim_profile.jpg',
  artworkImg: '/images/artist/kim_artwork.png',
  activityImg: '/images/artist/kim_activity.jpg',
  workTitleKo: '<OVERLAID : 공존의 균형>',
  workTitleEn: 'OVERLAID : Harmony in Coexistence',
  workYear: '2026',
  workMaterialKo: '스테인레스 스틸에 우레탄 도장, 고흥석, 마정석',
  workMaterialEn: 'Urethane paint on Stainless steel, Goheung granite, Majeong stone',
  workDimensionKo: '250 x 35 x 35cm (each), 가변설치',
  workDimensionEn: '250 x 35 x 35cm (each), Dimensions variable',
  workLocationKo: '안양예술공원 야외 조각공원',
  workLocationEn: 'Anyang Art Park Outdoor Sculpture Area',
  workDescKo: `<OVERLAID : 공존의 균형>은 서로 다른 색과 형태가 하나의 공간 안에서 조화를 이루는 과정을 표현한 공공 조형물이다. 오방색으로 구성된 구체들은 각각 시간, 기억, 관계의 층위를 상징하며, 수직으로 중첩된 구조를 통해 축적과 균형의 의미를 드러낸다. 중앙의 자연석은 시간의 중심이자 장소의 기억을 상징하며, 주변의 수직 조형물들은 그 주위를 감싸며 공존과 연결의 질서를 형성한다.`,
  workDescEn: `OVERLAID: Harmony of Coexistence is a public sculpture that expresses the harmony of diverse colors and forms within a shared space. The spheres, composed of the five traditional Korean colors (Obangsaek), symbolize the layered dimensions of time, memory, and relationships. Their vertically stacked arrangement conveys the accumulation of experiences and the pursuit of balance. At the center, a natural stone represents the core of time and the memory of place, while the surrounding vertical sculptures embrace it, creating an ordered structure that embodies coexistence, connection, and harmony.`,
  bioKo: {
    solo: [
      '2025 Layered Time, Forms of Memory, 화이트스톤 갤러리, 서울',
      '2024 TRACE OF TIME, 화이트스톤 갤러리, 베이징, 중국',
      '2020 Journey Through the Veil of Time, 이응노미술관, 대전',
    ],
    group: [
      '2025 한국현대미술특별전 : 축(꺾이지 않는 마음), 주인도한국문화원, 뉴델리, 인도',
      "2023 KEEM & KIM'S GLOWING OVERLAID HOUR, 아트베이스 26SQM (박서보 재단), 서울, 한국",
      '2022 달의 심장, 해의 심장, 선화랑 개관 45주년 기념전, 선화랑, 서울, 한국',
    ],
  },
  bioEn: {
    solo: [
      '2025 Layered Time, Forms of Memory, Whitestone Gallery, Seoul',
      '2024 TRACE OF TIME, Whitestone Gallery, Beijing, China',
      '2020 Journey Through the Veil of Time, Lee Ungno Museum, Daejeon',
    ],
    group: [
      '2025 Special Exhibition of Korean Contemporary Art: Axis (An Unbreakable Spirit), Korean Cultural Center India, New Delhi, India',
      "2023 KEEM & KIM'S GLOWING OVERLAID HOUR, Art Base 26SQM (Park Seo Bo Foundation), Seoul",
      '2022 The Heart of the Moon, The Heart of the Sun (45th Anniversary Exhibition), Sun Gallery, Seoul',
    ],
  },
};

const otherArtists = [
  { id: 'a2', nameKo: '작가명 2', nameEn: 'Artist Name 2', origin: 'KR', img: '/images/blackwhite/example05.jpg' },
  { id: 'a3', nameKo: '작가명 3', nameEn: 'Artist Name 3', origin: "INT'L", img: '/images/blackwhite/example07.jpg' },
  { id: 'a4', nameKo: '작가명 4', nameEn: 'Artist Name 4', origin: "INT'L", img: '/images/blackwhite/example06.jpg' },
  { id: 'a5', nameKo: '작가명 5', nameEn: 'Artist Name 5', origin: 'KR', img: '/images/blackwhite/example03.jpg' },
  { id: 'a6', nameKo: '작가명 6', nameEn: 'Artist Name 6', origin: 'KR', img: '/images/blackwhite/example08.jpg' },
  { id: 'a7', nameKo: '작가명 7', nameEn: 'Artist Name 7', origin: "INT'L", img: '/images/blackwhite/example02.jpg' },
  { id: 'a8', nameKo: '작가명 8', nameEn: 'Artist Name 8', origin: 'KR', img: '/images/blackwhite/example09.jpg' },
];

export default function ConceptBlackWhitePage({ params }: PageProps) {
  const { locale } = React.use(params);
  const isKo = locale === 'ko';

  const [activeTab, setActiveTab] = useState<'artists' | 'works' | 'map'>('artists');
  const [selectedArtist, setSelectedArtist] = useState<typeof sampleArtistKim | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'about', 'exhibition', 'program', 'community', 'visit'];
      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(`#${s}`);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', labelKo: '소개', labelEn: 'ABOUT' },
    { href: '#exhibition', labelKo: '전시', labelEn: 'EXHIBITION' },
    { href: '#program', labelKo: '프로그램', labelEn: 'PROGRAM' },
    { href: '#community', labelKo: '커뮤니티', labelEn: 'COMMUNITY' },
    { href: '#visit', labelKo: '관람안내', labelEn: 'VISIT' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans antialiased selection:bg-[#002FA7] selection:text-white">
      
      {/* ─── Fixed Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2E2E2E]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between h-[68px] px-6 sm:px-10 lg:px-16">
          <a href="#" className="flex items-center gap-3">
            <span className="font-mono font-black text-2xl tracking-tighter border-2 border-white px-2 py-0.5 leading-none">
              APAP<b className="text-white">8</b>
            </span>
            <span className="hidden sm:block text-xs font-semibold text-[#B9B9B9] leading-tight">
              제8회 안양공공예술프로젝트<br />
              <span className="font-mono text-[10px] text-[#8C8C8C]">The 8th Anyang Public Art Project</span>
            </span>
          </a>

          {/* Desktop GNB */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-0.5 text-sm font-bold tracking-tight py-1 group transition-colors ${
                  activeSection === item.href ? 'text-white' : 'text-[#B9B9B9] hover:text-white'
                }`}
              >
                <span>{isKo ? item.labelKo : item.labelEn}</span>
                <span className={`font-mono text-[9px] tracking-widest transition-colors ${
                  activeSection === item.href ? 'text-white/90 font-semibold' : 'text-[#8C8C8C] group-hover:text-white/90'
                }`}>
                  {item.labelEn}
                </span>
                {/* Bottom line indicator placed cleanly below both text lines */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-white transition-all duration-200 ${
                    activeSection === item.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Lang switcher */}
            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <Link href="/site-a/ko/concept-blackwhite" className={isKo ? 'text-white' : 'text-[#8C8C8C]'}>KR</Link>
              <span className="text-[#2E2E2E]">|</span>
              <Link href="/site-a/en/concept-blackwhite" className={!isKo ? 'text-white' : 'text-[#8C8C8C]'}>EN</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="md:hidden font-mono text-xs font-bold tracking-widest px-3 py-1.5 border border-[#2E2E2E] rounded"
            >
              {drawerOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-24 px-8 pb-10 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-4 divide-y divide-[#2E2E2E]">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-baseline justify-between py-4 text-2xl font-black text-white hover:text-[#002FA7] transition-colors"
                >
                  <span>{isKo ? item.labelKo : item.labelEn}</span>
                  <span className="font-mono text-xs font-semibold text-[#8C8C8C]">{item.labelEn}</span>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-[#2E2E2E] font-mono text-sm text-[#8C8C8C]">
              APAP 2026 · BLACK &amp; WHITE EDITION
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Section 0: Hero ─── */}
      <section id="intro" className="relative mt-[68px] min-h-[82vh] border-b border-white flex flex-col justify-between overflow-hidden">
        {/* Large Typographic Outline "8" */}
        <div className="absolute right-[-2vw] top-1/2 -translate-y-1/2 font-mono font-black text-[clamp(280px,50vw,680px)] text-transparent select-none pointer-events-none z-0 leading-none opacity-20"
             style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)' }}>
          8
        </div>

        {/* Top meta */}
        <div className="relative z-10 flex justify-between items-center px-6 sm:px-10 lg:px-16 pt-8 font-mono text-xs font-semibold tracking-widest text-[#B9B9B9]">
          <span>THE 8TH ANYANG PUBLIC ART PROJECT</span>
          <span>ANYANG, KR — 2026</span>
        </div>

        {/* Main Hero Typography */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-12 max-w-5xl space-y-4">
          <h1 className="font-mono font-black text-[clamp(56px,10vw,140px)] leading-[0.88] tracking-tighter">
            APAP8<span className="block text-[0.4em] font-light text-transparent mt-2" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>ANYANG 2026</span>
          </h1>
          <p className="text-xl sm:text-2xl font-extrabold text-white pt-2">
            {isKo ? '제8회 안양공공예술프로젝트' : 'The 8th Anyang Public Art Project'}
          </p>
          <p className="text-sm sm:text-base font-normal text-[#B9B9B9] max-w-2xl leading-relaxed">
            {isKo
              ? '도시와 예술이 만나는 안양의 여덟 번째 실험. 흑백의 조형 그리드와 공공예술의 시그니처 톤으로 도심 전역을 새로운 시각적 층위로 재구성합니다.'
              : 'The eighth experiment where the city meets art. Reorganizing Anyang across public spaces through monochrome archival grids and contemporary public artworks.'}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex flex-wrap justify-between items-end gap-6 px-6 sm:px-10 lg:px-16 py-6 border-t border-white/30 bg-[#0A0A0A]/40 backdrop-blur-sm">
          <div>
            <div className="font-mono font-bold text-lg sm:text-2xl text-white">2026.09.14 — 11.30</div>
            <div className="text-xs sm:text-sm text-[#B9B9B9] mt-1">
              {isKo ? '안양예술공원 · 안양파빌리온 · 안양 전역' : 'Anyang Art Park · Anyang Pavilion · Throughout Anyang'}
            </div>
          </div>
          <div className="flex gap-3">
            <a href="#visit" className="bg-white text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-[#B9B9B9] transition-colors">
              {isKo ? '관람 안내' : 'Visit Info'}
            </a>
            <a href="#exhibition" className="border border-white text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
              {isKo ? '전시 보기' : 'Exhibition'}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Ticker Bar ─── */}
      <div className="bg-white text-black py-2.5 overflow-hidden whitespace-nowrap border-b border-white select-none">
        <div className="inline-flex animate-[ticker_25s_linear_infinite] font-mono text-xs font-bold tracking-wider gap-8">
          <span>APAP8 <b>2026.09.14 OPEN</b> ● ANYANG PUBLIC ART ● FREE ADMISSION ● NOW IN PROGRESS ● ARCHIVE → APAP.OR.KR</span>
          <span>APAP8 <b>2026.09.14 OPEN</b> ● ANYANG PUBLIC ART ● FREE ADMISSION ● NOW IN PROGRESS ● ARCHIVE → APAP.OR.KR</span>
          <span>APAP8 <b>2026.09.14 OPEN</b> ● ANYANG PUBLIC ART ● FREE ADMISSION ● NOW IN PROGRESS ● ARCHIVE → APAP.OR.KR</span>
        </div>
      </div>

      {/* ─── Section 01: 소개 (ABOUT) ─── */}
      <section id="about" className="border-b border-white">
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 border-b border-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-baseline gap-3">
            <span>{isKo ? '소개' : 'ABOUT'}</span>
            <span className="font-mono text-xs font-semibold text-[#8C8C8C] tracking-widest">ABOUT — OVERVIEW / THEME / TEAM</span>
          </h2>
          <span className="font-mono font-black text-3xl sm:text-4xl text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>01</span>
        </div>

        <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white">
          {/* Overview text */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              {isKo ? (
                <>도시 전체가 전시장이 되는<br />여덟 번째 안양<span className="text-[#002FA7]">.</span></>
              ) : (
                <>The Eighth Anyang,<br />Where the entire city becomes an open museum<span className="text-[#002FA7]">.</span></>
              )}
            </h3>
            <p className="text-[#B9B9B9] text-base leading-relaxed">
              {isKo
                ? '제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어져 온 한국 유일의 공공예술 트리엔날레의 여덟 번째 에디션입니다. 안양예술공원과 도심 곳곳에서 국내외 작가들의 신작 커미션과 퍼블릭 프로그램을 선보입니다.'
                : 'The 8th Anyang Public Art Project (APAP8) is the eighth edition of Korea’s premier public art triennial running continuously since 2005. It presents newly commissioned site-specific works and public programs across Anyang.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {['#공공예술', '#트리엔날레', '#안양예술공원', '#커미션신작', '#김덕한'].map((tag) => (
                <span key={tag} className="text-xs font-medium border border-[#2E2E2E] text-[#B9B9B9] px-3.5 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Theme & Team side grid */}
          <div className="lg:col-span-5 divide-y divide-white">
            <div className="p-6 sm:p-10 space-y-2">
              <span className="font-mono text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase block">THEME — 전시 주제</span>
              <h4 className="text-lg font-bold text-white">
                {isKo ? '공존의 균형과 디지털 무릉도원' : 'Balance in Coexistence & Digital Peach Blossom Spring'}
              </h4>
              <p className="text-sm text-[#B9B9B9] leading-relaxed">
                {isKo
                  ? '공공 공간과 예술의 상호작용을 통해 도시 공동체의 기억과 미래 가치를 재해석합니다.'
                  : 'Reinterpreting urban memories and futuristic communal values through public art interventions.'}
              </p>
            </div>
            <div className="p-6 sm:p-10 space-y-2">
              <span className="font-mono text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase block">TEAM — 기획팀</span>
              <h4 className="text-lg font-bold text-white">
                {isKo ? '예술감독 및 큐레토리얼팀' : 'Artistic Director & Curatorial Team'}
              </h4>
              <p className="text-sm text-[#B9B9B9] leading-relaxed">
                {isKo
                  ? '안양문화예술재단 공공예술부와 국내외 큐레이터들이 공동 기획을 이끕니다.'
                  : 'Collaboratively organized by Anyang Foundation for Culture & Arts and international curators.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 02: 전시 (EXHIBITION) ─── */}
      <section id="exhibition" className="border-b border-white">
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 border-b border-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-baseline gap-3">
            <span>{isKo ? '전시' : 'EXHIBITION'}</span>
            <span className="font-mono text-xs font-semibold text-[#8C8C8C] tracking-widest">EXHIBITION — ARTISTS / WORKS / MAP</span>
          </h2>
          <span className="font-mono font-black text-3xl sm:text-4xl text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>02</span>
        </div>

        {/* Exhibition Tabs */}
        <div className="flex border-b border-white font-mono text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('artists')}
            className={`flex-1 py-4 text-center border-r border-white transition-colors cursor-pointer ${
              activeTab === 'artists' ? 'bg-white text-black' : 'bg-transparent text-[#8C8C8C] hover:bg-[#141414]'
            }`}
          >
            {isKo ? '참여 작가' : 'ARTISTS'}
          </button>
          <button
            onClick={() => setActiveTab('works')}
            className={`flex-1 py-4 text-center border-r border-white transition-colors cursor-pointer ${
              activeTab === 'works' ? 'bg-white text-black' : 'bg-transparent text-[#8C8C8C] hover:bg-[#141414]'
            }`}
          >
            {isKo ? '출품작' : 'WORKS'}
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-4 text-center transition-colors cursor-pointer ${
              activeTab === 'map' ? 'bg-white text-black' : 'bg-transparent text-[#8C8C8C] hover:bg-[#141414]'
            }`}
          >
            {isKo ? '전시 지도' : 'EXHIBITION MAP'}
          </button>
        </div>

        {/* Tab 1: Artists Grid */}
        {activeTab === 'artists' && (
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-white border-b-0">
            {/* Real Featured Sample Artist: Kim Deok Han */}
            <div
              onClick={() => setSelectedArtist(sampleArtistKim)}
              className="cursor-pointer group relative bg-[#141414] hover:bg-[#1C1C1C] transition-colors"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={sampleArtistKim.profileImg}
                  alt={sampleArtistKim.nameKo}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#002FA7] text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Featured Artist
                </span>
              </div>
              <div className="p-4 border-t border-white">
                <b className="block text-base font-extrabold text-white group-hover:text-white flex items-center justify-between">
                  <span>{sampleArtistKim.nameKo}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C8C8C] group-hover:text-white transition-colors" />
                </b>
                <span className="font-mono text-xs text-[#8C8C8C]">{sampleArtistKim.nameEn} · KR</span>
              </div>
            </div>

            {/* Other Artists */}
            {otherArtists.map((artist) => (
              <div
                key={artist.id}
                className="group relative bg-[#141414] hover:bg-[#1C1C1C] transition-colors"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={artist.img}
                    alt={artist.nameKo}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4 border-t border-white">
                  <b className="block text-base font-extrabold text-white">
                    {artist.nameKo}
                  </b>
                  <span className="font-mono text-xs text-[#8C8C8C]">{artist.nameEn} · {artist.origin}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Works List */}
        {activeTab === 'works' && (
          <div className="divide-y divide-[#2E2E2E]">
            {/* Featured Work: Kim Deok Han */}
            <div
              onClick={() => setSelectedArtist(sampleArtistKim)}
              className="p-6 sm:p-8 hover:bg-[#141414] transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono font-black text-2xl text-transparent" style={{ WebkitTextStroke: '1px #FFFFFF' }}>01</span>
                <div className="w-20 h-16 bg-black border border-white overflow-hidden rounded flex-shrink-0">
                  <img src={sampleArtistKim.artworkImg} alt={sampleArtistKim.workTitleKo} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-white group-hover:text-white flex items-center gap-2">
                    {sampleArtistKim.workTitleKo}
                    <span className="text-xs bg-[#002FA7] text-white px-2 py-0.5 rounded font-mono font-bold">2026 신작</span>
                  </h4>
                  <p className="text-xs text-[#B9B9B9] mt-0.5 font-mono">
                    {sampleArtistKim.nameKo} · {sampleArtistKim.workMaterialKo}
                  </p>
                </div>
              </div>
              <span className="border border-white text-xs font-bold px-4 py-1.5 rounded-full text-white self-start sm:self-auto font-mono">
                {sampleArtistKim.workLocationKo}
              </span>
            </div>

            {/* Other mock works */}
            {[
              { no: '02', title: '도시의 기억 장치 (Urban Memory Unit)', artist: '작가 2', loc: '안양천 일대' },
              { no: '03', title: '공생의 거울 (Mirror of Coexistence)', artist: '작가 3', loc: '안양파빌리온' },
              { no: '04', title: '바람의 회랑 (Corridor of Wind)', artist: '작가 4', loc: '평촌중앙공원' },
            ].map((wk) => (
              <div key={wk.no} className="p-6 sm:p-8 hover:bg-[#141414] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <span className="font-mono font-black text-2xl text-transparent" style={{ WebkitTextStroke: '1px #FFFFFF' }}>{wk.no}</span>
                  <div>
                    <h4 className="font-extrabold text-base text-white">{wk.title}</h4>
                    <p className="text-xs text-[#B9B9B9] mt-0.5 font-mono">{wk.artist} · 설치/조각</p>
                  </div>
                </div>
                <span className="border border-[#2E2E2E] text-xs font-medium px-4 py-1.5 rounded-full text-[#B9B9B9] self-start sm:self-auto font-mono">
                  {wk.loc}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Exhibition Map */}
        {activeTab === 'map' && (
          <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white">
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 space-y-6">
              <h3 className="text-2xl font-extrabold">
                {isKo ? '야외 및 실내 전시 동선' : 'Exhibition Map & Locations'}
              </h3>
              <p className="text-sm text-[#B9B9B9] leading-relaxed">
                {isKo
                  ? '안양예술공원, 안양파빌리온, 안양천과 도심 공원 곳곳에 설치된 공공예술 작품들의 상세 위치를 확인할 수 있습니다.'
                  : 'Explore site-specific public installations located throughout Anyang Art Park, Anyang Pavilion, and along Anyang Stream.'}
              </p>
              <div className="space-y-2 pt-4 text-xs font-mono text-[#B9B9B9]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-white" />
                  <span>야외 공공조각 (Outdoor Sculptures)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-white bg-transparent" />
                  <span>실내 전시관 (Indoor Pavilions)</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 aspect-video bg-black relative overflow-hidden">
              <img src="/images/blackwhite/example09.jpg" alt="Exhibition Map Preview" className="w-full h-full object-cover grayscale opacity-80" />
              {/* Map pins */}
              <div className="absolute top-[35%] left-[30%] w-4 h-4 rounded-full bg-white shadow-lg animate-pulse" title="안양예술공원" />
              <div className="absolute top-[55%] left-[48%] w-4 h-4 rounded-full bg-[#002FA7] shadow-lg" title="안양파빌리온" />
              <div className="absolute top-[42%] left-[65%] w-4 h-4 rounded-full border-2 border-white bg-black" title="안양천" />
            </div>
          </div>
        )}
      </section>

      {/* ─── Section 03: 프로그램 (PROGRAM) ─── */}
      <section id="program" className="border-b border-white">
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 border-b border-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-baseline gap-3">
            <span>{isKo ? '프로그램' : 'PROGRAM'}</span>
            <span className="font-mono text-xs font-semibold text-[#8C8C8C] tracking-widest">PROGRAM — PUBLIC / WORKSHOP / TOUR</span>
          </h2>
          <span className="font-mono font-black text-3xl sm:text-4xl text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>03</span>
        </div>

        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white">
          <div className="p-6 sm:p-10 space-y-4">
            <span className="font-mono text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase">PUBLIC PROGRAM</span>
            <h3 className="text-xl font-extrabold text-white">개막 국제 컨퍼런스</h3>
            <p className="text-sm text-[#B9B9B9] leading-relaxed">
              참여 작가 및 국내외 기획진이 함께하는 공공예술 라운드테이블.
            </p>
            <div className="font-mono text-xs text-[#8C8C8C]">2026.09 (예정) · 안양파빌리온</div>
            <span className="inline-block text-xs font-mono text-[#8C8C8C] border border-[#2E2E2E] px-3 py-1 rounded-full">
              참여 안내 — 공지사항 게시 예정 (예약 기능 없음)
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-4">
            <span className="font-mono text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase">WORKSHOP &amp; TOUR</span>
            <h3 className="text-xl font-extrabold text-white">APAP8 도슨트 투어</h3>
            <p className="text-sm text-[#B9B9B9] leading-relaxed">
              전문 도슨트와 함께 안양예술공원 야외 공공조각을 탐방하는 시민 참여 걷기 프로그램.
            </p>
            <div className="font-mono text-xs text-[#8C8C8C]">전시 기간 중 주말 운영 · 안양예술공원</div>
            <span className="inline-block text-xs font-mono text-[#8C8C8C] border border-[#2E2E2E] px-3 py-1 rounded-full">
              일정 및 코스 — 추후 공지사항 게시 예정
            </span>
          </div>
        </div>
      </section>

      {/* ─── Section 04: 커뮤니티 (COMMUNITY) ─── */}
      <section id="community" className="border-b border-white">
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 border-b border-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-baseline gap-3">
            <span>{isKo ? '커뮤니티' : 'COMMUNITY'}</span>
            <span className="font-mono text-xs font-semibold text-[#8C8C8C] tracking-widest">COMMUNITY — NOTICE / PRESS</span>
          </h2>
          <span className="font-mono font-black text-3xl sm:text-4xl text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>04</span>
        </div>

        <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white">
          <div className="lg:col-span-8 divide-y divide-[#2E2E2E]">
            {[
              { cat: '공지', title: 'APAP8 공식 홈페이지 오픈 및 김덕한 작가 신작 정보 공개', date: '2026.09.14' },
              { cat: '프레스', title: '제8회 안양공공예술프로젝트 개막 보도자료', date: '2026.09.14' },
              { cat: '공지', title: '개막 주간 퍼블릭 프로그램 및 도슨트 투어 안내', date: '2026.09.07' },
            ].map((n, i) => (
              <div key={i} className="p-6 flex items-center justify-between gap-4 hover:bg-[#141414] transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                    n.cat === '프레스' ? 'bg-white text-black' : 'border border-white text-white'
                  }`}>
                    {n.cat}
                  </span>
                  <span className="text-sm font-bold text-white hover:underline cursor-pointer">{n.title}</span>
                </div>
                <span className="font-mono text-xs text-[#8C8C8C] flex-shrink-0">{n.date}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 p-6 sm:p-10 space-y-4 flex flex-col justify-center">
            <h4 className="text-lg font-bold text-white">Q&amp;A 및 실시간 문의</h4>
            <p className="text-xs text-[#B9B9B9] leading-relaxed">
              APAP8 관련 모든 문의 사항은 카카오톡 공식 채널을 통해 신속하게 답변 받으실 수 있습니다.
            </p>
            <a
              href="https://pf.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white hover:bg-white hover:text-black transition-colors font-bold text-xs px-5 py-3 rounded-full flex items-center justify-between"
            >
              <span>카카오톡 채널 바로가기</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Section 05: 관람안내 (VISIT) ─── */}
      <section id="visit" className="border-b border-white">
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 border-b border-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-baseline gap-3">
            <span>{isKo ? '관람안내' : 'VISIT'}</span>
            <span className="font-mono text-xs font-semibold text-[#8C8C8C] tracking-widest">VISIT — INFO / DIRECTIONS</span>
          </h2>
          <span className="font-mono font-black text-3xl sm:text-4xl text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>05</span>
        </div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white">
          <div className="p-6 sm:p-10 space-y-3">
            <span className="font-mono text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase">ADMISSION</span>
            <h3 className="text-xl font-extrabold text-white">관람료 무료</h3>
            <p className="text-sm text-[#B9B9B9] leading-relaxed">
              야외 작품: 연중 상시 관람 가능<br />
              실내 전시: 화–일 10:00–18:00 (월요일 휴관)
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-3">
            <span className="font-mono text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase">LOCATION</span>
            <h3 className="text-xl font-extrabold text-white">안양예술공원</h3>
            <p className="text-sm text-[#B9B9B9] leading-relaxed">
              경기도 안양시 만안구 예술공원로 180<br />
              1호선 관악역 또는 안양역 하차 후 마을버스 환승
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-3">
            <span className="font-mono text-[10px] font-bold text-[#8C8C8C] tracking-widest uppercase">ARCHIVE HUB</span>
            <h3 className="text-xl font-extrabold text-white">역대 APAP 아카이브</h3>
            <p className="text-sm text-[#B9B9B9] leading-relaxed">
              1회(2005)부터 7회까지의 모든 아카이브를 통합 허브에서 만나보세요.
            </p>
            <Link href="/site-b/ko" className="inline-flex items-center gap-1.5 text-xs font-mono text-white underline underline-offset-4 pt-2">
              <span>APAP ARCHIVE → apap.or.kr</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-white text-black px-6 sm:px-10 lg:px-16 py-14 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-black/20 pb-10">
          <div className="font-mono font-black text-6xl sm:text-8xl leading-none tracking-tighter">
            APAP<span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>8</span>
            <div className="text-2xl sm:text-3xl font-bold tracking-normal mt-2 font-sans">2026 ANYANG</div>
          </div>
          <div className="font-mono text-xs space-y-1 text-black/70">
            <p>© 안양문화예술재단 Anyang Foundation for Culture &amp; Arts</p>
            <p>경기도 안양시 만안구 문예로36번길 16 | 031-687-0500</p>
          </div>
        </div>
      </footer>

      {/* ─── Artist Detail Modal (Kim Deok Han) ─── */}
      <AnimatePresence>
        {selectedArtist && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#141414] border border-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white sticky top-0 bg-[#141414] z-10">
                <div>
                  <span className="font-mono text-[10px] text-[#8C8C8C] uppercase tracking-widest">
                    APAP8 PARTICIPATING ARTIST
                  </span>
                  <h3 className="text-2xl font-extrabold text-white flex items-baseline gap-2">
                    {isKo ? selectedArtist.nameKo : selectedArtist.nameEn}
                    <span className="font-mono text-sm font-normal text-[#8C8C8C]">
                      {isKo ? selectedArtist.nameEn : selectedArtist.nameKo} ({selectedArtist.birth})
                    </span>
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="w-9 h-9 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Artist Profile & Artwork Grid */}
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5 space-y-4">
                    <div className="aspect-square bg-black border border-white overflow-hidden rounded-xl">
                      <img src={selectedArtist.profileImg} alt={selectedArtist.nameKo} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-[#1C1C1C] p-4 rounded-xl space-y-2 text-xs font-mono">
                      <div><span className="text-[#8C8C8C]">국적:</span> <b className="text-white">{selectedArtist.nationalityKo}</b></div>
                      <div><span className="text-[#8C8C8C]">분야:</span> <b className="text-white">{selectedArtist.fieldKo}</b></div>
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-6">
                    {/* Artwork info */}
                    <div className="space-y-3">
                      <span className="font-mono text-xs font-bold text-[#002FA7] uppercase tracking-widest bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
                        2026 APAP8 COMMISSION WORK
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                        {isKo ? selectedArtist.workTitleKo : selectedArtist.workTitleEn}
                      </h4>
                      <p className="text-xs text-[#8C8C8C] font-mono leading-relaxed">
                        <b>재료:</b> {isKo ? selectedArtist.workMaterialKo : selectedArtist.workMaterialEn}<br />
                        <b>크기:</b> {isKo ? selectedArtist.workDimensionKo : selectedArtist.workDimensionEn}<br />
                        <b>위치:</b> {isKo ? selectedArtist.workLocationKo : selectedArtist.workLocationEn}
                      </p>
                    </div>

                    <div className="aspect-video bg-black border border-white overflow-hidden rounded-xl">
                      <img src={selectedArtist.artworkImg} alt={selectedArtist.workTitleKo} className="w-full h-full object-cover" />
                    </div>

                    <div className="text-sm text-[#B9B9B9] leading-relaxed font-light bg-[#1C1C1C] p-5 rounded-xl border border-[#2E2E2E]">
                      {isKo ? selectedArtist.workDescKo : selectedArtist.workDescEn}
                    </div>
                  </div>
                </div>

                {/* Biography (Solo & Group Exhibitions from xlsx) */}
                <div className="border-t border-[#2E2E2E] pt-6 space-y-6">
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                    EXHIBITIONS &amp; BIOGRAPHY (주요 전시 이력)
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6 text-xs text-[#B9B9B9] leading-relaxed">
                    <div className="bg-[#1C1C1C] p-5 rounded-xl space-y-3">
                      <h5 className="font-bold text-white border-b border-[#2E2E2E] pb-2">주요 개인전 (Solo Exhibitions)</h5>
                      <ul className="space-y-2 font-mono">
                        {(isKo ? selectedArtist.bioKo.solo : selectedArtist.bioEn.solo).map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#002FA7]">●</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#1C1C1C] p-5 rounded-xl space-y-3">
                      <h5 className="font-bold text-white border-b border-[#2E2E2E] pb-2">주요 단체전 (Group Exhibitions)</h5>
                      <ul className="space-y-2 font-mono">
                        {(isKo ? selectedArtist.bioKo.group : selectedArtist.bioEn.group).map((g, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#002FA7]">●</span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Concept Switcher */}
      <ConceptSwitcher locale={locale} />

    </div>
  );
}
