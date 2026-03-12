"use client";

import React from 'react';
import { ArrowLeft, Share2, Search, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductData } from '../lib/products';

interface HeroProps {
  activeTool: Product | null;
  activeToolData: ProductData | null;
  onClose: () => void;
  totalProducts: number;
  lastTool: ProductData | null;
  onOpenLastProduct: () => void;
  searchQuery: string;
  products: ProductData[];
  onSelectTool: (prod: ProductData) => void;
}

function ProductRenderer({ activeTool }: { activeTool: Product | null }) {
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
          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default function Hero({
  activeTool, activeToolData, onClose, totalProducts,
  lastTool, onOpenLastProduct, searchQuery, products, onSelectTool,
}: HeroProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleShare = () => {
    if (!activeToolData) return;
    const url = `${window.location.origin}/produk/${activeToolData.id}`;
    if (navigator.share) {
      navigator.share({
        title: `jasprint: ${activeToolData.name}`,
        text: activeToolData.description,
        url,
      }).catch(console.error);
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
          <span className="text-xs text-tertiary font-medium">{filteredProducts.length} ditemukan</span>
        </div>
        <div className="space-y-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(prod => (
              <button
                key={prod.id}
                onClick={() => onSelectTool(prod)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-subtle transition-colors group text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-primary group-hover:text-red-600 transition-colors truncate">{prod.name}</p>
                  <p className="text-xs text-tertiary mt-0.5 truncate">{prod.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className="text-xs text-quaternary uppercase tracking-wide px-2 py-0.5 bg-subtle rounded-md hidden sm:block">{prod.category}</span>
                  <ChevronRight className="w-4 h-4 text-quaternary group-hover:text-red-400 transition-colors" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-10 text-center">
              <p className="text-sm text-tertiary italic">Produk tidak ditemukan...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── ACTIVE PRODUCT ── */
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
            <button
              onClick={handleShare}
              className="p-1.5 hover:bg-subtle rounded-lg transition-colors"
              title={isCopied ? 'Disalin!' : 'Bagikan'}
            >
              <Share2 className="w-4 h-4 text-tertiary" strokeWidth={2} />
            </button>
          </div>
        </div>

        <h2 className="text-xl font-black text-primary mb-1.5 tracking-tight">{activeToolData.name}</h2>
        <p className="text-sm text-secondary leading-relaxed mb-5">{activeToolData.description}</p>

        <ProductRenderer activeTool={activeTool} />

        {activeToolData.longDescription && (
          <div className="mt-8 pt-6 border-t border-subtle">
            <p className="text-xs font-bold text-quaternary uppercase tracking-widest mb-4">Tentang Produk Ini</p>
            <div className="space-y-3">
              {activeToolData.longDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-secondary leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        )}

        {lastTool && lastTool.id !== activeToolData.id && (
          <div className="mt-6 pt-5 border-t border-subtle">
            <p className="text-xs font-bold text-quaternary uppercase tracking-widest mb-2">Terakhir Dilihat</p>
            <button onClick={onOpenLastProduct} className="flex items-center gap-1.5 group">
              <ArrowLeft className="w-3.5 h-3.5 text-red-500 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-bold text-red-500 group-hover:text-red-600 transition-colors">
                Kembali ke {lastTool.name}
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ── HOME ── */
  return (
    <div className="px-1 py-4 space-y-4">

      {/* Badge */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-200 dark:border-red-500/30 px-2 py-0.5 rounded-full">
          Sejak 1990
        </span>
        <span className="text-[10px] font-bold text-quaternary uppercase tracking-widest">
          Terpercaya 30+ tahun
        </span>
      </div>

      {/* Headline */}
      <div>
        <h2 className="hero-headline mb-3">
          <span className="hero-headline-line1">Cetak Apapun,</span>
          <span className="hero-headline-line2">
            <span className="hero-shimmer-text">Hasil Juara.</span>
          </span>
        </h2>
        <p className="text-sm text-secondary font-medium leading-relaxed">
          Butuh cetak brosur, spanduk, kartu nama, atau sticker?
          <strong className="text-primary"> jasprint</strong> siap kirim ke seluruh Indonesia —
          harga jelas, kualitas premium, pesan cukup via WhatsApp.
        </p>
      </div>

      {/* Social proof bar */}
      <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl bg-subtle border border-subtle">
        <div className="flex -space-x-1.5">
          {['🧑‍💼','👩‍💼','🧑','👨‍🏫','👩'].map((e, i) => (
            <span key={i} className="w-6 h-6 rounded-full bg-arsenic/10 border-2 border-card flex items-center justify-center text-[10px] leading-none">{e}</span>
          ))}
        </div>
        <p className="text-xs text-secondary font-medium leading-tight">
          <strong className="text-primary">1.000+ pelanggan</strong> sudah percaya jasprint
          <span className="text-quaternary"> — dari UMKM sampai perusahaan besar</span>
        </p>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '⚡', label: '1–3 Hari', sub: 'Selesai' },
          { icon: '💬', label: 'Chat WA', sub: 'Langsung Respon' },
          { icon: '✅', label: 'Harga Fix', sub: 'Tanpa Kejutan' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl bg-subtle border border-subtle text-center">
            <span className="text-base leading-none">{item.icon}</span>
            <p className="text-[11px] font-black text-primary leading-tight">{item.label}</p>
            <p className="text-[9px] font-semibold text-quaternary uppercase tracking-wide leading-none">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2">
        <a
          href="https://wa.me/628123456789?text=Halo%20jasprint!%20Saya%20mau%20konsultasi%20cetak%20nih%20%F0%9F%99%8F"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-3.5 px-4 rounded-2xl text-sm transition-all shadow-sm"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Minta Penawaran Harga Sekarang
        </a>
        <p className="text-[11px] text-quaternary font-medium text-center">
          🔒 Gratis konsultasi · Tanpa komitmen · Respon dalam menit
        </p>
      </div>

    </div>
  );
}