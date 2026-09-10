'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DustCanvas from './DustCanvas';

interface SectionCardProps {
  /** 섹션 번호: "01", "02", ... */
  index: string;
  labelKo: string;
  labelEn: string;
  /** GNB 서브 라벨 (영문) ex: "OVERVIEW / THEME" */
  subtitle: string;
  /** 요약 콘텐츠 — 각 섹션이 주입 */
  summary: React.ReactNode;
  isKo: boolean;
  /** 섹션 id (앵커/스냅 타깃) */
  id: string;
  /** 콘텐츠 수직 정렬 ('center' 기본, 'start' 상단 고정) */
  contentAlign?: 'center' | 'start';
}

export default function SectionCard({
  index,
  labelKo,
  labelEn,
  subtitle,
  summary,
  isKo,
  id,
  contentAlign = 'start',
}: SectionCardProps) {
  return (
    <section
      id={id}
      className="relative h-[100dvh] flex flex-col pt-16 border-b border-white snap-start overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background DUST particle effect (lightweight, responsive) */}
      <DustCanvas opacity={0.25} />

      {/* Section Header Row - Compact padding for mobile */}
      <div className="relative z-10 flex justify-between items-center px-4 py-2 sm:px-10 sm:py-3 lg:px-16 border-b border-white flex-shrink-0 bg-[#0A0A0A]/70 backdrop-blur-sm">
        <h2 className="flex items-baseline gap-2 sm:gap-3">
          <span className="text-title font-extrabold tracking-tight">
            {isKo ? labelKo : labelEn}
          </span>
          <span className="font-mono text-caption font-semibold text-[#6C6C6C] tracking-widest hidden xs:inline">
            {labelEn} — {subtitle}
          </span>
        </h2>

        {/* Section number with subtle CSS glitch effect */}
        <span
          className="font-mono font-black text-title sm:text-5xl text-transparent select-none animate-glitch"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}
          aria-hidden
        >
          {index}
        </span>
      </div>

      {/* Summary Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col px-4 sm:px-10 lg:px-16 pt-2.5 pb-6 sm:pt-4 sm:pb-8 overflow-y-auto overflow-x-hidden hide-scrollbar"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div
          className={`w-full flex flex-col ${
            contentAlign === 'center'
              ? 'justify-center my-auto'
              : 'justify-start mt-0 mb-auto'
          }`}
        >
          {summary}
        </div>
      </motion.div>
    </section>
  );
}