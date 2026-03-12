"use client";
import React from 'react';

const testimonials = [
  { name: 'Rizky A.', role: 'Owner UMKM', text: 'Brosur nya bagus banget, warna tajam dan kertas tebal. Pesan WA langsung direspon, 2 hari udah sampai!', stars: 5 },
  { name: 'Dewi S.', role: 'Event Organizer', text: 'Udah 3x cetak undangan disini. Hasilnya selalu rapi, harganya juga transparan dari awal. Recommended!', stars: 5 },
  { name: 'Budi P.', role: 'Manager Marketing', text: 'Cetak spanduk 10 pcs buat pameran, finishing bagus dan tepat waktu. Jasprint emang beda dari percetakan lain.', stars: 5 },
];

const clients = ['🏢 PT Maju Jaya', '🛍️ Toko Berkah', '🎪 EO Nusantara', '🏥 Klinik Sehat', '📚 Bimbel Cerdas', '🍜 Resto Pak Budi'];

export default function SocialProof() {
  return (
    <section className="px-4 sm:px-5 space-y-5">
      {/* Section label */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-subtle" />
        <span className="text-[10px] font-black text-quaternary uppercase tracking-widest whitespace-nowrap">Apa Kata Pelanggan</span>
        <div className="h-px flex-1 bg-subtle" />
      </div>

      {/* Testimonials */}
      <div className="space-y-3">
        {testimonials.map((t, i) => (
          <div key={i} className="p-4 rounded-2xl category-section space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-black text-primary">{t.name}</p>
                <p className="text-[10px] text-quaternary font-semibold uppercase tracking-wide">{t.role}</p>
              </div>
              <div className="flex gap-0.5 flex-shrink-0">
                {Array.from({length: t.stars}).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-secondary leading-relaxed italic">"{t.text}"</p>
          </div>
        ))}
      </div>

      {/* Client logos text */}
      <div className="p-4 rounded-2xl bg-subtle border border-subtle">
        <p className="text-[10px] font-black text-quaternary uppercase tracking-widest mb-3 text-center">Dipercaya oleh</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {clients.map((c, i) => (
            <span key={i} className="text-xs font-semibold text-secondary px-2.5 py-1 rounded-full bg-card border border-subtle">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
