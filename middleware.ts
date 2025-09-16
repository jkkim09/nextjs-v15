// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has('token'); // 또는 다른 로그인 상태 확인 로직
  console.log('middleware -----', request.nextUrl.pathname);
  // 만약 로그인하지 않았는데 대시보드 페이지에 접근하려 한다면
  // if (!isLoggedIn && request.nextUrl.pathname.startsWith('/')) {
  //   // 로그인 페이지로 리디렉션
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // 로그인했다면, 요청을 계속 진행
  return NextResponse.next();
}

// 미들웨어를 특정 경로에만 적용하도록 설정
export const config = {
  // 모두 적용하되 해당 페이지만 제외
  // matcher: [
  //   /*
  //    * 모든 요청 경로를 매칭하되, 다음으로 시작하는 경로는 제외합니다:
  //    * - `/_next/` (Next.js 내부 파일)
  //    * - `/api/` (API 라우트)
  //    * - `/static/` (또는 여러분의 정적 파일이 있는 다른 폴더)
  //    * - `/favicon.ico`
  //    * - `/login`
  //    * - `/sitemap.xml`
  //    * - `/robots.txt`
  //    */
  //   '/((?!api|_next/static|_next/image|favicon.ico|login|sitemap\\.xml|robots\\.txt).*)',
  // ],
  // 특정 페이지만 미들웨어 적용
  matcher: [
    // 일반 페이지만 적용
    '/test/:path*',
    '/contact',
    // 블로그 등 동적 경로
    '/test/blog/:id',
    // 필요하면 추가
  ],
};
