'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import { ArrowLeft, ArrowUpRight, MessageCircle, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function CommunityPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale = ['ko', 'en'].includes(locale) ? locale : 'ko';
  const isKo = validLocale === 'ko';

  const [activeTab, setActiveTab] = useState<'all' | 'notice' | 'press'>('all');

  const items = [
    {
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo ? 'APAP8 공식 홈페이지 오픈 및 참여 작가 공개' : 'APAP8 Official Website Launch & Artist Announcement',
      date: '2026.09.14',
      desc: isKo
        ? '제8회 안양공공예술프로젝트 공식 웹사이트가 정식 오픈되었습니다. 야외전시 및 특별기획전에 참여하는 총 21명 작가 정보와 주요 출품작을 확인하실 수 있습니다.'
        : 'The official platform for APAP8 has launched. Discover details on 21 participating artists across all venues.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      type: 'press',
      title: isKo ? '[보도자료] 제8회 안양공공예술프로젝트 개막 발표' : '[Press Release] The 8th Anyang Public Art Project Opens',
      date: '2026.09.14',
      desc: isKo
        ? '안양문화예술재단은 ‘ArteX : 예술대전환’을 주제로 3년 만에 개최되는 트리엔날레의 종합 프레스킷을 배포합니다.'
        : 'Anyang Foundation for Culture & Arts distributes the official press kit for the triennial.',
    },
    {
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo ? '개막 주간 퍼블릭 프로그램 및 도슨트 투어 신청 안내' : 'Opening Week Public Programs & Docent Tour Registration',
      date: '2026.09.07',
      desc: isKo
        ? '개막 국제 컨퍼런스 및 주말 정기 도슨트 투어 참여 접수가 시작됩니다. 전 프로그램은 시민 누구나 무료로 참여하실 수 있습니다.'
        : 'Registration opens for the international symposium and weekend guided tours. Free for all citizens.',
    },
    {
      cat: isKo ? '프레스' : 'Press',
      type: 'press',
      title: isKo ? '[보도자료] 김덕한 작가 APAP8 신작 조각 야외 설치 완료' : '[Press] Artist Kim Deok Han Installs New Outdoor Sculpture',
      date: '2026.08.30',
      desc: isKo
        ? '한국 현대미술의 대표 작가 김덕한의 대형 공공조각 <OVERLAID : 공존의 균형>이 안양예술공원 숲속 산책로에 성공적으로 안착했습니다.'
        : 'Kim Deok Han completes installation of his monumental sculpture in Anyang Art Park.',
    },
  ];

  const filteredItems = activeTab === 'all' ? items : items.filter((item) => item.type === activeTab);

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
        <div className="border-b border-white pb-6 mb-10 flex justify-between items-baseline">
          <div>
            <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-widest uppercase">
              {isKo ? '공지사항 및 언론 보도' : 'NOTICE & PRESS RELEASES'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              {isKo ? '커뮤니티' : 'COMMUNITY'}
            </h1>
          </div>
          <span
            className="font-mono font-black text-5xl sm:text-7xl text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
          >
            04
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 font-mono text-xs font-bold mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 border transition-colors cursor-pointer ${
              activeTab === 'all' ? 'bg-white text-black border-white' : 'border-white/20 text-white/60 hover:text-white'
            }`}
          >
            {isKo ? '전체' : 'ALL'}
          </button>
          <button
            onClick={() => setActiveTab('notice')}
            className={`px-4 py-2 border transition-colors cursor-pointer ${
              activeTab === 'notice' ? 'bg-white text-black border-white' : 'border-white/20 text-white/60 hover:text-white'
            }`}
          >
            {isKo ? '공지사항' : 'NOTICE'}
          </button>
          <button
            onClick={() => setActiveTab('press')}
            className={`px-4 py-2 border transition-colors cursor-pointer ${
              activeTab === 'press' ? 'bg-white text-black border-white' : 'border-white/20 text-white/60 hover:text-white'
            }`}
          >
            {isKo ? '보도자료' : 'PRESS'}
          </button>
        </div>

        {/* Notice & Press Articles List */}
        <div className="divide-y divide-white/15 border-y border-white/20 mb-16">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="py-6 hover:bg-white/[0.02] px-3 -mx-3 transition-colors space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 ${
                    item.type === 'press' ? 'bg-white text-black' : 'border border-white text-white'
                  }`}>
                    {item.cat}
                  </span>
                  <span className="font-mono text-xs text-[#8C8C8C]">{item.date}</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#B9B9B9] leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Inquiry Card */}
        <div className="bg-white/[0.03] border border-white/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-white" />
              <span>{isKo ? '실시간 문의 및 안내' : 'Direct Inquiry & Q&A'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#B9B9B9] leading-relaxed max-w-xl">
              {isKo
                ? 'APAP8 관람, 도슨트 투어, 프레스 취재 문의는 카카오톡 공식 채널을 통해 가장 빠르게 답변 받으실 수 있습니다.'
                : 'For visitor assistance, docent reservations, or press queries, please connect through our official channel.'}
            </p>
          </div>

          <a
            href="https://pf.kakao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white hover:bg-white hover:text-black transition-colors font-mono font-bold text-xs px-6 py-3 flex items-center gap-2 flex-shrink-0"
          >
            <span>{isKo ? '카카오톡 채널 바로가기' : 'KAKAO TALK CHANNEL'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}