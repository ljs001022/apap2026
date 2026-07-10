import React from 'react';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function SiteALayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // 지원하는 로케일인지 검증
  const locales = ['ko', 'en', 'ja', 'zh'];
  if (!locales.includes(locale)) {
    notFound();
  }

  // next-intl 메시지 번역 로드
  const messages = await getMessages({ locale });

  const menuItems = [
    { name: locale === 'ko' ? 'APAP 소개' : locale === 'en' ? 'About APAP' : locale === 'ja' ? 'APAP紹介' : 'APAP 介绍', path: `/${locale}/about` },
    { name: locale === 'ko' ? '전시' : locale === 'en' ? 'Exhibitions' : locale === 'ja' ? '展示' : '展览', path: `/${locale}/exhibitions` },
    { name: locale === 'ko' ? '작품 지도' : locale === 'en' ? 'Artwork Map' : locale === 'ja' ? '作品マップ' : '作品地图', path: `/${locale}/map` },
    { name: locale === 'ko' ? '소식' : locale === 'en' ? 'News' : locale === 'ja' ? 'ニュース' : '新闻', path: `/${locale}/news` },
    { name: locale === 'ko' ? '방문 안내' : locale === 'en' ? 'Visit Info' : locale === 'ja' ? 'アクセス案内' : '参观指南', path: `/${locale}/visit` },
  ];

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
        {/* GNB Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                APAP <span className="text-blue-600 font-light">Archive</span>
              </span>
            </Link>

            {/* Desktop GNB */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Language Switcher (4개 국어 지원) */}
            <div className="flex items-center space-x-4">
              <div className="flex border border-slate-200 rounded-md overflow-hidden text-xs font-semibold">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    className={`px-2.5 py-1.5 transition-colors uppercase ${
                      locale === loc ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {loc}
                  </Link>
                ))}
              </div>
              {/* 8회 비엔날레 바로가기 링크 버튼 */}
              <a
                href="/"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-md shadow-sm transition-all"
              >
                {locale === 'ko' ? '8회 비엔날레 바로가기' : 'APAP 8th'}
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-semibold text-slate-700">안양문화예술재단 (APAP 사무국)</p>
              <p>경기도 안양시 만안구 예술공원로 103 | 이메일: info@apap.or.kr</p>
              <p className="text-[10px]">© 2026 Anyang Foundation for Culture & Arts. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href={`/${locale}/privacy`} className="hover:text-slate-800 transition-colors">
                개인정보처리방침
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-slate-800 transition-colors">
                이용약관
              </Link>
              <a href="https://www.ayac.or.kr" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 transition-colors">
                재단 홈페이지
              </a>
            </div>
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
}
