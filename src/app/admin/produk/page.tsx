'use client';

import React, { useEffect, useState, useCallback } from 'react';
import AdminShell from '../AdminShell';
import ImageUploader from '../ImageUploader';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
  type AdminProduct, type ProductSpec, type ProductPrice, type ProductFaq,
} from '../../../lib/supabase-admin';

const CATEGORIES = ['Promosi', 'Identitas', 'Kebutuhan Kantor', 'Event & Acara', 'Luar Ruang', 'Lain-lain'];
const GRADIENTS = [
  'from-orange-500 to-amber-400',
  'from-sky-500 to-blue-400',
  'from-violet-500 to-purple-400',
  'from-green-500 to-emerald-400',
  'from-yellow-500 to-lime-400',
  'from-pink-500 to-rose-400',
  'from-red-500 to-orange-400',
  'from-teal-500 to-cyan-400',
];

const emptyProduct = (): Omit<AdminProduct, 'id' | 'created_at' | 'updated_at'> => ({
  slug: '',
  name: '',
  description: '',
  long_description: '',
  category: 'Promosi',
  emoji: '🖨️',
  tag: 'Baru',
  gradient: GRADIENTS[0],
  is_active: true,
  sort_order: 99,
  images: [],
  specs: [],
  features: [],
  prices: [],
  faqs: [],
  tip: '',
  wa_message: '',
});

export default function ProdukPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [form, setForm] = useState(emptyProduct());
  const [toast, setToast] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await getProducts();
    setProducts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function openNew() {
    setEditId(null);
    setForm(emptyProduct());
    setShowForm(true);
  }

  function openEdit(prod: AdminProduct) {
    setEditId(prod.id);
    setForm({
      slug: prod.slug,
      name: prod.name,
      description: prod.description,
      long_description: prod.long_description ?? '',
      category: prod.category,
      emoji: prod.emoji,
      tag: prod.tag,
      gradient: prod.gradient,
      is_active: prod.is_active,
      sort_order: prod.sort_order,
      images: prod.images ?? [],
      specs: prod.specs ?? [],
      features: prod.features ?? [],
      prices: prod.prices ?? [],
      faqs: prod.faqs ?? [],
      tip: prod.tip ?? '',
      wa_message: prod.wa_message ?? '',
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name || !form.slug) { showToast('Nama dan slug wajib diisi!'); return; }
    setSaving(true);
    if (editId) {
      await updateProduct(editId, form);
    } else {
      await createProduct(form);
    }
    await load();
    setShowForm(false);
    setSaving(false);
    showToast(editId ? 'Produk diperbarui!' : 'Produk ditambahkan!');
  }

  async function handleDelete(id: string) {
    await deleteProduct(id);
    await load();
    setDeleteConfirm(null);
    showToast('Produk dihapus!');
  }

  // Array field helpers
  function addSpec() { setForm(f => ({ ...f, specs: [...f.specs, { icon: '📌', label: '', value: '' }] })); }
  function updateSpec(i: number, field: keyof ProductSpec, val: string) {
    setForm(f => { const s = [...f.specs]; s[i] = { ...s[i], [field]: val }; return { ...f, specs: s }; });
  }
  function removeSpec(i: number) { setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) })); }

  function addFeature() { setForm(f => ({ ...f, features: [...f.features, ''] })); }
  function updateFeature(i: number, val: string) {
    setForm(f => { const a = [...f.features]; a[i] = val; return { ...f, features: a }; });
  }
  function removeFeature(i: number) { setForm(f => ({ ...f, features: f.features.filter((_, idx) => idx !== i) })); }

  function addPrice() { setForm(f => ({ ...f, prices: [...f.prices, { label: '', price: '' }] })); }
  function updatePrice(i: number, field: keyof ProductPrice, val: string) {
    setForm(f => { const a = [...f.prices]; a[i] = { ...a[i], [field]: val }; return { ...f, prices: a }; });
  }
  function removePrice(i: number) { setForm(f => ({ ...f, prices: f.prices.filter((_, idx) => idx !== i) })); }

  function addFaq() { setForm(f => ({ ...f, faqs: [...f.faqs, { question: '', answer: '' }] })); }
  function updateFaq(i: number, field: keyof ProductFaq, val: string) {
    setForm(f => { const a = [...f.faqs]; a[i] = { ...a[i], [field]: val }; return { ...f, faqs: a }; });
  }
  function removeFaq(i: number) { setForm(f => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) })); }

  // Auto-generate slug from name
  function handleNameChange(val: string) {
    setForm(f => ({
      ...f,
      name: val,
      slug: editId ? f.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  }

  return (
    <AdminShell title="Manajemen Produk" subtitle="Kelola semua produk cetak jasprint">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-lg animate-fade-in">
          ✓ {toast}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1b1c] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <p className="text-white font-black mb-2">Hapus produk ini?</p>
            <p className="text-white/40 text-sm mb-5">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-bold hover:bg-white/5 transition-all">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all">Hapus</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl space-y-4">
        {/* Header actions */}
        <div className="flex items-center justify-between">
          <p className="text-white/40 text-sm">{products.length} produk terdaftar</p>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            <span>+</span> Tambah Produk
          </button>
        </div>

        {/* Product list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-4xl mb-3">🖨️</p>
            <p className="text-white/40 font-medium text-sm">Belum ada produk. Tambahkan produk pertama!</p>
            <button onClick={openNew} className="mt-4 text-red-400 text-sm font-bold hover:text-red-300 transition-colors">
              + Tambah Produk
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {products.map(prod => (
              <div
                key={prod.id}
                className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-white/10 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prod.gradient} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xl">{prod.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-white font-bold text-sm truncate">{prod.name}</p>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${prod.is_active ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-white/30'}`}>
                      {prod.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <p className="text-white/30 text-xs truncate">{prod.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/20 font-mono">/{prod.slug}</span>
                    <span className="text-[10px] text-white/20">·</span>
                    <span className="text-[10px] text-white/20">{prod.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(prod)}
                    className="px-3 py-1.5 text-xs font-bold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(prod.id)}
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
          <div className="max-w-2xl mx-auto bg-[#161718] border border-white/10 rounded-2xl my-8">
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <p className="text-white font-black">{editId ? 'Edit Produk' : 'Tambah Produk Baru'}</p>
                <div className="flex bg-white/5 p-1 rounded-lg">
                  <button
                    onClick={() => setPreviewMode(false)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${!previewMode ? 'bg-red-500 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                  >
                    Editor
                  </button>
                  <button
                    onClick={() => setPreviewMode(true)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${previewMode ? 'bg-red-500 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <button onClick={() => { setShowForm(false); setPreviewMode(false); }} className="text-white/30 hover:text-white/60 transition-colors text-xl leading-none">×</button>
            </div>

            <div className="max-h-[75vh] overflow-auto">
              {previewMode ? (
                /* Preview — Matches Hero.tsx styling */
                <div className="p-6 sm:p-8 bg-[#0f1011] text-left">
                  <div className="max-w-2xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 text-red-500">
                        <span className="text-sm font-bold">← Kembali</span>
                      </div>
                      <div className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                        {form.category}
                      </div>
                    </div>

                    {/* Images */}
                    {form.images.length > 0 && (
                      <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5 border border-white/10">
                        <img src={form.images[0]} alt="" className="w-full h-full object-cover" />
                        {form.images.length > 1 && (
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                            {form.images.map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/30'}`} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <h2 className="text-white text-2xl font-black mb-2 tracking-tight">{form.name || 'Nama Produk...'}</h2>
                      <p className="text-white/60 text-sm leading-relaxed mb-6">{form.description || 'Deskripsi singkat...'}</p>
                      
                      {/* Specs & Details */}
                      <div className="pt-6 border-t border-white/10 space-y-6">
                        {/* Specs Grid */}
                        {form.specs.length > 0 && (
                          <div className="grid grid-cols-2 gap-3">
                            {form.specs.map((s, i) => (
                              <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                                <span className="text-lg">{s.icon}</span>
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">{s.label}</p>
                                <p className="text-xs font-bold text-white mt-0.5">{s.value}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Features */}
                        {form.features.length > 0 && (
                          <div className="rounded-xl border border-white/10 overflow-hidden">
                            <div className="px-4 py-2.5 bg-white/5 border-b border-white/10">
                              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Keunggulan</p>
                            </div>
                            <div className="divide-y divide-white/5">
                              {form.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5">
                                  <span className="text-red-500 font-black text-sm">✓</span>
                                  <p className="text-xs font-semibold text-white/60">{f}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Prices */}
                        {form.prices.length > 0 && (
                          <div className="rounded-xl border border-white/10 overflow-hidden">
                            <div className="px-4 py-2.5 bg-white/5 border-b border-white/10">
                              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Estimasi Harga</p>
                            </div>
                            <div className="divide-y divide-white/5">
                              {form.prices.map((p, i) => (
                                <div key={i} className="flex items-center justify-between px-4 py-2.5">
                                  <p className="text-xs font-bold text-white/80">{p.label}</p>
                                  <p className="text-xs font-black text-red-400">{p.price}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Long Description — Matches Hero.tsx */}
                        {form.long_description && (
                          <div className="pt-6 border-t border-white/10">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Tentang Produk Ini</p>
                            {(/<[a-z][\s\S]*>/i.test(form.long_description) || form.long_description.includes('</')) ? (
                              <article
                                className="prose prose-sm prose-invert max-w-none
                                  prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight
                                  prose-p:text-white/60 prose-p:leading-relaxed
                                  prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
                                  prose-strong:text-white prose-strong:font-black
                                  prose-li:text-white/60 prose-img:rounded-xl
                                  prose-table:text-sm"
                                dangerouslySetInnerHTML={{ __html: form.long_description }}
                              />
                            ) : (
                              <div className="space-y-3">
                                {form.long_description.split('\n\n').map((para, i) => (
                                  <p key={i} className="text-xs text-white/60 leading-relaxed">{para}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 space-y-5">
                  {/* Basic info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Nama Produk *</label>
                      <input
                        value={form.name}
                        onChange={e => handleNameChange(e.target.value)}
                        placeholder="Cetak Kartu Nama"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
                      />
                    </div>
                    {/* ... rest of the form ... */}
                <div>
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Slug URL *</label>
                  <input
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="kartu-nama"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Kategori</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1a1b1c]">{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Deskripsi Singkat</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Deskripsi singkat produk untuk ditampilkan di grid..."
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all resize-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Deskripsi Panjang</label>
                  <textarea
                    value={form.long_description ?? ''}
                    onChange={e => setForm(f => ({ ...f, long_description: e.target.value }))}
                    placeholder="Deskripsi lengkap produk, keunggulan, cocok untuk siapa..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Visual */}
              <div>
                <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-3">Visual Kartu</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/30 mb-2">Emoji</p>
                    <input
                      value={form.emoji}
                      onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))}
                      placeholder="🖨️"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm text-center text-2xl focus:outline-none focus:border-red-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-2">Tag Label</p>
                    <input
                      value={form.tag}
                      onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                      placeholder="Terlaris"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-white/30 mb-2">Gradient Warna</p>
                  <div className="flex flex-wrap gap-2">
                    {GRADIENTS.map(g => (
                      <button
                        key={g}
                        onClick={() => setForm(f => ({ ...f, gradient: g }))}
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g} transition-all ${form.gradient === g ? 'ring-2 ring-white ring-offset-2 ring-offset-[#161718] scale-110' : 'hover:scale-105'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Foto Produk */}
              <div>
                <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">
                  Foto Produk <span className="text-white/20 font-normal normal-case tracking-normal">· Foto pertama jadi cover · Maks 5 foto</span>
                </label>
                <ImageUploader
                  bucket="products"
                  folder={form.slug || 'produk'}
                  multiple
                  maxFiles={5}
                  value={form.images}
                  onChange={imgs => setForm(f => ({ ...f, images: imgs }))}
                />
              </div>

              {/* Specs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest">Spesifikasi</label>
                  <button onClick={addSpec} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                </div>
                <div className="space-y-2">
                  {form.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={spec.icon} onChange={e => updateSpec(i, 'icon', e.target.value)}
                        placeholder="📌" className="w-12 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm text-center focus:outline-none focus:border-red-500/50 transition-all" />
                      <input value={spec.label} onChange={e => updateSpec(i, 'label', e.target.value)}
                        placeholder="Label" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                      <input value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)}
                        placeholder="Nilai" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                      <button onClick={() => removeSpec(i)} className="px-2 text-red-400/60 hover:text-red-400 transition-colors">×</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest">Keunggulan</label>
                  <button onClick={addFeature} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                </div>
                <div className="space-y-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={f} onChange={e => updateFeature(i, e.target.value)}
                        placeholder="Kelebihan produk ini..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                      <button onClick={() => removeFeature(i)} className="px-2 text-red-400/60 hover:text-red-400 transition-colors">×</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prices */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest">Estimasi Harga</label>
                  <button onClick={addPrice} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                </div>
                <div className="space-y-2">
                  {form.prices.map((p, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={p.label} onChange={e => updatePrice(i, 'label', e.target.value)}
                        placeholder="Art Carton 260gsm (100 pcs)" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                      <input value={p.price} onChange={e => updatePrice(i, 'price', e.target.value)}
                        placeholder="Mulai Rp 65.000" className="w-36 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                      <button onClick={() => removePrice(i)} className="px-2 text-red-400/60 hover:text-red-400 transition-colors">×</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest">FAQ Produk</label>
                  <button onClick={addFaq} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                </div>
                <div className="space-y-3">
                  {form.faqs.map((faq, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 space-y-2">
                      <div className="flex gap-2">
                        <input value={faq.question} onChange={e => updateFaq(i, 'question', e.target.value)}
                          placeholder="Pertanyaan yang sering ditanya..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                        <button onClick={() => removeFaq(i)} className="px-2 text-red-400/60 hover:text-red-400 transition-colors">×</button>
                      </div>
                      <textarea value={faq.answer} onChange={e => updateFaq(i, 'answer', e.target.value)}
                        placeholder="Jawaban singkat dan jelas..." rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all resize-none" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip & WA */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Tips Order</label>
                  <textarea
                    value={form.tip ?? ''}
                    onChange={e => setForm(f => ({ ...f, tip: e.target.value }))}
                    placeholder="Tips berguna untuk pelanggan sebelum order..."
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5">Pesan WA Kustom</label>
                  <input
                    value={form.wa_message ?? ''}
                    onChange={e => setForm(f => ({ ...f, wa_message: e.target.value }))}
                    placeholder="Halo jasprint! Saya mau tanya cetak kartu nama..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Status & order */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                    className={`w-10 h-6 rounded-full transition-colors relative ${form.is_active ? 'bg-green-500' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.is_active ? 'left-5' : 'left-1'}`} />
                  </div>
                  <span className="text-white/60 text-sm font-medium">{form.is_active ? 'Aktif' : 'Nonaktif'}</span>
                </label>
                <div>
                  <label className="text-xs text-white/40 font-bold mr-2">Urutan:</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                    className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-sm text-center focus:outline-none focus:border-red-500/50 transition-all"
                  />
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
                {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
