'use client';

import React from 'react';
import Image from 'next/image';
import { Download, ExternalLink, FileText, ArrowDownToLine } from 'lucide-react';
import { CommunityItem } from '@/lib/community';

interface NoticeModalContentProps {
  item: CommunityItem;
  isKo: boolean;
}

export default function NoticeModalContent({ item, isKo }: NoticeModalContentProps) {
  return (
    <div className="space-y-6">
      {/* Top Meta Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span
            className={`text-[11px] font-bold font-mono px-2.5 py-0.5 ${
              item.cat === '보도자료' || item.cat === 'Press' || item.type === 'press'
                ? 'bg-white text-black'
                : 'border border-white text-white'
            }`}
          >
            {item.cat}
          </span>
          <span className="font-mono text-xs text-[#8C8C8C]">{item.date}</span>
        </div>

        {item.pdfUrl && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/90 bg-white/10 px-2.5 py-1 border border-white/20">
            <ArrowDownToLine className="w-3.5 h-3.5 text-white" />
            <span>
              {item.previewType === 'download_only'
                ? (isKo ? `리플렛 다운로드 (${item.pdfSize})` : `LEAFLET (${item.pdfSize})`)
                : (isKo ? `PDF 첨부 (${item.pdfSize})` : `PDF (${item.pdfSize})`)}
            </span>
          </div>
        )}
      </div>

      {/* Main Notice Paragraphs with Structured Box for bullet lists */}
      <div className="space-y-3.5 text-sm sm:text-base text-[#D4D4D4] leading-relaxed font-light">
        {item.content.map((paragraph, idx) => {
          const isStructuredBox = paragraph.includes('• ') || paragraph.startsWith('[');

          if (isStructuredBox) {
            return (
              <div
                key={idx}
                className="border border-white/15 bg-white/[0.02] p-4 sm:p-5 rounded space-y-2 font-mono text-xs sm:text-sm text-white/90"
              >
                {paragraph.split('\n').map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className={
                      line.startsWith('[')
                        ? 'font-bold text-white text-xs sm:text-sm tracking-wider pb-1'
                        : line.startsWith('•')
                        ? 'leading-relaxed text-[#D4D4D4] pl-1'
                        : 'leading-relaxed text-[#B9B9B9]'
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            );
          }

          return (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* ── Case 1: Key Visual Preview (Image visual inside modal + PDF download) ── */}
      {item.previewType === 'image' && item.previewImage && (
        <div className="pt-2 space-y-3.5 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-[#8C8C8C]">
            <span className="font-bold text-white/90">■ {isKo ? '메인 키비주얼 포스터 (A2)' : 'MAIN KEY VISUAL POSTER'}</span>
            <span className="text-[11px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5">
              {item.pdfSize}
            </span>
          </div>

          <a
            href={item.previewImage}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black border border-white/20 rounded overflow-hidden group cursor-zoom-in"
            title={isKo ? '클릭하여 큰 이미지로 보기' : 'Click to view full image'}
          >
            <Image
              src={item.previewImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur text-[10px] font-mono text-white/80 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              <span>{isKo ? '이미지 원본' : 'Full Image'}</span>
            </div>
          </a>

          {item.pdfUrl && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[42px] px-4 py-2 border border-white/30 hover:border-white hover:bg-white hover:text-black text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isKo ? '새 창에서 원본 보기' : 'VIEW ORIGINAL'}</span>
              </a>
              <a
                href={item.pdfUrl}
                download={item.pdfDownloadName || 'APAP8_포스터.pdf'}
                className="min-h-[42px] px-5 py-2 bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isKo ? `포스터 다운로드 (${item.pdfSize || 'PDF'})` : 'DOWNLOAD'}</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* ── Case 2: Leaflet Download Card (Direct Download Emphasis) ── */}
      {item.previewType === 'download_only' && item.pdfUrl && (
        <div className="pt-2 border-t border-white/10">
          <div className="border border-white/25 bg-white/[0.03] hover:border-white/40 transition-colors p-5 sm:p-6 rounded space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 border border-white/30 bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {isKo ? '제8회 안양공공예술프로젝트(APAP8) 공식 리플렛' : 'APAP8 Official Exhibition Leaflet'}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8C8C8C]">
                  <span>{isKo ? '형식: PDF (전시·프로그램 종합 안내)' : 'Format: PDF'}</span>
                  <span>·</span>
                  <span className="text-white font-bold">{isKo ? `용량: ${item.pdfSize}` : `Size: ${item.pdfSize}`}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href={item.pdfUrl}
                download={item.pdfDownloadName || 'APAP8_공식_리플렛.pdf'}
                className="min-h-[44px] flex-1 px-5 py-3 bg-white text-black font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all cursor-pointer text-center"
              >
                <Download className="w-4 h-4" />
                <span>{isKo ? `리플렛 다운로드 (${item.pdfSize})` : `DOWNLOAD LEAFLET (${item.pdfSize})`}</span>
              </a>
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 py-3 border border-white/30 hover:border-white hover:bg-white hover:text-black text-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{isKo ? '새 창에서 열기' : 'OPEN IN NEW TAB'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Case 3: PDF In-Modal Preview (Key Visual Poster or Invitation) ── */}
      {item.previewType === 'pdf' && item.pdfUrl && (
        <div className="pt-2 space-y-3.5 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-[#8C8C8C]">
            <span className="font-bold text-white/90">
              ■ {item.id === 'notice-01'
                ? (isKo ? '공식 메인 포스터(키비주얼) 미리보기' : 'OFFICIAL KEY VISUAL POSTER PREVIEW')
                : (isKo ? '개막식 초청장 미리보기' : 'OPENING INVITATION PREVIEW')}
            </span>
            <span className="text-[11px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5">
              {item.id === 'notice-01' ? 'A2' : '1080×1920'} · {item.pdfSize}
            </span>
          </div>

          <div className="relative w-full h-[520px] sm:h-[680px] bg-neutral-950 border border-white/20 rounded overflow-hidden shadow-2xl">
            <iframe
              src={`${item.pdfUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full border-0 bg-neutral-950"
              title={item.title}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] px-4 py-2 border border-white/30 hover:border-white hover:bg-white hover:text-black text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isKo ? '새 창에서 보기' : 'VIEW IN NEW TAB'}</span>
            </a>
            <a
              href={item.pdfUrl}
              download={item.pdfDownloadName || (item.id === 'notice-01' ? 'APAP8_공식포스터_A2.pdf' : 'APAP8_초청장.pdf')}
              className="min-h-[42px] px-5 py-2 bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {item.id === 'notice-01'
                  ? (isKo ? `포스터 다운로드 (${item.pdfSize || 'PDF'})` : 'DOWNLOAD POSTER')
                  : (isKo ? `초청장 다운로드 (${item.pdfSize || 'PDF'})` : 'DOWNLOAD')}
              </span>
            </a>
          </div>
        </div>
      )}

      {/* ── Footer Inquiry & Phone Section (주석 처리) ──
      <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/15 space-y-4">
        <div className="bg-white/[0.03] border border-white/15 p-4 sm:p-5 rounded space-y-3.5">
          <div className="space-y-1">
            <span className="font-mono text-[11px] font-bold text-[#8C8C8C] uppercase tracking-wider block">
              ■ {isKo ? '문의처' : 'INQUIRIES'}
            </span>
            <div className="text-sm sm:text-base font-bold text-white tracking-wide">
              {isKo ? '안양문화예술재단 공공예술부' : 'Anyang Foundation for Culture & Arts (Public Art Dept.)'}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
            <div className="space-y-1">
              <span className="font-mono text-[11px] text-[#8C8C8C] block">
                {isKo ? '전화 문의' : 'TEL'}
              </span>
              <a
                href="tel:031-687-0548"
                className="inline-flex items-center gap-2 text-base sm:text-lg font-mono font-bold text-white hover:text-neutral-200 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-white/30 bg-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white">
                  031-687-0548
                </span>
              </a>
            </div>

            <span className="text-[11px] font-mono text-[#8C8C8C]">
              {isKo ? '운영시간: 평일 09:00 - 18:00' : 'Hours: Weekdays 09:00 - 18:00'}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono text-[#8C8C8C] px-0.5">
          <span>{isKo ? '제8회 안양공공예술프로젝트 (APAP8)' : 'The 8th Anyang Public Art Project (APAP8)'}</span>
          <span className="text-white/60">
            {isKo
              ? '주최: 안양시 · 주관: 안양문화예술재단'
              : 'Hosted by Anyang City · Organized by Anyang Foundation for Culture & Arts'}
          </span>
        </div>
      </div>
      ── */}
    </div>
  );
}
