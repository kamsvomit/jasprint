"use client";

import React from 'react';
import { ShieldCheck, Zap, Award, HeartHandshake } from 'lucide-react';

const REASONS = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Pengalaman 30+ Tahun",
    desc: "Berdiri sejak 1990, kami memahami setiap detail teknik cetak untuk hasil yang sempurna."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Proses Kilat",
    desc: "Mesin modern dan tim profesional memastikan pesanan Anda selesai tepat waktu, bahkan untuk kebutuhan mendesak."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Kualitas Terjamin",
    desc: "Kami hanya menggunakan bahan premium dan tinta berkualitas agar warna tajam dan tahan lama."
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Layanan Personal",
    desc: "Bukan sekadar cetak, kami bantu konsultasi desain dan bahan yang paling sesuai dengan budget Anda."
  }
];

export default function WhyUs() {
  return (
    <section className="py-12 px-4 sm:px-5 bg-arsenic/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-full">
              <span className="text-[10px] font-black tracking-widest uppercase text-red-600">Mengapa jasprint?</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-primary leading-tight">
              Lebih dari Sekadar Percetakan,<br />
              Kami Adalah <span className="text-red-600">Partner Kreatif</span> Anda.
            </h2>
            <p className="text-sm text-secondary leading-relaxed">
              Di jasprint, kami percaya setiap cetakan membawa pesan penting. Itulah mengapa kami tidak pernah kompromi dengan kualitas. Berlokasi di jantung kota Bandung, kami telah melayani ribuan pelanggan dari berbagai kalangan dengan dedikasi yang sama.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-arsenic/10 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-black text-xl">
                  30
                </div>
                <div>
                  <p className="text-sm font-black text-primary">Tahun Pengalaman</p>
                  <p className="text-xs text-secondary">Konsistensi dalam kualitas sejak 1990.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REASONS.map((reason, index) => (
              <div key={index} className="p-6 rounded-3xl bg-card border border-arsenic/10 hover:border-red-200 transition-colors space-y-3">
                <div className="text-red-500">{reason.icon}</div>
                <h3 className="text-sm font-black text-primary">{reason.title}</h3>
                <p className="text-xs text-secondary leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
