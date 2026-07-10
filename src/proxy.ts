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

  // active_site 쿠키 확인 (로컬 개발 및 단일 도메인 테스트용 라우팅 상태 유지)
  const activeSiteCookie = request.cookies.get('active_site')?.value;

  // 3. 도메인 분기 및 리라이트
  if (host.includes('2026.apap.or.kr') || host.includes('apap8.or.kr')) {
    // 사이트 B (8회차 랜딩페이지) 전용 도메인 접속 시
    url.pathname = `/site-b${normalizedPath}`;
    const response = NextResponse.rewrite(url);
    response.cookies.set('active_site', 'site-b', { path: '/' });
    return response;
  }

  // 3.1. 아카이브 강제 진입 경로 (/archive) 처리
  if (pathname.startsWith('/archive')) {
    const cleanPath = pathname.replace('/archive', '');
    const archivePathIsMissingLocale = locales.every(
      (locale) => !cleanPath.startsWith(`/${locale}/`) && cleanPath !== `/${locale}`
    );
    const targetPath = archivePathIsMissingLocale ? `/ko${cleanPath === '/' ? '' : cleanPath}` : cleanPath;
    
    url.pathname = `/site-a${targetPath}`;
    const response = NextResponse.rewrite(url);
    response.cookies.set('active_site', 'site-a', { path: '/' });
    return response;
  }

  // 3.2. 명시적으로 site-a나 site-b 경로로 직접 들어온 경우 쿠키 세팅
  if (pathname.startsWith('/site-a')) {
    const response = NextResponse.next();
    response.cookies.set('active_site', 'site-a', { path: '/' });
    return response;
  }
  if (pathname.startsWith('/site-b')) {
    const response = NextResponse.next();
    response.cookies.set('active_site', 'site-b', { path: '/' });
    return response;
  }

  // 3.3. root (/) 접근 시 언제나 8회차 랜딩(site-b)을 메인으로 초기화 및 쿠키 갱신
  if (pathname === '/') {
    url.pathname = `/site-b/ko`;
    const response = NextResponse.rewrite(url);
    response.cookies.set('active_site', 'site-b', { path: '/' });
    return response;
  }

  // 3.4. 일반적인 다국어 경로 (/, /ko, /en 등) 접근 시 쿠키 상태에 따라 라우팅
  if (activeSiteCookie === 'site-a') {
    url.pathname = `/site-a${normalizedPath}`;
    return NextResponse.rewrite(url);
  } else {
    // 기본값은 8회차 랜딩(site-b)으로 노출 (임시 우선 배포 정책)
    url.pathname = `/site-b${normalizedPath}`;
    const response = NextResponse.rewrite(url);
    response.cookies.set('active_site', 'site-b', { path: '/' });
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
