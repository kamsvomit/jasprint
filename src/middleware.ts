// src/middleware.ts
// Proteksi route /admin — verifikasi JWT Supabase di edge

import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? '';

// Rate limiting store (in-memory, per edge instance)
// Untuk production skala besar gunakan Upstash Redis
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;        // max attempts
const RATE_LIMIT_WINDOW = 60_000; // 1 menit

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetIn: RATE_LIMIT_WINDOW };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count, resetIn: entry.resetAt - now };
}

async function verifySupabaseToken(token: string): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Security headers untuk semua request ──────────────────────────────
  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // ── Rate limit untuk login endpoint ───────────────────────────────────
  if (pathname === '/admin/login' && req.method === 'POST') {
    const ip = getClientIp(req);
    const { allowed, remaining, resetIn } = checkRateLimit(ip);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: `Terlalu banyak percobaan. Coba lagi dalam ${Math.ceil(resetIn / 1000)} detik.` }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil(resetIn / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    res.headers.set('X-RateLimit-Remaining', String(remaining));
    return res;
  }

  // ── Proteksi semua halaman /admin kecuali /admin/login ────────────────
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && pathname !== '/admin') {
    // Cek token dari cookie (lebih aman dari localStorage untuk SSR)
    const token = req.cookies.get('jasprint_token')?.value;

    if (!token) {
      // Redirect ke login
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verifikasi token ke Supabase
    const valid = await verifySupabaseToken(token);
    if (!valid) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      const redirectRes = NextResponse.redirect(loginUrl);
      // Hapus cookie invalid
      redirectRes.cookies.delete('jasprint_token');
      return redirectRes;
    }

    return res;
  }

  // ── Blokir akses langsung ke /admin → redirect ke login ───────────────
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|icon-|apple-touch).*)',
  ],
};
