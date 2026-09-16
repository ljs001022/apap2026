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
 * Formats a work title with standard angle brackets if not already present.
 */
export function formatArtworkTitle(title: string): string {
  if (!title) return '';
  const trimmed = title.trim();
  if (trimmed.startsWith('<') || trimmed.startsWith('〈') || trimmed.startsWith('《') || trimmed.startsWith('「')) {
    return trimmed;
  }
  return `<${trimmed}>`;
}

/**
 * Returns the localized work title.
 */
/**
 * Returns the localized work title.
 */
export function getLocalizedWorkTitle(
  work: { title?: string; title_ko?: string; title_en?: string },
  locale: string = 'ko'
): string {
  const isKo = locale === 'ko';
  if (isKo && work.title_ko && work.title_ko.trim()) {
    return formatArtworkTitle(work.title_ko);
  }
  if (!isKo && work.title_en && work.title_en.trim()) {
    return formatArtworkTitle(work.title_en);
  }
  return getLocalizedTitle(work.title || '', locale);
}

export function getLocalizedTitle(titleOrWork: any, locale: string = 'ko'): string {
  if (!titleOrWork) return '';
  if (typeof titleOrWork === 'object') {
    return getLocalizedWorkTitle(titleOrWork, locale);
  }
  const title = String(titleOrWork);
  const isKo = locale === 'ko';
  const lines = title.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  let resolved = isKo ? lines[0] : (lines[1] || lines[0]);
  if (lines.length >= 2) {
    const koLine = lines.find((l) => hasKorean(l));
    const enLine = lines.find((l) => !hasKorean(l) && hasEnglish(l));
    if (isKo && koLine) resolved = koLine;
    else if (!isKo && enLine) resolved = enLine;
  }
  return formatArtworkTitle(resolved);
}

/**
 * Returns the localized size string.
 */
export function getLocalizedSize(size: string, locale: string = 'ko'): string {
  if (!size) return '';
  const isKo = locale === 'ko';
  const lines = size.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  if (lines.length >= 2) {
    const koLine = lines.find((l) => hasKorean(l));
    const enLine = lines.find((l) => !hasKorean(l) && hasEnglish(l));
    if (isKo && koLine) return koLine;
    if (!isKo && enLine) return enLine;
    return isKo ? lines[0] : (lines[1] || lines[0]);
  }
  return size;
}

/**
 * Returns the localized material string.
 */
export function getLocalizedWorkMaterial(
  work: { material?: string; medium_ko?: string; medium_en?: string },
  locale: string = 'ko'
): string {
  const isKo = locale === 'ko';
  if (isKo && work.medium_ko && work.medium_ko.trim()) {
    return work.medium_ko;
  }
  if (!isKo && work.medium_en && work.medium_en.trim()) {
    return work.medium_en;
  }
  return getLocalizedMaterial(work.material || '', locale);
}

export function getLocalizedMaterial(materialOrWork: any, locale: string = 'ko'): string {
  if (!materialOrWork) return '';
  if (typeof materialOrWork === 'object') {
    return getLocalizedWorkMaterial(materialOrWork, locale);
  }
  const material = String(materialOrWork);
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
export function getLocalizedWorkDescription(
  work: { description?: string; description_ko?: string; description_en?: string },
  locale: string = 'ko'
): string {
  const isKo = locale === 'ko';
  if (isKo && work.description_ko && work.description_ko.trim()) {
    return work.description_ko;
  }
  if (!isKo && work.description_en && work.description_en.trim()) {
    return work.description_en;
  }
  return getLocalizedDescription(work.description || '', locale);
}

export function getLocalizedDescription(descriptionOrTarget: any, locale: string = 'ko'): string {
  if (!descriptionOrTarget) return '';
  if (typeof descriptionOrTarget === 'object') {
    return getLocalizedWorkDescription(descriptionOrTarget, locale);
  }
  const description = String(descriptionOrTarget);
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
 * Returns localized intro.
 */
export function getLocalizedArtistIntro(
  artist: { intro?: string; intro_ko?: string; intro_en?: string },
  locale: string = 'ko'
): string {
  const isKo = locale === 'ko';
  if (isKo && artist.intro_ko && artist.intro_ko.trim()) {
    return artist.intro_ko;
  }
  if (!isKo && artist.intro_en && artist.intro_en.trim()) {
    return artist.intro_en;
  }
  return getLocalizedDescription(artist.intro || '', locale);
}

/**
 * Returns localized bio.
 */
export function getLocalizedArtistBio(
  artist: { bio?: string; bio_ko?: string; bio_en?: string },
  locale: string = 'ko'
): string {
  const isKo = locale === 'ko';
  if (isKo && artist.bio_ko && artist.bio_ko.trim()) {
    return artist.bio_ko;
  }
  if (!isKo && artist.bio_en && artist.bio_en.trim()) {
    return artist.bio_en;
  }
  return getLocalizedBio(artist.bio || '', locale);
}

export function getLocalizedBio(bioOrArtist: any, locale: string = 'ko'): string {
  if (!bioOrArtist) return '';
  if (typeof bioOrArtist === 'object') {
    return getLocalizedArtistBio(bioOrArtist, locale);
  }
  const bio = String(bioOrArtist);
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
  let cleanEn =
    artist.name_en && artist.name_en !== '국영문' && artist.name_en.trim() !== ''
      ? artist.name_en.trim()
      : null;
  let cleanKo = artist.name_ko;

  if (!cleanEn) {
    const lastHangulIndex = cleanKo.search(/[가-힣][^가-힣]*$/);
    if (lastHangulIndex !== -1) {
      const rest = cleanKo.slice(lastHangulIndex + 1).trim();
      if (/[A-Za-z]/.test(rest)) {
        cleanKo = cleanKo.slice(0, lastHangulIndex + 1).trim();
        cleanEn = rest;
      }
    }
  }

  if (isKo) {
    return {
      primary: cleanKo,
      secondary: cleanEn || undefined,
    };
  } else {
    return {
      primary: cleanEn || cleanKo,
      secondary: cleanEn ? cleanKo : undefined,
    };
  }
}

/**
 * Returns localized venue name.
 */
export function getLocalizedVenueName(venueSlug: string, locale: string = 'ko'): string {
  const isKo = locale === 'ko';
  const venueMap: Record<string, { ko: string; en: string }> = {
    'e-pavilion-media': { ko: '안양파빌리온', en: 'Anyang Pavilion' },
    'outdoor-exhibition': { ko: '야외전시', en: 'Outdoor Exhibition' },
    '308-art-crew': { ko: '308아트', en: '308 Art Crew' },
    'korea-china-special': { ko: '한중특별전', en: 'Korea-China Special' },
    'media-art-open-call': { ko: '미디어아트 공모작가', en: 'Media Art Open Call' },
  };

  const found = venueMap[venueSlug];
  if (found) {
    return isKo ? found.ko : found.en;
  }
  return venueSlug;
}

export function getLocalizedArtistNationality(
  artist: { nationality?: string; city_country_ko?: string; city_country_en?: string },
  locale: string = 'ko'
): string {
  const isKo = locale === 'ko';
  if (isKo && artist.city_country_ko && artist.city_country_ko.trim()) {
    return artist.city_country_ko;
  }
  if (!isKo && artist.city_country_en && artist.city_country_en.trim()) {
    return artist.city_country_en;
  }
  return getLocalizedNationality(artist.nationality || '', locale);
}

export function getLocalizedNationality(nationalityOrArtist: any, locale: string = 'ko'): string {
  if (!nationalityOrArtist) return '';
  if (typeof nationalityOrArtist === 'object') {
    return getLocalizedArtistNationality(nationalityOrArtist, locale);
  }
  const nationality = String(nationalityOrArtist);
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