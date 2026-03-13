'use client';

import React, { useEffect, useState } from 'react';
import AdminShell from '../AdminShell';
import { getProducts, getPosts, type AdminProduct, type AdminPost } from '../../../lib/supabase-admin';

export default function DashboardPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getPosts()]).then(([p, b]) => {
      setProducts(p.data ?? []);
      setPosts(b.data ?? []);
      setLoading(false);
    });
  }, []);

  const publishedPosts = posts.filter(p => p.published).length;
  const activeProducts = products.filter(p => p.is_active).length;

  const stats = [
    { label: 'Total Produk',      value: products.length, sub: `${activeProducts} aktif`,     icon: '🖨️', color: 'from-orange-500/20 to-amber-500/10 border-orange-500/20' },
    { label: 'Total Blog',        value: posts.length,    sub: `${publishedPosts} published`,  icon: '📝', color: 'from-sky-500/20 to-blue-500/10 border-sky-500/20' },
    { label: 'Komponen Web',      value: 5,               sub: 'Hero, FAQ, Testimoni...',      icon: '🧩', color: 'from-violet-500/20 to-purple-500/10 border-violet-500/20' },
    { label: 'Pengaturan Aktif',  value: 4,               sub: 'WA, Nama, Alamat...',          icon: '⚙️', color: 'from-green-500/20 to-emerald-500/10 border-green-500/20' },
  ];

  const quickLinks = [
    { href: '/admin/produk',     label: 'Tambah Produk Baru',    icon: '➕', desc: 'Tambahkan produk cetak ke website' },
    { href: '/admin/blog',       label: 'Tulis Artikel Baru',    icon: '✍️', desc: 'Buat konten blog untuk SEO' },
    { href: '/admin/components', label: 'Edit Hero Section',     icon: '🎨', desc: 'Ubah teks dan CTA utama website' },
    { href: '/admin/settings',   label: 'Update Nomor WA',       icon: '📱', desc: 'Ganti nomor WhatsApp bisnis' },
  ];

  return (
    <AdminShell title="Dashboard" subtitle="Selamat datang di admin panel jasprint">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-6 max-w-5xl">
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map(s => (
              <div
                key={s.label}
                className={`bg-gradient-to-br ${s.color} border rounded-2xl p-4`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <p className="text-white text-2xl font-black leading-none">{s.value}</p>
                <p className="text-white/70 text-xs font-bold mt-1">{s.label}</p>
                <p className="text-white/30 text-[10px] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div>
            <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">Aksi Cepat</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-white/10 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{l.icon}</span>
                  <div>
                    <p className="text-white text-sm font-bold group-hover:text-red-400 transition-colors">{l.label}</p>
                    <p className="text-white/30 text-xs mt-0.5">{l.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-red-400/60 transition-all ml-auto group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Recent posts */}
          {posts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">Blog Terbaru</p>
                <a href="/admin/blog" className="text-red-400 text-xs font-bold hover:text-red-300 transition-colors">Lihat semua →</a>
              </div>
              <div className="space-y-2">
                {posts.slice(0, 5).map(post => (
                  <div key={post.id} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate">{post.title}</p>
                      <p className="text-white/30 text-xs mt-0.5">{post.category ?? 'Tanpa kategori'} · {new Date(post.created_at).toLocaleDateString('id-ID')}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${post.published ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-white/30'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SQL setup hint jika belum ada data */}
          {products.length === 0 && posts.length === 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-400 font-bold text-sm mb-2">⚠️ Setup Supabase diperlukan</p>
              <p className="text-amber-400/70 text-xs leading-relaxed mb-3">
                Jalankan SQL migration di bawah ini di Supabase SQL Editor untuk membuat tabel yang diperlukan.
              </p>
              <a href="/admin/settings" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors">
                Lihat SQL Migration →
              </a>
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
