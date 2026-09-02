'use client';

import React, { useMemo } from 'react';
import BlurFade from './BlurFade';
import ArtistGrid from './ArtistGrid';
import { getVenues } from '@/lib/artists';

interface ArtistSectionProps {
  t?: (key: string) => string;
  locale?: string;
  className?: string;
}

export default function ArtistSection({ t, locale = 'ko', className = '' }: ArtistSectionProps) {
  const venues = useMemo(() => getVenues(), []);

  // Map venues into generic CategoryGroup
  const categories = useMemo(() => {
    return venues.map((v) => ({
      id: v.venue_slug,
      label: v.venue_ko,
      items: v.artists,
    }));
  }, [venues]);

  const isKo = locale === 'ko';

  return (
    <section
      id="exhibition"
      className={`relative min-h-screen flex flex-col justify-center py-20 md:py-28 px-5 sm:px-6 bg-transparent border-t border-white/10 ${className}`}
    >
      <div className="container mx-auto max-w-6xl space-y-10 sm:space-y-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <BlurFade className="space-y-2">
            <span className="text-[10px] md:text-xs font-mono text-lime-400 tracking-widest uppercase block font-bold">
              [02] EXHIBITION — PARTICIPATING ARTISTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              {isKo ? '참여 작가' : 'Participating Artists'}
            </h2>
          </BlurFade>

          <p className="font-mono text-xs text-white/50 max-w-sm sm:text-right">
            제8회 안양공공예술프로젝트(APAP8) 공식 참여 작가 라인업
          </p>
        </div>

        {/* Artist Grid with Venue Category Tabs & Modal */}
        <ArtistGrid
          categories={categories}
          allLabel={isKo ? '전체 부문 (ALL)' : 'ALL VENUES'}
        />
      </div>
    </section>
  );
}
