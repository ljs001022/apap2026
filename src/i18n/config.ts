// 전체 지원 가능 언어 목록 (계약 이행 및 다국어 번역 데이터 보존용)
export const ALL_LOCALES = ['ko', 'en', 'ja', 'zh'] as const;
export type Locale = (typeof ALL_LOCALES)[number];

// 이번 배포에 실제 노출 및 빌드(export)할 활성 언어 목록
// - 현재 배포: ['ko', 'en'] 만 빌드 및 서비스 노출 (ja, zh 제외)
// - 추후 계약 이행 시: 환경변수 NEXT_PUBLIC_ENABLE_ALL_LOCALES="true" 로 설정하거나,
//   아래 ENABLE_ALL_LOCALES 기본값을 true 로 변경하면 ja, zh가 즉각 빌드 및 UI에 활성화됩니다.
export const ENABLE_ALL_LOCALES = process.env.NEXT_PUBLIC_ENABLE_ALL_LOCALES === 'true';

export const ACTIVE_LOCALES: Locale[] = ENABLE_ALL_LOCALES
  ? ['ko', 'en', 'ja', 'zh']
  : ['ko', 'en'];

export const DEFAULT_LOCALE: Locale = 'ko';

// 언어 코드별 UI 표시 레이블 (헤더 언어 전환 버튼용)
export const LOCALE_LABELS: Record<Locale, string> = {
  ko: 'KR',
  en: 'EN',
  ja: 'JP',
  zh: 'CN',
};
