import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import DustCanvas from '@/components/site-a/DustCanvas';
import { ACTIVE_LOCALES, Locale } from '@/i18n/config';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return ACTIVE_LOCALES.map((locale) => ({ locale }));
}

export default async function SiteALayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 지원하는 활성 로케일인지 검증 (비활성화된 ja, zh는 404 반환)
  if (!ACTIVE_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  // next-intl 메시지 번역 로드
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <DustCanvas className="fixed inset-0 w-full h-full pointer-events-none z-20" opacity={0.85} />
      {children}
    </NextIntlClientProvider>
  );
}
