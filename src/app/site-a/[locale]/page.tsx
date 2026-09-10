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
  const [aboutModalItem, setAboutModalItem] = useState<'overview' | 'theme' | 'credits' | null>(null);
  const [programModalItem, setProgramModalItem] = useState<'citizen' | 'docent' | 'forum' | 'broadcast' | null>(null);

  // PC Tab states
  const [aboutPcTab, setAboutPcTab] = useState<'overview' | 'theme' | 'credits'>('overview');
  const [programPcTab, setProgramPcTab] = useState<'citizen' | 'docent' | 'forum' | 'broadcast'>('citizen');

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
                          ? "제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어저 온 국내유일의 공공예술트리엔날레의  여덟 번째 행사입니다. 지난 20여 년간 축적된 APAP의 문화자산을 재맥락화하고 지역사회 예술 기반을 확대합니다."
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

                  {/* Mobile Card 3: Credits */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setAboutModalItem('credits')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAboutModalItem('credits'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          03
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '크레딧' : 'CREDITS'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? '예술감독 및 참여작가 리스트' : 'Artistic Director & Artists'}
                        <span className="block text-[11px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                          {isKo ? '예술감독 박철희 · 참여작가 31인/팀' : 'Director Park Chul-hee · 31 Artists/Teams'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? '예술감독 박철희를 필두로 국내외 현대미술 거장 31인/팀과 미디어아트 작품 공모 당선 10팀이 함께하는 APAP8의 전체 크레딧입니다.'
                          : 'Artistic Director Park Chul-hee, 31 prominent artists/teams, and 10 media art competition winners.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '크레딧 명단 보기' : 'VIEW CREDITS'}</span>
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
                    onClick={() => setAboutPcTab('credits')}
                    className={`px-7 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] ${
                      aboutPcTab === 'credits'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    03 {isKo ? '크레딧' : 'CREDITS'}
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
                          ? "제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어저 온 국내유일의 공공예술트리엔날레의  여덟 번째 행사입니다. 지난 20여 년간 축적된 APAP의 문화자산을 재맥락화하고, '예술의 지속성'과 '시민과의 재연결'을 통해 지역사회 예술 기반을 확대하고자 합니다."
                          : "The 8th Anyang Public Art Project (APAP8) marks the eighth edition of Korea’s premier public art triennial, held continuously since 2005. Recontextualizing cultural assets accumulated over 20 years, APAP8 expands the artistic foundation of the local community through 'artistic sustainability' and 'reconnecting with citizens.'"}
                      </p>
                      <p>
                        {isKo
                          ? '안양예술공원 일대와 안양파빌리온을 중심으로, 국내외 참여작가 및 시민·지역예술인 등 총 4개국 41인/팀 내외가 함께합니다.'
                          : 'Centering on Anyang Art Park and Anyang Pavilion, approximately 41 artists and teams from 4 countries collaborate to shape this triennial.'}
                      </p>
                    </div>

                    {/* Facts Table Box */}
                    <div className="bg-white/[0.03] border border-white/20 p-5 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs lg:text-sm font-mono">
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '전시기간' : 'EXHIBITION PERIOD'}</span>
                        <span className="text-white font-medium">{isKo ? '2026.9.30. ~ 11.29.' : 'Sept 30 – Nov 29, 2026'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '개막식' : 'OPENING CEREMONY'}</span>
                        <span className="text-white font-medium">{isKo ? '2026.9.30.(수) 18:00 (벽천광장)' : 'Sept 30, 2026 (Wed) 18:00'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '장소' : 'VENUE'}</span>
                        <span className="text-white font-medium">{isKo ? '안양예술공원 일대 및 안양파빌리온' : 'Anyang Art Park & Anyang Pavilion'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8C8C] block text-[11px] lg:text-xs font-bold mb-1">■ {isKo ? '사업규모' : 'SCALE'}</span>
                        <span className="text-white font-medium">{isKo ? '총 4개국, 41인/팀 (50여 명)' : 'Approx. 50 participants from 4 countries'}</span>
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

                    {/* Director's Message Quote Block */}
                    <div className="border-l-2 border-white/40 pl-5 py-4 bg-white/[0.02] space-y-2 mt-4">
                      <span className="font-mono text-xs text-[#8C8C8C] font-bold tracking-wider uppercase block">
                        {isKo ? '■ 예술감독의 글 — 박철희' : '■ DIRECTOR’S MESSAGE — PARK CHUL-HEE'}
                      </span>
                      <p className="text-xs lg:text-sm text-[#D4D4D4] font-light leading-relaxed italic">
                        {isKo
                          ? '“진정한 무릉도원은 특정한 물리적 시공간을 의미하는 것은 아닐 것입니다. 심신의 피로를 달래고 고단한 삶의 무게를 잠시나마 내려놓을 수 있는 순간이 온다면 바로 그 순간 각자가 있는 그곳이 무릉도원이 될 수 있습니다. APAP8은 예술을 통해 각자의 무릉도원을 만들어 보고자 합니다.”'
                          : '“A true paradise is not confined to a specific physical time or place. Whenever one can relieve weary burdens and awaken forgotten senses, that place becomes a paradise. APAP8 seeks to cultivate this shared haven through art.”'}
                      </p>
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

                {/* Tab 3: Credits */}
                {aboutPcTab === 'credits' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        03 CREDITS
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? '예술감독 및 참여작가 리스트' : 'Artistic Director & Participating Artists'}
                      </h3>
                    </div>

                    {/* Artistic Director Box */}
                    <div className="border border-white/25 p-5 bg-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider block">
                          ■ {isKo ? '예술감독' : 'ARTISTIC DIRECTOR'}
                        </span>
                        <div className="text-2xl lg:text-3xl font-black text-white">
                          {isKo ? '박철희' : 'Park Chul-hee'}
                        </div>
                      </div>
                      <div className="text-xs lg:text-sm font-mono text-[#B9B9B9] max-w-md">
                        {isKo
                          ? '제8회 안양공공예술프로젝트(APAP8) 총괄 기획 및 예술감독'
                          : 'Artistic Director, The 8th Anyang Public Art Project (APAP8)'}
                      </div>
                    </div>

                    {/* Participating Artists (31) */}
                    <div className="border border-white/20 p-5 bg-white/[0.02] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="font-mono text-xs text-white font-bold">
                          ■ {isKo ? '참여작가 (31인/팀)' : 'PARTICIPATING ARTISTS (31)'}
                        </span>
                        <span className="font-mono text-[11px] text-[#8C8C8C]">가나다순</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          '308 아트크루', '권치규', '김근중', '김덕한', '김도훈', '김동유', '김성복', '김윤아',
                          '김태수', '다이고 우시', '박재훈', '스튜디오 올레오밍구스', '양태근', '오용길', '왕칭송',
                          '유영운', '윤진섭', '이길우', '이후창', '임혜정', '자오넝즈', '장성재', '장지엔',
                          '저우진화', '전인식', '정영남', '지용호', '처 지엔취안', '최순녕', '펑정지에', '홍경택'
                        ].map((artist) => (
                          <span
                            key={artist}
                            className="text-xs font-mono border border-white/20 text-white/90 px-3 py-1.5 bg-white/5 hover:border-white transition-colors"
                          >
                            {artist}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Competition Winners (10) */}
                    <div className="border border-white/15 p-5 bg-white/[0.01] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="font-mono text-xs text-[#B9B9B9] font-bold">
                          ■ {isKo ? 'APAP8 미디어아트 작품 공모 당선 작가 (10팀)' : 'MEDIA ART COMPETITION WINNERS (10)'}
                        </span>
                        <span className="font-mono text-[11px] text-[#8C8C8C]">신진·미디어 작가전</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          '김남표(글램포지)', '김리아', '박선재(팝시클)', '박은영', '이어진',
                          '이창기', '임도원', '임주원', '진진아', 'Hyp-파장(소수정x서재은)'
                        ].map((artist) => (
                          <span
                            key={artist}
                            className="text-xs font-mono border border-white/10 text-white/70 px-2.5 py-1 bg-white/[0.02]"
                          >
                            {artist}
                          </span>
                        ))}
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
              {/* MOBILE VIEW (< md): 4 Summary Cards -> Opens Modal */}
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
                          ? '시민 참여형 공공예술 프로그램을 통해 지역의 문화예술 향유 기회를 확대하고 지역 예술가와 소통하는 기반을 마련합니다.'
                          : 'Community-engaged public art programs fostering creative dialogue through workshops, performances, and education.'}
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
                          {isKo ? '정규 도슨트 · 특별전 해설 · 나이트 스페셜 3종' : 'Regular, Special Exhibition & Night Tours'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? '전문 해설사와 함께 안양예술공원 실내외 전시장을 순회하며 작품 해설을 듣는 3대 테마 투어입니다.'
                          : 'Guided walking tours exploring artworks across Anyang Art Park with professional docents.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '3개 투어 일정 보기' : 'VIEW TOURS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Forum (NEW) */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setProgramModalItem('forum')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setProgramModalItem('forum'); }}
                    className="group relative bg-[#121212] hover:bg-[#1A1A1A] border border-white/20 hover:border-white p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left space-y-2 shadow-md"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-badge font-black bg-white text-black px-2 py-0.5">
                          03
                        </span>
                        <span className="font-mono text-caption text-[#8C8C8C] font-semibold">
                          {isKo ? '토론회 & 성과공유' : 'FORUM & SYMPOSIUM'}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug">
                        {isKo ? '공공예술 토론회 | 성과공유회' : 'Public Art Forum & Symposium'}
                        <span className="block text-[11px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                          {isKo ? '9/17 미래 담론 · 12/10 성과공유 2개 세션' : '2 Sessions: 9/17 Future Art & 12/10 Outcomes'}
                        </span>
                      </h3>
                      <p className="text-body text-[#B9B9B9] font-light leading-relaxed line-clamp-2">
                        {isKo
                          ? '공공예술의 미래 담론을 형성하고 APAP8의 성과와 아시아 공공예술로의 도약을 학술적으로 모색하는 토론회입니다.'
                          : 'Scholarly discussions establishing future public art discourses and reflecting on APAP8 outcomes.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '세션 일정 보기' : 'VIEW SESSIONS'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Card 4: Broadcast */}
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
                          04
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
                          ? 'KBS 네트워크 기획 〈예술로 길을 열다〉 — APAP8을 중심으로 지역이 예술로 가치를 발현하는 현장을 취재하고 전국 방영된 다큐멘터리입니다.'
                          : 'KBS Special documentary capturing how APAP8 revitalizes community through public art.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                      <span>{isKo ? '방송 정보 & 다시보기' : 'WATCH ON YOUTUBE'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PC VIEW (>= md): Tab Navigation & Expanded Inline Content */}
              <div className="hidden md:block">
                {/* Tab Buttons */}
                <div className="flex border-b border-white/20 mb-6 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setProgramPcTab('citizen')}
                    className={`px-6 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] whitespace-nowrap ${
                      programPcTab === 'citizen'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    01 {isKo ? '시민참여 (도원 릴레이)' : 'CITIZEN RELAY'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgramPcTab('docent')}
                    className={`px-6 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] whitespace-nowrap ${
                      programPcTab === 'docent'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    02 {isKo ? '도슨트 투어 (3종)' : 'DOCENT TOUR'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgramPcTab('forum')}
                    className={`px-6 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] whitespace-nowrap ${
                      programPcTab === 'forum'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    03 {isKo ? '공공예술 토론회' : 'FORUM & SYMPOSIUM'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgramPcTab('broadcast')}
                    className={`px-6 py-3 font-mono text-sm lg:text-base font-bold transition-all border-b-2 -mb-[2px] whitespace-nowrap ${
                      programPcTab === 'broadcast'
                        ? 'border-white text-white bg-white/5'
                        : 'border-transparent text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    04 {isKo ? '미디어·방송' : 'MEDIA & BROADCAST'}
                  </button>
                </div>

                {/* Tab 1: Citizen Programs (도원 릴레이) */}
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
                          ? '시민 참여형 공공예술 프로그램을 통해 지역 문화예술 향유 기회를 확대하고 예술가와 시민 간 창작·소통 기반을 마련합니다.'
                          : 'Four distinct participatory programs fostering creative dialogue between citizens and artists.'}
                      </p>
                    </div>

                    {/* 4 Program Cards Grid from program.json */}
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '■ 워크숍' : '■ WORKSHOP'}
                          </h4>
                          <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">예술인 주도형</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          {isKo
                            ? 'APAP8 작품 연계 안양 지역예술가와 함께하는 창작 워크숍'
                            : 'Creative workshops led by local Anyang artists linked to APAP8 artworks.'}
                        </p>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '■ 공연' : '■ PERFORMANCE'}
                          </h4>
                          <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">예술인 참여형</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          {isKo
                            ? '실내외 전시, 체험, 행사존을 연결하는 미니 콘서트 및 퍼포먼스'
                            : 'Mini-concerts and live performances connecting indoor and outdoor zones.'}
                        </p>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '■ 교육' : '■ EDUCATION'}
                          </h4>
                          <span className="text-xs font-mono border border-white/40 text-white px-2 py-0.5 font-bold">시민 참여형</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          {isKo
                            ? 'APAP8 주제 연계 미디어아트·AI 관련 교육·강의 프로그램'
                            : 'Lectures and educational workshops on media art and AI.'}
                        </p>
                      </div>

                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '■ 체험' : '■ EXPERIENCE'}
                          </h4>
                          <span className="text-xs font-mono border border-white/40 text-white px-2 py-0.5 font-bold">가족·시민 체험형</span>
                        </div>
                        <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                          {isKo
                            ? 'APAP를 주제로 오감 체험 프로그램을 통한 다양한 예술 활동'
                            : 'Multisensory interactive programs themed around public art.'}
                        </p>
                      </div>
                    </div>

                    <div className="border border-white/10 p-4 bg-white/[0.01] text-xs font-mono text-[#8C8C8C] flex flex-wrap gap-4">
                      <span>■ 일정: 2026.9. ~ 2026.11.(예정) — 공식 웹사이트 및 인스타그램 순차 공개</span>
                      <span>■ 장소: 안양파빌리온, 안양예술공원 및 관내 거점공간</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Docent Tour (3 tours from leaflet) */}
                {programPcTab === 'docent' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        02 GUIDED DOCENT TOURS
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? 'APAP8 작품 투어 프로그램 (3종)' : 'APAP8 Guided Docent Tour Programs'}
                      </h3>
                      <p className="text-sm lg:text-base text-[#B9B9B9] mt-2 font-light">
                        {isKo
                          ? '정규 작품 해설 투어와 특별전 및 나이트 스페셜 투어로 구성된 3대 공식 투어 프로그램입니다.'
                          : 'Official docent programs: Regular Tour, Special Exhibition, and Special Night Tour.'}
                      </p>
                    </div>

                    {/* 3 Courses Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-1">
                      {/* Tour 1 */}
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">무료</span>
                            <span className="text-xs font-mono text-[#8C8C8C]">45분 내외</span>
                          </div>
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '도슨트와 함께하는 APAP8' : 'Guided Docent with APAP8'}
                          </h4>
                          <p className="text-xs text-[#B9B9B9] font-light leading-relaxed">
                            {isKo
                              ? '아이 파빌리온, 오픈 그라운드(안양파빌리온 광장 등) 주요 작품 해설'
                              : 'Commentary on i Pavilion and Open Ground highlights.'}
                          </p>
                        </div>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-1">
                          <div>■ 시간: 11:00 / 14:00 / 16:00 (1일 3회)</div>
                          <div>■ 장소: 안양파빌리온 등</div>
                          <div>■ 참여: 현장 참여 / 10인 이상 사전예약</div>
                        </div>
                      </div>

                      {/* Tour 2 */}
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">무료</span>
                            <span className="text-xs font-mono text-[#8C8C8C]">10분 내외</span>
                          </div>
                          <h4 className="text-base font-bold text-white">
                            {isKo ? '〈특별전: 우리가 꿈꾸는 도원〉' : 'Special Exhibition Docent'}
                          </h4>
                          <p className="text-xs text-[#B9B9B9] font-light leading-relaxed">
                            {isKo
                              ? '중국 작가(장지엔, 펑정지에 등)와 한국 작가(오용길, 이후창 등) 참여 작품 해설'
                              : 'Commentary on Korea-China contemporary masters.'}
                          </p>
                        </div>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-1">
                          <div>■ 시간: 10:30 - 16:40 (매시 00, 20, 40분)</div>
                          <div>■ 장소: 아르테자이 상가, 오픈 스쿨</div>
                          <div>■ 참여: 현장 참여 / 10인 이상 사전예약</div>
                        </div>
                      </div>

                      {/* Tour 3 */}
                      <div className="border border-white/20 p-5 bg-white/[0.02] space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-mono border border-white/60 text-white px-2 py-0.5 font-bold">유료 5,000원</span>
                            <span className="text-xs font-mono text-[#8C8C8C]">90분 내외</span>
                          </div>
                          <h4 className="text-base font-bold text-white">
                            {isKo ? 'APAP8 스페셜 투어-나이트' : 'Special Night Tour'}
                          </h4>
                          <p className="text-xs text-[#B9B9B9] font-light leading-relaxed">
                            {isKo
                              ? 'APAP 1~7회 역사적 명작 해설 및 야간 〈밤의 도원경〉 관람 안내'
                              : 'Past editions 1–7 highlights and Night Utopia tour.'}
                          </p>
                        </div>
                        <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-1">
                          <div>■ 일정: 10.16. ~ 11.6.(매주 금) 19:00</div>
                          <div>■ 장소: 안양파빌리온 등</div>
                          <div>■ 예약: 네이버/전화(031-687-0548)/현장</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Forum & Symposium (NEW) */}
                {programPcTab === 'forum' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        03 PUBLIC ART FORUM & SYMPOSIUM
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? '공공예술 토론회 | 성과공유회' : 'Public Art Forum & Symposium'}
                      </h3>
                      <p className="text-sm lg:text-base text-[#B9B9B9] mt-2 font-light">
                        {isKo
                          ? '공공예술의 동시대적 가치와 미래 방향을 학술적으로 고찰하고, APAP8의 성과를 아시아 공공예술 네트워크로 확산하는 학술 프로그램입니다.'
                          : 'Scholarly forums proposing future directions and reflecting on APAP8 outcomes.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-1">
                      {/* Session 1 */}
                      <div className="border border-white/20 p-6 bg-white/[0.02] space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <span className="font-mono text-xs font-bold bg-white text-black px-2 py-0.5">SESSION 01</span>
                          <span className="font-mono text-xs text-[#8C8C8C]">2026.09.17.(목) 14:00 - 16:00</span>
                        </div>
                        <div>
                          <h4 className="text-lg lg:text-xl font-bold text-white">
                            {isKo ? '1. APAP8, 공공예술의 미래' : 'APAP8: The Future of Public Art'}
                          </h4>
                          <p className="text-xs lg:text-sm text-[#B9B9B9] font-light leading-relaxed mt-2">
                            {isKo
                              ? '인공지능과 첨단기술이 융합하는 시대, 공공예술의 사회적 역할과 예술대전환의 미래 담론을 모색합니다.'
                              : 'Exploring the social role and transformation of public art in the era of AI and cutting-edge technologies.'}
                          </p>
                        </div>
                        <div className="text-xs font-mono text-white/70 pt-2 border-t border-white/10 space-y-1">
                          <div>■ 장소: 안양박물관 교육관</div>
                          <div>■ 대상: 문화예술 전문가, 연구자 및 관심 있는 시민 누구나</div>
                        </div>
                      </div>

                      {/* Session 2 */}
                      <div className="border border-white/20 p-6 bg-white/[0.02] space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <span className="font-mono text-xs font-bold bg-white text-black px-2 py-0.5">SESSION 02</span>
                          <span className="font-mono text-xs text-[#8C8C8C]">2026.12.10.(목) 14:00 - 16:00</span>
                        </div>
                        <div>
                          <h4 className="text-lg lg:text-xl font-bold text-white">
                            {isKo ? '2. APAP8, 아시아 공공예술로 나아가다' : 'APAP8: Advancing to Asian Public Art'}
                          </h4>
                          <p className="text-xs lg:text-sm text-[#B9B9B9] font-light leading-relaxed mt-2">
                            {isKo
                              ? 'APAP8의 종합적 성과를 평가하고, 한중 특별전을 기점으로 아시아 공공예술 연대와 글로벌 거점 확장을 논의합니다.'
                              : 'Evaluating comprehensive APAP8 outcomes and expanding Asian public art networks.'}
                          </p>
                        </div>
                        <div className="text-xs font-mono text-white/70 pt-2 border-t border-white/10 space-y-1">
                          <div>■ 장소: 안양박물관 교육관</div>
                          <div>■ 대상: 국내외 큐레이터, 예술가, 시민 참여자</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Broadcast */}
                {programPcTab === 'broadcast' && (
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-wider uppercase block mb-1">
                        04 MEDIA & BROADCAST PARTNERSHIP
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
                        {isKo ? 'KBS 전국 방송 송출' : 'KBS Nationwide Broadcast'}
                      </h3>
                      <p className="text-sm lg:text-base text-[#B9B9B9] mt-2 font-light">
                        {isKo
                          ? '공중파 전국 방송을 통해 안양공공예술프로젝트의 성과와 가치를 전국으로 확산하였습니다.'
                          : 'Nationwide broadcast showcasing Anyang’s public art innovations to audiences across Korea.'}
                      </p>
                    </div>

                    <div className="border border-white/20 p-6 lg:p-8 bg-white/[0.02] space-y-4 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <Tv className="w-5 h-5 text-white" />
                        <span className="font-mono text-xs font-bold text-[#8C8C8C]">KBS1 (전국방송)</span>
                      </div>
                      <h4 className="text-xl lg:text-2xl font-bold text-white">
                        {isKo ? '네트워크 기획 〈예술로 길을 열다〉' : 'Special Documentary: Opening Paths with Art'}
                      </h4>
                      <p className="text-xs lg:text-sm text-[#B9B9B9] leading-relaxed font-light">
                        {isKo
                          ? 'APAP8을 중심으로 지역이 예술로 가치를 발현하는 현장을 취재하고, APAP8과 유사한 해외 사례를 소개한 특별 다큐멘터리 프로그램입니다.'
                          : 'A special documentary highlighting how local spaces create enduring value through public art, featuring APAP8 and global benchmarks.'}
                      </p>
                      <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-1">
                        <div>■ 방송일시: 2026년 8월 29일(토) 13:05</div>
                        <div>■ 방송채널: KBS 1TV 전국 방송</div>
                      </div>
                      <div className="pt-2">
                        <a
                          href="https://www.youtube.com/watch?v=4zB7LXO7Ydo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold hover:bg-white/80 transition-colors"
                        >
                          <span>{isKo ? 'KBS 방송 영상 바로보기' : 'WATCH ON YOUTUBE'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
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
          subtitle="VENUES / HOURS / ACCESS"
          isKo={isKo}
          summary={
            <div className="w-full max-w-[1200px] mx-auto">
              {/* MOBILE VIEW (< md): 3 Cards + Slim Archive Banner */}
              <div className="block md:hidden space-y-2.5">
                <div className="grid grid-cols-1 gap-2.5">
                  {/* Mobile Card 1: Admission & Hours */}
                  <div className="border border-white/20 p-3.5 space-y-2.5 bg-white/[0.02] flex flex-col justify-between">
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
                          {isKo ? '전시기간' : 'Period'}
                        </span>
                        <div className="text-white font-medium text-[12.5px]">
                          <span>{isKo ? '2026.09.30(수) ~ 11.29(일)' : 'Sept 30 – Nov 29, 2026'}</span>
                          <span className="block text-[10.5px] font-mono text-[#8C8C8C] font-normal mt-0.5">
                            {isKo ? '※ 개막식 9.30(수) 18:00 (안양파빌리온 앞 벽천광장)' : '※ Opening Sept 30 18:00'}
                          </span>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex flex-col xs:flex-row xs:items-baseline gap-0.5 xs:gap-2.5 pt-1.5 border-t border-white/5">
                        <span className="font-mono text-[11px] text-[#8C8C8C] font-semibold flex-shrink-0 min-w-[50px]">
                          {isKo ? '관람문의' : 'Contact'}
                        </span>
                        <div className="text-[#D4D4D4] font-light text-[12px]">
                          <span>031-687-0548 (APAP 사무국)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Card 2: 4 Venue Details */}
                  <div className="border border-white/20 p-3.5 space-y-2 bg-white/[0.02]">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5 text-white flex-shrink-0" />
                        <span>{isKo ? '4대 전시장 구역 안내' : 'VENUE DETAILS'}</span>
                      </div>
                      <span className="font-mono text-[10px] text-white/60">4개 구역</span>
                    </div>

                    <div className="divide-y divide-white/5 text-xs space-y-1.5 pt-1">
                      <div className="pt-1">
                        <strong className="text-white block font-medium">1. 아이 파빌리온 (안양파빌리온)</strong>
                        <span className="text-[#B9B9B9] block text-[11px]">화–금 10:00–18:00 / 토·일 10:00–19:00 (월 휴관)</span>
                      </div>
                      <div className="pt-1.5">
                        <strong className="text-white block font-medium">2. 밤의 도원경 (파빌리온 앞 광장)</strong>
                        <span className="text-[#B9B9B9] block text-[11px]">화–일 19:00–22:00 (월 휴무) / 빛의 폭포(정시 15분), 오색운(15분~정시)</span>
                      </div>
                      <div className="pt-1.5">
                        <strong className="text-white block font-medium">3. 오픈 그라운드 (야외 공원 및 광장)</strong>
                        <span className="text-[#B9B9B9] block text-[11px]">24시간 상시 관람 (연중무휴)</span>
                      </div>
                      <div className="pt-1.5">
                        <strong className="text-white block font-medium">4. 특별전: 우리가 꿈꾸는 도원</strong>
                        <span className="text-[#B9B9B9] block text-[11px]">아르테자이 상가 1층, 오픈 스쿨 (화–일 10:00–18:00, 월 휴관)</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Card 3: Location & Access */}
                  <div className="border border-white/20 p-3.5 space-y-2.5 bg-white/[0.02] flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                        <span>{isKo ? '오시는 길' : 'LOCATION & TRANSIT'}</span>
                      </div>
                      <span className="font-mono text-[10px] border border-white/40 text-white/90 px-2 py-0.5 font-bold">
                        {isKo ? '안양파빌리온' : 'PAVILION'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#D4D4D4] font-light">
                      <p>경기도 안양시 만안구 예술공원로 180</p>
                      <p className="text-[11px] text-[#8C8C8C]">관악역 2번 출구(마을 6-2번) / 안양역 1번 출구(버스 2번)</p>
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
                      <span>{isKo ? '01 관람 일정 및 행사 개요' : '01 SCHEDULE & OPENING'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs lg:text-sm bg-white text-black px-3 py-1 font-bold">
                        {isKo ? '관람료 전액 무료' : 'FREE ADMISSION'}
                      </span>
                      <span className="font-mono text-xs lg:text-sm border border-white/40 text-white/90 px-3 py-1 font-bold">
                        {isKo ? '문의 031-687-0548' : 'TEL 031-687-0548'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-1">
                    <div className="space-y-1.5 border-r border-white/10 pr-4">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '전시 기간' : 'Exhibition Period'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '2026년 9월 30일(수) ~ 11월 29일(일)' : 'Sept 30 – Nov 29, 2026'}
                      </div>
                      <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                        {isKo ? '총 61일간 안양예술공원 및 관내 거점에서 무료 운영' : '61 Days Across Anyang Art Park & City Hubs'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '공식 개막식' : 'Opening Ceremony'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '2026.09.30.(수) 18:00' : 'Sept 30, 2026 (Wed) 18:00'}
                      </div>
                      <p className="text-xs lg:text-sm font-mono text-[#8C8C8C]">
                        {isKo ? '안양파빌리온 앞 벽천광장 (308 아트크루 레이저 공연 연계)' : 'Cascade Square in front of Anyang Pavilion'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 02: 4 Venues Detail (venueDetails from visit.json) */}
                <div className="border border-white/20 p-6 lg:p-7 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5 text-base lg:text-lg font-mono font-bold text-white uppercase tracking-wider">
                      <Layers className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{isKo ? '02 전시장 4대 구역별 상세 안내' : '02 4 VENUE DETAILS'}</span>
                    </div>
                    <span className="font-mono text-xs text-[#8C8C8C]">아이 파빌리온 · 밤의 도원경 · 오픈 그라운드 · 우리가 꿈꾸는 도원</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    {/* Venue 1: i Pavilion */}
                    <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2.5">
                      <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                        <h4 className="text-base font-bold text-white">
                          {isKo ? '1. 아이 파빌리온' : '1. i Pavilion'}
                        </h4>
                        <span className="text-xs font-mono bg-white/10 text-white/80 px-2 py-0.5">실내 미디어·설치</span>
                      </div>
                      <div className="text-xs font-mono text-[#D4D4D4] space-y-1">
                        <div>■ 위치: 안양파빌리온 (만안구 예술공원로 180)</div>
                        <div>■ 운영: 화 - 금 10:00 – 18:00 / 토, 일 10:00 – 19:00</div>
                        <div className="text-[#8C8C8C]">■ 휴관: 매주 월요일 휴관 (10.5.(월) 대체공휴일 개관, 10.6.(화) 휴관)</div>
                      </div>
                    </div>

                    {/* Venue 2: Night Utopia */}
                    <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2.5">
                      <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                        <h4 className="text-base font-bold text-white">
                          {isKo ? '2. 밤의 도원경' : '2. Night Utopia'}
                        </h4>
                        <span className="text-xs font-mono bg-white/10 text-white/80 px-2 py-0.5">야간 미디어아트</span>
                      </div>
                      <div className="text-xs font-mono text-[#D4D4D4] space-y-1">
                        <div>■ 위치: 안양파빌리온 앞 광장 일대</div>
                        <div>■ 운영: 화 - 일 19:00 – 22:00 (월요일 휴무 / 10.5 정상운영, 10.6 휴무)</div>
                        <div className="text-white font-medium">■ 상영: 〈빛의 폭포〉 매 정시 15분간 / 〈오색운〉 매시 15분~정시 상영</div>
                      </div>
                    </div>

                    {/* Venue 3: Open Ground */}
                    <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2.5">
                      <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                        <h4 className="text-base font-bold text-white">
                          {isKo ? '3. 오픈 그라운드' : '3. Open Ground'}
                        </h4>
                        <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">24시간 상시개방</span>
                      </div>
                      <div className="text-xs font-mono text-[#D4D4D4] space-y-1">
                        <div>■ 위치: 안양파빌리온 앞 광장, 안양박물관 야외, 공원 내 공동의 장</div>
                        <div>■ 운영: 상시관람 (24시간 자유 개방)</div>
                        <div className="text-[#8C8C8C]">■ 휴관: 연중무휴</div>
                      </div>
                    </div>

                    {/* Venue 4: Dreaming Utopia */}
                    <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2.5">
                      <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                        <h4 className="text-base font-bold text-white">
                          {isKo ? '4. 특별전: 우리가 꿈꾸는 도원' : '4. Special Exhibition'}
                        </h4>
                        <span className="text-xs font-mono bg-white/10 text-white/80 px-2 py-0.5">한중 특별전</span>
                      </div>
                      <div className="text-xs font-mono text-[#D4D4D4] space-y-1">
                        <div>■ 위치: 아르테자이 상가 1층 오감갤러리, 평촌 오픈 스쿨</div>
                        <div>■ 운영: 화 - 일 10:00 – 18:00</div>
                        <div className="text-[#8C8C8C]">■ 휴관: 매주 월요일 휴관 (10.5.(월) 개관, 10.6.(화) 휴관)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 03: Location & Directions */}
                <div className="border border-white/20 p-6 lg:p-7 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5 text-base lg:text-lg font-mono font-bold text-white uppercase tracking-wider">
                      <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                      <span>{isKo ? '03 전시 장소 및 오시는 길' : '03 LOCATION & ACCESS'}</span>
                    </div>
                    <span className="font-mono text-xs lg:text-sm border border-white/30 text-white/80 px-3 py-1 font-bold">
                      {isKo ? '메인 거점: 안양파빌리온' : 'MAIN: ANYANG PAVILION'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-1">
                    {/* Main Area */}
                    <div className="space-y-1.5 border-r border-white/10 pr-4">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '행사장' : 'Venue'}
                      </span>
                      <div className="text-base lg:text-lg font-bold text-white">
                        {isKo ? '안양예술공원 일원' : 'Anyang Art Park'}
                      </div>
                      <p className="text-xs lg:text-sm text-[#B9B9B9] font-light">
                        {isKo ? '산책로, 안양파빌리온 메인홀, 안양천 변 야외 공간' : 'Trails, Pavilion Main Hall, Anyang Stream'}
                      </p>
                    </div>

                    {/* Address & Tel */}
                    <div className="space-y-1.5 border-r border-white/10 pr-4">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '주소 및 문의' : 'Address & Inquiry'}
                      </span>
                      <div className="text-sm lg:text-base font-medium text-white">
                        {isKo ? '경기도 안양시 만안구 예술공원로 180' : '180, Yesulgongwon-ro, Manan-gu'}
                      </div>
                      <p className="text-xs lg:text-sm font-mono text-[#8C8C8C]">
                        {isKo ? 'APAP 사무국 문의: 031-687-0548' : 'Tel: +82-31-687-0548'}
                      </p>
                    </div>

                    {/* Public Transit */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-xs lg:text-sm text-[#8C8C8C] font-semibold block">
                        ■ {isKo ? '대중교통' : 'Public Transit'}
                      </span>
                      <div className="text-xs lg:text-sm text-[#B9B9B9] space-y-1 font-light">
                        <p>{isKo ? '1호선 관악역 2번 출구 → 마을버스 6-2번 환승 (2분 도보)' : 'Line 1 Gwanak Stn Exit 2 → Bus 6-2'}</p>
                        <p>{isKo ? '1호선 안양역 1번 출구 → 시내버스 2번 환승 (5분 도보)' : 'Line 1 Anyang Stn Exit 1 → Bus 2'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 04: Historical Archive Banner */}
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
                ? "제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어저 온 국내유일의 공공예술트리엔날레의  여덟 번째 행사입니다. 지난 20여 년간 축적된 APAP의 문화자산을 재맥락화하고, '예술의 지속성'과 '시민과의 재연결'을 통해 지역사회 예술 기반을 확대하고자 합니다."
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
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '전시기간' : 'EXHIBITION PERIOD'}</span>
              <span className="text-white font-medium">{isKo ? '2026.9.30. ~ 11.29.' : 'Sept 30 – Nov 29, 2026'}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '개막식' : 'OPENING CEREMONY'}</span>
              <span className="text-white font-medium">{isKo ? '2026.9.30.(수) 18:00 (안양파빌리온 앞 벽천광장)' : 'Sept 30, 2026 (Wed) 18:00 (Cascade Square)'}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '장소' : 'VENUE'}</span>
              <span className="text-white font-medium">{isKo ? '안양예술공원 일대 및 안양파빌리온' : 'Anyang Art Park & Anyang Pavilion'}</span>
            </div>
            <div>
              <span className="text-[#8C8C8C] block text-[11px] font-bold">■ {isKo ? '사업규모' : 'SCALE'}</span>
              <span className="text-white font-medium">{isKo ? '총 4개국, 41인/팀 (50여 명)' : 'Approx. 50 participants from 4 countries'}</span>
            </div>
          </div>

          {/* Director's Quote in Modal */}
          <div className="border-l-2 border-white/40 pl-3.5 py-2.5 bg-white/[0.02] space-y-1">
            <span className="font-mono text-[10px] text-[#8C8C8C] font-bold uppercase block">
              {isKo ? '■ 예술감독의 글 — 박철희' : '■ DIRECTOR’S MESSAGE'}
            </span>
            <p className="text-xs text-[#D4D4D4] font-light leading-relaxed italic">
              {isKo
                ? '“진정한 무릉도원은 특정한 물리적 시공간이 아니라, 심신의 피로를 달래고 고단한 삶의 무게를 내려놓는 순간 각자가 있는 그곳이 될 수 있습니다. APAP8은 예술을 통해 각자의 무릉도원을 만들어 보고자 합니다.”'
                : '“A true paradise is found whenever one can relieve weary burdens and awaken forgotten senses through art.”'}
            </p>
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
        isOpen={aboutModalItem === 'credits'}
        onClose={() => setAboutModalItem(null)}
        category={isKo ? '03 크레딧' : '03 CREDITS'}
        title={isKo ? '예술감독 및 참여작가 리스트' : 'Credits: Artistic Director & Artists'}
      >
        <div className="space-y-4">
          {/* Artistic Director */}
          <div className="border border-white/20 p-3.5 bg-white/[0.03] space-y-1">
            <span className="font-mono text-[10px] text-[#8C8C8C] uppercase font-bold block">
              ■ {isKo ? '예술감독' : 'ARTISTIC DIRECTOR'}
            </span>
            <div className="text-xl font-bold text-white">
              {isKo ? '박철희' : 'Park Chul-hee'}
            </div>
            <p className="text-caption text-[#B9B9B9] font-light">
              {isKo ? '제8회 안양공공예술프로젝트(APAP8) 총괄 기획 및 예술감독' : 'Artistic Director, APAP8'}
            </p>
          </div>

          {/* Participating Artists (31) */}
          <div className="border border-white/15 p-3.5 bg-white/[0.02] space-y-2">
            <div className="flex justify-between items-center pb-1 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-white">
                {isKo ? '■ 참여작가 (31인/팀)' : '■ PARTICIPATING ARTISTS (31)'}
              </span>
              <span className="font-mono text-[10px] text-[#8C8C8C]">가나다순</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                '308 아트크루', '권치규', '김근중', '김덕한', '김도훈', '김동유', '김성복', '김윤아',
                '김태수', '다이고 우시', '박재훈', '스튜디오 올레오밍구스', '양태근', '오용길', '왕칭송',
                '유영운', '윤진섭', '이길우', '이후창', '임혜정', '자오넝즈', '장성재', '장지엔',
                '저우진화', '전인식', '정영남', '지용호', '처 지엔취안', '최순녕', '펑정지에', '홍경택'
              ].map((artist) => (
                <span
                  key={artist}
                  className="text-xs font-mono border border-white/20 text-white/90 px-2.5 py-1 bg-white/5"
                >
                  {artist}
                </span>
              ))}
            </div>
          </div>

          {/* Competition Winners (10) */}
          <div className="border border-white/15 p-3.5 bg-white/[0.01] space-y-2">
            <div className="flex justify-between items-center pb-1 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-[#B9B9B9]">
                {isKo ? '■ 미디어아트 공모 당선 작가 (10팀)' : '■ COMPETITION WINNERS (10)'}
              </span>
              <span className="font-mono text-[10px] text-[#8C8C8C]">신진 작가전</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                '김남표(글램포지)', '김리아', '박선재(팝시클)', '박은영', '이어진',
                '이창기', '임도원', '임주원', '진진아', 'Hyp-파장(소수정x서재은)'
              ].map((artist) => (
                <span
                  key={artist}
                  className="text-[11px] font-mono border border-white/10 text-white/70 px-2 py-0.5 bg-white/[0.02]"
                >
                  {artist}
                </span>
              ))}
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
              ? '시민 참여형 공공예술 프로그램을 통해 지역 문화예술 향유 기회를 확대하고 지역 예술가와 소통하는 기반을 마련합니다.'
              : 'Expanding cultural access and fostering creative dialogue between local artists and citizens.'}
          </p>

          <div className="space-y-2.5">
            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '■ 워크숍' : '■ WORKSHOP'}</span>
                <span className="text-xs font-mono bg-white text-black px-1.5 py-0.2">예술인 주도형</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                APAP8 작품 연계 안양 지역예술가와 함께하는 창작 워크숍
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '■ 공연' : '■ PERFORMANCE'}</span>
                <span className="text-xs font-mono bg-white text-black px-1.5 py-0.2">예술인 참여형</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                실내외 전시, 체험, 행사존을 연결하는 미니 콘서트 및 퍼포먼스
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '■ 교육' : '■ EDUCATION'}</span>
                <span className="text-xs font-mono border border-white/40 text-white px-1.5 py-0.2">시민 참여형</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                APAP8 주제 연계 미디어아트·AI 관련 교육·강의 프로그램
              </p>
            </div>

            <div className="border border-white/15 p-3 bg-white/[0.02] space-y-1">
              <div className="flex justify-between items-center text-caption font-mono">
                <span className="text-white font-bold">{isKo ? '■ 체험' : '■ EXPERIENCE'}</span>
                <span className="text-xs font-mono border border-white/40 text-white px-1.5 py-0.2">가족·시민 체험형</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                APAP를 주제로 오감 체험 프로그램을 통한 다양한 예술 활동
              </p>
            </div>
          </div>
        </div>
      </SectionDetailModal>

      <SectionDetailModal
        isOpen={programModalItem === 'docent'}
        onClose={() => setProgramModalItem(null)}
        category={isKo ? '02 도슨트 투어' : '02 DOCENT TOUR'}
        title={isKo ? 'APAP8 작품 투어 프로그램 (3종)' : 'APAP8 Guided Docent Tours'}
      >
        <div className="space-y-4">
          <p className="text-caption text-[#B9B9B9] leading-relaxed font-light">
            {isKo
              ? '전문 해설사와 함께 안양예술공원의 명작과 신작을 탐방하는 3대 공식 투어 프로그램입니다.'
              : 'Explore artworks across Anyang Art Park guided by professional docents.'}
          </p>

          <div className="space-y-3">
            {/* Tour 1 */}
            <div className="border border-white/15 p-3.5 bg-white/[0.02] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-caption font-mono">
                  {isKo ? '1. 도슨트와 함께하는 APAP8' : '1. Regular Docent Tour'}
                </span>
                <span className="text-[10px] font-mono bg-white text-black px-1.5 py-0.2 font-bold">무료 (45분)</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                아이 파빌리온, 오픈 그라운드(안양파빌리온 광장 등) 주요 작품 해설
              </p>
              <div className="text-[11px] font-mono text-[#8C8C8C] pt-1 border-t border-white/10 space-y-0.5">
                <div>■ 운영: 11:00 / 14:00 / 16:00 (1일 3회 운영)</div>
                <div>■ 참여: 현장 참여 / 10인 이상 단체 사전 예약</div>
              </div>
            </div>

            {/* Tour 2 */}
            <div className="border border-white/15 p-3.5 bg-white/[0.02] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-caption font-mono">
                  {isKo ? '2. 〈특별전: 우리가 꿈꾸는 도원〉 해설' : '2. Special Exhibition Docent'}
                </span>
                <span className="text-[10px] font-mono bg-white text-black px-1.5 py-0.2 font-bold">무료 (10분)</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                중국 작가(장지엔, 펑정지에 등) 및 한국 작가(오용길, 이후창 등) 참여 작품 해설
              </p>
              <div className="text-[11px] font-mono text-[#8C8C8C] pt-1 border-t border-white/10 space-y-0.5">
                <div>■ 운영: 10:30 - 16:40 (매시 00분, 20분, 40분 시작)</div>
                <div>■ 장소: 아르테자이 상가, 평촌 학운공원 오픈 스쿨</div>
              </div>
            </div>

            {/* Tour 3 */}
            <div className="border border-white/15 p-3.5 bg-white/[0.02] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-caption font-mono">
                  {isKo ? '3. APAP8 스페셜 투어-나이트' : '3. Special Night Tour'}
                </span>
                <span className="text-[10px] font-mono border border-white/60 text-white px-1.5 py-0.2 font-bold">유료 5천원</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                APAP 1~7회 작품 해설 및 야간 〈밤의 도원경〉 관람 안내
              </p>
              <div className="text-[11px] font-mono text-[#8C8C8C] pt-1 border-t border-white/10 space-y-0.5">
                <div>■ 일정: 10.16. ~ 11.6.(매주 금) 19:00 (90분)</div>
                <div>■ 예약: 네이버·전화(031-687-0548) 또는 현장 접수</div>
              </div>
            </div>
          </div>
        </div>
      </SectionDetailModal>

      {/* Forum Modal (NEW) */}
      <SectionDetailModal
        isOpen={programModalItem === 'forum'}
        onClose={() => setProgramModalItem(null)}
        category={isKo ? '03 공공예술 토론회' : '03 FORUM'}
        title={isKo ? '공공예술 토론회 | 성과공유회' : 'Public Art Forum & Symposium'}
      >
        <div className="space-y-4">
          <p className="text-caption text-[#B9B9B9] leading-relaxed font-light">
            {isKo
              ? '공공예술의 미래 담론을 형성하고 APAP8의 성과를 공유하는 2개의 학술 세션입니다.'
              : 'Scholarly discussions establishing future public art discourses and reflecting on APAP8 outcomes.'}
          </p>

          <div className="space-y-3">
            <div className="border border-white/15 p-3.5 bg-white/[0.02] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-caption font-mono">1. APAP8, 공공예술의 미래</span>
                <span className="text-[10px] font-mono bg-white text-black px-1.5 py-0.2 font-bold">SESSION 01</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                기술 융합 시대 동시대 공공예술의 지향점과 지속가능성 담론 모색
              </p>
              <div className="text-[11px] font-mono text-[#8C8C8C] pt-1 border-t border-white/10 space-y-0.5">
                <div>■ 일시: 2026.09.17.(목) 14:00 - 16:00</div>
                <div>■ 장소: 안양박물관 교육관</div>
              </div>
            </div>

            <div className="border border-white/15 p-3.5 bg-white/[0.02] space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-caption font-mono">2. APAP8, 아시아 공공예술로 나아가다</span>
                <span className="text-[10px] font-mono bg-white text-black px-1.5 py-0.2 font-bold">SESSION 02</span>
              </div>
              <p className="text-caption text-[#B9B9B9] font-light">
                APAP8 행사 종합 성과 평가 및 글로벌·아시아 공공예술 네트워크 확장 전략 공유
              </p>
              <div className="text-[11px] font-mono text-[#8C8C8C] pt-1 border-t border-white/10 space-y-0.5">
                <div>■ 일시: 2026.12.10.(목) 14:00 - 16:00</div>
                <div>■ 장소: 안양박물관 교육관</div>
              </div>
            </div>
          </div>
        </div>
      </SectionDetailModal>

      <SectionDetailModal
        isOpen={programModalItem === 'broadcast'}
        onClose={() => setProgramModalItem(null)}
        category={isKo ? '04 미디어·방송' : '04 MEDIA & BROADCAST'}
        title={isKo ? 'KBS 전국 방송 송출' : 'KBS Nationwide Broadcast'}
      >
        <div className="space-y-4">
          <div className="border border-white/15 p-4 bg-white/[0.02] space-y-2">
            <span className="text-caption font-mono font-bold text-[#8C8C8C] uppercase tracking-wider block">
              KBS1 (전국방송)
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {isKo ? '네트워크 기획 〈예술로 길을 열다〉' : 'Special Documentary: Opening Paths with Art'}
            </h4>
            <p className="text-caption text-[#B9B9B9] leading-relaxed font-light">
              APAP8을 중심으로 지역이 예술로 가치를 발현하는 현장을 취재하고, APAP8과 유사한 해외 사례를 소개한 특별 다큐멘터리 프로그램입니다.
            </p>
            <div className="text-caption font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-1">
              <div>■ 방송일시: 2026년 8월 29일(토) 13:05</div>
              <div>■ 방송채널: KBS 1TV 전국 방송</div>
            </div>
            <div className="pt-2">
              <a
                href="https://www.youtube.com/watch?v=4zB7LXO7Ydo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black font-mono text-xs font-bold hover:bg-white/80 transition-colors"
              >
                <span>{isKo ? '유튜브 영상 보기' : 'WATCH ON YOUTUBE'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </SectionDetailModal>
    </div>
  );
}
