import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession, SESSION_COOKIE_NAME } from '@/lib/auth';

/**
 * Protect /dashboard/* routes with a valid session cookie.
 * If logged-in users land on /login or /registro, send them to
 * their role's dashboard.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  // Enforce role-based segments inside /dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    // Role guard: /dashboard/user is for role=user, etc.
    const segments = pathname.split('/').filter(Boolean); // ['dashboard', 'user'?...]
    const wanted = segments[1];
    if (
      (wanted === 'user' || wanted === 'coach' || wanted === 'admin') &&
      wanted !== session.role
    ) {
      const url = req.nextUrl.clone();
      url.pathname = `/dashboard/${session.role}`;
      return NextResponse.redirect(url);
    }
  }

  // Bounce logged-in users away from auth screens
  if ((pathname === '/login' || pathname === '/registro') && session) {
    const url = req.nextUrl.clone();
    url.pathname = `/dashboard/${session.role}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/registro'],
};
