// src/lib/products.ts
// Produk dibaca dari Supabase (admin panel) dengan fallback ke file statis

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? '';

export interface ProductSpec {
  icon: string;
  label: string;
  value: string;
}

export interface ProductPrice {
  label: string;
  price: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  emoji: string;
  tag: string;
  gradient: string;
  isActive: boolean;
  sortOrder: number;
  images: string[];
  specs: ProductSpec[];
  features: string[];
  prices: ProductPrice[];
  faqs: ProductFaq[];
  tip?: string;
  waMessage?: string;
  filename?: string;
}

async function fetchFromSupabase<T>(path: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json() as Promise<T[]>;
  } catch {
    return [];
  }
}

interface RawProduct {
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
  specs: ProductSpec[];
  features: string[];
  prices: ProductPrice[];
  faqs: ProductFaq[];
  tip: string | null;
  wa_message: string | null;
}

function mapProduct(raw: RawProduct): ProductData {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    description: raw.description,
    longDescription: raw.long_description ?? undefined,
    category: raw.category,
    emoji: raw.emoji ?? '🖨️',
    tag: raw.tag ?? 'Cetak',
    gradient: raw.gradient ?? 'from-gray-500 to-slate-400',
    isActive: raw.is_active,
    sortOrder: raw.sort_order,
    specs: raw.specs ?? [],
    features: raw.features ?? [],
    prices: raw.prices ?? [],
    faqs: raw.faqs ?? [],
    tip: raw.tip ?? undefined,
    waMessage: raw.wa_message ?? undefined,
    filename: raw.slug,
  };
}

async function getStaticProducts(): Promise<ProductData[]> {
  // Fallback: baca dari file-file produk statis
  const files = ['brosur', 'kartu-nama', 'sticker', 'spanduk', 'nota', 'undangan'];
  const products: ProductData[] = [];

  for (const file of files) {
    try {
      const mod = await import(`../products/${file}`);
      const prod = mod.default || mod[Object.keys(mod)[0]];
      if (prod && prod.id && prod.name) {
        products.push({
          id: prod.id,
          slug: prod.id,
          name: prod.name,
          description: prod.description,
          longDescription: prod.longDescription,
          category: prod.category,
          emoji: '🖨️',
          tag: 'Cetak',
          gradient: 'from-gray-500 to-slate-400',
          isActive: true,
          sortOrder: 99,
          specs: [],
          features: [],
          prices: [],
          faqs: [],
          filename: file,
        });
      }
    } catch {}
  }
  return products;
}

export async function getAllProducts(): Promise<ProductData[]> {
  const rows = await fetchFromSupabase<RawProduct>(
    'products?select=*&is_active=eq.true&order=sort_order.asc'
  );
  if (rows.length > 0) return rows.map(mapProduct);
  return getStaticProducts();
}

export async function getProductBySlug(slug: string): Promise<ProductData | null> {
  const rows = await fetchFromSupabase<RawProduct>(
    `products?slug=eq.${encodeURIComponent(slug)}&is_active=eq.true&limit=1`
  );
  if (rows.length > 0) return mapProduct(rows[0]);
  const all = await getStaticProducts();
  return all.find(p => p.slug === slug || p.id === slug) ?? null;
}
