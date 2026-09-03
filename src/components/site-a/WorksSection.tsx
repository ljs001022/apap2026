'use client';

import React, { useMemo } from 'react';
import BlurFade from './BlurFade';
import WorkGallery from './WorkGallery';
import { CardTheme } from './ArtistCard';
import { getVenues } from '@/lib/artists';
import { WorkWithArtist } from '@/types/artist';

import { getLocalizedVenueName } from '@/lib/artistLocalization';

interface WorksSectionProps {
  t?: (key: string) => string;
  locale?: string;
  className?: string;
  theme?: CardTheme;
}

export default function WorksSection({
  t,
  locale = 'ko',
  className = '',
  theme = 'lime',
}: WorksSectionProps) {
  const venues = useMemo(() => getVenues(), []);
  const isKo = locale === 'ko';

  // Group works by venue with localized labels
  const categories = useMemo(() => {
    return venues.map((v) => {
      const worksInVenue: WorkWithArtist[] = [];
      v.artists.forEach((artist) => {
        artist.works.forEach((work) => {
          worksInVenue.push({
            work,
            artist,
            venue_ko: v.venue_ko,
            venue_slug: v.venue_slug,
          });
        });
      });

      return {
        id: v.venue_slug,
        label: getLocalizedVenueName(v.venue_slug, locale),
        items: worksInVenue,
      };
    });
  }, [venues, locale]);

  const tagColor = {
    lime: 'text-lime-400',
    cyan: 'text-[#00E5FF]',
    peach: 'text-rose-400',
    blackwhite: 'text-white',
  }[theme];

  return (
    <section
      id="works"
      className={`relative min-h-screen flex flex-col justify-center py-20 md:py-28 px-5 sm:px-6 bg-transparent border-t border-white/10 ${className}`}
    >
      <div className="container mx-auto max-w-6xl space-y-10 sm:space-y-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <BlurFade className="space-y-2">
            <span className={`text-[10px] md:text-xs font-mono tracking-widest uppercase block font-bold ${tagColor}`}>
              {isKo ? '[03] 전시 갤러리 — 출품작' : '[03] EXHIBITION GALLERY — WORKS & PROJECTS'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              {isKo ? '출품작' : 'Works on View'}
            </h2>
          </BlurFade>

          <p className="font-mono text-xs text-white/50 max-w-sm sm:text-right">
            {isKo
              ? '제8회 안양공공예술프로젝트(APAP8) 주요 출품작 아카이브'
              : 'Archive of Key Artworks & Commissions for APAP8'}
          </p>
        </div>

        {/* Works Gallery with Venue Category Tabs */}
        <WorkGallery
          categories={categories}
          allLabel={isKo ? '전체 부문 (ALL)' : 'ALL VENUES'}
          theme={theme}
          locale={locale}
        />
      </div>
    </section>
  );
}
