'use client';

import React from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import { ArrowLeft, ArrowUpRight, MapPin, Clock, Bus, Car, Info, Phone } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function VisitPage({ params }: PageProps) {
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
              {isKo ? '관람 및 오시는 길' : 'VISITOR INFORMATION & DIRECTIONS'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              {isKo ? '관람안내' : 'VISIT'}
            </h1>
          </div>
          <span
            className="font-mono font-black text-5xl sm:text-7xl text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
          >
            05
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Card 1: Admission & Hours */}
          <div className="border border-white/20 p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>{isKo ? '관람시간 및 관람료' : 'HOURS & ADMISSION'}</span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs bg-white text-black px-2 py-0.5 font-bold">
                {isKo ? '전액 무료' : 'FREE ADMISSION'}
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-black text-white">
              {isKo ? '관람료 전액 무료' : 'Free Admission'}
            </div>

            <div className="text-sm sm:text-base text-[#B9B9B9] space-y-2.5 leading-relaxed font-light">
              <p>
                <strong className="text-white font-medium">{isKo ? '야외 공공조각 전시' : 'Outdoor Sculptures'}:</strong>{' '}
                {isKo ? '연중 상시 개방 (24시간 관람 가능)' : 'Open 24/7 year-round'}
              </p>
              <p>
                <strong className="text-white font-medium">{isKo ? '실내 전시관 (안양파빌리온)' : 'Indoor Pavilions'}:</strong>{' '}
                {isKo ? '화요일 – 일요일 10:00 – 18:00 (입장 마감 17:30)' : 'Tue–Sun 10:00–18:00 (Last entry 17:30)'}
              </p>
              <p className="font-mono text-xs sm:text-sm text-[#8C8C8C]">
                {isKo ? '※ 매주 월요일 휴관 (공휴일인 경우 익일 휴관)' : '※ Closed Mondays'}
              </p>
              <div className="pt-2.5 sm:pt-3 border-t border-white/10 text-xs sm:text-sm font-mono text-white/70 space-y-1">
                <div>
                  <span className="text-[#8C8C8C]">{isKo ? '■ 운영기간: ' : '■ Period: '}</span>
                  <span>{isKo ? '2026년 9월 30일(수) ~ 11월 29일(일)' : 'Sept 30 – Nov 29, 2026'}</span>
                </div>
                <div>
                  <span className="text-[#8C8C8C]">{isKo ? '■ 개막식: ' : '■ Opening: '}</span>
                  <span>{isKo ? '2026.9.30.(수) 18:00 (안양파빌리온 앞 벽천광장)' : 'Sept 30, 2026 18:00 (Cascade Square)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Location */}
          <div className="border border-white/20 p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold text-[#8C8C8C] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>{isKo ? '전시 장소 및 주소' : 'LOCATION & ADDRESS'}</span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs border border-white/40 text-white/90 px-2 py-0.5 font-bold">
                {isKo ? '안양파빌리온' : 'PAVILION'}
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-black text-white">
              {isKo ? '안양예술공원 일원' : 'Anyang Art Park'}
            </div>

            <div className="text-sm sm:text-base text-[#B9B9B9] space-y-2.5 leading-relaxed font-light">
              <p className="text-white font-medium">
                {isKo
                  ? '경기도 안양시 만안구 예술공원로 180 (안양파빌리온)'
                  : '180, Yesulgongwon-ro, Manan-gu, Anyang-si, Gyeonggi-do (Anyang Pavilion)'}
              </p>
              <p className="text-xs sm:text-sm text-[#8C8C8C]">
                {isKo
                  ? '안양예술공원 산책로, 안양파빌리온 메인홀, 안양천 변 야외 공간'
                  : 'Anyang Art Park trails, Anyang Pavilion, and open urban spaces along Anyang Stream'}
              </p>
              <p className="font-mono text-xs sm:text-sm text-white/70 flex items-center gap-1.5 pt-1.5 border-t border-white/10">
                <Phone className="w-3.5 h-3.5" />
                <span>031-687-0548 (안양문화예술재단 APAP 사업부)</span>
              </p>
            </div>
          </div>
        </div>

        {/* 4 Venues Detail Section (NEW from visit.json) */}
        <div className="border border-white/20 p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 space-y-6 bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <span>{isKo ? '전시장 4대 구역별 상세 안내' : '4 VENUE DETAILS'}</span>
            </h3>
            <span className="font-mono text-xs text-[#8C8C8C]">아이 파빌리온 · 밤의 도원경 · 오픈 그라운드 · 우리가 꿈꾸는 도원</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {isKo ? '1. 아이 파빌리온' : '1. i Pavilion'}
                </h4>
                <span className="text-xs font-mono bg-white/10 text-white/80 px-2 py-0.5">실내 미디어·설치</span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#D4D4D4] space-y-1">
                <div>■ 위치: 안양파빌리온 (만안구 예술공원로 180)</div>
                <div>■ 운영: 화 - 금 10:00 – 18:00 / 토, 일 10:00 – 19:00</div>
                <div className="text-[#8C8C8C]">■ 휴관: 매주 월요일 휴관 (10.5.(월) 대체공휴일 개관, 10.6.(화) 휴관)</div>
              </div>
            </div>

            <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {isKo ? '2. 밤의 도원경' : '2. Night Utopia'}
                </h4>
                <span className="text-xs font-mono bg-white/10 text-white/80 px-2 py-0.5">야외 미디어아트</span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#D4D4D4] space-y-1">
                <div>■ 위치: 안양파빌리온 앞 광장 일대</div>
                <div>■ 운영: 화 - 일 19:00 – 22:00 (월요일 휴무 / 10.5 정상운영, 10.6 휴무)</div>
                <div className="text-white font-medium">■ 상영: 〈빛의 폭포〉 매 정시 15분간 / 〈오색운〉 매시 15분~정시 상영</div>
              </div>
            </div>

            <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {isKo ? '3. 오픈 그라운드' : '3. Open Ground'}
                </h4>
                <span className="text-xs font-mono bg-white text-black px-2 py-0.5 font-bold">24시간 상시개방</span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#D4D4D4] space-y-1">
                <div>■ 위치: 안양파빌리온 앞 광장, 안양박물관 야외, 공원 내 공동의 장</div>
                <div>■ 운영: 상시관람 (24시간 자유 개방)</div>
                <div className="text-[#8C8C8C]">■ 휴관: 연중무휴</div>
              </div>
            </div>

            <div className="border border-white/15 p-5 bg-white/[0.01] space-y-2">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {isKo ? '4. 특별전: 우리가 꿈꾸는 도원' : '4. Special Exhibition'}
                </h4>
                <span className="text-xs font-mono bg-white/10 text-white/80 px-2 py-0.5">한중 특별전</span>
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#D4D4D4] space-y-1">
                <div>■ 위치: 아르테자이 상가 1층 오감갤러리, 평촌 학운공원 오픈 스쿨</div>
                <div>■ 운영: 화 - 일 10:00 – 18:00</div>
                <div className="text-[#8C8C8C]">■ 휴관: 매주 월요일 휴관 (10.5.(월) 개관, 10.6.(화) 휴관)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Directions & Transportation */}
        <div className="border border-white/20 p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
            <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>{isKo ? '대중교통 이용 안내' : 'Public Transportation'}</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-[#B9B9B9] leading-relaxed">
            <div className="space-y-1.5 border-l-2 border-white/30 pl-3.5 sm:pl-4">
              <h4 className="font-bold text-white font-mono text-xs sm:text-sm uppercase tracking-wider">
                {isKo ? '지하철 1호선 관악역 하차' : 'Subway Line 1 Gwanak Stn'}
              </h4>
              <p className="font-light">
                {isKo
                  ? '2번 출구 앞 버스정류장에서 마을버스 6-2번 환승 → 안양예술공원 종점 하차 (도보 2분)'
                  : 'Exit 2 → Village Bus 6-2 → Anyang Art Park Terminus (2 min walk)'}
              </p>
            </div>

            <div className="space-y-1.5 border-l-2 border-white/30 pl-3.5 sm:pl-4">
              <h4 className="font-bold text-white font-mono text-xs sm:text-sm uppercase tracking-wider">
                {isKo ? '지하철 1호선 안양역 하차' : 'Subway Line 1 Anyang Stn'}
              </h4>
              <p className="font-light">
                {isKo
                  ? '1번 출구 맞은편 정류장에서 시내버스 2번 환승 → 안양예술공원 사거리 하차 (도보 5분)'
                  : 'Exit 1 → Bus 2 → Anyang Art Park Intersection (5 min walk)'}
              </p>
            </div>
          </div>
        </div>

        {/* Historical Archive Banner */}
        <div className="border border-white/30 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 bg-white/[0.04]">
          <div className="space-y-1.5">
            <div className="font-mono text-[10px] sm:text-xs font-bold text-[#8C8C8C] uppercase tracking-widest">
              APAP ARCHIVE HUB
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {isKo ? '역대 APAP (1회~7회) 아카이브' : 'APAP Editions 1–7 Archives'}
            </h4>
            <p className="text-xs sm:text-sm text-[#B9B9B9] max-w-xl leading-relaxed font-light">
              {isKo
                ? '2005년 제1회부터 축적된 역대 APAP의 모든 영구 설치 작품 및 전시 기록을 통합 아카이브에서 확인하실 수 있습니다.'
                : 'Browse permanent installations and documentation across past editions from 2005 to 2023.'}
            </p>
          </div>

          <Link
            href={`/archive/${validLocale}`}
            className="inline-flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs font-bold px-4 py-2 sm:px-6 sm:py-3 bg-white text-black hover:bg-white/80 transition-colors flex-shrink-0 w-full sm:w-auto"
          >
            <span>{isKo ? '바로가기' : 'GO TO ARCHIVE'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}