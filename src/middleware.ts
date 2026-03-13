// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in-memory per edge instance)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000; // 1 menit

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): { allowed: boolean; resetIn: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, resetIn: RATE_LIMIT_WINDOW };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetIn: entry.resetAt - now };
  }
  entry.count++;
  return { allowed: true, resetIn: entry.resetAt - now };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Security headers untuk semua request ──────────────────
  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // ── Rate limit untuk halaman login (bukan API) ─────────────
  if (pathname === '/admin/login' && req.method === 'GET') {
    const ip = getClientIp(req);
    const { allowed, resetIn } = checkRateLimit(ip);
    if (!allowed) {
      return new NextResponse(
        `<html><body><h2>Terlalu banyak percobaan. Coba lagi dalam ${Math.ceil(resetIn / 1000)} detik.</h2></body></html>`,
        { status: 429, headers: { 'Content-Type': 'text/html', 'Retry-After': String(Math.ceil(resetIn / 1000)) } }
      );
    }
  }

  // ── Proteksi /admin — cek cookie saja (tanpa network call) ──
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && pathname !== '/admin') {
    const token = req.cookies.get('jasprint_token')?.value;
    if (!token) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Token ada → lanjut, validasi sesungguhnya dilakukan di AdminShell (client)
    return res;
  }

  // ── /admin tanpa path → ke login ────────────────────────────
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};