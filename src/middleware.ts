import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'seko-secure-jwt-admin-secret-key-change-me-32chars'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /seko-admin routes
  if (pathname.startsWith('/seko-admin')) {
    const isLoginPage = pathname === '/seko-admin/login';
    const token = request.cookies.get('admin_session')?.value;

    let isAuthenticated = false;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    }

    // If authenticated and visiting login page, redirect to dashboard
    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL('/seko-admin', request.url));
    }

    // If not authenticated and visiting protected admin page, redirect to login
    if (!isAuthenticated && !isLoginPage) {
      const loginUrl = new URL('/seko-admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/seko-admin/:path*'],
};
