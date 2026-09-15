import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://2026.apap.or.kr'),
  title: {
    default: 'APAP8 | 제8회 안양공공예술프로젝트 (2026)',
    template: '%s | APAP8',
  },
  description:
    '제8회 안양공공예술프로젝트 (APAP8) — ArteX : 예술대전환_안양 무릉도원. 2026.09.30 ~ 11.29 안양예술공원 및 안양파빌리온 일원.',
  keywords: [
    'APAP',
    'APAP8',
    '안양공공예술프로젝트',
    '공공예술',
    '트리엔날레',
    '안양예술공원',
    '안양파빌리온',
    'ArteX',
    '예술대전환',
    '무릉도원',
  ],
  alternates: {
    canonical: 'https://2026.apap.or.kr',
  },
  openGraph: {
    title: 'APAP8 | 제8회 안양공공예술프로젝트 (2026)',
    description:
      '제8회 안양공공예술프로젝트 (APAP8) — ArteX : 예술대전환_안양 무릉도원. 2026.09.30 ~ 11.29',
    url: 'https://2026.apap.or.kr',
    siteName: 'APAP8',
    images: [
      {
        url: 'https://2026.apap.or.kr/images/main-1920x800.jpg',
        width: 1920,
        height: 800,
        alt: '제8회 안양공공예술프로젝트(APAP8) 메인 포스터',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAP8 | 제8회 안양공공예술프로젝트 (2026)',
    description:
      '제8회 안양공공예술프로젝트 (APAP8) — ArteX : 예술대전환_안양 무릉도원.',
    images: ['https://2026.apap.or.kr/images/main-1920x800.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
