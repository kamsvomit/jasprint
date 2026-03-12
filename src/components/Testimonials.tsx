"use client";

import React from 'react';
import { motion } from 'motion/react';

const EXCLUDED = new Set([6]);
const screenshots = Array.from({ length: 19 }, (_, i) => i + 1)
  .filter(n => !EXCLUDED.has(n))
  .map(n => `/testimonials/rev${n}.png`);

const row1 = screenshots.slice(0, 9);
const row2 = screenshots.slice(9);

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-2 flex-shrink-0"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 rounded-lg overflow-hidden bg-white"
            style={{ width: '220px' }}
          >
            <img
              src={src}
              alt={`Review jasprint ${(idx % items.length) + 1}`}
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
    <section className="py-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-4 text-center space-y-0.5">
        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Kata Mereka</p>
        <h2 className="text-lg font-black text-primary tracking-tight">
          Pelanggan Senang, <span className="text-red-500">Kami Bangga</span>
        </h2>
      </div>

      <div className="space-y-2">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>

      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--card-bg)] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--card-bg)] to-transparent pointer-events-none z-10" />
    </section>
  );
}