"use client";

import React, { useState } from 'react';
import { ProductData } from '../lib/products';
import { getToolIcon } from '../lib/icons';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ToolListProps {
  calculators: ProductData[];
  onSelect: (calc: ProductData) => void;
  searchQuery: string;
}

export default function ToolList({ calculators, onSelect, searchQuery }: ToolListProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({});

  const normalizeCategory = (cat: string) => {
    return cat;
  };

  const normalizedCalculators = calculators.map(c => ({
    ...c,
    category: normalizeCategory(c.category)
  }));

  const filteredCalculators = normalizedCalculators.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(normalizedCalculators.map(c => c.category))].sort();
  const groupedCalculators = categories.map(cat => ({
    name: cat,
    tools: filteredCalculators.filter(c => c.category === cat).sort((a, b) => a.name.localeCompare(b.name))
  })).filter(group => group.tools.length > 0);

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

      {groupedCalculators.map((group, gIdx) => (
        <div key={group.name} className="rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 category-section">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-primary">{group.name}</h3>
            {group.tools.length > 4 && (
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
            {group.tools.map((c, idx) => {
              const icon = getToolIcon(c.id);
              const isHidden = !expandedGroups[gIdx] && idx >= 4 && searchQuery === '';
              if (isHidden) return null;

              return (
                <Link
                  key={c.id}
                  href={`/produk/${c.id}`}
                  onClick={(e) => { e.preventDefault(); onSelect(c); }}
                  className="flex flex-col items-center gap-2 group"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-subtle flex items-center justify-center border border-subtle group-hover:scale-105 transition-transform">
                    {icon.svg}
                  </div>
                  <span className="text-xs font-bold text-primary text-center leading-tight line-clamp-2">{c.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
