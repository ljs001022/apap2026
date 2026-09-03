/**
 * Utility functions for localizing APAP8 artist & artwork data.
 * Splits and selects content strictly based on the active locale ('ko' vs other).
 */

export function hasKorean(text: string): boolean {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
}

export function hasEnglish(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}

/**
 * Returns the localized work title.
 */
export function getLocalizedTitle(title: string, locale: string = 'ko'): string {
  if (!title) return '';
  const isKo = locale === 'ko';
  const lines = title.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  if (lines.length >= 2) {
    const koLine = lines.find((l) => hasKorean(l));
    const enLine = lines.find((l) => !hasKorean(l) && hasEnglish(l));
    if (isKo && koLine) return koLine;
    if (!isKo && enLine) return enLine;
  }
  return isKo ? lines[0] : (lines[1] || lines[0]);
}

/**
 * Returns the localized material string.
 */
export function getLocalizedMaterial(material: string, locale: string = 'ko'): string {
  if (!material) return '';
  const isKo = locale === 'ko';
  const lines = material.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  if (lines.length >= 2) {
    const koLine = lines.find((l) => hasKorean(l));
    const enLine = lines.find((l) => !hasKorean(l) && hasEnglish(l));
    if (isKo && koLine) return koLine;
    if (!isKo && enLine) return enLine;
  }
  const parenMatch = material.match(/^([^(]+)\(([^)]+)\)$/);
  if (parenMatch) {
    const koPart = parenMatch[1].trim();
    const enPart = parenMatch[2].trim();
    if (isKo) return koPart;
    if (hasEnglish(enPart)) return enPart;
  }
  if (!isKo) {
    if (material.includes('캔버스에 유채')) return 'Oil on canvas';
    if (material.includes('캔버스에 아크릴')) return 'Acrylic on canvas';
    if (material.includes('브론즈 채색')) return 'Painted bronze';
    if (material.includes('C - print')) return 'C-print';
  }
  return material;
}

/**
 * Returns localized description.
 */
export function getLocalizedDescription(description: string, locale: string = 'ko'): string {
  if (!description) return '';
  const isKo = locale === 'ko';
  const paragraphs = description.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length <= 1) return description;

  const koParas: string[] = [];
  const enParas: string[] = [];

  paragraphs.forEach((p) => {
    const koChars = (p.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g) || []).length;
    const enChars = (p.match(/[a-zA-Z]/g) || []).length;
    if (koChars > enChars) {
      koParas.push(p);
    } else if (enChars > 20) {
      enParas.push(p);
    } else {
      koParas.push(p);
    }
  });

  if (isKo) {
    return koParas.join('\n\n') || description;
} else {
    return enParas.join('\n\n') || koParas.join('\n\n') || description;
  }
}

/**
 * Returns localized bio.
 */
export function getLocalizedBio(bio: string, locale: string = 'ko'): string {
  if (!bio) return '';
  const isKo = locale === 'ko';
  const blocks = bio.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  if (blocks.length === 4) {
    if (isKo) {
      return blocks[0] + '\n\n' + blocks[2];
    } else {
      const solo = blocks[1].startsWith('Selected') || blocks[1].startsWith('Solo')
        ? blocks[1]
        : 'Selected Solo Exhibitions\n' + blocks[1];
      const group = blocks[3].startsWith('Selected') || blocks[3].startsWith('Group')
        ? blocks[3]
        : 'Selected Group Exhibitions\n' + blocks[3];
      return solo + '\n\n' + group;
    }
  } else if (blocks.length === 2) {
    if (hasKorean(blocks[0]) && !hasKorean(blocks[1])) {
      return isKo ? blocks[0] : blocks[1];
    }
    return bio;
  }
  return bio;
}

/**
 * Returns localized artist name.
 */
export function getLocalizedArtistName(
  artist: { name_ko: string; name_en?: string },
  locale: string = 'ko'
): { primary: string; secondary?: string } {
  const isKo = locale === 'ko';
  const cleanEn =
    artist.name_en && artist.name_en !== '국영문' && artist.name_en.trim() !== ''
      ? artist.name_en.trim()
      : null;

  if (isKo) {
    return {
      primary: artist.name_ko,
      secondary: cleanEn || undefined,
    };
  } else {
    return {
      primary: cleanEn || artist.name_ko,
      secondary: cleanEn ? artist.name_ko : undefined,
    };
  }
}

/**
 * Returns localized venue name.
 */
export function getLocalizedVenueName(venueSlug: string, locale: string = 'ko'): string {
  const isKo = locale === 'ko';
  const venueMap: Record<string, { ko: string; en: string }> = {
    'outdoor-exhibition': { ko: '야외전시', en: 'Outdoor Exhibition' },
    'korea-china-special': { ko: '한·중 특별전', en: 'Korea-China Special Exhibition' },
    'e-pavilion-media': { ko: '안양파빌리온 (미디어)', en: 'Anyang Pavilion (Media)' },
    '308-art-crew': { ko: '308 아트크루', en: '308 Art Crew' },
  };

  const found = venueMap[venueSlug];
  if (found) {
    return isKo ? found.ko : found.en;
  }
  return venueSlug;
}

/**
 * Returns localized nationality string.
 */
export function getLocalizedNationality(nationality: string, locale: string = 'ko'): string {
  if (!nationality) return '';
  const isKo = locale === 'ko';
  const clean = nationality.split(/\n+/)[0].trim();
  if (isKo) return clean;

  const natMap: Record<string, string> = {
    '대한민국': 'Republic of Korea',
    '한국': 'Republic of Korea',
    '중국': 'China',
    '일본': 'Japan',
    '인도': 'India',
    '미국': 'USA',
  };
  return natMap[clean] || clean;
}