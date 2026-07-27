import React from 'react';
import { Search, Map, List, Eye } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface Artwork {
  id: string;
  title: { ko: string; en: string };
  artist: { ko: string; en: string };
  year: string;
  location: { ko: string; en: string };
  image: string;
}

const artworksData: Artwork[] = [
  {
    id: 'aw-01',
    title: { ko: '안양파빌리온', en: 'Anyang Pavilion' },
    artist: { ko: '알바로 시자', en: 'Álvaro Siza' },
    year: '2005',
    location: { ko: '안양예술공원', en: 'Anyang Art Park' },
    image: '/images/concept-b/88845ae5-620d-4323-bfb3-b459e0dd9754.jpg',
  },
  {
    id: 'aw-02',
    title: { ko: '학습하는 정원', en: 'The Learning Garden' },
    artist: { ko: '작가 A', en: 'Artist A' },
    year: '2026',
    location: { ko: '안양예술공원', en: 'Anyang Art Park' },
    image: '/images/concept-b/1510ccbd-1274-4ea2-a7c4-ab4c94a49036.jpg',
  },
  {
    id: 'aw-03',
    title: { ko: '도시의 기억 장치', en: 'Urban Memory Unit' },
    artist: { ko: '작가 B', en: 'Artist B' },
    year: '2026',
    location: { ko: '평촌중앙공원', en: 'Pyeongchon Central Park' },
    image: '/images/concept-b/f43e59c1-7592-41ed-8198-a436f0be1d54.jpg',
  },
];

export default async function WorksPage({ params }: PageProps) {
  const { locale } = await params;

  const t = {
    ko: {
      title: '작품 지도 및 검색',
      subtitle: 'Works & Map Search',
      searchPlaceholder: '작품명 또는 작가명으로 검색...',
      totalLabel: '건의 작품이 등록되어 있습니다.',
      filterAll: '전체',
      mapTab: '지도 보기',
      listTab: '리스트 보기',
      artistLabel: '작가',
      yearLabel: '제작 연도',
      locationLabel: '위치',
      viewDetail: '상세 정보',
    },
    en: {
      title: 'Artworks Map & Search',
      subtitle: 'Works & Map Search',
      searchPlaceholder: 'Search by artwork title or artist...',
      totalLabel: 'artworks registered.',
      filterAll: 'ALL',
      mapTab: 'Map View',
      listTab: 'List View',
      artistLabel: 'Artist',
      yearLabel: 'Year',
      locationLabel: 'Location',
      viewDetail: 'View Detail',
    }
  }[locale === 'ko' ? 'ko' : 'en'];

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
            <p className="text-sm font-mono text-blue-600 mt-1 uppercase tracking-wider">{t.subtitle}</p>
          </div>

          {/* View mode toggle buttons (pure visual) */}
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm self-start md:self-auto text-xs font-semibold text-slate-600">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <List className="w-3.5 h-3.5" /> {t.listTab}
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors">
              <Map className="w-3.5 h-3.5" /> {t.mapTab}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex items-center px-4">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full py-3.5 px-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        {/* Counter */}
        <p className="text-xs text-slate-500 font-mono">
          <span className="text-blue-600 font-bold">{artworksData.length}</span> {t.totalLabel}
        </p>

        {/* Artworks List Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworksData.map((art) => (
            <div key={art.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:border-blue-400 hover:shadow-md transition-all">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative border-b border-slate-100">
                <img
                  src={art.image}
                  alt={art.title[locale === 'ko' ? 'ko' : 'en']}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between gap-4 text-sm">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-800 text-base leading-snug truncate">
                    {art.title[locale === 'ko' ? 'ko' : 'en']}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    <span className="text-slate-400 mr-1.5">{t.artistLabel}:</span>
                    {art.artist[locale === 'ko' ? 'ko' : 'en']}
                  </p>
                </div>

                <div className="border-t border-slate-50 pt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{art.year}</span>
                  <span className="text-slate-400">·</span>
                  <span>{art.location[locale === 'ko' ? 'ko' : 'en']}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
