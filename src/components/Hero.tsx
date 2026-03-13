"use client";

import React from 'react';
import { ArrowLeft, Share2, Search, ChevronRight, BookOpen, Calendar, User, ChevronLeft } from 'lucide-react';
import { Product } from '../types';
import { ProductData } from '../lib/products';
import { BlogPost, formatDate } from '../lib/blog';
import { WA_NUMBER } from '../lib/constants';

interface HeroProps {
  activeTool: Product | null;
  activeToolData: ProductData | null;
  activeBlogPost: BlogPost | null;
  showBlogList?: boolean;
  showProductList?: boolean;
  recentPosts: BlogPost[];
  onClose: () => void;
  totalProducts: number;
  lastTool: ProductData | null;
  onOpenLastProduct: () => void;
  searchQuery: string;
  products: ProductData[];
  onSelectTool: (prod: ProductData) => void;
  onSelectBlogPost: (post: BlogPost) => void;
}

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = React.useState(0);
  if (images.length === 0) return null;

  return (
    <div>
      {/* Main image */}
      <div className="relative overflow-hidden bg-subtle aspect-[4/3] sm:aspect-[16/9] group">
        <img
          src={images[active]}
          alt={`${name} - foto ${active + 1}`}
          className="w-full h-full object-cover transition-opacity duration-200"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive(i => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActive(i => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${i === active ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails — dengan padding */}
      {images.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto px-5 sm:px-7 pt-2.5 pb-1 scrollbar-hide">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${i === active ? 'border-red-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductRenderer({ activeTool }: { activeTool: Product | null }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (activeTool && ref.current) { ref.current.innerHTML = ''; activeTool.render(ref.current); }
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

function BackHeader({ label, onClose, badge }: { label: string; badge?: string; onClose: () => void }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between mb-5">
      <button onClick={onClose} className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors">
        <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        <span className="text-sm font-bold">Kembali</span>
      </button>
      <div className="flex items-center gap-2">
        {badge && <span className="text-xs font-semibold text-tertiary px-2 py-0.5 rounded-full border border-subtle">{badge}</span>}
        <button onClick={handleShare} className="p-1.5 hover:bg-subtle rounded-lg transition-colors" title={isCopied ? 'Disalin!' : 'Bagikan'}>
          <Share2 className="w-4 h-4 text-tertiary" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default function Hero({
  activeTool, activeToolData, activeBlogPost, showBlogList, showProductList, recentPosts,
  onClose, totalProducts, lastTool, onOpenLastProduct,
  searchQuery, products, onSelectTool, onSelectBlogPost,
}: HeroProps) {

  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
          {filteredProducts.length > 0 ? filteredProducts.map(prod => (
            <button key={prod.id} onClick={() => onSelectTool(prod)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-subtle transition-colors group text-left">
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary group-hover:text-red-600 transition-colors truncate">{prod.name}</p>
                <p className="text-xs text-tertiary mt-0.5 truncate">{prod.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <span className="text-xs text-quaternary uppercase tracking-wide px-2 py-0.5 bg-subtle rounded-md hidden sm:block">{prod.category}</span>
                <ChevronRight className="w-4 h-4 text-quaternary group-hover:text-red-400 transition-colors" />
              </div>
            </button>
          )) : (
            <div className="py-10 text-center">
              <p className="text-sm text-tertiary italic">Produk tidak ditemukan...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── BLOG LIST ── */
  if (showBlogList) {
    return (
      <div className="app-card">
        <BackHeader label="Semua Artikel" onClose={onClose} />
        <div className="space-y-1 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin">
          {recentPosts.map(post => (
            <button key={post.id} onClick={() => onSelectBlogPost(post)}
              className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-subtle transition-colors group text-left">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-subtle flex-shrink-0">
                {post.cover_url ? (
                  <img src={post.cover_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-50">
                    <BookOpen className="w-5 h-5 text-red-200" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-primary group-hover:text-red-600 transition-colors line-clamp-1">{post.title}</p>
                <p className="text-[10px] text-tertiary mt-0.5 uppercase tracking-widest font-black">{post.category || 'Tips & Info'}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-quaternary group-hover:text-red-400 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ── PRODUCT LIST ── */
  if (showProductList) {
    return (
      <div className="app-card">
        <BackHeader label="Semua Produk" onClose={onClose} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin">
          {products.map(prod => (
            <button key={prod.id} onClick={() => onSelectTool(prod)}
              className="group text-left rounded-2xl overflow-hidden category-section hover:shadow-md active:scale-95 transition-all duration-200"
            >
              <div className={`h-16 bg-gradient-to-br ${prod.gradient || 'from-gray-500 to-slate-400'} flex items-center justify-center`}>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{prod.emoji || '🛍️'}</span>
              </div>
              <div className="p-3 space-y-1">
                <p className="text-xs font-black text-primary leading-tight group-hover:text-red-600 transition-colors truncate">{prod.name}</p>
                <p className="text-[10px] text-tertiary uppercase tracking-widest font-bold">{prod.category}</p>
                <div className="flex items-center gap-1 pt-1">
                  <span className="text-[9px] font-black text-red-500">Detail</span>
                  <ChevronRight className="w-2.5 h-2.5 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ── BLOG POST ── */
  if (activeBlogPost) {
    return (
      <div className="app-card overflow-hidden">
        <BackHeader label={activeBlogPost.title} badge={activeBlogPost.category ?? undefined} onClose={onClose} />

        {/* Cover image — flush ke tepi card */}
        {activeBlogPost.cover_url && (
          <div className="aspect-[16/9] bg-subtle mb-4 sm:mb-6" style={{ marginLeft: 'calc(-1 * var(--card-px))', marginRight: 'calc(-1 * var(--card-px))' }}>
            <img
              src={activeBlogPost.cover_url}
              alt={activeBlogPost.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title & meta */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-primary mb-2 tracking-tight leading-tight">
          {activeBlogPost.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-secondary mb-4 sm:mb-5">
          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{formatDate(activeBlogPost.published_at)}</span>
          {activeBlogPost.author && (
            <span className="flex items-center gap-1.5"><User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{activeBlogPost.author}</span>
          )}
        </div>

        {/* Content */}
        {activeBlogPost.content ? (
          <div className="border-t border-subtle pt-4 sm:pt-5">
            {/* Render as HTML if it contains tags, otherwise as plain text with line breaks */}
            {/<[a-z][\s\S]*>/i.test(activeBlogPost.content) || activeBlogPost.content.includes('</') ? (
              <article
                className="prose prose-sm sm:prose-base prose-slate max-w-none
                  prose-headings:font-black prose-headings:text-[var(--text-primary)] prose-headings:tracking-tight
                  prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
                  prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[var(--text-primary)] prose-strong:font-black
                  prose-li:text-[var(--text-secondary)] prose-img:rounded-xl sm:prose-img:rounded-2xl
                  prose-table:text-sm"
                dangerouslySetInnerHTML={{ __html: activeBlogPost.content }}
              />
            ) : (
              <div className="whitespace-pre-wrap text-sm sm:text-base text-secondary leading-relaxed">
                {activeBlogPost.content}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-10">
            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-subtle">
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 space-y-2.5 sm:space-y-3">
            <p className="text-sm font-black text-primary">Mau cetak sekarang?</p>
            <p className="text-xs text-secondary leading-relaxed">Tim jasprint siap bantu dari konsultasi sampai produk jadi.</p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo jasprint! Saya mau konsultasi cetak nih 🙏')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-2.5 px-4 rounded-xl text-sm transition-all"
            >
              Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ── PRODUK ── */
  if (activeToolData) {
    return (
      <div className="app-card overflow-hidden">
        <BackHeader label={activeToolData.name} badge={activeToolData.category} onClose={onClose} />

        {/* Foto produk — flush ke tepi card */}
        {activeToolData.images && activeToolData.images.length > 0 && (
          <div className="mb-4 sm:mb-5" style={{ marginLeft: 'calc(-1 * var(--card-px))', marginRight: 'calc(-1 * var(--card-px))' }}>
            <ImageGallery images={activeToolData.images} name={activeToolData.name} />
          </div>
        )}

        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-primary mb-1.5 tracking-tight">
          {activeToolData.name}
        </h2>
        <p className="text-sm sm:text-[15px] text-secondary leading-relaxed mb-4 sm:mb-5">
          {activeToolData.description}
        </p>
        <ProductRenderer activeTool={activeTool} />

        {activeToolData.longDescription && (
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-subtle">
            <p className="text-[10px] sm:text-xs font-black text-tertiary uppercase tracking-widest mb-3 sm:mb-4">Tentang Produk Ini</p>
            
            {/<[a-z][\s\S]*>/i.test(activeToolData.longDescription) || activeToolData.longDescription.includes('</') ? (
              <article
                className="prose prose-sm sm:prose-base prose-slate max-w-none
                  prose-headings:font-black prose-headings:text-[var(--text-primary)] prose-headings:tracking-tight
                  prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
                  prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[var(--text-primary)] prose-strong:font-black
                  prose-li:text-[var(--text-secondary)] prose-img:rounded-xl sm:prose-img:rounded-2xl
                  prose-table:text-sm"
                dangerouslySetInnerHTML={{ __html: activeToolData.longDescription }}
              />
            ) : (
              <div className="space-y-2.5 sm:space-y-3">
                {activeToolData.longDescription.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-secondary leading-relaxed">{para}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {products && products.filter(p => p.id !== activeToolData.id).length > 0 && (
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-subtle">
            <p className="text-[10px] sm:text-xs font-bold text-quaternary uppercase tracking-widest mb-3">Produk Lainnya</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {products.filter(p => p.id !== activeToolData.id).map(p => (
                <a key={p.id} href={`/produk/${p.slug || p.id}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-subtle bg-subtle hover:border-red-200 hover:bg-red-50 transition-colors group">
                  <span className="text-sm leading-none flex-shrink-0">
                    {p.emoji || (p.id==='brosur'?'📄':p.id==='kartu-nama'?'📇':p.id==='sticker'?'🏷️':p.id==='spanduk'?'🚩':p.id==='nota'?'📒':'✉️')}
                  </span>
                  <span className="text-xs font-bold text-secondary group-hover:text-red-600 transition-colors leading-tight truncate">{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {lastTool && lastTool.id !== activeToolData.id && (
          <div className="mt-4 pt-4 border-t border-subtle">
            <button onClick={onOpenLastProduct} className="flex items-center gap-1.5 group">
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
    <div className="px-1 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-200 px-2 py-0.5 rounded-full">Sejak 1990</span>
        <span className="text-[10px] font-bold text-quaternary uppercase tracking-widest">Terpercaya 30+ tahun</span>
      </div>
      <div>
        <h2 className="hero-headline mb-3">
          <span className="hero-headline-line1">Bikin Ide Kamu</span>
          <span className="hero-headline-line2"><span className="hero-shimmer-text">Jadi Nyata.</span></span>
        </h2>
        <p className="text-sm text-secondary font-medium leading-relaxed">
          Lagi cari tempat cetak yang hasilnya rapi dan harganya bersahabat? Dari brosur sampai spanduk, tim <strong className="text-primary">jasprint</strong> siap bantu wujudkan kebutuhan kamu dengan sepenuh hati. Yuk, ngobrol santai dulu aja!
        </p>
      </div>
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
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon:'⚡', label:'1–3 Hari', sub:'Selesai' },
          { icon:'💬', label:'Chat WA', sub:'Langsung Respon' },
          { icon:'✅', label:'Harga Fix', sub:'Tanpa Kejutan' },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl bg-subtle border border-subtle text-center">
            <span className="text-base leading-none">{item.icon}</span>
            <p className="text-[11px] font-black text-primary leading-tight">{item.label}</p>
            <p className="text-[9px] font-semibold text-quaternary uppercase tracking-wide leading-none">{item.sub}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo jasprint! Saya mau tanya-tanya soal cetak nih 🙏')}`}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-3.5 px-4 rounded-2xl text-sm transition-all shadow-sm">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Tanya-tanya Dulu Yuk (Gratis)
        </a>
        <p className="text-[11px] text-quaternary font-medium text-center">
          🔒 Gratis konsultasi · Tanpa komitmen · Respon dalam menit
        </p>
      </div>
    </div>
  );
}