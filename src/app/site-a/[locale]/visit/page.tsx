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
        <div className="grid md:grid-cols-2 gap-8 mb-12">
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
              <p className="font-mono text-xs text-white/70 flex items-center gap-1.5 pt-2">
                <Phone className="w-3.5 h-3.5" />
                <span>031-687-0500 (안양문화예술재단 APAP 사업부)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Directions & Transportation */}
        <div className="border border-white/20 p-6 sm:p-8 mb-12 space-y-6">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bus className="w-5 h-5 text-white" />
            <span>{isKo ? '대중교통 이용 안내' : 'Public Transportation'}</span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-6 text-sm text-[#B9B9B9] leading-relaxed">
            <div className="space-y-2 border-l-2 border-white/30 pl-4">
              <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider">
                {isKo ? '지하철 1호선 관악역 하차' : 'Subway Line 1 Gwanak Stn'}
              </h4>
              <p>
                {isKo
                  ? '2번 출구 앞 버스정류장에서 마을버스 6-2번 환승 → 안양예술공원 종점 하차 (도보 2분)'
                  : 'Exit 2 → Village Bus 6-2 → Anyang Art Park Terminus (2 min walk)'}
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-white/30 pl-4">
              <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider">
                {isKo ? '지하철 1호선 안양역 하차' : 'Subway Line 1 Anyang Stn'}
              </h4>
              <p>
                {isKo
                  ? '1번 출구 맞은편 정류장에서 시내버스 2번 환승 → 안양예술공원 사거리 하차 (도보 5분)'
                  : 'Exit 1 → Bus 2 → Anyang Art Park Intersection (5 min walk)'}
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
            <h4 className="text-xl font-bold text-white">
              {isKo ? '역대 APAP (1회~7회) 아카이브 둘러보기' : 'Explore APAP Editions 1–7 Archives'}
            </h4>
            <p className="text-xs sm:text-sm text-[#B9B9B9] max-w-xl leading-relaxed">
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
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}