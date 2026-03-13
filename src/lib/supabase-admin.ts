// src/lib/supabase-admin.ts
// Supabase client untuk admin panel (browser-side auth)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? '';

export interface AdminUser {
  id: string;
  email: string;
}

// ── Auth ──────────────────────────────────────────────────────────────────

export async function signIn(email: string, password: string): Promise<{ user: AdminUser | null; error: string | null }> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { user: null, error: data.error_description || data.error || 'Login gagal' };
  }

  // Simpan session di localStorage
  localStorage.setItem('jasprint_access_token', data.access_token);
  localStorage.setItem('jasprint_refresh_token', data.refresh_token);
  localStorage.setItem('jasprint_user', JSON.stringify({ id: data.user.id, email: data.user.email }));

  // Simpan di cookie untuk middleware edge (8 jam)
  const maxAge = 60 * 60 * 8;
  document.cookie = `jasprint_token=${data.access_token}; path=/; max-age=${maxAge}; SameSite=Strict`;

  return { user: { id: data.user.id, email: data.user.email }, error: null };
}

export async function signOut() {
  const token = localStorage.getItem('jasprint_access_token');
  if (token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
    });
  }
  localStorage.removeItem('jasprint_access_token');
  localStorage.removeItem('jasprint_refresh_token');
  localStorage.removeItem('jasprint_user');
  // Hapus cookie
  document.cookie = 'jasprint_token=; path=/; max-age=0; SameSite=Strict';
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('jasprint_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('jasprint_access_token');
}

// ── Generic fetch with auth ────────────────────────────────────────────────

async function adminFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  const token = getAccessToken();
  if (!token) return { data: null, error: 'Tidak terautentikasi' };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 204) return { data: null, error: null };

  const body = await res.json();
  if (!res.ok) return { data: null, error: body.message || body.error || 'Terjadi kesalahan' };
  return { data: body as T, error: null };
}

// ── Products ───────────────────────────────────────────────────────────────

export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string | null;
  category: string;
  emoji: string;
  tag: string;
  gradient: string;
  is_active: boolean;
  sort_order: number;
  images: string[];
  specs: ProductSpec[];
  features: string[];
  prices: ProductPrice[];
  faqs: ProductFaq[];
  tip: string | null;
  wa_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductSpec { icon: string; label: string; value: string; }
export interface ProductPrice { label: string; price: string; }
export interface ProductFaq { question: string; answer: string; }

export async function getProducts() {
  return adminFetch<AdminProduct[]>('products?select=*&order=sort_order.asc');
}

export async function createProduct(product: Omit<AdminProduct, 'id' | 'created_at' | 'updated_at'>) {
  return adminFetch<AdminProduct[]>('products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id: string, product: Partial<AdminProduct>) {
  return adminFetch<AdminProduct[]>(`products?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ ...product, updated_at: new Date().toISOString() }),
  });
}

export async function deleteProduct(id: string) {
  return adminFetch(`products?id=eq.${id}`, { method: 'DELETE' });
}

// ── Blog ──────────────────────────────────────────────────────────────────

export interface AdminPost {
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

export async function getPosts() {
  return adminFetch<AdminPost[]>('posts?select=*&order=created_at.desc');
}

export async function createPost(post: Omit<AdminPost, 'id' | 'created_at'>) {
  return adminFetch<AdminPost[]>('posts', {
    method: 'POST',
    body: JSON.stringify(post),
  });
}

export async function updatePost(id: string, post: Partial<AdminPost>) {
  return adminFetch<AdminPost[]>(`posts?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify(post),
  });
}

export async function deletePost(id: string) {
  return adminFetch(`posts?id=eq.${id}`, { method: 'DELETE' });
}

// ── Site Components (hero text, testimonials, FAQ, dll) ────────────────────

export interface SiteComponent {
  id: string;
  key: string;
  label: string;
  data: Record<string, unknown>;
  updated_at: string;
}

export async function getComponents() {
  return adminFetch<SiteComponent[]>('site_components?select=*&order=key.asc');
}

export async function upsertComponent(key: string, label: string, data: Record<string, unknown>) {
  return adminFetch<SiteComponent[]>('site_components', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({ key, label, data, updated_at: new Date().toISOString() }),
  });
}

// ── Settings ──────────────────────────────────────────────────────────────

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  updated_at: string;
}

export async function getSettings() {
  return adminFetch<SiteSetting[]>('site_settings?select=*&order=key.asc');
}

export async function upsertSetting(key: string, value: string, label: string) {
  return adminFetch<SiteSetting[]>('site_settings', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({ key, value, label, updated_at: new Date().toISOString() }),
  });
}