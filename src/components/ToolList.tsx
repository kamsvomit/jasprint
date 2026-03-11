"use client";

import React, { useRef } from 'react';
import { ProductData } from '../lib/products';
import Link from 'next/link';

interface ToolListProps {
  products: ProductData[];
  onSelect: (prod: ProductData) => void;
  searchQuery: string;
}

const productVisuals: Record<string, { bg: string; emoji: string; tag: string }> = {
  'brosur':     { bg: 'from-orange-100 to-amber-50',  emoji: '📄', tag: 'Populer' },
  'spanduk':    { bg: 'from-sky-100 to-blue-50',      emoji: '🚩', tag: 'Outdoor' },
  'kartu-nama': { bg: 'from-violet-100 to-purple-50', emoji: '📇', tag: 'Branding' },
  'sticker':    { bg: 'from-green-100 to-emerald-50', emoji: '🏷️', tag: 'Custom' },
  'nota':       { bg: 'from-yellow-100 to-lime-50',   emoji: '📒', tag: 'NCR' },
  'undangan':   { bg: 'from-pink-100 to-rose-50',     emoji: '✉️', tag: 'Event' },
};
const defaultVisual = { bg: 'from-gray-100 to-slate-50', emoji: '🖨️', tag: 'Cetak' };

function shortDesc(desc: string, max = 60): string {
  if (desc.length <= max) return desc;
  return desc.substring(0, desc.lastIndexOf(' ', max)) + '…';
}

function CategoryRow({ name, items, onSelect }: {
  name: string;
  items: ProductData[];
  onSelect: (prod: ProductData) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-3">
      {/* Row header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-base font-black text-primary">{name}</h3>
        <span className="text-[10px] font-bold text-quaternary uppercase tracking-widest">{items.length} produk</span>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((prod) => {
          const visual = productVisuals[prod.id] ?? defaultVisual;
          return (
            <Link
              key={prod.id}
              href={`/produk/${prod.id}`}
              onClick={(e) => { e.preventDefault(); onSelect(prod); }}
              className="group flex-none w-[160px] snap-start flex flex-col rounded-2xl overflow-hidden border border-subtle bg-card hover:border-red-200 hover:shadow-md transition-all duration-200 active:scale-[0.97]"
            >
              {/* Visual */}
              <div className={`relative bg-gradient-to-br ${visual.bg} flex items-center justify-center h-[100px]`}>
                <span className="text-5xl leading-none select-none group-hover:scale-110 transition-transform duration-300">
                  {visual.emoji}
                </span>
                <span className="absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/75 backdrop-blur-sm text-red-600 border border-red-100">
                  {visual.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-3 gap-1.5">
                <h4 className="text-xs font-black text-primary leading-tight group-hover:text-red-600 transition-colors">
                  {prod.name}
                </h4>
                <p className="text-[10px] text-secondary leading-relaxed flex-1">
                  {shortDesc(prod.description)}
                </p>
                <div className="flex items-center gap-0.5 text-red-500 pt-1.5 border-t border-subtle">
                  <span className="text-[10px] font-black">Pesan sekarang</span>
                  <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function ToolList({ products, onSelect, searchQuery }: ToolListProps) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(products.map(p => p.category))].sort();
  const grouped = categories
    .map(cat => ({ name: cat, items: filtered.filter(p => p.category === cat) }))
    .filter(g => g.items.length > 0);

  return (
    <div className="space-y-6 px-1">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-0.5">Layanan Kami</p>
          <h2 className="text-xl font-black text-primary tracking-tight leading-tight">
            Semua Produk<br />Percetakan
          </h2>
        </div>
        <span className="text-xs font-bold text-quaternary pb-1">{filtered.length} produk</span>
      </div>

      {/* Tiap kategori = 1 row horizontal scrollable */}
      {grouped.map(group => (
        <CategoryRow
          key={group.name}
          name={group.name}
          items={group.items}
          onSelect={onSelect}
        />
      ))}

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm font-bold text-secondary">Produk tidak ditemukan</p>
          <p className="text-xs text-quaternary mt-1">Coba kata kunci lain</p>
        </div>
      )}
    </div>
  );
}