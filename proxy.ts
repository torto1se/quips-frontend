import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/user'];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (token) {
      const cb = request.nextUrl.searchParams.get('callbackUrl');
      const safeCb = cb && cb.startsWith('/') && !cb.startsWith('//') ? cb : '/';
      return NextResponse.redirect(new URL(safeCb, request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (!isProtected) {
    return NextResponse.next();
  }

  const originalUrl = `${pathname}${search}`;

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', originalUrl);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
