import React from 'react';
import Link from 'next/link';
import { Calendar, User, FileText, LayoutGrid } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
    edition: string;
  }>;
}

interface ArchiveEdition {
  num: number;
  year: string;
  theme: { ko: string; en: string };
  desc: { ko: string; en: string };
  artists: string[];
  artworks: string[];
  programs: string[];
  resources: string[];
}

const archiveData: Record<string, ArchiveEdition> = {
  '1': {
    num: 1,
    year: '2005',
    theme: { ko: '안양유원지의 재발견', en: 'Re-inventing Anyang Art Park' },
    desc: {
      ko: '안양예술공원(구 안양유원지)을 중심으로 낙후된 계곡을 공공예술의 거점으로 변모시킨 역사적인 첫 출발.',
      en: 'The historical debut that transformed a decaying theme park valley into Anyang Art Park, a major public art hub.',
    },
    artists: ['Álvaro Siza', 'Minsuk Cho', 'Didier Fiúza Faustino', 'Kengo Kuma'],
    artworks: ['Anyang Pavilion', 'Open School', 'One-Stop Service Center', 'Paper Snake'],
    programs: ['Opening Symposia', 'Docent Training Program'],
    resources: ['APAP 2005 Official Catalog (PDF)', 'Anyang Art Park Masterplan (PDF)'],
  },
  '7': {
    num: 7,
    year: '2023',
    theme: { ko: '공생의 도시', en: 'City of Coexistence' },
    desc: {
      ko: '코로나 이후 회복과 공존을 주제로 다양한 매체의 예술가들이 참여한 회차.',
      en: 'Artists from diverse mediums explored recovery and coexistence in the post-pandemic era.',
    },
    artists: ['Artist A', 'Artist B', 'Artist C', 'Artist D'],
    artworks: ['Coexistence Tower', 'Eco Soundscape', 'Pyeongchon Pavilion'],
    programs: ['Eco Walk Tour', 'Coexistence Forum'],
    resources: ['APAP 7 White Paper (PDF)', 'Artist Interview Logs (ZIP)'],
  },
  '8': {
    num: 8,
    year: '2026',
    theme: { ko: '디지털 무릉도원', en: 'Digital Peach Blossom Spring' },
    desc: {
      ko: '인공지능과 메타버스의 공공적 가능성을 탐색하며 안양 도심에 기계 지능의 흔적을 구현한 최신 회차.',
      en: 'Exploring the public possibilities of artificial intelligence and the metaverse, projecting machine intelligence on Anyang.',
    },
    artists: ['Artist A', 'Artist B', 'Artist C', 'Artist D', 'Artist E', 'Artist F', 'Artist G', 'Artist H'],
    artworks: ['The Learning Garden', 'Urban Memory Unit', 'Latent Plaza', 'A Thousand Voices'],
    programs: ['Opening Performance', 'Roundtable: AI & Art Ethics', 'Kids Robot Drawing Workshop'],
    resources: ['APAP 8 Official Guidebook (PDF)', 'Prisma Schema Export (SQL)', 'GA4 Stats Report (PDF)'],
  },
};

export default async function ArchiveEditionPage({ params }: PageProps) {
  const { locale, edition } = await params;
  
  // Default to edition 8 if not found in data
  const currentEdition = archiveData[edition] || archiveData['8'];
  const t = {
    ko: {
      title: `제 ${currentEdition.num}회 APAP 아카이브`,
      themeLabel: '주제',
      descLabel: '개요 및 소개',
      artists: '참여 작가',
      artworks: '출품작',
      programs: '프로그램',
      resources: '관련 자료실',
      switcherTitle: '다른 회차 아카이브 보기',
      switchBtn: '회',
    },
    en: {
      title: `APAP Edition ${currentEdition.num} Archive`,
      themeLabel: 'Theme',
      descLabel: 'Overview',
      artists: 'Artists',
      artworks: 'Artworks',
      programs: 'Programs',
      resources: 'Resources & Files',
      switcherTitle: 'Switch Edition Archive',
      switchBtn: 'Ed.',
    }
  }[locale === 'ko' ? 'ko' : 'en'];

  const allEditions = [1, 7, 8]; // Configured editions

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-12">
        
        {/* Header Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 font-mono uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" /> APAP {currentEdition.year}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              <span className="text-slate-400 mr-2">{t.themeLabel}:</span>
              {currentEdition.theme[locale === 'ko' ? 'ko' : 'en']}
            </p>
          </div>

          {/* Switcher widget */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full md:w-auto flex flex-col gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
              {t.switcherTitle}
            </span>
            <div className="flex gap-2">
              {allEditions.map((ed) => (
                <Link
                  key={ed}
                  href={`/${locale}/archive/${ed}`}
                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-colors ${
                    currentEdition.num === ed
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {ed}{t.switchBtn}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
          <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest font-bold">
            {t.descLabel}
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-light">
            {currentEdition.desc[locale === 'ko' ? 'ko' : 'en']}
          </p>
        </div>

        {/* 2x2 Grid of Contents */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Artists Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-base">{t.artists}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentEdition.artists.map((art, idx) => (
                <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                  {art}
                </span>
              ))}
            </div>
          </div>

          {/* Artworks Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-base">{t.artworks}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentEdition.artworks.map((aw, idx) => (
                <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                  {aw}
                </span>
              ))}
            </div>
          </div>

          {/* Programs Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-base">{t.programs}</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              {currentEdition.programs.map((pg, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                  <span>{pg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-800 text-base">{t.resources}</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              {currentEdition.resources.map((res, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-slate-50 pb-1.5 last:border-none">
                  <span className="font-medium text-slate-700">{res}</span>
                  <span className="text-[10px] text-blue-500 font-bold hover:underline cursor-pointer">DOWNLOAD</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
