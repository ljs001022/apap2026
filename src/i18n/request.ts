import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // 로케일 파싱 (Next.js 15+는 비동기 처리)
  let locale = await requestLocale;

  // 지원하는 로케일 설정
  const locales = ['ko', 'en', 'ja', 'zh'];
  if (!locale || !locales.includes(locale)) {
    locale = 'ko';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
