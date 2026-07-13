import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const MPESA_PATHS = ['/api/mpesa/callback', '/api/mpesa/b2c/callback'];
const AUTH_PATHS = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow M-Pesa callbacks without auth
  if (MPESA_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // API routes handle their own auth
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // no-op in middleware
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Redirect auth pages to dashboard if already logged in
  if (session && AUTH_PATHS.some((p) => pathname.startsWith(p))) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    const role = profile?.role;
    let redirectPath = '/';
    if (role === 'seller') redirectPath = '/seller/dashboard';
    else if (role === 'admin') redirectPath = '/admin';

    const url = request.nextUrl.clone();
    url.pathname = redirectPath;
    return NextResponse.redirect(url);
  }

  // Protect /seller/* routes
  if (pathname.startsWith('/seller') && !pathname.startsWith('/seller/dashboard')) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/signin';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'seller') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/signin';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/seller/:path*', '/seller', '/admin/:path*', '/admin', '/auth/:path*', '/api/:path*'],
};
