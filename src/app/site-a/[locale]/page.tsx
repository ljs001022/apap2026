'use client';

import React, { useState, useMemo } from 'react';
import GnbHeader from '@/components/site-a/GnbHeader';
import SectionCard from '@/components/site-a/SectionCard';
import SectionDetailModal from '@/components/site-a/SectionDetailModal';
import Footer from '@/components/site-a/Footer';
import DustCanvas from '@/components/site-a/DustCanvas';
import {
  MapPin,
  Calendar,
  Layers,
  Users,
  MessageCircle,
  ArrowUpRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Video,
  Radio,
  Sparkles,
  CheckCircle2,
  Tv,
  Compass,
  Award,
} from 'lucide-react';
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

  // Mobile modal states
  const [aboutModalItem, setAboutModalItem] = useState<'overview' | 'theme' | 'stats' | null>(null);
  const [programModalItem, setProgramModalItem] = useState<'citizen' | 'docent' | 'broadcast' | null>(null);

  // PC Tab states
  const [aboutPcTab, setAboutPcTab] = useState<'overview' | 'theme' | 'stats'>('overview');
  const [programPcTab, setProgramPcTab] = useState<'citizen' | 'docent' | 'broadcast'>('citizen');

  // Pagination states
  const [communityPage, setCommunityPage] = useState(1); // Mobile (3 per page)
  const [communityPcPage, setCommunityPcPage] = useState(1); // PC (6 per page)

  const t = {
    ko: {
      heroAlt: '제8회 안양공공예술프로젝트(APAP8) 공식 포스터',
      ticker:
        'APAP8 2026.09.30 OPEN ● 안양공공예술프로젝트 ● ArteX : 예술대전환 ● 무료 관람 ● ARCHIVE → APAP.OR.KR',
    },
    en: {
      heroAlt: 'The 8th Anyang Public Art Project (APAP8) Official Poster',
      ticker:
        'APAP8 OPEN 2026.09.30 ● ANYANG PUBLIC ART ● ArteX : ART TRANSFORMATION ● FREE ADMISSION ● ARCHIVE → APAP.OR.KR',
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

  // ─── Community Data (8 items for rich pagination) ───
  const communityItems = [
    {
      cat: isKo ? '공지' : 'Notice',
      title: isKo
        ? 'APAP8 공식 홈페이지 오픈 및 참여 작가 공개'
        : 'APAP8 Official Website Launch & Artist Announcement',
      date: '2026.09.14',
      desc: isKo
        ? '제8회 안양공공예술프로젝트 공식 웹사이트가 정식 오픈되었습니다. 야외전시 및 특별기획전에 참여하는 국내외 41인/팀 작가 정보와 주요 출품작을 확인하실 수 있습니다.'
        : 'The official platform for APAP8 has launched. Discover details on 41 participating artists across all venues.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      title: isKo
        ? '[보도자료] 제8회 안양공공예술프로젝트 개막 발표'
        : '[Press Release] The 8th Anyang Public Art Project Opens',
      date: '2026.09.14',
      desc: isKo
        ? '안양문화예술재단은 ‘ArteX : 예술대전환’(부제: 안양 무릉도원)을 주제로 3년 만에 개최되는 트리엔날레의 종합 프레스킷을 배포합니다.'
        : 'Anyang Foundation for Culture & Arts releases the official press kit for APAP8 under the theme "ArteX : Art Transformation" (Subtitle: Anyang Peach Blossom Spring).',
    },
    {
      cat: isKo ? '공지' : 'Notice',
      title: isKo
        ? '개막 주간 도원 릴레이 및 도슨트 투어 신청 안내'
        : 'Opening Week Dowon Relay & Docent Tour Registration',
      date: '2026.09.07',
      desc: isKo
        ? '도원 릴레이 시민참여 프로그램 및 주말 정기 도슨트 투어 참여 접수가 시작됩니다. 전 프로그램은 시민 누구나 무료로 참여하실 수 있습니다.'
        : 'Registration opens for Dowon Relay civic engagement programs and weekend guided tours. Free for all citizens.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      title: isKo
        ? '[보도자료] 김덕한 작가 APAP8 신작 조각 야외 설치 완료'
        : '[Press] Artist Kim Deok Han Installs New Outdoor Sculpture',
      date: '2026.08.30',
      desc: isKo
        ? '한국 현대미술의 대표 작가 김덕한의 대형 공공조각 <OVERLAID : 공존의 균형>이 안양예술공원 숲속 산책로에 성공적으로 안착했습니다.'
        : 'Kim Deok Han completes installation of his monumental sculpture in Anyang Art Park.',
    },
    {
      cat: isKo ? '공지' : 'Notice',
      title: isKo
        ? 'APAP 서포터즈 <도원지기> 1차 서류 합격자 발표'
        : 'APAP Supporters <Dowonjigi> 1st Selection Results',
      date: '2026.08.20',
      desc: isKo
        ? '제8회 안양공공예술프로젝트와 함께할 청년 서포터즈 <도원지기> 모집에 응해주신 모든 분들께 감사드립니다. 면접 일정을 개별 안내드립니다.'
        : 'Thank you to all applicants for the APAP8 Youth Supporters <Dowonjigi>. Individual interview notices have been sent.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      title: isKo
        ? '[보도자료] 안양예술공원 내 APAP8 공공조각 보존수복 프로젝트 완료'
        : '[Press] Completion of Public Sculpture Restoration in Anyang Art Park',
      date: '2026.08.15',
      desc: isKo
        ? '역대 APAP 영구 설치 조각 중 12점에 대한 정밀 클리닝 및 보존수복 작업을 완료하여 더욱 쾌적한 야외 관람 환경을 조성했습니다.'
        : 'Conservation and cleaning of 12 permanent works in Anyang Art Park completed for enhanced viewing experience.',
    },
    {
      cat: isKo ? '공지' : 'Notice',
      title: isKo
        ? '안양 무릉도원 숏폼 영상 공모전 접수 시작'
        : 'Anyang Peach Blossom Spring Short-form Video Contest Open',
      date: '2026.08.01',
      desc: isKo
        ? '시민의 시선으로 담아낸 안양예술공원과 공공예술의 매력을 공유하는 숏폼 영상 공모전을 개최합니다. 총 상금 1,000만 원 규모입니다.'
        : 'Submit your creative short-form videos highlighting Anyang Art Park and public artworks. Total prize pool 10M KRW.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      title: isKo
        ? '[보도자료] KBS <열린음악회> APAP8 특집 안양 녹화 확정'
        : '[Press] KBS <Open Concert> Confirmed for APAP8 Special Broadcast',
      date: '2026.07.25',
      desc: isKo
        ? '오는 9월 30일 개막식과 연계하여 안양예술공원 특설무대에서 KBS 열린음악회 APAP8 특집 녹화가 진행됩니다.'
        : 'KBS Open Concert special recording confirmed at Anyang Art Park on Sept 30 in conjunction with the opening ceremony.',
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white font-sans antialiased">
      <GnbHeader locale={validLocale} />

      {/* Main Container: 100dvh + 100vh fallback, vertical scroll snapping */}
      <main className="h-[100dvh] overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory hide-scrollbar">
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
                <source
                  media="(max-width: 640px)"
                  srcSet="/images/APAP8_uniform_square.gif"
                />
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
          <div className="flex-shrink-0 bg-white text-black py-2 sm:py-2.5 overflow-hidden whitespace-nowrap select-none border-t border-black relative z-10 w-full flex">
            <div className="flex w-max animate-ticker font-mono text-[10px] sm:text-[11px] font-bold tracking-wider">
              <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
                <span>{t.ticker}</span>
                <span>{t.ticker}</span>
              </div>
              <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12" aria-hidden="true">
                <span>{t.ticker}</span>
                <span>{t.ticker}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 01: About ── */}
        <SectionCard
          id="about"
          index="01"
          labelKo="소개"
          labelEn="ABOUT"
          subtitle="OVERVIEW / THEME / STATS"
          isKo={isKo}
          summary={
            <div className="w-full max-w-[1200px] mx-auto">
              {/* MOBILE VIEW (< md): 3 Summary Cards -> Opens Modal */}
              <div className="block md:hidden space-y-3">
                <div className="grid grid-cols-1 gap-2.5">
                  {/* Mobile Card 1: Overview */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setAboutModalItem('overview')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAboutModalItem('overview'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          01
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '개요' : 'OVERVIEW'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? '도시 전체가 전시장이 되는 여덟 번째 안양' : 'The Eighth Anyang: Open Museum'}
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? "제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어져 온 한국 유일의 공공예술 트리엔날레의 여덟 번째 에디션입니다. 지난 20여 년간 축적된 APAP의 문화자산을 재맥락화하고 지역사회 예술 기반을 확대합니다."
                          : "The 8th Anyang Public Art Project (APAP8) marks the eighth edition of Korea’s premier public art triennial, held continuously since 2005."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '상세 정보 보기' : 'VIEW DETAILS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Mobile Card 2: Theme */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setAboutModalItem('theme')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAboutModalItem('theme'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          02
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '전시 주제' : 'EXHIBITION THEME'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? 'ArteX : 예술대전환' : 'ArteX : Art Transformation'}
                        <span className="block text-[11px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                          {isKo ? '부제: 안양 무릉도원' : 'Subtitle: Anyang Peach Blossom Spring'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? '아르떼엑스(Arte X)는 예술과 첨단기술의 융합을 통해 공공예술의 새로운 가능성과 문화예술 경험을 확장하고, 공간·장르·매체의 경계를 넘나드는 융복합 콘텐츠로 시민참여와 상호작용을 활성화합니다.'
                          : 'ArteX merges art and cutting-edge technology to expand the horizons of public art, activating civic engagement across spatial, disciplinary, and media boundaries.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '상세 정보 보기' : 'VIEW DETAILS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Mobile Card 3: Stats */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setAboutModalItem('stats')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAboutModalItem('stats'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          03
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '구성 및 효과' : 'STATS & OUTCOMES'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? '작품 구성 및 주요 기대효과' : 'Works Stats & Expected Outcomes'}
                        <span className="block text-[11px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                          {isKo ? '총 55점 · 41팀/명 참여' : '55 Works · 41 Artists/Teams'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? '존치 6점과 임시 49점의 신작 커미션, 국내외 41팀의 현대미술 작가가 함께하며 2005년부터 이어온 한국 대표 공공예술 프로젝트의 위상과 문화자산 가치를 제고합니다.'
                          : 'Comprising 55 works (6 permanent, 49 temporary) by 41 participating artists/teams, elevating the cultural asset value and civic reach of APAP8.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '상세 정보 보기' : 'VIEW DETAILS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PC VIEW (>= md): Tab Navigation & Expanded Inline Content */}
              <div className="hidden md:block">
                {/* Tab Buttons */}
                <div className="flex border-b border-white/20 mb-6">
                  <button
                    type="button"
                    onClick={() => setAboutPcTab('overview')}
                    className={`px-7 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] ${
                      aboutPcTab === 'overview'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    01 {isKo ? '개요' : 'OVERVIEW'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAboutPcTab('theme')}
                    className={`px-7 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] ${
                      aboutPcTab === 'theme'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    02 {isKo ? '전시 주제' : 'THEME'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAboutPcTab('stats')}
                    className={`px-7 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] ${
                      aboutPcTab === 'stats'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    03 {isKo ? '구성 및 기대효과' : 'STRUCTURE & OUTCOMES'}
                  </button>
                </div>

                {/* Tab 1: Overview */}
                {aboutPcTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        01 OVERVIEW
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? '도시 전체가 전시장이 되는 여덟 번째 안양' : 'The Eighth Anyang: Open Museum'}
                      </h3>
                    </div>

                    <div className="text-base lg:text-lg text-[#D4D4D4] leading-relaxed space-y-3 font-light">
                      <p>
                        {isKo
                          ? "제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어져 온 한국 유일의 공공예술 트리엔날레의 여덟 번째 에디션입니다. 지난 20여 년간 축적된 APAP의 문화자산을 재맥락화하고, '예술의 지속성'과 '시민과의 재연결'을 통해 지역사회 예술 기반을 확대하고자 합니다."
                          : "The 8th Anyang Public Art Project (APAP8) marks the eighth edition of Korea’s premier public art triennial, held continuously since 2005. Recontextualizing cultural assets accumulated over 20 years, APAP8 expands the artistic foundation of the local community through 'artistic sustainability' and 'reconnecting with citizens.'"}
                      </p>
                      <p>
                        {isKo
                          ? '안양예술공원 일대와 안양파빌리온을 중심으로, 국내외 참여작가 및 시민·지역예술인 등 총 4개국 41인/팀 내외가 함께합니다.'
                          : 'Centering on Anyang Art Park and Anyang Pavilion, approximately 41 artists and teams from 4 countries collaborate to shape this triennial.'}
                      </p>
                    </div>

                    {/* Facts Table Box */}
                    <div className="bg-white/[0.03] border border-white/20 p-5 grid grid-cols-2 lg:grid-cols-3 gap-4 text-xs lg:text-sm font-mono">
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '사업명' : 'PROJECT'}</span>
                        <span className="text-white font-medium">{isKo ? '제8회 안양공공예술프로젝트(APAP8)' : 'The 8th Anyang Public Art Project (APAP8)'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '운영기간' : 'PERIOD'}</span>
                        <span className="text-white font-medium">{isKo ? '2026.9.30. ~ 11.29.' : 'Sept 30 – Nov 29, 2026'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '개막식' : 'OPENING CEREMONY'}</span>
                        <span className="text-white font-medium">{isKo ? '2026.9.30.(수) 19:00 (레이저 공연)' : 'Sept 30, 2026 (Wed) 19:00'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '장소' : 'VENUE'}</span>
                        <span className="text-white font-medium">{isKo ? '안양예술공원 일대 및 안양파빌리온' : 'Anyang Art Park & Anyang Pavilion'}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '사업규모' : 'SCALE'}</span>
                        <span className="text-white font-medium">{isKo ? '국내외 참여작가 및 시민·지역예술인 등 50여 명 내외 (총 4개국, 41인/팀 예정)' : 'Approx. 50 participants from 4 countries (41 artists/teams)'}</span>
                      </div>
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {(isKo
                        ? ['#공공예술', '#트리엔날레', '#안양예술공원', '#커미션신작', '#ArteX', '#안양무릉도원']
                        : ['#PublicArt', '#Triennial', '#AnyangArtPark', '#NewCommissions', '#ArteX', '#AnyangPeachBlossomSpring']
                      ).map((tag) => (
                        <span key={tag} className="text-xs font-mono border border-white/20 text-white/80 px-3 py-1.5 bg-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Theme */}
                {aboutPcTab === 'theme' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        02 EXHIBITION THEME
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? 'ArteX : 예술대전환' : 'ArteX : Art Transformation'}
                      </h3>
                      <span className="text-sm lg:text-base font-mono text-[#8C8C8C] mt-1 block">
                        {isKo ? '부제: 안양 무릉도원' : 'Subtitle: Anyang Peach Blossom Spring'}
                      </span>
                    </div>

                    <div className="bg-white/[0.04] border-l-4 border-white px-5 py-3 text-xs lg:text-sm font-mono text-white/90">
                      {isKo
                        ? 'ArteX = Art + Transformation / Expansion / Experience (예술대전환, 예술의 확장, 예술의 새로운 경험)'
                        : 'ArteX = Art + Transformation / Expansion / Experience'}
                    </div>

                    <div className="text-base lg:text-lg text-[#D4D4D4] leading-relaxed space-y-3 font-light">
                      <p>
                        {isKo
                          ? '아르떼엑스(Arte X)는 예술과 첨단기술의 융합을 통해 공공예술의 새로운 가능성과 문화예술 경험을 확장하고, 공간·장르·매체의 경계를 넘나드는 융복합 콘텐츠로 시민참여와 상호작용을 활성화합니다.'
                          : 'ArteX merges art and cutting-edge technology to expand the horizons of public art, activating civic engagement across spatial, disciplinary, and media boundaries.'}
                      </p>
                      <p>
                        {isKo
                          ? '작품 재정비를 기반으로 자연·예술·기술이 조화를 이루는 지속가능한 예술공원의 무릉도원 문화예술 생태계를 구축하고자 합니다.'
                          : 'Building upon the restoration of existing works, APAP8 establishes a sustainable utopian eco-cultural sanctuary where nature, art, and technology coexist.'}
                      </p>
                    </div>

                    {/* 3 Core Pillars */}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="border border-white/20 p-4 bg-white/[0.02] space-y-1.5">
                        <span className="font-mono text-xs text-white font-bold block">01 자연·생태계 조화</span>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          안양예술공원의 자연 지형과 생태를 보존하며 조화를 이루는 친환경 공공미술
                        </p>
                      </div>
                      <div className="border border-white/20 p-4 bg-white/[0.02] space-y-1.5">
                        <span className="font-mono text-xs text-white font-bold block">02 예술·첨단기술 융합</span>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          미디어아트, 인터랙티브 테크, AI를 접목한 동시대 융복합 예술 경험
                        </p>
                      </div>
                      <div className="border border-white/20 p-4 bg-white/[0.02] space-y-1.5">
                        <span className="font-mono text-xs text-white font-bold block">03 시민참여의 확장</span>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          관람객이 능동적 창작 주체로 참여하는 쌍방향 공공예술 커뮤니티
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Stats */}
                {aboutPcTab === 'stats' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        03 STRUCTURE & OUTCOMES
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? '작품 구성 및 주요 기대효과' : 'Works Structure & Expected Outcomes'}
                      </h3>
                    </div>

                    {/* 3 Stat Numbers */}
                    <div className="grid grid-cols-3 gap-5">
                      <div className="border border-white/25 p-5 bg-white/[0.03] space-y-1 text-center">
                        <span className="font-mono text-xs text-[#8C8C8C] uppercase">{isKo ? '참여 작가/팀' : 'Artists'}</span>
                        <div className="text-3xl lg:text-4xl font-mono font-black text-white">41</div>
                        <span className="text-xs text-[#B9B9B9] font-mono">{isKo ? '국내외 총 41인/팀' : '4 Countries'}</span>
                      </div>
                      <div className="border border-white/25 p-5 bg-white/[0.03] space-y-1 text-center">
                        <span className="font-mono text-xs text-[#8C8C8C] uppercase">{isKo ? '출품 작품' : 'Artworks'}</span>
                        <div className="text-3xl lg:text-4xl font-mono font-black text-white">55</div>
                        <span className="text-xs text-[#B9B9B9] font-mono">{isKo ? '존치 6점 + 임시 49점' : '6 Perm + 49 Temp'}</span>
                      </div>
                      <div className="border border-white/25 p-5 bg-white/[0.03] space-y-1 text-center">
                        <span className="font-mono text-xs text-[#8C8C8C] uppercase">{isKo ? '트리엔날레 역사' : 'Legacy'}</span>
                        <div className="text-3xl lg:text-4xl font-mono font-black text-white">20+</div>
                        <span className="text-xs text-[#B9B9B9] font-mono">{isKo ? '2005년~2026년 8회차' : 'Years of Public Art'}</span>
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="grid grid-cols-2 gap-5 pt-2">
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <span className="font-mono text-xs text-white font-bold block pb-2 border-b border-white/10">
                          {isKo ? '■ 정량적 기대효과' : '■ Quantitative Outcomes'}
                        </span>
                        <ul className="text-xs lg:text-sm text-[#B9B9B9] space-y-2 font-light list-disc list-inside">
                          <li>국내외 관람객 10만 명 이상 안양예술공원 방문 유치</li>
                          <li>시민참여 워크숍 및 도슨트 투어 연 5,000명 이상 수혜</li>
                          <li>KBS 전국 방송 및 해외 미디어 연계 홍보 파급 효과</li>
                        </ul>
                      </div>
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <span className="font-mono text-xs text-white font-bold block pb-2 border-b border-white/10">
                          {isKo ? '■ 정성적 기대효과' : '■ Qualitative Outcomes'}
                        </span>
                        <ul className="text-xs lg:text-sm text-[#B9B9B9] space-y-2 font-light list-disc list-inside">
                          <li>안양의 공공예술 자산 가치 재인식 및 시민 문화적 자긍심 고취</li>
                          <li>기존 영구 설치작과 첨단 신작의 상생을 통한 지속가능한 문화 생태계 완성</li>
                          <li>글로벌 공공예술 거점 도시로서 안양시의 독창적 브랜드 확립</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
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
          summary={
            <div className="w-full max-w-[1200px] mx-auto">
              <ArtistGrid
                categories={categories}
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
          subtitle="RELAY / DOCENT / BROADCAST"
          isKo={isKo}
          summary={
            <div className="w-full max-w-[1200px] mx-auto">
              {/* MOBILE VIEW (< md): 3 Summary Cards -> Opens Modal */}
              <div className="block md:hidden space-y-3">
                <div className="grid grid-cols-1 gap-2.5">
                  {/* Card 1: Citizen */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setProgramModalItem('citizen')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setProgramModalItem('citizen'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          01
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '시민참여' : 'CITIZEN RELAY'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? '도원 릴레이' : 'Dowon Relay'}
                        <span className="block text-[11px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                          {isKo ? '워크숍 · 공연 · 교육 · 체험 4종' : 'Workshops, Performances, Education, Experience'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? '시민 참여형 공공예술 프로그램을 통해 지역의 문화예술 향유 기회를 확대하고, 지역 예술가와 시민 간 창작·소통의 기반을 마련합니다. 미디어아트·기술·AI 연계 콘텐츠를 운영합니다.'
                          : 'Community-engaged public art programs fostering creative dialogue between local artists and citizens through media art, technology, and AI integration.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '프로그램 세부내용 보기' : 'VIEW DETAILS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: Docent */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setProgramModalItem('docent')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setProgramModalItem('docent'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          02
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '도슨트 투어' : 'DOCENT TOUR'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? 'APAP8 작품 투어 프로그램' : 'APAP8 Guided Docent Tours'}
                        <span className="block text-[11px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                          {isKo ? '정규 해설 · 한중 특별전 · 나이트 투어' : 'Regular, Special Exhibition & Night Tours'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? '전문 해설사와 함께 안양예술공원 숲길과 전시장을 순회하며 APAP8 신작과 역대 명작을 깊이 있게 감상하는 도슨트 프로그램입니다.'
                          : 'Experience APAP8 commissions and historical highlights guided by expert docents across Anyang Art Park.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '투어 코스 & 시간 보기' : 'VIEW TOURS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Broadcast */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setProgramModalItem('broadcast')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setProgramModalItem('broadcast'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          03
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '미디어·방송' : 'MEDIA & BROADCAST'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? 'KBS1 다큐멘터리 방송' : 'KBS1 Nationwide Broadcast'}
                        <span className="block text-[11px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                          {isKo ? '기획 〈예술로 길을 열다〉' : 'Special: Opening Paths with Art'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? 'KBS 네트워크 기획 〈예술로 길을 열다〉 — APAP8을 중심으로 지역이 예술로 가치를 발현하는 현장을 취재하고 동시대 공공예술의 비전을 소개합니다.'
                          : 'KBS Network Special documentary capturing how APAP8 revitalizes community through public art and contemporary innovation.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '방송 정보 & 영상 보기' : 'WATCH / DETAILS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PC VIEW (>= md): Tab Navigation & Expanded Inline Content */}
              <div className="hidden md:block">
                {/* Tab Buttons */}
                <div className="flex border-b border-white/20 mb-6">
                  <button
                    type="button"
                    onClick={() => setProgramPcTab('citizen')}
                    className={`px-7 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] ${
                      programPcTab === 'citizen'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    01 {isKo ? '시민참여 프로그램' : 'CITIZEN RELAY'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgramPcTab('docent')}
                    className={`px-7 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] ${
                      programPcTab === 'docent'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    02 {isKo ? '도슨트 투어' : 'DOCENT TOUR'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgramPcTab('broadcast')}
                    className={`px-7 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] ${
                      programPcTab === 'broadcast'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    03 {isKo ? '미디어·방송 특별기획' : 'MEDIA & BROADCAST'}
                  </button>
                </div>

                {/* Tab 1: Citizen Programs */}
                {programPcTab === 'citizen' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        01 CITIZEN ENGAGEMENT
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? '도원 릴레이: 시민과 함께 만드는 공공예술' : 'Dowon Relay: Citizen-Engaged Public Art'}
                      </h3>
                      <p className="text-sm lg:text-base text-[#B9B9B9] mt-2 font-light">
                        {isKo
                          ? '공공예술의 주체인 시민이 직접 참여하여 완성하는 4가지 테마의 창작·체험 릴레이 프로그램입니다.'
                          : 'Four thematic interactive relays where citizens actively participate as creators.'}
                      </p>
                    </div>

                    {/* 4 Program Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '01 안양 무릉도원 숏폼 공모전' : '01 Short-form Video Contest'}
                          </h4>
                          <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">전국민</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          시민의 창의적 시각으로 안양예술공원의 숨겨진 매력과 공공예술을 60초 이내 숏폼 영상으로 발굴하는 전국 공모
                        </p>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-0.5">
                          <div>■ 일정: 2026.08.01 ~ 10.31 | 총상금 1,000만 원</div>
                        </div>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '02 APAP 서포터즈 <도원지기>' : '02 APAP Supporters <Dowonjigi>'}
                          </h4>
                          <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">청년/대학생</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          전시 현장 안내, 시민 도슨트 보조, SNS 문화콘텐츠 기획 및 제작에 참여하는 청년 예술 활동가 네트워크
                        </p>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-0.5">
                          <div>■ 활동: 2026.09.01 ~ 11.29 | 수료증 및 활동비 지급</div>
                        </div>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '03 오픈 스튜디오 & 아티스트 토크' : '03 Open Studio & Artist Talk'}
                          </h4>
                          <span className="text-xs font-mono border border-white/40 text-white px-2 py-0.5 font-bold">시민/예술인</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          APAP8 참여 현대미술 작가들과 함께 창작 과정, 기획 의도, 미래 공공예술 담론을 직접 나누는 대화의 장
                        </p>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-0.5">
                          <div>■ 일정: 전시 기간 중 매주 토요일 15:00 (안양파빌리온 메인홀)</div>
                        </div>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '04 어린이·청소년 공공예술 워크숍' : '04 Youth Public Art Workshop'}
                          </h4>
                          <span className="text-xs font-mono border border-white/40 text-white px-2 py-0.5 font-bold">어린이/가족</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          자연 소재와 디지털 테크놀로지를 융합한 인터랙티브 공공조각 만들기 체험형 창작 교육 프로그램
                        </p>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-0.5">
                          <div>■ 일정: 매주 일요일 10:30, 14:00 (사전예약제 무료 운영)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Docent Tour */}
                {programPcTab === 'docent' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        02 GUIDED DOCENT TOURS
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? '전문 해설사와 함께 걷는 APAP8 작품 투어' : 'APAP8 Guided Docent Tour Courses'}
                      </h3>
                      <p className="text-sm lg:text-base text-[#B9B9B9] mt-2 font-light">
                        {isKo
                          ? '안양예술공원의 자연과 공공예술 명작 55점을 깊이 있게 이해할 수 있는 테마별 도슨트 프로그램입니다.'
                          : 'Thematic walking tours with expert docents exploring nature and artworks in Anyang Art Park.'}
                      </p>
                    </div>

                    {/* Schedule Banner */}
                    <div className="border border-white/20 p-4 bg-white/[0.03] flex justify-between items-center text-xs lg:text-sm font-mono">
                      <div>
                        <span className="text-[#8C8C8C] font-bold mr-2">■ 정기 투어 운영:</span>
                        <span>화요일 ~ 일요일 11:00 / 14:00 (회당 60~80분 소요, 전액 무료)</span>
                      </div>
                      <span className="bg-white text-black px-2.5 py-1 font-bold">사전예약 및 현장접수</span>
                    </div>

                    {/* 4 Courses Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? 'A코스: 숲속 예술산책 (자연과 조각)' : 'Course A: Forest Art Walk'}
                          </h4>
                          <span className="text-xs font-mono text-[#8C8C8C]">70분 소요</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          전망대 둘레길을 따라 자연 속에 설치된 대형 야외 조각과 환경예술 작품을 감상하는 대표 힐링 코스
                        </p>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? 'B코스: 건축과 공간 (안양파빌리온 집중)' : 'Course B: Architecture & Space'}
                          </h4>
                          <span className="text-xs font-mono text-[#8C8C8C]">60분 소요</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          알바루 시자가 설계한 안양파빌리온의 건축미와 실내 기획전 및 아카이브 센터를 집중 탐구하는 코스
                        </p>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? 'C코스: 나이트 야간 투어 (빛과 소리)' : 'Course C: Night Art Tour'}
                          </h4>
                          <span className="text-xs font-mono text-[#8C8C8C]">60분 소요 (금/토 19:30)</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          야간에 조명과 사운드로 새롭게 깨어나는 미디어아트 작품들과 308 아트크루 레이저 아트를 경험하는 특별 야간 코스
                        </p>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? 'D코스: 가족 맞춤형 투어 (오감 체험)' : 'Course D: Family Interactive Tour'}
                          </h4>
                          <span className="text-xs font-mono text-[#8C8C8C]">50분 소요 (주말 전용)</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          어린이와 가족 관람객을 위해 퀴즈와 워크북을 활용하여 쉽고 재미있게 예술을 체험하는 코스
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Broadcast */}
                {programPcTab === 'broadcast' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        03 MEDIA & BROADCAST PARTNERSHIP
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? 'KBS 전국 방송 및 미디어 특별기획' : 'Nationwide Broadcast & Media Partnerships'}
                      </h3>
                      <p className="text-sm lg:text-base text-[#B9B9B9] mt-2 font-light">
                        {isKo
                          ? '공중파 전국 방송과 연계하여 안양의 문화예술 콘텐츠를 전국 및 전 세계로 확산합니다.'
                          : 'Partnering with KBS to showcase Anyang’s public arts to audiences worldwide.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-1">
                      <div className="border border-white/20 p-6 bg-white/[0.02] space-y-3">
                        <div className="flex items-center gap-2">
                          <Tv className="w-5 h-5 text-white" />
                          <span className="font-mono text-xs font-bold text-[#8C8C8C]">KBS1 특집 다큐멘터리</span>
                        </div>
                        <h4 className="text-lg lg:text-xl font-bold text-white">
                          {isKo ? '네트워크 기획 〈예술로 길을 열다〉' : 'Special Documentary: Opening Paths with Art'}
                        </h4>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] leading-relaxed font-light">
                          2005년 시작된 안양공공예술프로젝트 20년의 발자취와 제8회 APAP8 신작 제작 과정을 심층 취재하고, 도시와 예술이 공존하는 새로운 모델을 제시합니다.
                        </p>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10">
                          ■ 방영: 2026년 10월 중 KBS 1TV 전국 방송 예정
                        </div>
                      </div>

                      <div className="border border-white/20 p-6 bg-white/[0.02] space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-white" />
                          <span className="font-mono text-xs font-bold text-[#8C8C8C]">KBS 대형 공개방송</span>
                        </div>
                        <h4 className="text-lg lg:text-xl font-bold text-white">
                          {isKo ? 'KBS <열린음악회> APAP8 개막 특집' : 'KBS <Open Concert> APAP8 Special'}
                        </h4>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] leading-relaxed font-light">
                          개막 주간 안양예술공원 특설무대에서 펼쳐지는 국내 정상급 아티스트들의 축하 공연과 미디어아트 협업 무대.
                        </p>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10">
                          ■ 일시/장소: 2026.09.30.(수) 19:00 / 안양예술공원 특설무대
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
          subtitle="NOTICES / PRESS / Q&A"
          isKo={isKo}
          summary={
            <div className="w-full max-w-[1200px] mx-auto space-y-3 sm:space-y-4">
              {/* MOBILE VIEW (< md): 3 items per page */}
              <div className="block md:hidden">
                <div className="border-t border-b border-white/20 divide-y divide-white/10">
                  {communityItems
                    .slice(
                      (communityPage - 1) * 3,
                      communityPage * 3
                    )
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="py-3 px-2 transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold font-mono px-1.5 py-0.5 flex-shrink-0 ${
                                item.cat === '프레스' || item.cat === 'Press'
                                  ? 'bg-white text-black'
                                  : 'border border-white text-white'
                              }`}
                            >
                              {item.cat}
                            </span>
                            <span className="font-mono text-[11px] text-[#8C8C8C]">
                              {item.date}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-sm font-bold text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#B9B9B9] line-clamp-2 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                </div>

                {/* Mobile Pagination */}
                {Math.ceil(communityItems.length / 3) > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setCommunityPage((p) => Math.max(1, p - 1))}
                      disabled={communityPage === 1}
                      className="w-7 h-7 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs text-white/50">
                      {communityPage} / {Math.ceil(communityItems.length / 3)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCommunityPage((p) =>
                          Math.min(Math.ceil(communityItems.length / 3), p + 1)
                        )
                      }
                      disabled={communityPage === Math.ceil(communityItems.length / 3)}
                      className="w-7 h-7 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* PC VIEW (>= md): 6 items per page with enlarged fonts & 2-column layout */}
              <div className="hidden md:block">
                <div className="border-t border-b border-white/20 py-2">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                    {communityItems
                      .slice(
                        (communityPcPage - 1) * 6,
                        communityPcPage * 6
                      )
                      .map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 border border-white/10 hover:border-white/40 bg-white/[0.01] hover:bg-white/[0.03] transition-all space-y-2 group"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-bold font-mono px-2 py-0.5 flex-shrink-0 ${
                                item.cat === '프레스' || item.cat === 'Press'
                                  ? 'bg-white text-black'
                                  : 'border border-white text-white'
                              }`}
                            >
                              {item.cat}
                            </span>
                            <span className="font-mono text-xs lg:text-sm text-[#8C8C8C]">
                              {item.date}
                            </span>
                          </div>
                          <h3 className="text-base lg:text-lg font-bold text-white leading-snug group-hover:text-white">
                            {item.title}
                          </h3>
                          <p className="text-xs lg:text-sm text-[#B9B9B9] line-clamp-2 leading-relaxed font-light">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* PC Pagination Controls */}
                {Math.ceil(communityItems.length / 6) > 1 && (
                  <div className="flex items-center justify-center gap-5 pt-4">
                    <button
                      type="button"
                      onClick={() => setCommunityPcPage((p) => Math.max(1, p - 1))}
                      disabled={communityPcPage === 1}
                      className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-sm text-white/70">
                      {communityPcPage} / {Math.ceil(communityItems.length / 6)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCommunityPcPage((p) =>
                          Math.min(Math.ceil(communityItems.length / 6), p + 1)
                        )
                      }
                      disabled={communityPcPage === Math.ceil(communityItems.length / 6)}
                      className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Inquiry Card */}
              <div className="bg-white/[0.03] border border-white/20 px-3 py-2 sm:px-6 sm:py-3.5 flex flex-row items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                  <span className="text-[11px] xs:text-xs sm:text-base font-bold text-white truncate whitespace-nowrap">
                    {isKo ? '실시간 문의 및 운영 안내' : 'Direct Inquiry & Q&A'}
                  </span>
                </div>
                <a
                  href="https://pf.kakao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white hover:bg-white hover:text-black transition-colors font-mono font-bold text-[10px] sm:text-xs lg:text-sm px-2.5 sm:px-4 py-1 sm:py-2 flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap"
                >
                  <span>{isKo ? '카카오톡 채널 바로가기' : 'KAKAO CHANNEL'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
            <div className="w-full max-w-[1200px] mx-auto">
              {/* MOBILE VIEW (< md): 2 Symmetrical Cards + Slim Archive Banner */}
              <div className="block md:hidden space-y-2.5">
                <div className="grid grid-cols-1 gap-2.5">
                  {/* Mobile Card 1: Admission & Hours */}
                  <div className="border border-white/20 p-3 space-y-2.5 bg-white/[0.02] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                        <Clock className="w-4 h-4 text-white flex-shrink-0" />
                        <span>{isKo ? '관람 일정 및 시간' : 'SCHEDULE & HOURS'}</span>
                      </div>
                      <span className="font-mono text-[10px] bg-white text-black px-2 py-0.5 font-bold">
                        {isKo ? '전액 무료' : 'FREE ADMISSION'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {/* Event Period */}
                      <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-2.5">
                        <span className="font-mono text-[11px] text-[#8C8C8C] font-semibold flex-shrink-0 min-w-[50px]">
                          {isKo ? '운영기간' : 'Period'}
                        </span>
                        <div className="text-white font-medium text-[12.5px]">
                          <span>{isKo ? '2026.09.30(수) ~ 11.29(일)' : 'Sept 30 – Nov 29, 2026'}</span>
                          <span className="block text-[10.5px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                            {isKo ? '※ 개막식 9.30 19:00 (308 아트크루 레이저 공연 연계)' : '※ Opening Sept 30 19:00'}
                          </span>
                        </div>
                      </div>

                      {/* Indoor Pavilion */}
                      <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-2.5 pt-1.5 border-t border-white/5">
                        <span className="font-mono text-[11px] text-[#8C8C8C] font-semibold flex-shrink-0 min-w-[50px]">
                          {isKo ? '실내 전시' : 'Indoor'}
                        </span>
                        <div className="text-[#D4D4D4] font-light text-[12px]">
                          <span>{isKo ? '화–일 10:00–18:00 (입장마감 17:30)' : 'Tue–Sun 10:00–18:00 (Last 17:30)'}</span>
                          <span className="block text-[10.5px] font-mono text-[#8C8C8C] mt-0.5">
                            {isKo ? '※ 매주 월요일 휴관 (공휴일인 경우 익일 휴관)' : '※ Closed Mondays'}
                          </span>
                        </div>
                      </div>

                      {/* Outdoor Sculptures */}
                      <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-2.5 pt-1.5 border-t border-white/5">
                        <span className="font-mono text-[11px] text-[#8C8C8C] font-semibold flex-shrink-0 min-w-[50px]">
                          {isKo ? '야외 전시' : 'Outdoor'}
                        </span>
                        <span className="text-[#D4D4D4] font-light text-[12px]">
                          {isKo ? '연중 상시 개방 (24시간 자유 관람)' : 'Open 24/7 year-round'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Card 2: Location & Access */}
                  <div className="border border-white/20 p-3 space-y-2.5 bg-white/[0.02] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                        <span>{isKo ? '전시 장소 및 안내' : 'LOCATION & ACCESS'}</span>
                      </div>
                      <span className="font-mono text-[10px] border border-white/40 text-white/90 px-2 py-0.5 font-bold">
                        {isKo ? '안양파빌리온' : 'PAVILION'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {/* Main Area */}
                      <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-2.5">
                        <span className="font-mono text-[11px] text-[#8C8C8C] font-semibold flex-shrink-0 min-w-[50px]">
                          {isKo ? '전시 장소' : 'Location'}
                        </span>
                        <div className="text-white font-medium text-[12.5px]">
                          <span>{isKo ? '안양예술공원 일원' : 'Anyang Art Park'}</span>
                          <span className="block text-[10.5px] text-[#8C8C8C] font-normal mt-0.5">
                            {isKo ? '산책로 · 안양파빌리온 메인홀 · 안양천 변' : 'Trails, Pavilion Main Hall, Anyang Stream'}
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-2.5 pt-1.5 border-t border-white/5">
                        <span className="font-mono text-[11px] text-[#8C8C8C] font-semibold flex-shrink-0 min-w-[50px]">
                          {isKo ? '상세 주소' : 'Address'}
                        </span>
                        <span className="text-[#D4D4D4] font-light text-[12px]">
                          {isKo
                            ? '경기도 안양시 만안구 예술공원로 180 (안양파빌리온)'
                            : '180, Yesulgongwon-ro, Manan-gu, Anyang-si'}
                        </span>
                      </div>

                      {/* Transportation & Tel */}
                      <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-2.5 pt-1.5 border-t border-white/5">
                        <span className="font-mono text-[11px] text-[#8C8C8C] font-semibold flex-shrink-0 min-w-[50px]">
                          {isKo ? '교통/문의' : 'Transit/Tel'}
                        </span>
                        <span className="text-[#D4D4D4] font-light text-[12px]">
                          {isKo
                            ? '관악역 2번 출구(마을 6-2) / 031-687-0500'
                            : 'Gwanak Stn (Bus 6-2) / +82-31-687-0500'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Streamlined Historical Archive Banner */}
                <div className="border border-white/30 px-3.5 py-2.5 flex flex-row items-center justify-between gap-3 bg-white/[0.04]">
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-mono text-[9.5px] font-bold text-[#8C8C8C] uppercase tracking-widest block">
                      APAP ARCHIVE
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {isKo ? '역대 APAP (1회~7회) 아카이브' : 'APAP Editions 1–7 Archives'}
                    </h4>
                  </div>
                  <Link
                    href={`/archive/${validLocale}`}
                    className="inline-flex items-center justify-center gap-1 font-mono text-[11px] font-bold px-3 py-1.5 bg-white text-black hover:bg-white/80 transition-colors flex-shrink-0 whitespace-nowrap"
                  >
                    <span>{isKo ? '바로가기' : 'GO TO ARCHIVE'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* PC VIEW (>= md): Top-to-Bottom Vertical Section Layout & Enlarged Fonts */}
              <div className="hidden md:block space-y-6">
                {/* 01: Schedule & Hours */}
                <div className="border border-white/20 p-6 lg:p-7 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5 text-base lg:text-lg font-mono font-bold text-white uppercase tracking-wider">
                      <Clock className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{isKo ? '01 관람 일정 및 시간' : '01 SCHEDULE & HOURS'}</span>
                    </div>
                    <span className="font-mono text-xs lg:text-sm bg-white text-black px-3 py-1 font-bold">
                      {isKo ? '관람료 전액 무료' : 'FREE ADMISSION'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-1">
                    {/* Period */}
                    <div className="space-y-1.5 border-r border-white/10 pr-4">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '운영기간' : 'Period'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '2026.09.30(수) ~ 11.29(일)' : 'Sept 30 – Nov 29, 2026'}
                      </div>
                      <p className="text-xs lg:text-sm font-mono text-[#8C8C8C]">
                        {isKo ? '※ 개막식 2026.9.30.(수) 19:00 (308 아트크루 레이저 공연 연계)' : '※ Opening Ceremony Sept 30 19:00'}
                      </p>
                    </div>

                    {/* Indoor */}
                    <div className="space-y-1.5 border-r border-white/10 pr-4">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '실내 전시관 (안양파빌리온)' : 'Indoor Pavilion'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '화–일 10:00 – 18:00' : 'Tue–Sun 10:00–18:00'}
                      </div>
                      <p className="text-xs lg:text-sm font-mono text-[#8C8C8C]">
                        {isKo ? '※ 입장 마감 17:30 / 매주 월요일 휴관 (공휴일 익일 휴관)' : '※ Last entry 17:30 / Closed Mondays'}
                      </p>
                    </div>

                    {/* Outdoor */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '야외 공공조각 전시' : 'Outdoor Sculptures'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '연중 상시 개방' : 'Open 24/7 Year-round'}
                      </div>
                      <p className="text-xs lg:text-sm text-[#8C8C8C]">
                        {isKo ? '안양예술공원 전역 24시간 언제나 자유 관람 가능' : '24/7 open public access throughout the park'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 02: Location & Access */}
                <div className="border border-white/20 p-6 lg:p-7 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5 text-base lg:text-lg font-mono font-bold text-white uppercase tracking-wider">
                      <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{isKo ? '02 전시 장소 및 오시는 길' : '02 LOCATION & ACCESS'}</span>
                    </div>
                    <span className="font-mono text-xs lg:text-sm border border-white/40 text-white/90 px-3 py-1 font-bold">
                      {isKo ? '안양파빌리온 메인 거점' : 'ANYANG PAVILION'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-1">
                    {/* Area */}
                    <div className="space-y-1.5 border-r border-white/10 pr-4">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '메인 전시장' : 'Main Area'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '안양예술공원 일원' : 'Anyang Art Park'}
                      </div>
                      <p className="text-xs lg:text-sm text-[#8C8C8C]">
                        {isKo ? '예술공원 둘레길 · 안양파빌리온 메인홀 · 안양천 변' : 'Trails, Pavilion Main Hall, Anyang Stream'}
                      </p>
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5 border-r border-white/10 pr-4">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '거점 주소' : 'Address'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '경기도 안양시 만안구 예술공원로 180' : '180, Yesulgongwon-ro, Manan-gu'}
                      </div>
                      <p className="text-xs lg:text-sm font-mono text-[#8C8C8C]">
                        {isKo ? '문의: 031-687-0500 (안양문화예술재단 APAP 사업부)' : 'Tel: +82-31-687-0500'}
                      </p>
                    </div>

                    {/* Transit */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '대중교통 안내' : 'Public Transit'}
                      </span>
                      <div className="text-xs lg:text-sm text-white/90 space-y-1 font-light">
                        <p>{isKo ? '1호선 관악역 2번 출구 → 마을버스 6-2번 환승 (2분 도보)' : 'Line 1 Gwanak Stn Exit 2 → Bus 6-2'}</p>
                        <p>{isKo ? '1호선 안양역 1번 출구 → 시내버스 2번 환승 (5분 도보)' : 'Line 1 Anyang Stn Exit 1 → Bus 2'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 03: Historical Archive Banner */}
                <div className="border border-white/30 p-6 lg:p-7 flex flex-row items-center justify-between gap-6 bg-white/[0.04]">
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-widest">
                      APAP ARCHIVE HUB
                    </div>
                    <h4 className="text-xl lg:text-2xl font-bold text-white">
                      {isKo ? '역대 APAP (1회~7회) 아카이브' : 'APAP Editions 1–7 Archives'}
                    </h4>
                    <p className="text-sm lg:text-base text-[#B9B9B9] max-w-2xl leading-relaxed font-light">
                      {isKo
                        ? '2005년 제1회부터 축적된 역대 APAP의 모든 영구 설치 작품 및 전시 기록을 통합 아카이브에서 확인하실 수 있습니다.'
                        : 'Browse permanent installations and documentation across past editions from 2005 to 2023.'}
                    </p>
                  </div>

                  <Link
                    href={`/archive/${validLocale}`}
                    className="inline-flex items-center justify-center gap-2 font-mono text-sm lg:text-base font-bold px-6 py-3.5 bg-white text-black hover:bg-white/80 transition-colors flex-shrink-0 whitespace-nowrap"
                  >
                    <span>{isKo ? '바로가기' : 'GO TO ARCHIVE'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
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

      {/* ── Mobile Detail Modals (Retained for mobile view) ── */}
      <SectionDetailModal
        isOpen={aboutModalItem === 'overview'}
        onClose={() => setAboutModalItem(null)}
        category={isKo ? '01 개요' : '01 OVERVIEW'}
        title={isKo ? '도시 전체가 전시장이 되는 여덟 번째 안양' : 'The Eighth Anyang: Open Museum'}
      >
        <div className="space-y-4">
          <div className="text-body text-[#B9B9B9] leading-relaxed space-y-3 font-light">
            <p>
              {isKo
                ? "제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어져 온 한국 유일의 공공예술 트리엔날레의 여덟 번째 에디션입니다. 지난 20여 년간 축적된 APAP의 문화자산을 재맥락화하고, '예술의 지속성'과 '시민과의 재연결'을 통해 지역사회 예술 기반을 확대하고자 합니다."
                : "The 8th Anyang Public Art Project (APAP8) marks the eighth edition of Korea’s premier public art triennial, held continuously since 2005. Recontextualizing cultural assets accumulated over 20 years, APAP8 expands the artistic foundation of the local community through 'artistic sustainability' and 'reconnecting with citizens.'"}
            </p>
            <p>
              {isKo
                ? '안양예술공원 일대와 안양파빌리온을 중심으로, 국내외 참여작가 및 시민·지역예술인 등 총 4개국 41인/팀 내외가 함께합니다.'
                : 'Centering on Anyang Art Park and Anyang Pavilion, approximately 41 artists and teams from 4 countries—including international artists, citizens, and local creators—collaborate to shape this triennial.'}
            </p>
          </div>

          {/* Facts Table Box */}
          <div className="bg-white/[0.03] border border-white/15 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
            <div>
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '사업명' : 'PROJECT'}</span>
              <span className="text-white font-medium">{isKo ? '제8회 안양공공예술프로젝트(APAP8)' : 'The 8th Anyang Public Art Project (APAP8)'}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '운영기간' : 'PERIOD'}</span>
              <span className="text-white font-medium">{isKo ? '2026.9.30. ~ 11.29.' : 'Sept 30 – Nov 29, 2026'}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '개막식' : 'OPENING CEREMONY'}</span>
              <span className="text-white font-medium">{isKo ? '2026.9.30.(수) 19:00~20:00 (308 아트크루 레이저 공연 연계)' : 'Sept 30, 2026 (Wed) 19:00–20:00 (308 Art Crew Laser Show)'}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '장소' : 'VENUE'}</span>
              <span className="text-white font-medium">{isKo ? '안양예술공원 일대 및 안양파빌리온' : 'Anyang Art Park & Anyang Pavilion'}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '사업규모' : 'SCALE'}</span>
              <span className="text-white font-medium">{isKo ? '국내외 참여작가 및 시민·지역예술인 등 50여 명 내외 (총 4개국, 41인/팀 예정)' : 'Approx. 50 participants from 4 countries (41 artists/teams)'}</span>
            </div>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {(isKo
              ? ['#공공예술', '#트리엔날레', '#안양예술공원', '#커미션신작', '#ArteX', '#안양무릉도원']
              : ['#PublicArt', '#Triennial', '#AnyangArtPark', '#NewCommissions', '#ArteX', '#AnyangPeachBlossomSpring']
            ).map((tag) => (
              <span key={tag} className="text-caption font-mono border border-white/20 text-white/70 px-3 py-1 bg-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SectionDetailModal>

      <SectionDetailModal
        isOpen={aboutModalItem === 'theme'}
        onClose={() => setAboutModalItem(null)}
        category={isKo ? '02 전시 주제' : '02 EXHIBITION THEME'}
        title={isKo ? 'ArteX : 예술대전환' : 'ArteX : Art Transformation'}
      >
        <div className="space-y-4">
          <div>
            <div className="font-mono text-sm text-[#8C8C8C] font-semibold">
              {isKo ? '부제: 안양 무릉도원' : 'Subtitle: Anyang Peach Blossom Spring'}
            </div>
            <p className="font-mono text-xs sm:text-sm text-white/80 mt-2 bg-white/[0.04] border-l-2 border-white px-3 py-1.5">
              {isKo
                ? 'ArteX = Art + Transformation / Expansion / Experience (예술대전환, 예술의 확장, 예술의 새로운 경험)'
                : 'ArteX = Art + Transformation / Expansion / Experience'}
            </p>
          </div>

          <div className="text-body text-[#B9B9B9] leading-relaxed space-y-3 font-light">
            <p>
              {isKo
                ? '아르떼엑스(Arte X)는 예술과 첨단기술의 융합을 통해 공공예술의 새로운 가능성과 문화예술 경험을 확장하고, 공간·장르·매체의 경계를 넘나드는 융복합 콘텐츠로 시민참여와 상호작용을 활성화합니다.'
                : 'ArteX merges art and cutting-edge technology to expand the horizons of public art, activating civic engagement and interactive experiences across spatial, disciplinary, and media boundaries.'}
            </p>
            <p>
              {isKo
                ? '작품 재정비를 기반으로 자연·예술·기술이 조화를 이루는 지속가능한 예술공원의 무릉도원 문화예술 생태계를 구축하고자 합니다.'
                : 'Building upon the restoration and reimagining of existing works, APAP8 establishes a sustainable utopian eco-cultural sanctuary where nature, art, and technology coexist.'}
            </p>
          </div>

          {/* 3 Core Directions */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="text-caption font-mono text-[#8C8C8C] uppercase tracking-wider">
              {isKo ? '3대 핵심 방향' : 'THREE CORE PILLARS'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-caption">
              <div className="border border-white/10 p-2.5 bg-white/[0.02]">
                <strong className="text-white block mb-1">01 자연·생태계 조화</strong>
                <span className="text-[#8C8C8C] font-light">안양예술공원 지형과 자연환경을 존중하는 친환경 공공미술</span>
              </div>
              <div className="border border-white/10 p-2.5 bg-white/[0.02]">
                <strong className="text-white block mb-1">02 예술·첨단기술 융합</strong>
                <span className="text-[#8C8C8C] font-light">미디어아트와 기술을 결합한 동시대 융복합 콘텐츠</span>
              </div>
              <div className="border border-white/10 p-2.5 bg-white/[0.02]">
                <strong className="text-white block mb-1">03 시민참여의 확장</strong>
                <span className="text-[#8C8C8C] font-light">시민이 창작과 향유의 주체가 되는 인터랙티브 플랫폼</span>
              </div>
            </div>
          </div>
        </div>
      </SectionDetailModal>

      <SectionDetailModal
        isOpen={aboutModalItem === 'stats'}
        onClose={() => setAboutModalItem(null)}
        category={isKo ? '03 구성 및 기대효과' : '03 STATS & OUTCOMES'}
        title={isKo ? '작품 구성 및 주요 기대효과' : 'Works Stats & Expected Outcomes'}
      >
        <div className="space-y-4">
          <div className="text-caption font-mono text-[#8C8C8C]">
            {isKo
              ? '총 4개국 41인/팀 내외 참여, 신작 커미션 55점 구성'
              : 'Approx. 41 artists/teams from 4 countries, 55 works produced'}
          </div>

          {/* Breakdown Table */}
          <div className="border border-white/20 overflow-hidden text-caption font-mono">
            <div className="grid grid-cols-3 bg-white/10 p-2 font-bold text-white border-b border-white/20">
              <div>{isKo ? '구분' : 'Category'}</div>
              <div>{isKo ? '작품 수' : 'Count'}</div>
              <div>{isKo ? '비고' : 'Notes'}</div>
            </div>
            <div className="divide-y divide-white/10">
              <div className="grid grid-cols-3 p-2 text-[#B9B9B9]">
                <div className="text-white font-medium">{isKo ? '존치 (영구)' : 'Permanent'}</div>
                <div>{isKo ? '6점' : '6 works'}</div>
                <div>{isKo ? '야외 공공조각 신작' : 'Outdoor Commissions'}</div>
              </div>
              <div className="grid grid-cols-3 p-2 text-[#B9B9B9]">
                <div className="text-white font-medium">{isKo ? '임시 (전시)' : 'Temporary'}</div>
                <div>{isKo ? '49점' : '49 works'}</div>
                <div>{isKo ? '실내 파빌리온 및 특별전' : 'Pavilion & Special Exhibitions'}</div>
              </div>
              <div className="grid grid-cols-3 p-2 bg-white/5 font-bold text-white">
                <div>{isKo ? '합계' : 'Total'}</div>
                <div>{isKo ? '총 55점' : '55 works'}</div>
                <div>{isKo ? '41인/팀 출품' : '41 Artists/Teams'}</div>
              </div>
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="text-caption font-mono text-[#8C8C8C] uppercase tracking-wider">
              {isKo ? '주요 기대효과' : 'EXPECTED OUTCOMES'}
            </div>
            <div className="space-y-2 text-caption text-[#B9B9B9] font-light leading-relaxed">
              <div className="flex gap-2">
                <span className="text-white font-mono font-bold">■</span>
                <p>
                  <strong className="text-white font-medium">{isKo ? '문화예술 향유권 신장' : 'Civic Access'}:</strong>{' '}
                  {isKo
                    ? '무료 관람 및 상시 개방을 통해 안양시민과 방문객에게 수준 높은 현대미술 향유 기회 제공'
                    : 'Providing world-class contemporary art access to citizens and visitors free of charge.'}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-white font-mono font-bold">■</span>
                <p>
                  <strong className="text-white font-medium">{isKo ? '지역 문화자산 재맥락화' : 'Asset Recontextualization'}:</strong>{' '}
                  {isKo
                    ? '2005년부터 축적된 역대 APAP 명작과 신작의 조화를 통해 안양예술공원의 글로벌 위상 강화'
                    : 'Harmonizing past editions with new commissions to elevate Anyang Art Park’s global profile.'}
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-white font-mono font-bold">■</span>
                <p>
                  <strong className="text-white font-medium">{isKo ? '지역사회 경제·관광 활성화' : 'Local Economy'}:</strong>{' '}
                  {isKo
                    ? '전시 기간 중 10만 명 이상의 국내외 관람객 유치를 통한 안양 상권 및 문화관광 활성화'
                    : 'Attracting over 100,000 visitors to spur local tourism and creative industry vitality.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionDetailModal>

      {/* ── Program Detail Modals (Retained for mobile view) ── */}
      <SectionDetailModal
        isOpen={programModalItem === 'citizen'}
        onClose={() => setProgramModalItem(null)}
        category={isKo ? '01 시민참여' : '01 CITIZEN RELAY'}
        title={isKo ? '도원 릴레이: 시민과 함께 만드는 예술' : 'Dowon Relay: Citizen Participation'}
      >
        <div className="space-y-4">
          <p className="text-body text-[#B9B9B9] leading-relaxed font-light">
            {isKo
              ? '도원 릴레이는 시민이 단순 관람자를 넘어 창작과 향유의 주체로 참여하는 4가지 연속형 프로그램입니다.'
              : 'Dowon Relay invites citizens to become active co-creators through four continuous public art programs.'}
          </p>

          <div className="space-y-3">
            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '01 안양 무릉도원 숏폼 공모전' : '01 Short-form Video Contest'}</span>
                <span className="text-[#8C8C8C]">{isKo ? '전국민 대상' : 'Open to All'}</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                안양예술공원과 공공예술의 아름다움을 60초 숏폼 영상에 담는 대국민 공모 (총상금 1,000만 원)
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '02 APAP 서포터즈 <도원지기>' : '02 APAP Supporters <Dowonjigi>'}</span>
                <span className="text-[#8C8C8C]">{isKo ? '청년/대학생' : 'Youth / Students'}</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                전시 해설 보조, 시민 안내, SNS 콘텐츠 기획을 담당하는 청년 예술 서포터즈 운영
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '03 오픈 스튜디오 & 아티스트 토크' : '03 Open Studio & Artist Talk'}</span>
                <span className="text-[#8C8C8C]">{isKo ? '주말 운영' : 'Weekends'}</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                참여 작가와 시민이 직접 만나 창작 철학과 뒷이야기를 나누는 현장 소통 토크 프로그램
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '04 어린이·청소년 공공예술 워크숍' : '04 Youth Public Art Workshop'}</span>
                <span className="text-[#8C8C8C]">{isKo ? '가족/청소년' : 'Families / Youth'}</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                자연과 기술을 융합한 인터랙티브 공공조각 제작 체험 워크숍 (매주 일요일 무료 운영)
              </p>
            </div>
          </div>
        </div>
      </SectionDetailModal>

      <SectionDetailModal
        isOpen={programModalItem === 'docent'}
        onClose={() => setProgramModalItem(null)}
        category={isKo ? '02 도슨트 투어' : '02 DOCENT TOUR'}
        title={isKo ? 'APAP8 작품 투어 프로그램' : 'APAP8 Guided Docent Tours'}
      >
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/15 p-3 text-caption font-mono text-white/80 space-y-1">
            <div>■ {isKo ? '정기 투어 운영: 화요일 ~ 일요일 11:00 / 14:00 (회당 약 60~80분)' : 'Regular Tours: Tue–Sun 11:00 / 14:00 (60–80 min)'}</div>
            <div>■ {isKo ? '신청 방법: 안양문화예술재단 홈페이지 사전예약 및 현장접수 (전액 무료)' : 'Registration: Advance online or on-site (Free)'}</div>
          </div>

          <div className="space-y-3">
            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <span className="text-white font-bold text-caption font-mono">{isKo ? 'A코스: 숲속 예술산책 (70분)' : 'Course A: Forest Art Walk'}</span>
              <p className="text-caption text-[#B9B9B9] font-light">
                전망대 산책로를 따라 자연 속에 스며든 야외 대형 조각과 환경예술 작품들을 감상하는 대표 코스
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <span className="text-white font-bold text-caption font-mono">{isKo ? 'B코스: 건축과 공간 (60분)' : 'Course B: Architecture & Space'}</span>
              <p className="text-caption text-[#B9B9B9] font-light">
                알바루 시자가 설계한 안양파빌리온의 건축적 가치와 실내 기획전시 작품을 집중 탐구하는 코스
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <span className="text-white font-bold text-caption font-mono">{isKo ? 'C코스: 나이트 야간 투어 (60분, 금/토 19:30)' : 'Course C: Night Art Tour (Fri/Sat 19:30)'}</span>
              <p className="text-caption text-[#B9B9B9] font-light">
                어둠 속에서 빛과 소리로 새롭게 깨어나는 미디어아트 및 308 아트크루 레이저 조각 야간 투어
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <span className="text-white font-bold text-caption font-mono">{isKo ? 'D코스: 가족 맞춤형 투어 (50분, 주말 전용)' : 'Course D: Family Tour (Weekends)'}</span>
              <p className="text-caption text-[#B9B9B9] font-light">
                어린이 눈높이에 맞춘 스토리텔링과 활동지 미션을 통해 공공예술을 쉽게 배우는 체험형 투어
              </p>
            </div>
          </div>
        </div>
      </SectionDetailModal>

      <SectionDetailModal
        isOpen={programModalItem === 'broadcast'}
        onClose={() => setProgramModalItem(null)}
        category={isKo ? '03 미디어·방송' : '03 MEDIA & BROADCAST'}
        title={isKo ? 'KBS 전국 방송 및 미디어 특별기획' : 'KBS Nationwide Broadcast & Media'}
      >
        <div className="space-y-4">
          <div className="border border-white/15 p-4 bg-white/[0.02] space-y-2">
            <span className="text-caption font-mono font-bold text-[#8C8C8C] uppercase tracking-wider block">
              {isKo ? 'KBS 네트워크 특별기획 다큐멘터리' : 'KBS Documentary'}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {isKo ? '〈예술로 길을 열다〉 전국 방송' : '〈Opening Paths with Art〉'}
            </h4>
            <p className="text-caption text-[#B9B9B9] leading-relaxed font-light">
              APAP8의 주요 참여작가 창작 과정과 안양예술공원의 20년 역사를 조명하고, 공공예술이 지역사회와 도시재생에 미친 긍정적 변화를 전국에 방영합니다.
            </p>
          </div>

          <div className="border border-white/15 p-4 bg-white/[0.02] space-y-2">
            <span className="text-caption font-mono font-bold text-[#8C8C8C] uppercase tracking-wider block">
              {isKo ? 'KBS 대형 공개방송' : 'KBS Live Concert'}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {isKo ? 'KBS <열린음악회> APAP8 특집 공연' : 'KBS <Open Concert> APAP8 Special'}
            </h4>
            <p className="text-caption text-[#B9B9B9] leading-relaxed font-light">
              개막 주간 안양예술공원 특설무대에서 펼쳐지는 국내 정상급 음악가들의 축하 공연과 미디어아트 협업 무대입니다.
            </p>
            <div className="text-caption font-mono text-[#8C8C8C] pt-2 border-t border-white/10">
              ■ 일시/장소: 2026.09.30.(수) 19:00 / 안양예술공원 특설무대
            </div>
          </div>
        </div>
      </SectionDetailModal>
    </div>
  );
}
