import React from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function SiteAPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col space-y-16 pb-20">
      {/* Hero Visual Section */}
      <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-900 opacity-90" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

        <div className="container mx-auto px-4 relative z-10 text-center space-y-6 max-w-4xl">
          <span className="text-xs md:text-sm font-semibold tracking-widest text-blue-400 uppercase">
            {locale === 'ko' ? '안양공공예술프로젝트 아카이브' : 'Anyang Public Art Project Archive'}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {locale === 'ko' ? (
              <>공공예술로 호흡하는 <br className="md:hidden" />안양의 모든 역사</>
            ) : (
              <>The Complete History of <br />Public Art in Anyang</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {locale === 'ko' ? (
              '1회부터 8회까지, 안양 도심 전체를 미술관으로 만들어 낸 작가들과 작품들의 기록을 지금 확인해 보세요.'
            ) : (
              'Discover the collection of public artworks, exhibitions, and artists that have transformed Anyang since 2005.'
            )}
          </p>

          {/* Search Bar Placeholder */}
          <div className="max-w-xl mx-auto pt-4">
            <form className="relative flex items-center bg-white rounded-lg shadow-lg overflow-hidden p-1.5">
              <input
                type="text"
                placeholder={locale === 'ko' ? '작가, 작품 또는 회차 검색...' : 'Search artworks, artists, or editions...'}
                className="w-full px-4 py-3 text-slate-900 bg-transparent focus:outline-none text-sm md:text-base"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-sm md:text-base transition-colors"
              >
                {locale === 'ko' ? '검색' : 'Search'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* APAP 8th (Active Edition) Special Banner */}
      <section className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl overflow-hidden shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/30">
              {locale === 'ko' ? '진행 회차 안내' : 'Now Active'}
            </span>
            <h2 className="text-3xl font-bold tracking-tight">
              APAP 8 (2026) 비엔날레
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
              {locale === 'ko' ? (
                '‘디지털 무릉도원’을 테마로 펼쳐지는 8회 안양공공예술프로젝트. 미래지향적 가상 미디어아트와 자연이 조화를 이루는 현장으로 당신을 초대합니다.'
              ) : (
                'Under the theme of "Digital Peach Blossom Spring", the 8th APAP explores futuristic media art integrated with nature.'
              )}
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-4">
            <a
              href="/"
              className="bg-white hover:bg-slate-100 text-blue-900 font-bold px-6 py-3 rounded-lg text-center shadow-md transition-all text-sm"
            >
              {locale === 'ko' ? '공식 홈페이지 방문하기' : 'Visit Official Site'}
            </a>
            <Link
              href={`/${locale}/exhibitions/apap8`}
              className="bg-transparent hover:bg-white/10 text-white font-semibold border border-white/20 px-6 py-3 rounded-lg text-center transition-all text-sm"
            >
              {locale === 'ko' ? '전시 개요(요약)' : 'Exhibition Overview'}
            </Link>
          </div>
        </div>
      </section>

      {/* Archive Quick Navigation */}
      <section className="container mx-auto px-4 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {locale === 'ko' ? '역대 비엔날레 아카이브' : 'Past Editions'}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {locale === 'ko' ? '2005년 시작된 APAP의 모든 역사를 돌아봅니다.' : 'Browse the rich database of public art in Anyang.'}
            </p>
          </div>
          <Link
            href={`/${locale}/exhibitions`}
            className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            {locale === 'ko' ? '전체 보기 →' : 'View All →'}
          </Link>
        </div>

        {/* Edition Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[8, 7, 6, 5].map((num) => (
            <Link
              key={num}
              href={`/${locale}/exhibitions/apap${num}`}
              className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="h-44 bg-slate-100 flex items-center justify-between p-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute -right-10 -bottom-10 text-slate-200/50 text-9xl font-extrabold select-none transition-transform group-hover:scale-110">
                  {num}
                </div>
                <div className="space-y-1 relative z-10">
                  <span className="text-xs font-semibold text-blue-600 tracking-wider">APAP</span>
                  <h3 className="text-2xl font-black text-slate-800">{num}회 비엔날레</h3>
                  <p className="text-xs text-slate-500">
                    {num === 8 ? '2026' : num === 7 ? '2023' : num === 6 ? '2020' : '2016'}
                  </p>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between bg-white">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {num === 8
                    ? '디지털 무릉도원을 모티프로 메타버스와 현실을 오가는 신개념 미래지향적 전시'
                    : `${num}회 안양공공예술프로젝트 공식 아카이브. 참여 작가 프로필, 작품 위치, 도록 자료 등을 제공합니다.`}
                </p>
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 mt-4 inline-flex items-center gap-1">
                  {locale === 'ko' ? '아카이브 입장 →' : 'Enter Archive →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
