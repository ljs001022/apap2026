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
                  ? '제8회 안양공공예술프로젝트(APAP8)는 "Arte X : 예술 대전환_안양 무릉도원"을 주제로 하여 진행됩니다. 안양은 안양천과 그 지천을 중심으로 하여 도시와 자연의 공존이 현실화한 공간입니다. 이번 프로젝트는 이러한 안양의 지역적 특성을 살려 예술을 통해 무릉도원을 재해석하고자 합니다. 야외 조각과 설치, 회화와 미디어아트 등 장르 간 경계를 확장하는 다양한 작품을 통해, 시민과 함께 호흡하며 일상 속에 자연스럽게 스며드는 예술 축제의 장을 펼쳐 보일 예정입니다.'
                  : 'The 8th Anyang Public Art Project (APAP8) unfolds under the theme "Arte X : Art Transformation_Anyang Peach Blossom Spring." Anyang is a space where urban living and nature coexist along the Anyang Stream and its tributaries. Reinterpreting paradise through art, APAP8 expands boundaries across sculpture, installation, painting, and media art to create an art festival naturally woven into everyday life.'}
              </p>
              <p>
                {isKo
                  ? '진정한 무릉도원은 특정한 물리적 시공간을 의미하는 것은 아닐 것입니다. 심신의 피로를 달래고, 고단한 삶의 무게를 잠시나마 내려놓을 수 있는 순간이 온다면 바로 그 순간 각자가 있는 그곳이 무릉도원이 될 수 있습니다. APAP8은 예술을 통해 각자의 무릉도원을 만들어 보고자 합니다. 퇴근길에 잠시 들린 전시장, 가족과 산책 중 우연히 마주친 야외 조각과 미디어 아트가 우리의 마음을 움직이고, 바쁜 삶 속에서 잠시 잊었던 감각을 깨울 수 있다면 예술은 공공의 영역에서 사회적 역할을 충실히 하는 것이라고 말할 수 있을 것입니다. 안양시가 예술로 펼쳐 놓은 축제의 장, 《Arte X : 예술 대전환_안양 무릉도원》은 안양 시민뿐 아니라, 무릉도원을 찾는 모든 이들을 환영합니다.'
                  : 'A true paradise is not confined to a specific physical time or place. Whenever one can soothe weariness and set down life’s burdens, that very place becomes a paradise. If an exhibition visited on the commute home or an outdoor sculpture and media artwork encountered while strolling can move our hearts and awaken forgotten senses, art fulfills its vital social role in the public realm. The festive haven presented by Anyang City, "Arte X : Art Transformation_Anyang Peach Blossom Spring," warmly welcomes citizens and all who journey to discover paradise.'}
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
