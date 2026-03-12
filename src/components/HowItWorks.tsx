"use client";
import React from 'react';

const steps = [
  {
    n: '01',
    emoji: '💬',
    title: 'Chat via WhatsApp',
    desc: 'Ceritakan kebutuhan cetak kamu — jenis produk, ukuran, jumlah, dan tenggat waktu. Gratis konsultasi.',
  },
  {
    n: '02',
    emoji: '💸',
    title: 'Dapat Harga & Konfirmasi',
    desc: 'Kami kasih estimasi harga langsung. Setuju? Kirim file desain dan lakukan pembayaran DP.',
  },
  {
    n: '03',
    emoji: '🖨️',
    title: 'Proses Cetak',
    desc: 'Tim kami mulai proses cetak dengan standar kualitas ketat. Kamu bisa tracking status via WA.',
  },
  {
    n: '04',
    emoji: '📦',
    title: 'Terima Pesanan',
    desc: 'Pesanan selesai dikirim ke alamat kamu atau bisa diambil langsung di workshop kami di Bandung.',
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 sm:px-5 space-y-5">
      <div className="text-center space-y-1">
        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Prosesnya Mudah</p>
        <p className="text-xl font-black text-primary tracking-tight">Pesan dalam 4 Langkah</p>
        <p className="text-sm text-secondary">Dari konsultasi sampai terima produk, semua kami handle dengan profesional.</p>
      </div>

      <div className="relative space-y-3">
        {/* Vertical line connector */}
        <div className="absolute left-7 top-10 bottom-10 w-px bg-subtle hidden sm:block" />

        {steps.map((s, i) => (
          <div key={i} className="relative flex gap-4 p-4 rounded-2xl category-section">
            {/* Number + emoji */}
            <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center shadow-sm">
              <span className="text-lg">{s.emoji}</span>
            </div>
            {/* Content */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-red-400 tracking-widest">{s.n}</span>
                <p className="text-sm font-black text-primary">{s.title}</p>
              </div>
              <p className="text-xs text-secondary leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}