"use client";

import React from 'react';
import { ArrowLeft, Share2, Search, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductData } from '../lib/products';

interface HeroProps {
  activeTool: Product | null;
  activeToolData: ProductData | null;
  onClose: () => void;
  totalTools: number;
  lastTool: ProductData | null;
  onOpenLastTool: () => void;
  searchQuery: string;
  products: ProductData[];
  onSelectTool: (prod: ProductData) => void;
}

function ToolRenderer({ activeTool }: { activeTool: Product | null }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (activeTool && ref.current) {
      ref.current.innerHTML = '';
      activeTool.render(ref.current);
    }
  }, [activeTool]);

  return (
    <div ref={ref} className="pt-5 border-t border-subtle">
      {!activeTool && (
        <div className="flex items-center justify-center py-10">
          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default function Hero({
  activeTool, activeToolData, onClose, totalTools,
  lastTool, onOpenLastTool, searchQuery, products, onSelectTool
}: HeroProps) {

  const [isCopied, setIsCopied] = React.useState(false);

  const filteredTools = searchQuery
    ? products.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleShare = () => {
    if (!activeToolData) return;
    const url = `${window.location.origin}/produk/${activeToolData.id}`;
    if (navigator.share) {
      navigator.share({ title: `jasprint: ${activeToolData.name}`, text: activeToolData.description, url }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  /* ── SEARCH ── */
  if (searchQuery) {
    return (
      <div className="app-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-red-500" />
            <span className="text-sm font-black text-primary uppercase tracking-widest">Hasil Pencarian</span>
          </div>
          <span className="text-xs text-tertiary font-medium">{filteredTools.length} ditemukan</span>
        </div>
        <div className="space-y-1">
          {filteredTools.length > 0 ? (
            filteredTools.map(calc => (
              <button key={calc.id} onClick={() => onSelectTool(calc)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-subtle transition-colors group text-left">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-primary group-hover:text-red-600 transition-colors truncate">{calc.name}</p>
                  <p className="text-xs text-tertiary mt-0.5 truncate">{calc.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className="text-xs text-quaternary uppercase tracking-wide px-2 py-0.5 bg-subtle rounded-md hidden sm:block">{calc.category}</span>
                  <ChevronRight className="w-4 h-4 text-quaternary group-hover:text-red-400 transition-colors" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-sm text-tertiary italic">Alat tidak ditemukan...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── ACTIVE TOOL ── */
  if (activeToolData) {
    return (
      <div className="app-card">
        <div className="flex items-center justify-between mb-5">
          <button onClick={onClose} className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors">
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-sm font-bold">Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-tertiary px-2 py-0.5 rounded-full border border-subtle">
              {activeToolData.category}
            </span>
            <button onClick={handleShare} className="p-1.5 hover:bg-subtle rounded-lg transition-colors" title={isCopied ? 'Disalin!' : 'Bagikan'}>
              <Share2 className="w-4 h-4 text-tertiary" strokeWidth={2} />
            </button>
          </div>
        </div>

        <h2 className="text-xl font-black text-primary mb-1.5 tracking-tight">{activeToolData.name}</h2>
        <p className="text-sm text-secondary leading-relaxed mb-5">{activeToolData.description}</p>

        <ToolRenderer activeTool={activeTool} />

        {activeToolData.longDescription && (
          <div className="mt-8 pt-6 border-t border-subtle">
            <p className="text-xs font-bold text-quaternary uppercase tracking-widest mb-4">Tentang Alat Ini</p>
            <div className="space-y-3">
              {activeToolData.longDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-secondary leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        )}

        {lastTool && lastTool.id !== activeToolData.id && (
          <div className="mt-6 pt-5 border-t border-subtle">
            <p className="text-xs font-bold text-quaternary uppercase tracking-widest mb-2">Terakhir Digunakan</p>
            <button onClick={onOpenLastTool} className="flex items-center gap-1.5 group">
              <ArrowLeft className="w-3.5 h-3.5 text-red-500 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-bold text-red-500 group-hover:text-red-600 transition-colors">Kembali ke {lastTool.name}</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ── HOME ── */
  return (
    <div className="px-1 py-4">
      <h2 className="hero-headline mb-4">
        <span className="hero-headline-line1">Percetakan</span>
        <span className="hero-headline-line2">
          <span className="hero-shimmer-text">jasprint.</span>
        </span>
      </h2>

      <p className="text-sm text-secondary font-medium leading-relaxed mb-5">
        Jasa percetakan murah dan berkualitas di Bandung. Cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan dengan hasil terbaik dan pengerjaan cepat.
      </p>

      <div className="h-px bg-subtle mb-4" />

      {lastTool ? (
        <button onClick={onOpenLastTool}
          className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-subtle hover:bg-hover border border-subtle hover:border-red-100 transition-all group">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-bold text-quaternary uppercase tracking-widest leading-none mb-0.5">Lanjutkan</p>
              <p className="text-sm font-bold text-primary group-hover:text-red-600 transition-colors truncate">{lastTool.name}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-quaternary group-hover:text-red-400 flex-shrink-0 transition-colors" />
        </button>
      ) : (
        <p className="text-xs text-quaternary font-medium text-center">
          Pilih produk di bawah untuk memulai ↓
        </p>
      )}
    </div>
  );
}
