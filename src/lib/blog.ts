// src/lib/blog.ts
// Setup tabel `posts` di Supabase:
//
// create table posts (
//   id            uuid primary key default gen_random_uuid(),
//   slug          text unique not null,
//   title         text not null,
//   excerpt       text,
//   content       text,
//   cover_url     text,
//   category      text,
//   author        text,
//   published     boolean default false,
//   published_at  timestamptz default now(),
//   created_at    timestamptz default now()
// );
//
// RLS: enable → policy: allow select where published = true

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? '';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category: string | null;
  author: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
}

async function supabaseFetch<T>(path: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('[blog] Supabase env belum diset');
    return [];
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    // @ts-expect-error next-specific fetch option
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error('[blog] Supabase error:', res.status, await res.text());
    return [];
  }

  return res.json() as Promise<T[]>;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return supabaseFetch<BlogPost>(
    'posts?select=id,slug,title,excerpt,cover_url,category,author,published_at&published=eq.true&order=published_at.desc'
  );
}

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  return supabaseFetch<BlogPost>(
    `posts?select=id,slug,title,excerpt,cover_url,category,published_at&published=eq.true&order=published_at.desc&limit=${limit}`
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const rows = await supabaseFetch<BlogPost>(
    `posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`
  );
  return rows[0] ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = await supabaseFetch<Pick<BlogPost, 'slug'>>(
    'posts?select=slug&published=eq.true'
  );
  return rows.map((r) => r.slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}