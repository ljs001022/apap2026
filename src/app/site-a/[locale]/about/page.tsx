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
                  ? "제8회 안양공공예술프로젝트(APAP8)는 2005년부터 이어저 온 국내유일의 공공예술트리엔날레의  여덟 번째 행사입니다. 지난 20여 년간 축적된 APAP의 문화자산을 재맥락화하고, '예술의 지속성'과 '시민과의 재연결'을 통해 지역사회 예술 기반을 확대하고자 합니다."
                  : "The 8th Anyang Public Art Project (APAP8) marks the eighth edition of Korea’s premier public art triennial, held continuously since 2005. Recontextualizing cultural assets accumulated over 20 years, APAP8 expands the artistic foundation of the local community through 'artistic sustainability' and 'reconnecting with citizens.'"}
              </p>
              <p>
                {isKo
                  ? '안양예술공원 일대와 안양파빌리온을 중심으로, 국내외 참여작가 및 시민·지역예술인 등 총 4개국 41인/팀 내외가 함께합니다.'
                  : 'Centering on Anyang Art Park and Anyang Pavilion, approximately 41 artists and teams from 4 countries—including international artists, citizens, and local creators—collaborate to shape this triennial.'}
              </p>
            </div>

            {/* Facts Box */}
            <div className="bg-white/[0.03] border border-white/15 p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-mono">
              <div>
                <span className="text-[#8C8C8C] block text-[11px]">{isKo ? '■ 전시기간' : '■ EXHIBITION PERIOD'}</span>
                <span className="text-white font-medium">{isKo ? '2026.9.30. ~ 11.29.' : 'Sept 30 – Nov 29, 2026'}</span>
              </div>
              <div>
                <span className="text-[#8C8C8C] block text-[11px]">{isKo ? '■ 개막식' : '■ OPENING CEREMONY'}</span>
                <span className="text-white font-medium">{isKo ? '2026.9.30.(수) 18:00 (안양파빌리온 앞 벽천광장)' : 'Sept 30, 2026 (Wed) 18:00 (Cascade Square)'}</span>
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

            {/* Director's Message Quote Block */}
            <div className="border-l-2 border-white/40 pl-5 py-4 bg-white/[0.02] space-y-2 mt-4">
              <span className="font-mono text-xs text-[#8C8C8C] font-bold tracking-wider uppercase block">
                {isKo ? '■ 예술감독의 글 — 박철희' : '■ DIRECTOR’S MESSAGE — PARK CHUL-HEE'}
              </span>
              <p className="text-sm sm:text-base text-[#D4D4D4] font-light leading-relaxed italic">
                {isKo
                  ? '“진정한 무릉도원은 특정한 물리적 시공간을 의미하는 것은 아닐 것입니다. 심신의 피로를 달래고 고단한 삶의 무게를 잠시나마 내려놓을 수 있는 순간이 온다면 바로 그 순간 각자가 있는 그곳이 무릉도원이 될 수 있습니다. APAP8은 예술을 통해 각자의 무릉도원을 만들어 보고자 합니다.”'
                  : '“A true paradise is not confined to a specific time or place. Whenever one can relieve weary burdens and awaken forgotten senses, that place becomes a paradise. APAP8 seeks to cultivate this shared haven through art.”'}
              </p>
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

          {/* Block 3: Credits (예술감독 및 참여작가) */}
          <section className="space-y-6 pt-10 border-t border-white/20">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider border-b border-white/10 pb-2">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">03</span>
              <span>{isKo ? '크레딧' : 'CREDITS'}</span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white">
                {isKo ? '예술감독 및 참여작가 리스트' : 'Artistic Director & Participating Artists'}
              </h3>
              <div className="font-mono text-sm text-[#8C8C8C] font-semibold mt-1">
                {isKo ? '제8회 안양공공예술프로젝트 총괄 크레딧' : 'The 8th Anyang Public Art Project Credits'}
              </div>
            </div>

            {/* Artistic Director Box */}
            <div className="border border-white/25 p-6 bg-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#8C8C8C] uppercase tracking-wider block">
                  ■ {isKo ? '예술감독' : 'ARTISTIC DIRECTOR'}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {isKo ? '박철희' : 'Park Chul-hee'}
                </div>
              </div>
              <div className="text-xs sm:text-sm font-mono text-[#B9B9B9] max-w-md">
                {isKo
                  ? '제8회 안양공공예술프로젝트(APAP8) 총괄 기획 및 예술감독'
                  : 'Artistic Director, The 8th Anyang Public Art Project (APAP8)'}
              </div>
            </div>

            {/* Participating Artists (31) */}
            <div className="border border-white/20 p-6 bg-white/[0.02] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-mono text-sm text-white font-bold">
                  ■ {isKo ? '참여작가 (31인/팀)' : 'PARTICIPATING ARTISTS (31)'}
                </span>
                <span className="font-mono text-xs text-[#8C8C8C]">가나다순 / Alphabetical</span>
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
                    className="text-xs sm:text-sm font-mono border border-white/20 text-white/90 px-3.5 py-1.5 bg-white/5 hover:border-white transition-colors"
                  >
                    {artist}
                  </span>
                ))}
              </div>
            </div>

            {/* Competition Winners (10) */}
            <div className="border border-white/15 p-6 bg-white/[0.01] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-mono text-sm text-[#B9B9B9] font-bold">
                  ■ {isKo ? 'APAP8 미디어아트 작품 공모 당선 작가 (10팀)' : 'MEDIA ART COMPETITION WINNERS (10)'}
                </span>
                <span className="font-mono text-xs text-[#8C8C8C]">신진·미디어 작가전</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '김남표(글램포지)', '김리아', '박선재(팝시클)', '박은영', '이어진',
                  '이창기', '임도원', '임주원', '진진아', 'Hyp-파장(소수정x서재은)'
                ].map((artist) => (
                  <span
                    key={artist}
                    className="text-xs sm:text-sm font-mono border border-white/10 text-white/70 px-3 py-1 bg-white/[0.02]"
                  >
                    {artist}
                  </span>
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
