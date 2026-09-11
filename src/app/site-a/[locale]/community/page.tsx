'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import SectionDetailModal from '@/components/site-a/SectionDetailModal';
import { getCommunityItems, CommunityItem } from '@/lib/community';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function CommunityPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale = ['ko', 'en'].includes(locale) ? locale : 'ko';
  const isKo = validLocale === 'ko';

  const [activeTab, setActiveTab] = useState<'all' | 'notice' | 'press'>('all');
  const [selectedNotice, setSelectedNotice] = useState<CommunityItem | null>(null);

  const items = getCommunityItems(validLocale);
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
          {filteredItems.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedNotice(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedNotice(item);
                }
              }}
              className="py-6 hover:bg-white/[0.03] px-4 -mx-4 transition-all space-y-2.5 cursor-pointer group rounded-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[10px] font-bold font-mono px-2 py-0.5 ${
                      item.type === 'press' ? 'bg-white text-black' : 'border border-white text-white'
                    }`}
                  >
                    {item.cat}
                  </span>
                  <span className="font-mono text-xs text-[#8C8C8C]">{item.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                  <span className="hidden sm:inline">{isKo ? '클릭하여 상세 보기' : 'VIEW DETAILS'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#B9B9B9] leading-relaxed font-light line-clamp-2">
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

      {/* Notice Detail Modal */}
      <SectionDetailModal
        isOpen={selectedNotice !== null}
        onClose={() => setSelectedNotice(null)}
        category={selectedNotice ? `${selectedNotice.cat} · ${selectedNotice.date}` : ''}
        title={selectedNotice?.title || ''}
      >
        {selectedNotice && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <span
                className={`text-xs font-bold font-mono px-2.5 py-0.5 ${
                  selectedNotice.type === 'press'
                    ? 'bg-white text-black'
                    : 'border border-white text-white'
                }`}
              >
                {selectedNotice.cat}
              </span>
              <span className="font-mono text-xs text-[#8C8C8C]">
                {selectedNotice.date}
              </span>
            </div>

            <div className="space-y-3.5 text-sm sm:text-base text-[#D4D4D4] leading-relaxed font-light">
              {selectedNotice.content.map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#8C8C8C]">
              <span>■ {isKo ? '문의: 안양문화예술재단 APAP 사업부 (031-687-0548)' : 'Inquiries: Anyang Foundation for Culture & Arts (031-687-0548)'}</span>
              <span className="text-white/60">APAP8 · BLACK & WHITE EDITION</span>
            </div>
          </div>
        )}
      </SectionDetailModal>

      <Footer locale={validLocale} />
    </div>
  );
}
