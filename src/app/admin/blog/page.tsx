'use client';

import React, { useEffect, useState, useCallback } from 'react';
import AdminShell from '../AdminShell';
import ImageUploader from '../ImageUploader';
import { getPosts, createPost, updatePost, deletePost, type AdminPost } from '../../../lib/supabase-admin';

const BLOG_CATEGORIES = ['Tips Cetak', 'Inspirasi Desain', 'Promo', 'Berita', 'Tutorial', 'Lainnya'];

const emptyPost = (): Omit<AdminPost, 'id' | 'created_at'> => ({
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  cover_url: '',
  category: 'Tips Cetak',
  author: 'Tim jasprint',
  published: false,
  published_at: new Date().toISOString(),
});

export default function BlogPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyPost());
  const [toast, setToast] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [search, setSearch] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await getPosts();
    setPosts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  function openNew() { setEditId(null); setForm(emptyPost()); setShowForm(true); setPreviewMode(false); }
  function openEdit(post: AdminPost) {
    setEditId(post.id);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? '',
      content: post.content ?? '',
      cover_url: post.cover_url ?? '',
      category: post.category ?? 'Tips Cetak',
      author: post.author ?? 'Tim jasprint',
      published: post.published,
      published_at: post.published_at,
    });
    setShowForm(true);
    setPreviewMode(false);
  }

  // Convert plain text ke HTML kalau belum berformat HTML
  function plainTextToHtml(text: string): string {
    if (!text) return '';
    // Kalau sudah ada tag HTML, return as-is
    if (/<[a-z][\s\S]*>/i.test(text)) return text;
    // Convert plain text: paragraf dipisah 2 newline, baris tunggal jadi <br>
    return text
      .split(/\n\n+/)
      .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
      .join('\n');
  }

  async function handleSave() {
    if (!form.title || !form.slug) { showToast('Judul dan slug wajib diisi!'); return; }
    setSaving(true);
    const payload = {
      ...form,
      content: plainTextToHtml(form.content ?? ''),
    };
    if (editId) {
      await updatePost(editId, payload);
    } else {
      await createPost(payload);
    }
    await load();
    setShowForm(false);
    setSaving(false);
    showToast(editId ? 'Artikel diperbarui!' : 'Artikel ditambahkan!');
  }

  async function handleDelete(id: string) {
    await deletePost(id);
    await load();
    setDeleteConfirm(null);
    showToast('Artikel dihapus!');
  }

  async function togglePublished(post: AdminPost) {
    await updatePost(post.id, {
      published: !post.published,
      published_at: !post.published ? new Date().toISOString() : post.published_at,
    });
    await load();
    showToast(!post.published ? 'Artikel dipublish!' : 'Artikel dijadikan draft!');
  }

  function handleTitleChange(val: string) {
    setForm(f => ({
      ...f,
      title: val,
      slug: editId ? f.slug : val.toLowerCase()
        .replace(/[^a-z0-9\s]+/g, '')
        .trim()
        .replace(/\s+/g, '-'),
    }));
  }

  const filtered = posts.filter(p => {
    if (filterStatus === 'published' && !p.published) return false;
    if (filterStatus === 'draft' && p.published) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminShell title="Manajemen Blog" subtitle="Kelola artikel dan konten blog jasprint">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-lg">
          ✓ {toast}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1b1c] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <p className="text-white font-black mb-2">Hapus artikel ini?</p>
            <p className="text-white/40 text-sm mb-5">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-bold hover:bg-white/5 transition-all">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all">Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari artikel..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
          />
          <div className="flex gap-2">
            {(['all', 'published', 'draft'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${filterStatus === s ? 'bg-red-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'}`}
              >
                {s === 'all' ? 'Semua' : s === 'published' ? 'Published' : 'Draft'}
              </button>
            ))}
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all active:scale-95 flex-shrink-0"
          >
            <span>+</span> Tulis Artikel
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <span className="text-white/30 text-sm">{posts.filter(p => p.published).length} published</span>
          <span className="text-white/30 text-sm">·</span>
          <span className="text-white/30 text-sm">{posts.filter(p => !p.published).length} draft</span>
        </div>

        {/* Post list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-white/40 font-medium text-sm">
              {search ? 'Artikel tidak ditemukan.' : 'Belum ada artikel. Tulis artikel pertama!'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(post => (
              <div
                key={post.id}
                className="flex gap-4 p-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-white/10 transition-all group"
              >
                {/* Cover thumbnail */}
                <div className="w-16 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                  {post.cover_url ? (
                    <img src={post.cover_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-xl">📄</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-white font-bold text-sm truncate">{post.title}</p>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0 ${post.published ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-white/30'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-white/30 text-xs truncate">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/20">{post.category}</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/20">{post.author}</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/20">{new Date(post.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => togglePublished(post)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${post.published ? 'text-amber-400/70 bg-amber-500/10 hover:bg-amber-500/20' : 'text-green-400/70 bg-green-500/10 hover:bg-green-500/20'}`}
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => openEdit(post)}
                    className="px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(post.id)}
                    className="px-3 py-1.5 text-xs font-bold text-red-400/60 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-auto p-4">
          <div className="max-w-3xl mx-auto bg-[#161718] border border-white/10 rounded-2xl my-8">
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <p className="text-white font-black">{editId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</p>
                <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
                  <button onClick={() => setPreviewMode(false)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${!previewMode ? 'bg-white/10 text-white' : 'text-white/30'}`}>Edit</button>
                  <button onClick={() => setPreviewMode(true)} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${previewMode ? 'bg-white/10 text-white' : 'text-white/30'}`}>Preview</button>
                </div>
              </div>
              <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white/60 transition-colors text-xl leading-none">×</button>
            </div>

            <div className="max-h-[75vh] overflow-auto">
              {previewMode ? (
                /* Preview — Matches Hero.tsx styling */
                <div className="p-6 sm:p-8 bg-[#0f1011]">
                  <div className="max-w-2xl mx-auto">
                    {form.cover_url && (
                      <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-white/5 border border-white/10">
                        <img src={form.cover_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      {form.category && (
                        <span className="text-[10px] font-black text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                          {form.category}
                        </span>
                      )}
                      <span className="text-xs text-white/30 font-medium">Oleh {form.author}</span>
                    </div>
                    <h1 className="text-white text-2xl sm:text-3xl font-black mb-4 tracking-tight leading-tight">
                      {form.title || 'Judul artikel...'}
                    </h1>
                    {form.excerpt && (
                      <p className="text-white/50 text-sm sm:text-base italic mb-6 border-l-2 border-red-500/30 pl-4 leading-relaxed">
                        {form.excerpt}
                      </p>
                    )}
                    
                    <div className="border-t border-white/[0.06] pt-6">
                      {/<[a-z][\s\S]*>/i.test(form.content) ? (
                        <article
                          className="prose prose-sm sm:prose-base prose-invert max-w-none
                            prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight
                            prose-p:text-white/60 prose-p:leading-relaxed
                            prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-strong:font-black
                            prose-li:text-white/60 prose-img:rounded-xl
                            prose-table:text-sm"
                          dangerouslySetInnerHTML={{ __html: form.content }}
                        />
                      ) : (
                        <div className="whitespace-pre-wrap text-sm sm:text-base text-white/60 leading-relaxed">
                          {form.content || 'Konten artikel akan ditampilkan di sini...'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit form */
                <div className="p-5 space-y-4">
                  {/* Cover */}
                  <div>
                    <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Foto Cover Artikel</label>
                    <ImageUploader
                      bucket="blog"
                      folder={form.slug || 'artikel'}
                      multiple={false}
                      maxFiles={1}
                      value={form.cover_url ? [form.cover_url] : []}
                      onChange={urls => setForm(f => ({ ...f, cover_url: urls[0] ?? '' }))}
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Judul *</label>
                    <input
                      value={form.title}
                      onChange={e => handleTitleChange(e.target.value)}
                      placeholder="5 Tips Desain Kartu Nama yang Memorable"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Slug URL *</label>
                    <input
                      value={form.slug}
                      onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                      placeholder="tips-desain-kartu-nama"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                    />
                  </div>

                  {/* Meta */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Kategori</label>
                      <select
                        value={form.category ?? ''}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all"
                      >
                        {BLOG_CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1a1b1c]">{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Penulis</label>
                      <input
                        value={form.author ?? ''}
                        onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                        placeholder="Tim jasprint"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Ringkasan (Excerpt)</label>
                    <textarea
                      value={form.excerpt ?? ''}
                      onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                      placeholder="Ringkasan singkat artikel ini yang akan muncul di preview..."
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all resize-none"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-black text-white/40 uppercase tracking-widest">Konten Artikel</label>
                      <span className="text-[10px] text-white/20">Mendukung HTML</span>
                    </div>
                    <textarea
                      value={form.content ?? ''}
                      onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                      placeholder="<h2>Pendahuluan</h2>&#10;<p>Isi artikel di sini...</p>&#10;&#10;Atau tulis dalam format HTML untuk formatting yang lebih kaya."
                      rows={14}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all font-mono resize-none"
                    />
                  </div>

                  {/* Status toggle */}
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <div>
                      <p className="text-white text-sm font-bold">{form.published ? 'Published' : 'Draft'}</p>
                      <p className="text-white/30 text-xs">{form.published ? 'Artikel terlihat di website' : 'Artikel tersembunyi dari pengunjung'}</p>
                    </div>
                    <div
                      onClick={() => setForm(f => ({ ...f, published: !f.published, published_at: !f.published ? new Date().toISOString() : f.published_at }))}
                      className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${form.published ? 'bg-green-500' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.published ? 'left-7' : 'left-1'}`} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-white/[0.06]">
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-bold hover:bg-white/5 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-bold transition-all"
              >
                {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Publish Artikel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}