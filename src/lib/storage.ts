// src/lib/storage.ts
// Upload file ke Supabase Storage

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? '';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('jasprint_access_token');
}

export type UploadResult = { url: string; error: null } | { url: null; error: string };

/**
 * Upload satu file ke Supabase Storage
 * @param file - File object dari input
 * @param bucket - nama bucket ('products' | 'blog')
 * @param folder - subfolder opsional (misal slug produk)
 */
export async function uploadFile(
  file: File,
  bucket: 'products' | 'blog',
  folder = ''
): Promise<UploadResult> {
  const token = getToken();
  if (!token) return { url: null, error: 'Tidak terautentikasi' };

  // Buat nama file unik: timestamp + nama asli (sanitized)
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const safeName = file.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const filename = `${folder ? folder + '/' : ''}${Date.now()}-${safeName}`;

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${bucket}/${filename}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': file.type || 'image/jpeg',
        'x-upsert': 'true',
      },
      body: file,
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { url: null, error: err.message ?? `Upload gagal (${res.status})` };
  }

  // Public URL
  const url = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}`;
  return { url, error: null };
}

/**
 * Hapus file dari Supabase Storage
 */
export async function deleteFile(bucket: 'products' | 'blog', path: string): Promise<void> {
  const token = getToken();
  if (!token) return;

  // Extract path dari full URL jika perlu
  const filePath = path.includes('/object/public/')
    ? path.split(`/object/public/${bucket}/`)[1]
    : path;

  await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: SUPABASE_ANON_KEY,
    },
  });
}
