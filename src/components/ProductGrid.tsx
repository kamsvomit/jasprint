"use client";
import React from 'react';
import { ProductData } from '../lib/products';
import { ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: ProductData[];
  onSelect: (prod: ProductData) => void;
}

const productVisuals: Record<string, { gradient: string; emoji: string; tag: string; tagColor: string }> = {
  'brosur':     { gradient: 'from-orange-500 to-amber-400',  emoji: '📄', tag: 'Terlaris', tagColor: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' },
  'spanduk':    { gradient: 'from-sky-500 to-blue-400',      emoji: '🚩', tag: 'Outdoor',  tagColor: 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400' },
  'kartu-nama': { gradient: 'from-violet-500 to-purple-400', emoji: '📇', tag: 'Branding', tagColor: 'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400' },
  'sticker':    { gradient: 'from-green-500 to-emerald-400', emoji: '🏷️', tag: 'Custom',   tagColor: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' },
  'nota':       { gradient: 'from-yellow-500 to-lime-400',   emoji: '📒', tag: 'Kantor',   tagColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400' },
  'undangan':   { gradient: 'from-pink-500 to-rose-400',     emoji: '✉️', tag: 'Event',    tagColor: 'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400' },
};
const def = { gradient: 'from-gray-500 to-slate-400', emoji: '🖨️', tag: 'Cetak', tagColor: 'bg-gray-100 text-gray-600' };

export default function ProductGrid({ products, onSelect }: ProductGridProps) {
  return (
    <section className="px-4 sm:px-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-0.5">Layanan Kami</p>
          <p className="text-xl font-black text-primary tracking-tight">Pilih Produk Cetak</p>
        </div>
        <span className="text-xs font-bold text-quaternary">{products.length} produk</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {products.map((prod) => {
          const v = productVisuals[prod.id] ?? def;
          return (
            <button
              key={prod.id}
              onClick={() => onSelect(prod)}
              className="group text-left rounded-2xl overflow-hidden category-section hover:shadow-md active:scale-95 transition-all duration-200"
            >
              {/* Visual area */}
              <div className={`relative h-20 bg-gradient-to-br ${v.gradient} flex items-center justify-center`}>
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{v.emoji}</span>
                <span className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${v.tagColor}`}>
                  {v.tag}
                </span>
              </div>
              {/* Content */}
              <div className="p-3 space-y-1">
                <p className="text-sm font-black text-primary leading-tight group-hover:text-red-600 transition-colors">{prod.name}</p>
                <p className="text-[11px] text-tertiary leading-snug line-clamp-2">{prod.description}</p>
                <div className="flex items-center gap-1 pt-1">
                  <span className="text-[10px] font-black text-red-500">Lihat detail</span>
                  <ChevronRight className="w-3 h-3 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
