import React from 'react';

interface PromoVideo {
  youtubeId: string;
  titleKo: string;
  titleEn: string;
}

// 소개 > 04 홍보영상: 티저영상 → 공식 홍보영상 순으로 노출
export const PROMO_VIDEOS: PromoVideo[] = [
  {
    youtubeId: 'G5wZfkKGf-Y',
    titleKo: '제8회 안양공공예술프로젝트(APAP8) 티저영상',
    titleEn: 'APAP8 Official Teaser',
  },
  {
    youtubeId: 'A9SrGSk3Qro',
    titleKo: '제8회 안양공공예술프로젝트(APAP8) 공식 홍보영상',
    titleEn: 'APAP8 Official Promotional Video',
  },
];

interface PromoVideosProps {
  isKo: boolean;
  compact?: boolean;
}

export default function PromoVideos({ isKo, compact = false }: PromoVideosProps) {
  return (
    <div className={compact ? 'space-y-5' : 'space-y-8'}>
      {PROMO_VIDEOS.map((video) => {
        const title = isKo ? video.titleKo : video.titleEn;
        return (
          <div key={video.youtubeId} className="space-y-3">
            <h4 className={`font-extrabold text-white leading-snug ${compact ? 'text-sm' : 'text-lg lg:text-xl'}`}>
              {title}
            </h4>
            <div className={`border bg-black space-y-3 ${compact ? 'border-white/20 p-2 sm:p-3' : 'border-white/30 p-3 sm:p-4'}`}>
              <div className="relative w-full aspect-video border border-white/20 bg-black overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              </div>

              <div
                className={`bg-white/[0.02] border border-white/10 text-xs font-mono ${
                  compact ? 'p-3 space-y-1' : 'p-4 grid grid-cols-1 sm:grid-cols-3 gap-3'
                }`}
              >
                <div className={compact ? 'flex justify-between gap-3' : ''}>
                  <span className={`text-[#8C8C8C] ${compact ? 'shrink-0' : 'block text-[10px]'}`}>■ {isKo ? '영상 제목' : 'TITLE'}</span>
                  <span className={`text-white font-medium ${compact ? 'text-right' : ''}`}>{title}</span>
                </div>
                {!compact && (
                  <div>
                    <span className="text-[#8C8C8C] block text-[10px]">■ {isKo ? '주최 / 주관' : 'ORGANIZER'}</span>
                    <span className="text-white font-medium">{isKo ? '안양시 · 안양문화예술재단' : 'Anyang City & AFAC'}</span>
                  </div>
                )}
                <div className={compact ? 'flex justify-between gap-3' : ''}>
                  <span className={`text-[#8C8C8C] ${compact ? '' : 'block text-[10px]'}`}>■ {isKo ? '공개 플랫폼' : 'PLATFORM'}</span>
                  <span className="text-white font-medium">YouTube</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
