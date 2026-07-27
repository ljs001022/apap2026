import React from 'react';
import { Megaphone, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface NewsItem {
  id: string;
  cat: 'NOTICE' | 'PRESS';
  date: string;
  title: { ko: string; en: string };
  desc: { ko: string; en: string };
}

const newsData: NewsItem[] = [
  {
    id: 'news-01',
    cat: 'NOTICE',
    date: '2026-07-15',
    title: { ko: 'APAP 아카이브 서버 일시 점검 안내', en: 'Temporary Maintenance of APAP Archive Server' },
    desc: {
      ko: '더욱 원활한 서비스 제공을 위해 2026년 7월 20일 새벽 2시부터 6시까지 서버 정기 점검이 진행될 예정입니다.',
      en: 'Standard database backup will be conducted on July 20th, from 02:00 to 06:00 KST.',
    },
  },
  {
    id: 'news-02',
    cat: 'PRESS',
    date: '2026-05-30',
    title: { ko: '안양문화예술재단, 역대 APAP 작품 아카이브 전면 디지털화 완료', en: 'Anyang Foundation Completes Full Digitization of APAP Collection' },
    desc: {
      ko: '1회부터 7회까지의 안양공공예술프로젝트 출품작 및 도록 전량을 디지털 스키마 표준 규격으로 변환하여 온라인에 전면 공개합니다.',
      en: 'The complete records and catalogs of editions 1 through 7 are now officially accessible online in unified schema layouts.',
    },
  },
];

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;

  const t = {
    ko: {
      title: '공지 및 보도자료',
      subtitle: 'Archive News & Notices',
      noticeTab: '공지사항',
      pressTab: '보도자료',
      allTab: '전체',
      dateLabel: '작성일',
      readMore: '자세히 보기',
    },
    en: {
      title: 'Archive News & Press',
      subtitle: 'Archive News & Notices',
      noticeTab: 'Notices',
      pressTab: 'Press Releases',
      allTab: 'ALL',
      dateLabel: 'Date',
      readMore: 'Read More',
    }
  }[locale === 'ko' ? 'ko' : 'en'];

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
          <p className="text-sm font-mono text-blue-600 mt-1 uppercase tracking-wider">{t.subtitle}</p>
        </div>

        {/* News List */}
        <div className="space-y-4">
          {newsData.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row gap-4 items-start justify-between">
              <div className="space-y-2 flex-grow">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                    item.cat === 'NOTICE' 
                      ? 'bg-blue-50 text-blue-600 border-blue-200' 
                      : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  }`}>
                    {item.cat === 'NOTICE' ? t.noticeTab : t.pressTab}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> {item.date}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                  {item.title[locale === 'ko' ? 'ko' : 'en']}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {item.desc[locale === 'ko' ? 'ko' : 'en']}
                </p>
              </div>

              <button className="flex-shrink-0 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer py-1 self-end sm:self-center">
                {t.readMore} →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
