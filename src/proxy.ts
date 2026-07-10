import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 1. 제외 경로 설정: /api, /admin, 정적 파일(images 등), Next.js 내부 에셋(_next)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/images/') ||
    pathname.includes('/favicon.ico') ||
    pathname.startsWith('/uploads')
  ) {
    return NextResponse.next();
  }

  // 2. 도메인(Host) 및 다국어(Locale) 감지
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const locales = ['ko', 'en', 'ja', 'zh'];
  
  // 주소에 로케일(ko/en/ja/zh)이 누락되어 있는지 확인
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 로케일이 누락된 경우 기본값(ko)을 주입한 노멀라이즈된 경로 생성
  const normalizedPath = pathnameIsMissingLocale
    ? `/ko${pathname === '/' ? '' : pathname}`
    : pathname;

  // 3. 도메인 분기 및 리라이트
  if (host.includes('2026.apap.or.kr') || host.includes('apap8.or.kr')) {
    // 사이트 B (8회차 랜딩페이지) 전용 라우팅
    // 무조건 로케일이 적용된 /site-b/ko 또는 /site-b/en 형태로 내부 포워딩
    url.pathname = `/site-b${normalizedPath}`;
    return NextResponse.rewrite(url);
  } else {
    // 기본 도메인(apap.or.kr 등) 접속
    if (pathnameIsMissingLocale) {
      // 8회차 랜딩 우선 배포 정책:
      // 명시적 언어 접두사 없이 루트(/)나 일반 경로로 접속 시 당분간 8회차 랜딩(site-b/ko)으로 rewrite
      url.pathname = `/site-b/ko${pathname === '/' ? '' : pathname}`;
    } else {
      // 주소창 뒤에 /ko, /en, /ja, /zh 가 명시적으로 붙은 경우에만 아카이브 메인 홈페이지(site-a)로 분기
      url.pathname = `/site-a${pathname}`;
    }
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
