'use client';

import React, { useEffect, useState } from 'react';
import AdminShell from '../AdminShell';
import { getComponents, upsertComponent, type SiteComponent } from '../../../lib/supabase-admin';

// Default values for each component
const COMPONENT_DEFAULTS: Record<string, { label: string; data: Record<string, unknown> }> = {
  hero: {
    label: 'Hero Section',
    data: {
      badge: 'Sejak 1990',
      badgeSub: 'Terpercaya 30+ tahun',
      headline1: 'Bikin Ide Kamu',
      headline2: 'Jadi Nyata.',
      description: 'Lagi cari tempat cetak yang hasilnya rapi dan harganya bersahabat? Dari brosur sampai spanduk, tim jasprint siap bantu wujudkan kebutuhan kamu dengan sepenuh hati.',
      ctaPrimary: 'Tanya-tanya Dulu Yuk (Gratis)',
      trustText: 'pelanggan sudah percaya jasprint',
      trustCount: '1.000+',
    },
  },
  stats: {
    label: 'Stats Bar',
    data: {
      items: [
        { icon: '⚡', label: '1–3 Hari', sub: 'Selesai' },
        { icon: '💬', label: 'Chat WA', sub: 'Langsung Respon' },
        { icon: '✅', label: 'Harga Fix', sub: 'Tanpa Kejutan' },
      ],
    },
  },
  why_us: {
    label: 'Kenapa Jasprint',
    data: {
      title: 'Kenapa Percaya jasprint?',
      subtitle: 'Lebih dari 30 tahun kami bantu ribuan pelanggan wujudkan kebutuhan cetak mereka.',
      items: [
        { icon: '🎨', title: 'Kualitas Premium', desc: 'Mesin cetak modern dengan hasil tajam dan warna akurat.' },
        { icon: '⚡', title: 'Pengerjaan Cepat', desc: 'Standar 1–3 hari kerja, tersedia layanan ekspres.' },
        { icon: '💰', title: 'Harga Transparan', desc: 'Tidak ada biaya tersembunyi. Harga sudah final sejak awal.' },
        { icon: '🚚', title: 'Kirim Se-Indonesia', desc: 'Bekerja sama dengan JNE, J&T, SiCepat, dan lainnya.' },
      ],
    },
  },
  faq: {
    label: 'FAQ (Pertanyaan Umum)',
    data: {
      title: 'Pertanyaan Umum',
      subtitle: 'Segala hal yang sering ditanyakan pelanggan jasprint.',
      items: [
        { question: 'Apakah bisa cetak satuan atau harus banyak?', answer: 'Tergantung produknya. Untuk beberapa item seperti kartu nama atau sticker, kami memiliki minimum order yang sangat terjangkau.' },
        { question: 'Berapa lama proses pengerjaannya?', answer: 'Rata-rata 1-3 hari kerja setelah desain disetujui. Tersedia layanan kilat untuk kebutuhan mendesak.' },
        { question: 'Apakah jasprint bisa bantu buatkan desainnya?', answer: 'Tentu! Kami memiliki tim desainer yang siap membantu mewujudkan ide Anda.' },
        { question: 'Bagaimana cara pengiriman ke luar kota Bandung?', answer: 'Kami bekerja sama dengan berbagai ekspedisi terpercaya untuk pengiriman ke seluruh Indonesia.' },
        { question: 'Apakah ada garansi jika hasil cetak tidak sesuai?', answer: 'Kepuasan Anda adalah prioritas kami. Jika terjadi kesalahan cetak dari pihak kami, kami siap memberikan solusi terbaik.' },
      ],
    },
  },
  testimonials: {
    label: 'Testimoni',
    data: {
      title: 'Kata Pelanggan Kami',
      subtitle: 'Ribuan pelanggan sudah percaya jasprint.',
      items: [
        { id: 1, user: 'Gilang', rating: 5, comment: 'Mantapss, pengerjaan cepat, hasil rapih, packing rapih, pengiriman cepat. Recommended seller!', date: 'Lebih dari 1 tahun lalu' },
        { id: 2, user: 'Steven', rating: 5, comment: 'Stiker bagus, bahan stiker sangat ok, komposisi warna sesuai dan elegan, good job!', date: 'Lebih dari 1 tahun lalu' },
        { id: 3, user: 'Viddy', rating: 5, comment: 'Baik respon cepat, kualitas luar biasa!', date: 'Lebih dari 1 tahun lalu' },
      ],
    },
  },
  cta: {
    label: 'CTA Banner',
    data: {
      title: 'Siap Cetak Sekarang?',
      subtitle: 'Hubungi kami via WhatsApp untuk konsultasi gratis.',
      buttonText: 'Chat WhatsApp Sekarang',
      note: 'Respon cepat · Konsultasi gratis · Harga terbaik',
    },
  },
};

type ComponentKey = keyof typeof COMPONENT_DEFAULTS;

export default function ComponentsPage() {
  const [components, setComponents] = useState<Record<string, SiteComponent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<ComponentKey>('hero');
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [toast, setToast] = useState('');

  useEffect(() => {
    loadComponents();
  }, []);

  async function loadComponents() {
    setLoading(true);
    const { data } = await getComponents();
    const map: Record<string, SiteComponent> = {};
    (data ?? []).forEach(c => { map[c.key] = c; });
    setComponents(map);
    setLoading(false);
  }

  useEffect(() => {
    const saved = components[activeKey]?.data;
    const defaults = COMPONENT_DEFAULTS[activeKey]?.data ?? {};
    setFormData(saved ?? defaults);
  }, [activeKey, components]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  async function handleSave() {
    setSaving(activeKey);
    await upsertComponent(activeKey, COMPONENT_DEFAULTS[activeKey].label, formData);
    await loadComponents();
    setSaving(null);
    showToast('Komponen disimpan!');
  }

  function updateField(key: string, value: unknown) {
    setFormData(f => ({ ...f, [key]: value }));
  }

  // For array fields (items)
  function updateArrayItem(arrayKey: string, index: number, field: string, value: string) {
    setFormData(f => {
      const arr = [...(f[arrayKey] as Record<string, unknown>[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...f, [arrayKey]: arr };
    });
  }

  function addArrayItem(arrayKey: string, template: Record<string, unknown>) {
    setFormData(f => ({
      ...f,
      [arrayKey]: [...(f[arrayKey] as Record<string, unknown>[]), template],
    }));
  }

  function removeArrayItem(arrayKey: string, index: number) {
    setFormData(f => ({
      ...f,
      [arrayKey]: (f[arrayKey] as Record<string, unknown>[]).filter((_, i) => i !== index),
    }));
  }

  const keys = Object.keys(COMPONENT_DEFAULTS) as ComponentKey[];

  return (
    <AdminShell title="Komponen Website" subtitle="Edit konten hero, FAQ, testimoni, dan bagian web lainnya">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-lg">
          ✓ {toast}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-5xl flex gap-5">
          {/* Sidebar nav */}
          <aside className="w-48 flex-shrink-0 space-y-1">
            {keys.map(key => {
              const def = COMPONENT_DEFAULTS[key];
              const isSaved = !!components[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${activeKey === key ? 'bg-red-500/15 text-red-400 border border-red-500/20' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                >
                  <p className="font-bold leading-tight">{def.label}</p>
                  <p className={`text-[10px] mt-0.5 ${isSaved ? 'text-green-400/60' : 'text-white/20'}`}>
                    {isSaved ? '✓ Tersimpan di DB' : '· Default'}
                  </p>
                </button>
              );
            })}
          </aside>

          {/* Editor */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                <p className="text-white font-black text-sm">{COMPONENT_DEFAULTS[activeKey].label}</p>
                <button
                  onClick={handleSave}
                  disabled={saving === activeKey}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-xs font-bold transition-all"
                >
                  {saving === activeKey && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {saving === activeKey ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Render fields based on activeKey */}
                {activeKey === 'hero' && (
                  <>
                    {['badge', 'badgeSub', 'headline1', 'headline2', 'description', 'ctaPrimary', 'trustCount', 'trustText'].map(field => (
                      <div key={field}>
                        <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                        {field === 'description' ? (
                          <textarea
                            value={(formData[field] as string) ?? ''}
                            onChange={e => updateField(field, e.target.value)}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all resize-none"
                          />
                        ) : (
                          <input
                            value={(formData[field] as string) ?? ''}
                            onChange={e => updateField(field, e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </>
                )}

                {activeKey === 'stats' && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-black text-white/40 uppercase tracking-widest">Item Stats</label>
                      <button onClick={() => addArrayItem('items', { icon: '⭐', label: 'Label', sub: 'Sub' })} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                    </div>
                    {(formData.items as {icon:string;label:string;sub:string}[] ?? []).map((item, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input value={item.icon} onChange={e => updateArrayItem('items', i, 'icon', e.target.value)} placeholder="⭐" className="w-12 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm text-center focus:outline-none focus:border-red-500/50" />
                        <input value={item.label} onChange={e => updateArrayItem('items', i, 'label', e.target.value)} placeholder="Label" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
                        <input value={item.sub} onChange={e => updateArrayItem('items', i, 'sub', e.target.value)} placeholder="Sub" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
                        <button onClick={() => removeArrayItem('items', i)} className="px-2 text-red-400/60 hover:text-red-400">×</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeKey === 'why_us' && (
                  <>
                    {['title', 'subtitle'].map(field => (
                      <div key={field}>
                        <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5 capitalize">{field}</label>
                        <input value={(formData[field] as string) ?? ''} onChange={e => updateField(field, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                    ))}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest">Item Keunggulan</label>
                        <button onClick={() => addArrayItem('items', { icon: '⭐', title: '', desc: '' })} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                      </div>
                      {(formData.items as {icon:string;title:string;desc:string}[] ?? []).map((item, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input value={item.icon} onChange={e => updateArrayItem('items', i, 'icon', e.target.value)} className="w-12 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm text-center focus:outline-none focus:border-red-500/50" />
                          <input value={item.title} onChange={e => updateArrayItem('items', i, 'title', e.target.value)} placeholder="Judul" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
                          <input value={item.desc} onChange={e => updateArrayItem('items', i, 'desc', e.target.value)} placeholder="Deskripsi" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
                          <button onClick={() => removeArrayItem('items', i)} className="px-2 text-red-400/60 hover:text-red-400">×</button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeKey === 'faq' && (
                  <>
                    {['title', 'subtitle'].map(field => (
                      <div key={field}>
                        <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5 capitalize">{field}</label>
                        <input value={(formData[field] as string) ?? ''} onChange={e => updateField(field, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                    ))}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest">Pertanyaan & Jawaban</label>
                        <button onClick={() => addArrayItem('items', { question: '', answer: '' })} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                      </div>
                      {(formData.items as {question:string;answer:string}[] ?? []).map((item, i) => (
                        <div key={i} className="mb-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 space-y-2">
                          <div className="flex gap-2">
                            <input value={item.question} onChange={e => updateArrayItem('items', i, 'question', e.target.value)} placeholder="Pertanyaan..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
                            <button onClick={() => removeArrayItem('items', i)} className="px-2 text-red-400/60 hover:text-red-400">×</button>
                          </div>
                          <textarea value={item.answer} onChange={e => updateArrayItem('items', i, 'answer', e.target.value)} placeholder="Jawaban..." rows={2}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50 resize-none" />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeKey === 'testimonials' && (
                  <>
                    {['title', 'subtitle'].map(field => (
                      <div key={field}>
                        <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5 capitalize">{field}</label>
                        <input value={(formData[field] as string) ?? ''} onChange={e => updateField(field, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                    ))}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest">Testimoni</label>
                        <button onClick={() => addArrayItem('items', { id: Date.now(), user: '', rating: 5, comment: '', date: 'Baru-baru ini' })} className="text-xs text-red-400 font-bold hover:text-red-300 transition-colors">+ Tambah</button>
                      </div>
                      {(formData.items as {user:string;rating:number;comment:string;date:string}[] ?? []).map((item, i) => (
                        <div key={i} className="mb-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 space-y-2">
                          <div className="flex gap-2">
                            <input value={item.user} onChange={e => updateArrayItem('items', i, 'user', e.target.value)} placeholder="Nama" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
                            <select value={item.rating} onChange={e => updateArrayItem('items', i, 'rating', e.target.value)} className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-red-500/50">
                              {[5,4,3,2,1].map(r => <option key={r} value={r} className="bg-[#1a1b1c]">{r}⭐</option>)}
                            </select>
                            <button onClick={() => removeArrayItem('items', i)} className="px-2 text-red-400/60 hover:text-red-400">×</button>
                          </div>
                          <textarea value={item.comment} onChange={e => updateArrayItem('items', i, 'comment', e.target.value)} placeholder="Komentar..." rows={2}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50 resize-none" />
                          <input value={item.date} onChange={e => updateArrayItem('items', i, 'date', e.target.value)} placeholder="Lebih dari 1 tahun lalu" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeKey === 'cta' && (
                  <>
                    {['title', 'subtitle', 'buttonText', 'note'].map(field => (
                      <div key={field}>
                        <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-1.5 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input value={(formData[field] as string) ?? ''} onChange={e => updateField(field, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <p className="text-white/20 text-xs mt-3 text-center">
              💡 Setelah simpan, buat fungsi fetch dari Supabase di komponen web untuk membaca data ini secara dinamis.
            </p>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
