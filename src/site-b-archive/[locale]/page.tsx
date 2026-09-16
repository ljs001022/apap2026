import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, MapPin, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface Edition {
  num: number;
  year: string;
  theme: { ko: string; en: string };
  desc: { ko: string; en: string };
  artworkCount: number;
  artistCount: number;
}

const editions: Edition[] = [
  {
    num: 8,
    year: '2026',
    theme: { ko: '디지털 무릉도원', en: 'Digital Peach Blossom Spring' },
    desc: {
      ko: '메타버스와 현실의 경계를 허물며 미래지향적 공공예술을 선보이는 최신 회차.',
      en: 'The latest edition dissolving the boundary between the metaverse and reality through futuristic public art.',
    },
    artworkCount: 48,
    artistCount: 24,
  },
  {
    num: 7,
    year: '2023',
    theme: { ko: '공생의 도시', en: 'City of Coexistence' },
    desc: {
      ko: '코로나 이후 회복과 공존을 주제로 다양한 매체의 예술가들이 참여한 회차.',
      en: 'Artists from diverse mediums explored recovery and coexistence in the post-pandemic era.',
    },
    artworkCount: 52,
    artistCount: 29,
  },
  {
    num: 6,
    year: '2020',
    theme: { ko: '안양: 기억의 건축', en: 'Anyang: Architecture of Memory' },
    desc: {
      ko: '도시의 기억과 장소성을 기록하고 재해석하는 작업들로 구성된 회차.',
      en: 'Works documenting and reinterpreting the memory and sense of place embedded in the city.',
    },
    artworkCount: 41,
    artistCount: 22,
  },
  {
    num: 5,
    year: '2016',
    theme: { ko: '생태, 유희, 지역 커뮤니티', en: 'Ecology, Play & Community' },
    desc: {
      ko: '자연 생태계와 지역 커뮤니티의 연결을 탐구한 회차. 참여형 작품이 다수 포함.',
      en: 'Exploring connections between natural ecosystems and local communities, with many participatory works.',
    },
    artworkCount: 38,
    artistCount: 19,
  },
];

export default async function SiteAPage({ params }: PageProps) {
  const { locale } = await params;

  // JSX helpers for controlled line breaks:
  // <br className="sm:hidden" /> = breaks only on mobile, invisible on sm+
  const heroTitle = locale === 'ko' ? (
    <>공공예술로 호흡하는<br className="sm:hidden" />{' '}안양의 모든 역사</>
  ) : (
    <>The Complete History<br className="sm:hidden" />{' '}of Public Art in Anyang</>
  );

  const heroDesc = locale === 'ko' ? (
    <>1회부터 8회까지, 안양 도심 전체를<br className="sm:hidden" />{' '}미술관으로 만들어 낸 작가들과 작품들의<br className="sm:hidden" />{' '}기록을 지금 확인해 보세요.</>
  ) : (
    <>Discover the collection of public artworks,<br className="sm:hidden" />{' '}exhibitions, and artists that have transformed<br className="sm:hidden" />{' '}Anyang since 2005.</>
  );

  return (
    <div className="flex flex-col">

      {/* ─── Hero ─── */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-28 md:py-36 overflow-hidden">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 opacity-95" />
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        {/* Blue glow */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-700/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-6 relative z-10 text-center space-y-6 sm:space-y-8 max-w-5xl">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
            {locale === 'ko' ? '안양공공예술프로젝트 아카이브' : 'Anyang Public Art Project Archive'}
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight whitespace-normal">
            {heroTitle}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed break-keep">
            {heroDesc}
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto pt-2">
            <form className="relative flex items-center bg-white rounded-xl shadow-xl overflow-hidden p-1.5 sm:p-2">
              <input
                type="text"
                placeholder={locale === 'ko' ? '작가, 작품 또는 회차 검색...' : 'Search artworks, artists, or editions...'}
                className="w-full px-4 py-2.5 sm:py-3 text-slate-800 bg-transparent focus:outline-none text-sm sm:text-base placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm transition-all"
              >
                {locale === 'ko' ? '검색' : 'Search'}
              </button>
            </form>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 pt-2 text-slate-400 text-xs sm:text-sm">
            {[
              { label: locale === 'ko' ? '총 회차' : 'Editions', value: '8' },
              { label: locale === 'ko' ? '참여 작가' : 'Artists', value: '180+' },
              { label: locale === 'ko' ? '총 작품' : 'Artworks', value: '350+' },
              { label: locale === 'ko' ? '운영 연수' : 'Years', value: '21' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APAP8 Active Banner ─── */}
      <section className="container mx-auto px-5 sm:px-6 py-8 sm:py-10">
        <div className="relative bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl p-6 sm:p-8 md:p-12">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-400/30">
                {locale === 'ko' ? '현재 진행 중' : 'Now Active'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {locale === 'ko' ? (
                  <>APAP 8 (2026) —<br className="sm:hidden" />{' '}제8회 안양공공예술프로젝트</>
                ) : (
                  <>APAP 8 (2026) —<br className="sm:hidden" />{' '}8th Anyang Public Art Project</>
                )}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {locale === 'ko' ? (
                  <>'디지털 무릉도원'을 테마로 펼쳐지는<br className="sm:hidden" />{' '}8회 안양공공예술프로젝트.<br className="sm:hidden" />{' '}미래지향적 가상 미디어아트와 자연이<br className="sm:hidden" />{' '}조화를 이루는 현장으로 당신을 초대합니다.</>
                ) : (
                  <>Under the theme of &ldquo;Digital Peach Blossom Spring&rdquo;,<br className="sm:hidden" />{' '}the 8th APAP explores futuristic media art<br className="sm:hidden" />{' '}integrated with nature.</>
                )}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  2026.09.12 – 2026.11.30
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {locale === 'ko' ? '안양예술공원 일대' : 'Anyang Art Park Area'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
              <a
                href="/"
                className="flex items-center justify-center gap-1.5 bg-white hover:bg-blue-50 active:scale-95 text-blue-900 font-bold px-5 py-3 rounded-xl text-center shadow-md transition-all text-sm group"
              >
                {locale === 'ko' ? '공식 홈페이지' : 'Official Site'}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Link
                href={`/${locale}/exhibitions/apap8`}
                className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold border border-white/20 px-5 py-3 rounded-xl text-center transition-all text-sm"
              >
                {locale === 'ko' ? '전시 개요' : 'Exhibition Overview'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Edition Archive Grid ─── */}
      <section className="container mx-auto px-5 sm:px-6 pb-16 sm:pb-20 space-y-6 sm:space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {locale === 'ko' ? '역대 아카이브' : 'Past Editions'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {locale === 'ko' ? '2005년 시작된 APAP의 모든 역사를 돌아봅니다.' : 'Browse the full database of public art in Anyang.'}
            </p>
          </div>
          <Link
            href={`/${locale}/exhibitions`}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group"
          >
            {locale === 'ko' ? '전체 보기' : 'View All'}
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {editions.map((ed) => (
            <Link
              key={ed.num}
              href={`/${locale}/exhibitions/apap${ed.num}`}
              className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card header with large edition number */}
              <div className={`relative h-36 sm:h-40 flex items-end p-5 overflow-hidden ${ed.num === 8 ? 'bg-gradient-to-br from-blue-900 to-indigo-950' : 'bg-gradient-to-br from-slate-800 to-slate-900'}`}>
                {/* Giant watermark number */}
                <span className="absolute -right-3 -bottom-3 text-[7rem] font-black text-white/5 select-none leading-none transition-transform duration-500 group-hover:scale-110 group-hover:text-white/10">
                  {ed.num}
                </span>

                {ed.num === 8 && (
                  <span className="absolute top-4 right-4 text-[9px] font-bold text-blue-300 bg-blue-500/20 border border-blue-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {locale === 'ko' ? '진행 중' : 'Active'}
                  </span>
                )}

                <div className="relative z-10 space-y-0.5">
                  <p className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">APAP {ed.num}</p>
                  <p className="text-lg font-black text-white leading-tight break-keep">
                    {locale === 'ko' ? ed.theme.ko : ed.theme.en}
                  </p>
                  <p className="text-xs text-slate-400">{ed.year}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 break-keep flex-1">
                  {locale === 'ko' ? ed.desc.ko : ed.desc.en}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-blue-400" />
                    {ed.artworkCount} {locale === 'ko' ? '작품' : 'works'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 inline-flex items-center justify-center text-blue-400 font-bold">A</span>
                    {ed.artistCount} {locale === 'ko' ? '작가' : 'artists'}
                  </span>
                </div>

                <span className="flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:gap-2 transition-all">
                  {locale === 'ko' ? '아카이브 입장' : 'Enter Archive'}
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Load older editions CTA */}
        <div className="text-center pt-4">
          <Link
            href={`/${locale}/exhibitions`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-6 py-3 rounded-xl transition-all hover:bg-blue-50 active:scale-95"
          >
            {locale === 'ko' ? '1~4회 더 보기' : 'View editions 1–4'}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
