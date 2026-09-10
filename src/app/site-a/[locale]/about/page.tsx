'use client';

import React from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function AboutPage({ params }: PageProps) {
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
              {isKo ? '소개' : 'ABOUT'}
            </h1>
          </div>
          <span
            className="font-mono font-black text-5xl sm:text-7xl text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
          >
            01
          </span>
        </div>

        {/* 3 Main Blocks: Overview, Theme, Stats & Outcomes */}
        <div className="space-y-16">
          {/* Block 1: Overview */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">01</span>
              <span>{isKo ? '개요' : 'OVERVIEW'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold leading-snug">
              {isKo ? (
                <>
                  도시 전체가 전시장이 되는
                  <br />
                  여덟 번째 안양<span className="text-white/40">.</span>
                </>
              ) : (
                <>
                  The Eighth Anyang,
                  <br />
                  Where the entire city becomes an open museum
                  <span className="text-white/40">.</span>
                </>
              )}
            </h2>

            <div className="text-base sm:text-lg text-[#B9B9B9] leading-relaxed space-y-4 font-light">
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

            {/* Facts Box */}
            <div className="bg-white/[0.03] border border-white/15 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
              <div>
                <span className="text-[#8C8C8C] block text-[11px]">{isKo ? '■ 사업명' : '■ PROJECT'}</span>
                <span className="text-white font-medium">{isKo ? '제8회 안양공공예술프로젝트(APAP8)' : 'The 8th Anyang Public Art Project (APAP8)'}</span>
              </div>
              <div>
                <span className="text-[#8C8C8C] block text-[11px]">{isKo ? '■ 운영기간' : '■ PERIOD'}</span>
                <span className="text-white font-medium">{isKo ? '2026.9.30. ~ 11.29.' : 'Sept 30 – Nov 29, 2026'}</span>
              </div>
              <div>
                <span className="text-[#8C8C8C] block text-[11px]">{isKo ? '■ 개막식' : '■ OPENING CEREMONY'}</span>
                <span className="text-white font-medium">{isKo ? '2026.9.30.(수) 19:00~20:00 (308 아트크루 레이저 공연 연계)' : 'Sept 30, 2026 (Wed) 19:00–20:00 (308 Art Crew Laser Show)'}</span>
              </div>
              <div>
                <span className="text-[#8C8C8C] block text-[11px]">{isKo ? '■ 장소' : '■ VENUE'}</span>
                <span className="text-white font-medium">{isKo ? '안양예술공원 일대 및 안양파빌리온' : 'Anyang Art Park & Anyang Pavilion'}</span>
              </div>
            </div>

            {/* Keyword Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(isKo
                ? ['#공공예술', '#트리엔날레', '#안양예술공원', '#커미션신작', '#ArteX', '#안양무릉도원']
                : ['#PublicArt', '#Triennial', '#AnyangArtPark', '#NewCommissions', '#ArteX', '#AnyangPeachBlossomSpring']
              ).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono border border-white/20 text-white/70 px-3 py-1 bg-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Block 2: Theme */}
          <section className="space-y-6 pt-10 border-t border-white/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">02</span>
              <span>{isKo ? '전시 주제' : 'EXHIBITION THEME'}</span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white">
                {isKo ? 'ArteX : 예술대전환' : 'ArteX : Art Transformation'}
              </h3>
              <div className="font-mono text-sm text-[#8C8C8C] font-semibold mt-1">
                {isKo ? '부제: 안양 무릉도원' : 'Subtitle: Anyang Peach Blossom Spring'}
              </div>
              <p className="font-mono text-xs text-white/70 mt-2 bg-white/[0.04] border-l-2 border-white px-3 py-1.5">
                {isKo
                  ? 'ArteX = Art + Transformation / Expansion / Experience (예술대전환, 예술의 확장, 예술의 새로운 경험)'
                  : 'ArteX = Art + Transformation / Expansion / Experience'}
              </p>
            </div>

            <div className="text-base sm:text-lg text-[#B9B9B9] leading-relaxed space-y-4 font-light">
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
              <p>
                {isKo
                  ? '시각예술에서 첨단기술의 활용은 더 이상 특별한 경우가 아니지만, 공공예술 분야는 그간 야외 조각이나 설치 위주로 진행되어 왔습니다. APAP8은 이전에는 쉽게 시도되지 못했던 디지털 미디어 아트를 공공예술로 도입하는 예술 대전환을 시도합니다.'
                  : 'While advanced technology is now prevalent in visual arts, public art has traditionally leaned heavily toward outdoor sculptures. APAP8 pioneers a fundamental transformation by introducing immersive digital media art into the shared public sphere.'}
              </p>
            </div>
          </section>

          {/* Block 3: Stats & Outcomes */}
          <section className="space-y-6 pt-10 border-t border-white/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">03</span>
              <span>{isKo ? '작품 구성 및 기대효과' : 'STATS & OUTCOMES'}</span>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-white/20 p-4 bg-white/[0.02]">
                <span className="text-xs font-mono text-[#8C8C8C] block uppercase tracking-wider">
                  {isKo ? '총 작품수 (WORK COUNT)' : 'TOTAL WORKS'}
                </span>
                <div className="text-3xl font-black text-white mt-1">
                  55<span className="text-sm font-normal text-[#8C8C8C] ml-1">{isKo ? '점' : 'works'}</span>
                </div>
                <div className="text-xs font-mono text-white/60 mt-1">
                  {isKo ? '존치(미디어 포함) 6점 · 임시 49점' : 'Permanent 6 · Temporary 49'}
                </div>
              </div>

              <div className="border border-white/20 p-4 bg-white/[0.02]">
                <span className="text-xs font-mono text-[#8C8C8C] block uppercase tracking-wider">
                  {isKo ? '참여 작가 (ARTISTS)' : 'PARTICIPATING ARTISTS'}
                </span>
                <div className="text-3xl font-black text-white mt-1">
                  41<span className="text-sm font-normal text-[#8C8C8C] ml-1">{isKo ? '팀/명' : 'teams'}</span>
                </div>
                <div className="text-xs font-mono text-white/60 mt-1">
                  {isKo ? '총 4개국 · 안양 지역 작가 7명' : '4 Countries · 7 Local Artists'}
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-sm font-bold text-white tracking-wider uppercase">
                {isKo ? '■ 주요 기대효과 (EXPECTED OUTCOMES)' : '■ EXPECTED OUTCOMES'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#B9B9B9] font-light">
                {[
                  isKo ? '2005년부터 이어온 국내 대표 공공예술 프로젝트의 위상 강화' : 'Strengthening reputation of Korea’s premier public art triennial since 2005',
                  isKo ? '기존 APAP 작품 재정비와 신규 설치를 통한 문화자산 가치 제고' : 'Enhancing cultural asset value through restoration and new commissions',
                  isKo ? '시민과 국내외 예술가의 참여 확대를 통한 시민 체감형 공공예술 실현' : 'Realizing citizen-centered art through expanded engagement',
                  isKo ? '회화·조각부터 미디어·레이저아트까지 다양한 장르를 아우르는 브랜드 확장' : 'Broadening APAP brand across painting, sculpture, and media art',
                  isKo ? '중앙언론·외신 홍보 및 KBS 다큐 방영을 통한 국제행사 인지도 제고' : 'Raising international profile via KBS nationwide documentary',
                  isKo ? '안양예술공원을 중심으로 문화관광 활성화 및 문화향유 기회 확대' : 'Revitalizing cultural tourism and everyday artistic engagement',
                ].map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-white/[0.02] border border-white/10 p-3">
                    <span className="font-mono text-white font-bold text-xs flex-shrink-0 mt-0.5">0{idx + 1}.</span>
                    <span className="leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}
