"use client";

import React, { useState } from 'react';
import { ProductData } from '../lib/products';
import { getToolIcon } from '../lib/icons';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ToolListProps {
  products: ProductData[];
  onSelect: (prod: ProductData) => void;
  searchQuery: string;
}

export default function ToolList({ products, onSelect, searchQuery }: ToolListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({});

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(products.map(p => p.category))].sort();
  const groupedProducts = categories
    .map(cat => ({
      name: cat,
      items: filteredProducts.filter(p => p.category === cat).sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter(group => group.items.length > 0);

  const toggleGroup = (idx: number) => {
    setExpandedGroups(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div id="tools-list-container" className="space-y-6 px-1">
      <div className="text-center mb-4 space-y-2">
        <h2 className="text-xl font-black text-primary tracking-tight">Katalog Produk Percetakan</h2>
        <p className="text-sm text-secondary leading-relaxed max-w-lg mx-auto">
          Temukan berbagai layanan percetakan berkualitas yang kami sediakan untuk kebutuhan bisnis dan personal Anda.
        </p>
      </div>

      {groupedProducts.map((group, gIdx) => (
        <div key={group.name} className="rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 category-section">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-primary">{group.name}</h3>
            {group.items.length > 4 && (
              <button
                onClick={() => toggleGroup(gIdx)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-subtle text-red-600 text-xs font-bold hover:bg-subtle transition-colors"
              >
                <span>{expandedGroups[gIdx] ? 'Sembunyikan' : 'Lihat semua'}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedGroups[gIdx] ? 'rotate-90' : ''}`} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4 transition-all duration-500 overflow-hidden">
            {group.items.map((prod, idx) => {
              const icon = getToolIcon(prod.id);
              const isHidden = !expandedGroups[gIdx] && idx >= 4 && searchQuery === '';
              if (isHidden) return null;

              return (
                <Link
                  key={prod.id}
                  href={`/produk/${prod.id}`}
                  onClick={(e) => { e.preventDefault(); onSelect(prod); }}
                  className="flex flex-col items-center gap-2 group"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-subtle flex items-center justify-center border border-subtle group-hover:scale-105 transition-transform">
                    {icon.svg}
                  </div>
                  <span className="text-xs font-bold text-primary text-center leading-tight line-clamp-2">{prod.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}