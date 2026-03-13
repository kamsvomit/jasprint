'use client';

import React, { useEffect, useState } from 'react';
import AdminShell from '../AdminShell';
import { getSettings, upsertSetting, type SiteSetting } from '../../../lib/supabase-admin';

const DEFAULT_SETTINGS = [
  { key: 'wa_number', label: 'Nomor WhatsApp', placeholder: '628123456789', hint: 'Format: 62xxx tanpa tanda + atau spasi' },
  { key: 'wa_message', label: 'Pesan WA Default', placeholder: 'Halo jasprint! Saya mau konsultasi cetak nih 🙏', hint: 'Pesan default saat pelanggan klik tombol WA' },
  { key: 'site_name', label: 'Nama Website', placeholder: 'Percetakan jasprint Bandung', hint: 'Muncul di title dan meta' },
  { key: 'site_url', label: 'URL Website', placeholder: 'https://jasprint.vercel.app', hint: 'URL lengkap tanpa trailing slash' },
  { key: 'address', label: 'Alamat Toko', placeholder: 'Jl. Contoh No. 123, Bandung', hint: 'Untuk schema.org dan footer' },
  { key: 'phone_display', label: 'Nomor Telepon (tampil)', placeholder: '+62 812-3456-789', hint: 'Format yang ditampilkan ke pengunjung' },
  { key: 'ig_handle', label: 'Instagram', placeholder: '@jasprint.bdg', hint: 'Handle Instagram tanpa URL' },
  { key: 'founded_year', label: 'Tahun Berdiri', placeholder: '1990', hint: 'Ditampilkan di hero dan badge' },
];

const SQL_MIGRATION = `-- =====================================================
-- JASPRINT ADMIN PANEL - SQL MIGRATION
-- Jalankan di Supabase SQL Editor
-- =====================================================

-- 1. TABEL PRODUK
-- =====================================================
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  long_description text,
  category      text,
  emoji         text default '🖨️',
  tag           text default 'Baru',
  gradient      text default 'from-orange-500 to-amber-400',
  is_active     boolean default true,
  sort_order    int default 99,
  specs         jsonb default '[]',
  features      jsonb default '[]',
  prices        jsonb default '[]',
  faqs          jsonb default '[]',
  tip           text,
  wa_message    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- RLS Products
alter table products enable row level security;
create policy "Public can read active products" on products
  for select using (is_active = true);
create policy "Auth users can manage products" on products
  for all using (auth.role() = 'authenticated');

-- 2. TABEL BLOG (sudah ada, tambahkan jika belum)
-- =====================================================
create table if not exists posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  content       text,
  cover_url     text,
  category      text,
  author        text,
  published     boolean default false,
  published_at  timestamptz default now(),
  created_at    timestamptz default now()
);

alter table posts enable row level security;
create policy "Public can read published posts" on posts
  for select using (published = true);
create policy "Auth users can manage posts" on posts
  for all using (auth.role() = 'authenticated');

-- 3. TABEL KOMPONEN WEBSITE
-- =====================================================
create table if not exists site_components (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  label       text,
  data        jsonb default '{}',
  updated_at  timestamptz default now()
);

alter table site_components enable row level security;
create policy "Public can read components" on site_components
  for select using (true);
create policy "Auth users can manage components" on site_components
  for all using (auth.role() = 'authenticated');

-- 4. TABEL PENGATURAN WEBSITE
-- =====================================================
create table if not exists site_settings (
  id          uuid primary key default gen_random_uuid(),
  key         text unique not null,
  value       text,
  label       text,
  updated_at  timestamptz default now()
);

alter table site_settings enable row level security;
create policy "Public can read settings" on site_settings
  for select using (true);
create policy "Auth users can manage settings" on site_settings
  for all using (auth.role() = 'authenticated');

-- =====================================================
-- SELESAI! Sekarang buat user admin di Supabase:
-- Authentication > Users > Invite User
-- =====================================================`;

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, SiteSetting>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [showSQL, setShowSQL] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'migration'>('settings');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    const { data } = await getSettings();
    const map: Record<string, SiteSetting> = {};
    const vals: Record<string, string> = {};
    (data ?? []).forEach(s => {
      map[s.key] = s;
      vals[s.key] = s.value;
    });
    setSettings(map);
    // Pre-fill defaults if not set
    DEFAULT_SETTINGS.forEach(d => {
      if (!vals[d.key]) vals[d.key] = '';
    });
    setValues(vals);
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    const promises = DEFAULT_SETTINGS.map(d =>
      upsertSetting(d.key, values[d.key] ?? '', d.label)
    );
    await Promise.all(promises);
    await loadSettings();
    setSaving(false);
    showToastMsg('Pengaturan disimpan!');
  }

  function showToastMsg(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  function copySQL() {
    navigator.clipboard?.writeText(SQL_MIGRATION);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2000);
  }

  return (
    <AdminShell title="Pengaturan" subtitle="Konfigurasi dasar website jasprint">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-lg">
          ✓ {toast}
        </div>
      )}

      <div className="max-w-3xl space-y-5">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 w-fit">
          {(['settings', 'migration'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
            >
              {tab === 'settings' ? '⚙️ Pengaturan' : '🗄️ SQL Migration'}
            </button>
          ))}
        </div>

        {activeTab === 'settings' && (
          loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/[0.06]">
                  <p className="text-white font-black text-sm">Konfigurasi Website</p>
                  <p className="text-white/30 text-xs mt-0.5">Perubahan disimpan ke Supabase dan bisa dibaca oleh website.</p>
                </div>
                <div className="p-4 space-y-4">
                  {DEFAULT_SETTINGS.map(setting => (
                    <div key={setting.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest">{setting.label}</label>
                        {settings[setting.key] && (
                          <span className="text-[10px] text-green-400/60 font-medium">✓ Tersimpan</span>
                        )}
                      </div>
                      <input
                        value={values[setting.key] ?? ''}
                        onChange={e => setValues(v => ({ ...v, [setting.key]: e.target.value }))}
                        placeholder={setting.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all"
                      />
                      <p className="text-white/20 text-[11px] mt-1">{setting.hint}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/[0.06] flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-bold transition-all"
                  >
                    {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {saving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
                  </button>
                </div>
              </div>

              {/* Info card */}
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4">
                <p className="text-sky-400 font-bold text-sm mb-2">💡 Cara pakai pengaturan di website</p>
                <p className="text-sky-400/70 text-xs leading-relaxed mb-3">
                  Setelah disimpan, baca pengaturan dari Supabase di lib/constants.ts atau lewat API route. Contoh:
                </p>
                <pre className="bg-black/30 rounded-lg p-3 text-sky-300/80 text-[11px] font-mono overflow-x-auto">{`// lib/constants.ts - baca dari Supabase
const { data } = await supabase
  .from('site_settings')
  .select('key,value');
  
export const WA_NUMBER = data
  .find(s => s.key === 'wa_number')?.value 
  ?? '628123456789';`}</pre>
              </div>
            </>
          )
        )}

        {activeTab === 'migration' && (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
              <p className="text-amber-400 font-bold text-sm mb-1">⚠️ Langkah Setup Awal</p>
              <ol className="text-amber-400/70 text-xs leading-relaxed space-y-1 list-decimal list-inside">
                <li>Buka Supabase Dashboard → SQL Editor</li>
                <li>Copy SQL di bawah dan paste, lalu klik Run</li>
                <li>Buat user admin: Authentication → Users → Invite User</li>
                <li>Login ke admin panel dengan email/password user tersebut</li>
              </ol>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                <p className="text-white font-black text-sm">SQL Migration Script</p>
                <button
                  onClick={copySQL}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${sqlCopied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'}`}
                >
                  {sqlCopied ? '✓ Disalin!' : 'Copy SQL'}
                </button>
              </div>
              <pre className="p-4 text-[11px] font-mono text-white/50 overflow-x-auto max-h-96 leading-relaxed">
                {SQL_MIGRATION}
              </pre>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
              <p className="text-white font-black text-sm mb-3">Checklist Setup</p>
              <div className="space-y-2">
                {[
                  'Supabase project sudah dibuat',
                  'Environment variables sudah diisi (NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)',
                  'SQL migration sudah dijalankan di SQL Editor',
                  'User admin sudah dibuat di Authentication → Users',
                  'Login ke /admin/login berhasil',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                    <div className="w-5 h-5 rounded border border-white/20 flex-shrink-0" />
                    <p className="text-white/50 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
