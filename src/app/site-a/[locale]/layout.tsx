import React from 'react';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import ArchiveHeader from './ArchiveHeader';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function SiteALayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const locales = ['ko', 'en', 'ja', 'zh'];
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <ArchiveHeader locale={locale} locales={locales} />

        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-slate-200 bg-white py-8 md:py-10 text-xs text-slate-500">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-semibold text-slate-700 text-sm">안양공공예술프로젝트 (APAP 사무국)</p>
              <p>경기도 안양시 만안구 예술공원로 103 | info@apap.or.kr</p>
              <p className="text-[10px] text-slate-400 pt-1">© 2026 Anyang Foundation for Culture &amp; Arts. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-slate-500">
              <span className="cursor-default hover:text-slate-800 transition-colors">개인정보처리방침</span>
              <span className="cursor-default hover:text-slate-800 transition-colors">이용약관</span>
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
