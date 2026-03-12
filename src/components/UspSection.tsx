"use client";
import React from 'react';

const usps = [
  {
    icon: '⚡',
    title: '1–3 Hari Selesai',
    desc: 'Pengerjaan cepat tanpa mengorbankan kualitas. Deadline mepet? Kami bisa handle.',
  },
  {
    icon: '💰',
    title: 'Harga Transparan',
    desc: 'Harga langsung dikasih di awal, tidak ada biaya tersembunyi yang bikin kaget.',
  },
  {
    icon: '🎨',
    title: 'Kualitas Premium',
    desc: 'Mesin cetak modern, bahan pilihan, warna akurat. Hasil cetak yang bikin bangga.',
  },
  {
    icon: '📱',
    title: 'Pesan Cukup via WA',
    desc: 'Tidak perlu datang ke toko. Konsultasi, kirim file, bayar — semua dari HP kamu.',
  },
  {
    icon: '🚚',
    title: 'Kirim Se-Indonesia',
    desc: 'Dari Sabang sampai Merauke, pesanan kamu kami antarkan lewat ekspedisi terpercaya.',
  },
  {
    icon: '🏅',
    title: 'Pengalaman 30+ Tahun',
    desc: 'Berdiri sejak 1990. Ribuan pelanggan sudah percaya, dan kepercayaan itu kami jaga.',
  },
];

export default function UspSection() {
  return (
    <section className="px-4 sm:px-5 space-y-4">
      <div className="text-center space-y-1">
        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Kenapa jasprint?</p>
        <p className="text-xl font-black text-primary tracking-tight">Beda dari Percetakan Biasa</p>
        <p className="text-sm text-secondary">Kami tidak sekadar cetak — kami pastikan kamu puas dari awal sampai akhir.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {usps.map((u, i) => (
          <div key={i} className="p-4 rounded-2xl category-section space-y-2 hover:shadow-md transition-shadow">
            <span className="text-2xl">{u.icon}</span>
            <p className="text-sm font-black text-primary leading-tight">{u.title}</p>
            <p className="text-xs text-secondary leading-relaxed">{u.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
