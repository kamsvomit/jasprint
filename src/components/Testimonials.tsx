"use client";

import React from 'react';
import { motion } from 'motion/react';

const screenshots = Array.from({ length: 19 }, (_, i) => `/testimonials/rev${i + 1}.png`);
const row1 = screenshots.slice(0, 10);
const row2 = screenshots.slice(9);

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-4 flex-shrink-0 items-start"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-arsenic/10 border border-arsenic/8"
            style={{ width: '320px' }}
          >
            <img
              src={src}
              alt={`Review jasprint ${(idx % items.length) + 1}`}
              width={719}
              height={304}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-12 overflow-hidden relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8 text-center space-y-1.5">
        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Kata Mereka</p>
        <h2 className="text-xl font-black text-primary tracking-tight">
          Pelanggan Senang, <span className="text-red-500">Kami Bangga</span>
        </h2>
        <p className="text-sm text-secondary leading-relaxed">
          Ulasan asli — tanpa editan, apa adanya.
        </p>
      </div>

      {/* 2 baris marquee */}
      <div className="space-y-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

      {/* fade kiri kanan */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--card-bg)] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--card-bg)] to-transparent pointer-events-none z-10" />
    </section>
  );
}