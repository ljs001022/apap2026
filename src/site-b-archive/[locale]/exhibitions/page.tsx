import React from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ExhibitionsPage({ params }: PageProps) {
  const { locale } = await params;

  const editions = [
    {
      num: 8,
      year: '2026',
      title: locale === 'ko' ? '디지털 무릉도원' : 'Digital Peach Blossom Spring',
      desc: locale === 'ko' 
        ? '미래지향적인 공공예술, 가상 미디어아트 및 조각상들이 자연과 함께 호흡하는 비엔날레' 
        : 'APAP 8th explores futuristic media art and digital sculptures set within nature.',
      isActive: true,
    },
    {
      num: 7,
      year: '2023',
      title: locale === 'ko' ? '안양 철학적 공간' : 'Philosophy of Space',
      desc: locale === 'ko'
        ? '도시 공간의 철학적 가치와 공공예술의 역할을 재조명하며 시민 주도형 프로젝트 전개'
        : 'Revisiting the philosophical value of urban space and citizen-led arts.',
      isActive: false,
    },
    {
      num: 6,
      year: '2020',
      title: locale === 'ko' ? '공생도시' : 'Symbiotic City',
      desc: locale === 'ko'
        ? '기후 변화와 팬데믹 시대, 인간과 자연, 도시 공동체가 함께 공존하는 방식 탐구'
        : 'Exploring the co-existence of humans, nature, and urban communities.',
      isActive: false,
    },
    {
      num: 5,
      year: '2016',
      title: locale === 'ko' ? '상점가 예술' : 'Art in Shops',
      desc: locale === 'ko'
        ? '일상의 공간인 상점가와 공원을 연계하여 예술이 대중 속으로 깊이 침투한 프로젝트'
        : 'Connecting daily shopping districts with public art installations.',
      isActive: false,
    },
    {
      num: 4,
      year: '2013',
      title: locale === 'ko' ? '움직이는 공공예술' : 'Public Art on the Move',
      desc: locale === 'ko'
        ? '정적인 조형물을 넘어 움직이는 파빌리온과 참여형 프로그램 중심의 공공예술 실험'
        : 'Experiencing movable pavilions and participatory public installations.',
      isActive: false,
    },
    {
      num: 3,
      year: '2010',
      title: locale === 'ko' ? '새로운 안양 예술공원' : 'A New Anyang Art Park',
      desc: locale === 'ko'
        ? '안양 예술공원을 중심으로 조각, 건축, 환경예술의 유기적 결합을 선보인 아카이빙 허브'
        : 'Focusing on the architectural and environmental art in Anyang Art Park.',
      isActive: false,
    },
    {
      num: 2,
      year: '2007',
      title: locale === 'ko' ? '평촌의 재발견' : 'Rediscovery of Pyeongchon',
      desc: locale === 'ko'
        ? '신도시 평촌 일대의 공간을 미술을 통해 공감의 현장으로 바꾼 도시 예술 탐험'
        : 'Exploring Pyeongchon New Town space through creative public art projects.',
      isActive: false,
    },
    {
      num: 1,
      year: '2005',
      title: locale === 'ko' ? '안양의 출발' : 'The Genesis of Anyang Public Art',
      desc: locale === 'ko'
        ? '대한민국 최초의 대규모 국제 공공예술 프로젝트 시작 및 안양예술공원 인프라 조성'
        : 'Korea’s first large-scale international public art project.',
      isActive: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {locale === 'ko' ? 'APAP 역대 회차' : 'APAP Editions'}
        </h1>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed">
          {locale === 'ko'
            ? '2005년 1회 안양공공예술프로젝트부터 시작하여 2026년 8회 비엔날레까지 안양의 역동적 흐름을 확인하실 수 있습니다.'
            : 'Explore the legacy of APAP since its inaugural exhibition in 2005.'}
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-4xl mx-auto relative border-l-2 border-slate-200 pl-6 md:pl-10 ml-4 md:ml-8 space-y-12 py-4">
        {editions.map((ed) => (
          <div key={ed.num} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all ${
              ed.isActive 
                ? 'bg-blue-600 ring-4 ring-blue-100 scale-125' 
                : 'bg-slate-300 group-hover:bg-blue-500 group-hover:scale-115'
            }`} />

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md p-6 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    APAP {ed.num}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{ed.year}년</span>
                  {ed.isActive && (
                    <span className="bg-green-500/10 text-green-700 border border-green-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {locale === 'ko' ? '진행 중' : 'Active'}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {ed.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 max-w-xl leading-relaxed">
                  {ed.desc}
                </p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                {ed.num === 8 ? (
                  <a
                    href="/"
                    className="flex-grow md:flex-grow-0 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
                  >
                    {locale === 'ko' ? '8회 공식 홈 가기' : 'Visit 8th Site'}
                  </a>
                ) : (
                  <Link
                    href={`/${locale}/exhibitions/apap${ed.num}`}
                    className="flex-grow md:flex-grow-0 text-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
                  >
                    {locale === 'ko' ? '아카이브 보기' : 'Explore Archive'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
