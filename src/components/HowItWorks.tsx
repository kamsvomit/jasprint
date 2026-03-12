"use client";
import React from 'react';

const WA_NUMBER = '628123456789';
const WA_MSG = encodeURIComponent('Halo jasprint! Saya mau konsultasi cetak nih 🙏');

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

      <a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-3.5 rounded-2xl text-sm transition-all"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Mulai Pesan Sekarang — Gratis Konsultasi
      </a>
    </section>
  );
}
