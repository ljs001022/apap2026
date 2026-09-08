'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectionCardProps {
  /** 섹션 번호 문자열: "01", "02", ... */
  index: string;
  labelKo: string;
  labelEn: string;
  /** GNB 서브 라벨 (영문) ex: "OVERVIEW / THEME" */
  subtitle: string;
  /** 요약 콘텐츠 — 각 섹션이 주입 */
  summary: React.ReactNode;
  /** "See more" 이동 경로 */
  href: string;
  isKo: boolean;
  /** 섹션 id (앵커/스냅 타깃) */
  id: string;
}

export default function SectionCard({
  index,
  labelKo,
  labelEn,
  subtitle,
  summary,
  href,
  isKo,
  id,
}: SectionCardProps) {
  return (
    <section
      id={id}
      className="relative h-screen flex flex-col border-b border-white snap-start"
    >
      {/* Section header row */}
      <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-5 border-b border-white flex-shrink-0">
        <h2 className="flex items-baseline gap-3">
          <span className="text-2xl sm:text-3xl font-extrabold">
            {isKo ? labelKo : labelEn}
          </span>
          <span className="font-mono text-[10px] font-semibold text-[#5C5C5C] tracking-widest hidden sm:inline">
            {labelEn} — {subtitle}
          </span>
        </h2>
        <span
          className="font-mono font-black text-4xl sm:text-5xl text-transparent select-none"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.15)' }}
          aria-hidden
        >
          {index}
        </span>
      </div>

      {/* Summary content — grows to fill */}
      <motion.div
        className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {summary}
      </motion.div>

      {/* See more button — pinned to bottom */}
      <div className="px-6 sm:px-10 lg:px-16 pb-10 flex-shrink-0">
        <Link
          href={href}
          className="group inline-flex items-center gap-2 border border-white/40 hover:border-white hover:bg-white hover:text-black text-white text-xs font-mono font-bold tracking-widest px-5 py-3 transition-all duration-200"
        >
          <span>{isKo ? '자세히 보기' : 'SEE MORE'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
