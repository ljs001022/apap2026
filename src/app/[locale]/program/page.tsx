'use client';

import React from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import { ArrowLeft, Calendar, MapPin, Users, Radio, Video, ArrowUpRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ProgramPage({ params }: PageProps) {
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

        {/* 3 Categories from program.json */}
        <div className="space-y-16">
          {/* Category 1: Citizen Program (도원 릴레이) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">01</span>
              <span>{isKo ? '시민참여 프로그램' : 'CITIZEN PROGRAM'}</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {isKo ? '도원 릴레이' : 'Dowon Relay'}
              </h2>
              <p className="text-base sm:text-lg text-[#B9B9B9] font-light leading-relaxed mt-2">
                {isKo
                  ? '시민 참여형 공공예술 프로그램을 통해 지역의 문화예술 향유 기회를 확대하고, 지역 예술가와 시민 간 창작·소통의 기반을 마련합니다. 미디어아트·기술·AI를 연계한 다연령·다장르의 융합 콘텐츠를 안양의 다양한 지역 거점에서 운영합니다.'
                  : 'Expanding cultural access and fostering creative dialogue between local artists and citizens through media art, technology, and AI integration across various community hubs.'}
              </p>
            </div>

            {/* 4 SubPrograms Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  field: isKo ? '워크숍' : 'WORKSHOP',
                  type: isKo ? '예술인 주도형' : 'Artist-led',
                  content: isKo
                    ? 'APAP8 작품 연계 안양 지역예술가와 함께하는 창작 워크숍'
                    : 'Collaborative creative workshops with local artists connected to APAP8 works',
                },
                {
                  field: isKo ? '공연' : 'PERFORMANCE',
                  type: isKo ? '예술인 참여형' : 'Artist-participatory',
                  content: isKo
                    ? '실내외 전시, 체험, 행사존을 연결하는 미니 콘서트 및 퍼포먼스'
                    : 'Mini concerts and performances connecting indoor & outdoor exhibition zones',
                },
                {
                  field: isKo ? '교육' : 'EDUCATION',
                  type: isKo ? '시민 참여형' : 'Citizen-participatory',
                  content: isKo
                    ? 'APAP8 주제 연계 미디어아트·AI 관련 교육·강의 프로그램'
                    : 'Educational lectures on media art and AI linked to the APAP8 theme',
                },
                {
                  field: isKo ? '체험' : 'EXPERIENCE',
                  type: isKo ? '가족·시민 체험형' : 'Family & Civic',
                  content: isKo
                    ? 'APAP를 주제로 오감 체험 프로그램을 통한 다양한 예술 활동'
                    : 'Five-senses immersive artistic experiences themed around APAP',
                },
              ].map((sub, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/15 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-0.5 border border-white/20">
                      {sub.field}
                    </span>
                    <span className="font-mono text-xs text-[#8C8C8C]">{sub.type}</span>
                  </div>
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    {sub.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#8C8C8C] border-t border-white/10 pt-3">
              <span>{isKo ? '일정: 2026.9. ~ 2026.11.(예정)' : 'Schedule: Sept – Nov 2026'}</span>
              <span>•</span>
              <span>{isKo ? '장소: 안양파빌리온, 안양예술공원 및 거점공간' : 'Location: Anyang Pavilion & Hubs'}</span>
              <span>•</span>
              <span>{isKo ? '대상: 시민, 가족, 청년, 학생 등 500명 이상' : 'Target: Open to All (Goal: 500+)'}</span>
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
                    ? '인공지능과 첨단기술이 융합하는 시대, 공공예술의 사회적 역할과 예술대전환의 미래 담론을 모색합니다.'
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
