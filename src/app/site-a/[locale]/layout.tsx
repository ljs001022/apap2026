import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function SiteBLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // 지원하는 로케일인지 검증
  const locales = ['ko', 'en', 'ja', 'zh'];
  if (!locales.includes(locale)) {
    notFound();
  }

  // next-intl 메시지 번역 로드
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
