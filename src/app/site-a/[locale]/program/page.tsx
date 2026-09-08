'use client';

import React from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ProgramPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale = ['ko', 'en'].includes(locale) ? locale : 'ko';
  const isKo = validLocale === 'ko';

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
              {isKo ? '퍼블릭 & 시민 참여 프로그램' : 'PUBLIC & COMMUNITY PROGRAMS'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              {isKo ? '프로그램' : 'PROGRAM'}
            </h1>
          </div>
          <span
            className="font-mono font-black text-5xl sm:text-7xl text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
          >
            03
          </span>
        </div>

        {/* Program Cards List */}
        <div className="space-y-8 divide-y divide-white/20">
          {programs.map((prog, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-10' : ''}>
              <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] mb-3">
                <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">{prog.num}</span>
                <span className="tracking-widest uppercase">{prog.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {prog.title}
              </h2>

              <p className="text-sm sm:text-base text-[#B9B9B9] leading-relaxed mb-6 font-light max-w-3xl">
                {prog.desc}
              </p>

              <div className="grid sm:grid-cols-3 gap-3 text-xs font-mono text-white/70 bg-white/[0.03] border border-white/10 p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>{prog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>{prog.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>{prog.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}