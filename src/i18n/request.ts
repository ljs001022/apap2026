import { getRequestConfig } from 'next-intl/server';
import { ACTIVE_LOCALES, DEFAULT_LOCALE, Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // 로케일 파싱 (Next.js 15+는 비동기 처리)
  let locale = await requestLocale;

  // 지원하는 활성 로케일 설정 (ja, zh 제외 시 기본값 ko로 fallback)
  if (!locale || !ACTIVE_LOCALES.includes(locale as Locale)) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
