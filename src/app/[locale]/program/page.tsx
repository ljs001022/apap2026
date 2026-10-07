'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import { ArrowLeft, Calendar, MapPin, Users, Radio, Video, ArrowUpRight, Music, ShoppingBag, Clock, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ProgramPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale = ['ko', 'en'].includes(locale) ? locale : 'ko';
  const isKo = validLocale === 'ko';

  const [citizenTab, setCitizenTab] = useState<'busking' | 'dowonjang'>('busking');

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
              {isKo ? '제8회 안양공공예술프로젝트' : <>The 8<sup className="lowercase">th</sup> ANYANG PUBLIC ART PROJECT</>}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              {isKo ? '프로그램' : 'PROGRAM'}
            </h1>
          </div>
        </div>

        {/* 3 Categories from program.json */}
        <div className="space-y-16">
          {/* Category 1: Citizen Program (도원 릴레이) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">01</span>
              <span>{isKo ? '시민참여 프로그램' : 'CITIZEN PROGRAM'}</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {isKo ? '도원 릴레이' : 'Dowon Relay'}
                </h2>
                <span className="font-mono text-xs bg-white text-black font-bold px-2.5 py-0.5">
                  {isKo ? '2026. 10. 집중 운영' : 'October 2026'}
                </span>
              </div>
              <p className="text-base sm:text-lg text-[#B9B9B9] font-light leading-relaxed mt-2">
                {isKo
                  ? '시민 참여형 공공예술 프로그램을 통해 지역의 문화예술 향유 기회를 확대하고, 지역 예술가와 시민 간 창작·소통의 기반을 마련합니다. 안양파빌리온 앞마당과 공원을 무대로 가을날의 특별한 예술 프로그램을 선보입니다.'
                  : 'Expanding cultural access and fostering creative dialogue between local artists and citizens through participatory music busking and art markets across Anyang Pavilion.'}
              </p>
            </div>

            {/* Inner Tabs: Busking & Dowonjang */}
            <div className="space-y-6">
              <div className="flex border-b border-white/20 gap-2">
                <button
                  type="button"
                  onClick={() => setCitizenTab('busking')}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-bold transition-all border-b-2 -mb-[2px] ${
                    citizenTab === 'busking'
                      ? 'border-white text-white bg-white/5'
                      : 'border-transparent text-[#8C8C8C] hover:text-white'
                  }`}
                >
                  <Music className="w-4 h-4" />
                  <span>{isKo ? '파빌리온 버스킹 (10.9)' : 'Pavilion Busking (Oct 9)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCitizenTab('dowonjang')}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-bold transition-all border-b-2 -mb-[2px] ${
                    citizenTab === 'dowonjang'
                      ? 'border-white text-white bg-white/5'
                      : 'border-transparent text-[#8C8C8C] hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isKo ? '도원장(場) 아트마켓 (10.17)' : 'Dowonjang Art Market (Oct 17)'}</span>
                </button>
              </div>

              {/* Tab 1: Pavilion Busking */}
              {citizenTab === 'busking' && (
                <div className="space-y-6 animate-tab-content">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Text & Info (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <span className="font-mono text-xs text-[#8C8C8C] font-semibold tracking-wider uppercase block mb-1">
                          PAVILION BUSKING
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                          {isKo ? '파빌리온 버스킹 〈도원, 음악이 머무는 곳〉' : 'Pavilion Busking: Where Music Stays'}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-white/70 mt-1">
                          {isKo ? '안양파빌리온에 음악이 머무는 특별한 오후' : 'A special musical afternoon at Anyang Pavilion'}
                        </p>
                      </div>

                      <div className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed space-y-3 font-light border-y border-white/10 py-4">
                        <p>
                          {isKo
                            ? 'APAP8 시민참여 프로그램 〈도원릴레이〉와 함께 안양파빌리온 앞 광장에서 다양한 장르의 음악을 만나보세요.'
                            : 'Experience diverse musical performances at the pavilion plaza with APAP8 citizen program Dowon Relay.'}
                        </p>
                        <p>
                          {isKo
                            ? '재즈와 소울의 깊은 감성을 전하는 애쉬, 잔잔하지만 깊게 스며드는 음악을 들려주는 밴드 웨이블릿, 다채로운 레퍼토리와 멀티 악기 연주로 낭만을 선사하는 아코디언킴이 가을날의 파빌리온을 음악으로 채웁니다.'
                            : 'Ash delivering rich jazz and soul, Wavelet performing deep indie melodies, and Accordion Kim bringing romance through multi-instrumental repertoires.'}
                        </p>
                        <p className="text-xs sm:text-sm text-[#8C8C8C]">
                          {isKo
                            ? '※ 공연과 함께 누구나 자유롭게 참여할 수 있는 컬러링 프로그램도 마련되어 있습니다. 잠시 걸음을 멈추고, 음악과 예술이 머무는 안양의 작은 도원을 만나보세요.'
                            : '※ Complimentary coloring programs are also prepared for all visitors.'}
                        </p>
                      </div>

                      {/* Event Meta Box */}
                      <div className="bg-white/[0.02] border border-white/15 p-4 sm:p-5 space-y-3 font-mono text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-white/10">
                          <div>
                            <span className="text-[#8C8C8C] block text-[11px] font-bold mb-0.5">■ 일시 / DATETIME</span>
                            <span className="text-white font-medium">2026. 10. 9.(금) 15:00–17:30</span>
                          </div>
                          <div>
                            <span className="text-[#8C8C8C] block text-[11px] font-bold mb-0.5">■ 장소 / VENUE</span>
                            <span className="text-white font-medium">안양파빌리온 앞 광장</span>
                          </div>
                        </div>

                        {/* Program Timetable */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[#8C8C8C] block text-[11px] font-bold mb-1">■ PROGRAM 타임테이블</span>
                          <div className="divide-y divide-white/5 bg-white/[0.02] border border-white/10">
                            <div className="flex items-center justify-between px-3 py-2 text-xs">
                              <span className="font-bold text-white">15:00–15:40</span>
                              <span className="text-white/90">애쉬 (Ash) — 재즈 & 소울</span>
                            </div>
                            <div className="flex items-center justify-between px-3 py-2 text-xs">
                              <span className="font-bold text-white">16:00–16:50</span>
                              <span className="text-white/90">웨이블릿 (Wavelet) — 밴드</span>
                            </div>
                            <div className="flex items-center justify-between px-3 py-2 text-xs">
                              <span className="font-bold text-white">17:00–17:30</span>
                              <span className="text-white/90">아코디언킴 (Accordion Kim) — 아코디언</span>
                            </div>
                          </div>
                          <span className="text-[11px] text-[#8C8C8C] block pt-1">
                            ※ 공연 및 프로그램은 현장 상황에 따라 변경될 수 있습니다.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Images (5 cols) */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="border border-white/20 bg-black overflow-hidden shadow-lg group">
                        <img
                          src="/images/programs/busking-1.webp"
                          alt="파빌리온 버스킹 포스터 1"
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="border border-white/20 bg-black overflow-hidden shadow-lg group">
                        <img
                          src="/images/programs/busking-2.webp"
                          alt="파빌리온 버스킹 프로그램 안내 포스터 2"
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Dowonjang Art Market */}
              {citizenTab === 'dowonjang' && (
                <div className="space-y-6 animate-tab-content">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Text & Info (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <span className="font-mono text-xs text-[#8C8C8C] font-semibold tracking-wider uppercase block mb-1">
                          FLEA ART MARKET
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                          {isKo ? '안양의 창작자와 시민이 만나는 특별한 예술 장터, 〈도원장(場)〉' : 'Flea Art Market 〈Dowonjang〉'}
                        </h3>
                        <p className="text-xs sm:text-sm font-mono text-white/70 mt-1">
                          {isKo ? '제8회 안양공공예술프로젝트(APAP8) 시민참여 프로그램' : 'APAP8 Citizen Engagement Program'}
                        </p>
                      </div>

                      <div className="text-sm sm:text-base text-[#D4D4D4] leading-relaxed space-y-3 font-light border-y border-white/10 py-4">
                        <p>
                          {isKo
                            ? '제8회 안양공공예술프로젝트(APAP8) 시민참여 프로그램 〈도원 릴레이〉의 일환으로 플리 아트마켓 〈도원장(場)〉이 안양파빌리온 앞마당에서 열립니다.'
                            : 'As part of the APAP8 citizen participation program Dowon Relay, flea art market Dowonjang opens at Anyang Pavilion front yard.'}
                        </p>
                        <p>
                          {isKo
                            ? '〈도원장(場)〉은 안양의 작가와 공방, 핸드메이드 창작자들이 직접 만든 작품과 아트상품을 선보이고 시민들과 창작의 즐거움을 나누는 열린 문화예술 마켓입니다.'
                            : 'Dowonjang is an open cultural market where Anyang creators, workshops, and artisans showcase handmade craft and art pieces.'}
                        </p>
                        <p>
                          {isKo
                            ? '공예, 일러스트, 업사이클, 리빙 등 다양한 분야의 개성 있는 아트상품부터 직접 참여해볼 수 있는 창작 체험까지 만나볼 수 있습니다. 안양예술공원의 ‘도원(桃源)’을 배경으로 펼쳐지는 하루, 좋은 사람과 좋은 작품, 즐거운 이야기가 모이는 《도원장(場)》에서 나만의 작은 도원을 만나보세요.'
                            : 'Discover unique crafts, illustrations, upcycling goods, and hands-on creative activities amidst the peach blossom paradise of Anyang.'}
                        </p>
                      </div>

                      {/* Event Meta Box */}
                      <div className="bg-white/[0.02] border border-white/15 p-4 sm:p-5 space-y-2.5 font-mono text-xs sm:text-sm">
                        <span className="text-[#8C8C8C] block text-[11px] font-bold uppercase tracking-wider mb-2">
                          ■ 행사 안내 / EVENT OVERVIEW
                        </span>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <span className="text-[#8C8C8C] flex-shrink-0 min-w-[70px]">행 사 명:</span>
                            <span className="text-white font-medium">제8회 안양공공예술프로젝트(APAP8) 시민참여 프로그램 《도원장(場)》</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <span className="text-[#8C8C8C] flex-shrink-0 min-w-[70px]">일 시:</span>
                            <span className="text-white font-medium">2026. 10. 17.(토) 11:00~18:00</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <span className="text-[#8C8C8C] flex-shrink-0 min-w-[70px]">장 소:</span>
                            <span className="text-white font-medium">안양파빌리온 앞마당 (안양시 만안구 예술공원로 180)</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <span className="text-[#8C8C8C] flex-shrink-0 min-w-[70px]">내 용:</span>
                            <span className="text-white font-medium">아트상품 및 핸드메이드 제품 판매, 창작 체험 등</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <span className="text-[#8C8C8C] flex-shrink-0 min-w-[70px]">참여 셀러:</span>
                            <span className="text-white font-medium">안양의 작가·공방·핸드메이드 창작자 등 약 15개 팀</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <span className="text-[#8C8C8C] flex-shrink-0 min-w-[70px]">참 가 비:</span>
                            <span className="text-white font-bold bg-white text-black px-2 py-0.5 w-fit">무료 (자유 입장)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Poster Image (5 cols) */}
                    <div className="lg:col-span-5">
                      <div className="border border-white/20 bg-black overflow-hidden shadow-lg group">
                        <img
                          src="/images/programs/dowonjang-1.webp"
                          alt="도원장 포스터"
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Meta Row */}
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#8C8C8C] border-t border-white/10 pt-3">
              <span>{isKo ? '기간: 2026. 10. 집중 운영' : 'Schedule: October 2026'}</span>
              <span>•</span>
              <span>{isKo ? '장소: 안양파빌리온 앞마당 및 광장 일대' : 'Location: Anyang Pavilion Area'}</span>
              <span>•</span>
              <span>{isKo ? '참가비: 전액 무료' : 'Fee: Free Admission'}</span>
            </div>
          </section>

          {/* Category 2: Docent Tour (도슨트 투어) */}
          <section className="space-y-6 pt-10 border-t border-white/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">02</span>
              <span>{isKo ? '도슨트 투어' : 'DOCENT TOUR'}</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {isKo ? 'APAP8 작품 투어 프로그램' : 'APAP8 Guided Docent Tours'}
              </h2>
              <p className="text-base sm:text-lg text-[#B9B9B9] font-light leading-relaxed mt-2">
                {isKo
                  ? '정규 작품투어 프로그램과 APAP8 전시장 별 도슨트를 운영합니다. 전문 해설사와 함께 공공예술 명작과 신작을 깊이 있게 감상해보세요.'
                  : 'Regular guided tours and venue-specific docents throughout APAP8. Experience artworks guided by professional commentary.'}
              </p>
            </div>

            {/* 3 Tours Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                {
                  name: isKo ? '도슨트와 함께하는 APAP8' : 'Guided Docent with APAP8',
                  price: isKo ? '무료' : 'Free',
                  location: isKo ? '안양파빌리온' : 'Anyang Pavilion',
                  schedule: isKo ? '11:00, 14:00, 16:00 (1일 3회 운영 / 45분 내외)' : '11:00, 14:00, 16:00 (Daily 3x / Approx. 45 min)',
                  content: isKo
                    ? 'APAP8 실내외 주요 작품 해설'
                    : 'APAP8 indoor & outdoor highlight artworks commentary',
                  reservation: isKo ? '현장 참여 가능 / 10인 이상 단체 사전 예약' : 'Walk-in / Advance booking for groups 10+',
                },
                {
                  name: isKo ? '〈특별전: 우리가 꿈꾸는 도원〉 도슨트 해설' : 'Special Exhibition Docent Commentary',
                  price: isKo ? '무료' : 'Free',
                  location: isKo ? '아르테자이 상가, 오픈 스쿨' : 'Arte Zai Commercial, Open School',
                  schedule: isKo ? '상시운영 (10분 내외)' : 'Always operating (Approx. 10 min)',
                  content: isKo
                    ? '주요 작품 해설'
                    : 'Key exhibition artworks commentary',
                  reservation: isKo ? '현장 참여 가능 / 10인 이상 단체 사전 예약' : 'Walk-in / Advance booking for groups 10+',
                },
                {
                  name: isKo ? 'APAP8 스페셜 투어-나이트' : 'APAP8 Special Night Tour',
                  price: isKo ? '유료 (5천원)' : 'Paid (KRW 5,000)',
                  location: isKo ? '안양파빌리온' : 'Anyang Pavilion',
                  schedule: isKo ? '10.16. ~ 11.6.(매주 금요일) 19:00 (90분 내외)' : 'Oct 16 – Nov 6 (Every Fri) 19:00 (90 min)',
                  content: isKo
                    ? 'APAP 야외 주요 작품 해설'
                    : 'APAP outdoor key artworks commentary',
                  reservation: isKo ? '네이버·전화 예약 또는 현장 참여 가능' : 'Naver / Phone booking or walk-in available',
                },
              ].map((tour, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/15 p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#8C8C8C]">0{idx + 1}</span>
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 ${
                          tour.price.includes('무료') || tour.price === 'Free'
                            ? 'bg-white text-black'
                            : 'border border-white text-white'
                        }`}
                      >
                        {tour.price}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {tour.name}
                    </h3>
                    <div className="text-xs font-mono text-[#8C8C8C] space-y-0.5 pt-1 border-t border-white/10">
                      <div>■ {isKo ? '시작장소:' : 'Location:'} {tour.location}</div>
                      <div>■ {isKo ? '운영일정:' : 'Schedule:'} {tour.schedule}</div>
                    </div>
                    <p className="text-xs text-white/80 font-light leading-relaxed pt-1">
                      {tour.content}
                    </p>
                  </div>
                  {tour.reservation && (
                    <div className="text-[11px] font-mono text-white/60 pt-2 border-t border-white/10">
                      ■ {tour.reservation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Category 3: Forum & Symposium (공공예술 토론회 | 성과공유회) (NEW) */}
          <section className="space-y-6 pt-10 border-t border-white/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">03</span>
              <span>{isKo ? '공공예술 토론회 | 성과공유회' : 'FORUM & SYMPOSIUM'}</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {isKo ? '공공예술 토론회 & 성과공유회' : 'Public Art Forum & Symposium'}
              </h2>
              <p className="text-base sm:text-lg text-[#B9B9B9] font-light leading-relaxed mt-2">
                {isKo
                  ? 'APAP8의 기획 방향과 공공예술의 동시대적 가치를 고찰하고 시민과 함께 안양공공예술프로젝트가 나아갈 미래 방향을 모색하는 담론형성의 장입니다.'
                  : 'Scholarly discussions reflecting on the curatorial direction of APAP8 and exploring future directions of public art together with citizens.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Session 1 */}
              <div className="border border-white/20 p-6 bg-white/[0.02] space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-mono text-xs font-bold bg-white text-black px-2 py-0.5">SESSION 01</span>
                  <span className="font-mono text-xs text-[#8C8C8C]">2026.09.17.(목) 14:00 - 16:00</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isKo ? '1. APAP8, 공공예술의 미래' : 'APAP8: The Future of Public Art'}
                </h3>
                <p className="text-xs sm:text-sm text-[#B9B9B9] font-light leading-relaxed">
                  {isKo
                    ? '인공지능과 첨단기술이 융합하는 시대, 공공예술의 사회적 역할과 예술 대전환의 미래 담론을 모색합니다.'
                    : 'Exploring the social role and transformation of public art in the era of AI and cutting-edge technologies.'}
                </p>
                <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-0.5">
                  <div>■ 장소: 안양박물관 교육관</div>
                  <div>■ 대상: 문화예술 전문가 및 시민 누구나</div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="border border-white/20 p-6 bg-white/[0.02] space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-mono text-xs font-bold bg-white text-black px-2 py-0.5">SESSION 02</span>
                  <span className="font-mono text-xs text-[#8C8C8C]">2026.12.10.(목) 14:00 - 16:00</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isKo ? '2. APAP8, 아시아 공공예술로 나아가다' : 'APAP8: Advancing to Asian Public Art'}
                </h3>
                <p className="text-xs sm:text-sm text-[#B9B9B9] font-light leading-relaxed">
                  {isKo
                    ? 'APAP8의 종합적 성과를 평가하고, 한중 특별전을 기점으로 아시아 공공예술 연대와 글로벌 거점 확장을 논의합니다.'
                    : 'Evaluating comprehensive APAP8 outcomes and expanding Asian public art networks.'}
                </p>
                <div className="text-xs font-mono text-[#8C8C8C] pt-2 border-t border-white/10 space-y-0.5">
                  <div>■ 장소: 안양박물관 교육관</div>
                  <div>■ 대상: 국내외 큐레이터, 예술가, 시민 참여자</div>
                </div>
              </div>
            </div>
          </section>

          {/* Category 4: Media & Broadcast (미디어·방송) */}
          <section className="space-y-6 pt-10 border-t border-white/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">04</span>
              <span>{isKo ? '미디어·방송' : 'MEDIA & BROADCAST'}</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {isKo ? 'APAP8 관련 방송 송출' : 'Nationwide Media Broadcast'}
              </h2>
              <p className="text-base sm:text-lg text-[#B9B9B9] font-light leading-relaxed mt-2">
                {isKo
                  ? 'KBS 네트워크 기획 〈예술로 길을 열다〉 — APAP8을 중심으로 지역이 예술로 가치를 발현하는 현장을 취재하고, APAP8과 유사한 해외 사례를 소개합니다.'
                  : 'KBS Network Special documentary capturing how APAP8 revitalizes community through public art and contemporary innovation.'}
              </p>
            </div>

            {/* Broadcast Card */}
            <div className="border border-white/20 p-6 bg-white/[0.03] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-white" />
                  <span className="font-mono text-sm font-bold text-white tracking-wider">
                    KBS1 (전국방송)
                  </span>
                </div>
                <span className="font-mono text-xs text-[#8C8C8C]">
                  {isKo ? '방영일: 2026년 8월 29일(토) 13:05' : 'Air Date: Aug 29, 2026 13:05'}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isKo ? 'KBS 네트워크 기획 〈예술로 길을 열다〉' : 'KBS Network Special 〈Opening Paths with Art〉'}
                </h3>
                <p className="text-sm text-[#B9B9B9] font-light leading-relaxed">
                  {isKo
                    ? '안양공공예술프로젝트의 20년 역사와 제8회 APAP8 신작 제작 과정, 국내외 공공예술의 생생한 현장을 담은 심층 다큐멘터리 방송입니다.'
                    : 'An in-depth documentary covering 20 years of APAP, the making of APAP8 commissions, and public art landscapes.'}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.youtube.com/watch?v=4zB7LXO7Ydo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold hover:bg-white/80 transition-colors"
                >
                  <Video className="w-4 h-4" />
                  <span>{isKo ? '방송 관련 영상 보기 (YouTube)' : 'Watch on YouTube'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}
