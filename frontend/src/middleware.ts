import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userType = request.cookies.get('userType');

  // التحقق من المسارات المحمية
  if (request.nextUrl.pathname.startsWith('/admin') && userType !== 'admin') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/store') && userType !== 'store') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/store/:path*', '/points/:path*']
};
