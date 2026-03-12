"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface Testimonial {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    user: "Gilang",
    rating: 5,
    comment: "Mantapss, pengerjaan cepat, hasil rapih, packing rapih, pengiriman cepat, recommended seller pokonya, pake bahan GrafTac, Terimakasih",
    date: "Lebih dari 1 tahun lalu"
  },
  {
    id: 2,
    user: "Steven",
    rating: 5,
    comment: "stiker bagus, bahan stiker sangat ok, komposisi warna sesuai dan elegan, good job bosku",
    date: "Lebih dari 1 tahun lalu"
  },
  {
    id: 3,
    user: "Viddy",
    rating: 5,
    comment: "agan nya baik respon cepat ... kualitas ruarrrr biasahhh... thx gan",
    date: "Lebih dari 1 tahun lalu"
  },
  {
    id: 4,
    user: "Thepeople",
    rating: 5,
    comment: "terima kasih gan barang dah nyampe diterima dngn baik sesuai keinginan cepat n aman sukses terus ya gan..",
    date: "Lebih dari 1 tahun lalu"
  },
  {
    id: 5,
    user: "Gracia",
    rating: 4,
    comment: "produk nya ok... rapih banget hasilnya...",
    date: "Lebih dari 1 tahun lalu"
  },
  {
    id: 6,
    user: "Tabitha",
    rating: 5,
    comment: "mantabb ... seller fast respon",
    date: "Lebih dari 1 tahun lalu"
  },
  {
    id: 7,
    user: "Waktu",
    rating: 5,
    comment: "mantab okeh punya sesuai keinginan warna tajam .. terima kasih ... SUKSES SELALU",
    date: "Lebih dari 1 tahun lalu"
  },
  {
    id: 8,
    user: "Ria",
    rating: 5,
    comment: "thaaaannkkkkksssssssssssss gan , suka bnget ...",
    date: "Lebih dari 1 tahun lalu"
  }
];

export default function Testimonials() {
  // Duplicate for seamless loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-12 overflow-hidden bg-subtle/30 border-y border-arsenic/5">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-arsenic/10 flex items-center justify-center text-[10px] font-bold text-arsenic">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
            <span className="ml-1 text-xs font-black text-primary">4.9/5.0</span>
          </div>
        </div>
        <h2 className="text-2xl font-black tracking-tight text-primary">
          Apa Kata <span className="text-red-600">Pelanggan</span> Kami?
        </h2>
        <p className="text-sm text-secondary mt-1">Ulasan asli dari marketplace & pelanggan setia jasprint.</p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex gap-4 whitespace-nowrap py-4"
          animate={{ x: [0, -1920] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {marqueeItems.map((t, idx) => (
            <div 
              key={`${t.id}-${idx}`}
              className="w-[300px] flex-shrink-0 bg-card border border-arsenic/10 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center text-red-600 font-bold text-xs">
                    {t.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary leading-none">{t.user}</p>
                    <p className="text-[9px] text-quaternary mt-1">{t.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-2.5 h-2.5 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-arsenic/10'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 w-3 h-3 text-red-500/10" />
                <p className="text-xs text-secondary leading-relaxed whitespace-normal italic">
                  "{t.comment}"
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-wrap gap-6 items-center justify-center opacity-40 grayscale">
        <p className="text-[10px] font-bold text-arsenic uppercase tracking-widest">Terpercaya di:</p>
        <div className="flex gap-8 items-center">
          <span className="font-black text-sm">Tokopedia</span>
          <span className="font-black text-sm">Shopee</span>
          <span className="font-black text-sm">Google Maps</span>
          <span className="font-black text-sm">WhatsApp Business</span>
        </div>
      </div>
    </section>
  );
}
