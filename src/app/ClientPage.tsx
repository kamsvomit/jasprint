"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header, { NavPage } from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Testimonials from '../components/Testimonials';
import SingleCta from '../components/SingleCta';
import BlogPreview from '../components/BlogPreview';
import Process from '../components/Process';
import WhyUs from '../components/WhyUs';
import Faq from '../components/Faq';
import { Product } from '../types';
import { ProductData } from '../lib/products';
import { BlogPost } from '../lib/blog';
import { ChevronUp } from 'lucide-react';
import { WA_NUMBER, SITE_URL } from '../lib/constants';

interface ClientPageProps {
  initialProducts: ProductData[];
  initialActiveTool?: ProductData | null;
  initialActiveBlogPost?: BlogPost | null;
  recentPosts?: BlogPost[];
}

// const WA_NUMBER = '628123456789';

export default function ClientPage({ 
  initialProducts, 
  initialActiveTool = null, 
  initialActiveBlogPost = null,
  recentPosts = [] 
}: ClientPageProps) {
  const [activeTool, setActiveTool] = useState<Product | null>(null);
  const [activeToolData, setActiveToolData] = useState<ProductData | null>(initialActiveTool);
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(initialActiveBlogPost);
  const [isViewingAllBlogs, setIsViewingAllBlogs] = useState(false);
  const [isViewingAllProducts, setIsViewingAllProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastTool, setLastTool] = useState<ProductData | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loadingIdRef = useRef<string | null>(null);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const lastId = localStorage.getItem('last_product_id');
    if (lastId) {
      const prod = initialProducts.find(p => p.id === lastId);
      if (prod) setLastTool(prod);
    }

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setShowScrollTop(window.scrollY > 400), 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); if (scrollTimeout) clearTimeout(scrollTimeout); };
  }, [initialProducts]);

  useEffect(() => {
    if (initialActiveTool) handleSelectTool(initialActiveTool);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialActiveTool]);

  const clearAll = () => {
    setActiveTool(null);
    setActiveToolData(null);
    setActiveBlogPost(null);
    setIsViewingAllBlogs(false);
    setIsViewingAllProducts(false);
  };

  // ── Nav Click ──
  const handleNavClick = (pageId: string) => {
    if (pageId === 'blog') {
      scrollPositionRef.current = window.scrollY;
      clearAll();
      setIsViewingAllBlogs(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (pageId === 'produk') {
      scrollPositionRef.current = window.scrollY;
      clearAll();
      setIsViewingAllProducts(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Default scroll behavior for others
    const element = document.getElementById(pageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── Produk ──
  const handleSelectTool = async (productData: ProductData) => {
    loadingIdRef.current = productData.id;
    scrollPositionRef.current = window.scrollY;
    const prevLastId = localStorage.getItem('last_product_id');
    if (prevLastId && prevLastId !== productData.id) {
      const prev = initialProducts.find(p => p.id === prevLastId);
      if (prev) setLastTool(prev);
    }
    clearAll();
    setActiveToolData(productData);
    localStorage.setItem('last_product_id', productData.id);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState(null, '', `/produk/${productData.slug || productData.id}`);

    // Kalau produk dari Supabase (punya specs/features/prices), render langsung
    // tanpa dynamic import file .ts statis
    const isSupabaseProduct = Array.isArray(productData.specs) && productData.specs.length >= 0
      && Array.isArray(productData.features) && productData.features.length >= 0
      && Array.isArray(productData.prices);

    if (isSupabaseProduct && productData.filename === (productData.slug || productData.id)) {
      // Produk dari Supabase — buat render function dari data dinamis
      const syntheticProduct: Product = {
        id: productData.id,
        name: productData.name,
        description: productData.description,
        longDescription: productData.longDescription,
        category: productData.category,
        filename: productData.slug || productData.id,
        render: (container: HTMLElement) => {
          const WA = productData.waMessage ?? `Halo jasprint! Saya mau tanya soal ${productData.name} 🙏`;
          const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA)}`;

          container.innerHTML = `
            <div class="flex flex-col gap-5">
              ${productData.specs?.length ? `
                <div class="grid grid-cols-2 gap-3">
                  ${productData.specs.map(s => `
                    <div class="bg-subtle rounded-xl p-3 flex items-start gap-2.5 border border-subtle">
                      <span class="text-lg leading-none mt-0.5">${s.icon}</span>
                      <div>
                        <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">${s.label}</p>
                        <p class="text-xs font-bold text-primary mt-0.5">${s.value}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${productData.features?.length ? `
                <div class="rounded-xl border border-subtle overflow-hidden">
                  <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
                    <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Keunggulan ${productData.name}</p>
                  </div>
                  <div class="divide-y divide-subtle">
                    ${productData.features.map(f => `
                      <div class="flex items-center gap-2.5 px-4 py-2.5">
                        <span class="text-red-500 font-black text-sm flex-shrink-0">✓</span>
                        <p class="text-xs font-semibold text-secondary">${f}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${productData.prices?.length ? `
                <div class="rounded-xl border border-subtle overflow-hidden">
                  <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
                    <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Estimasi Harga</p>
                  </div>
                  <div class="divide-y divide-subtle">
                    ${productData.prices.map(p => `
                      <div class="flex items-center justify-between px-4 py-2.5">
                        <p class="text-xs font-bold text-primary">${p.label}</p>
                        <p class="text-xs font-black text-red-500">${p.price}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${productData.faqs?.length ? `
                <div class="rounded-xl border border-subtle overflow-hidden">
                  <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
                    <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">FAQ</p>
                  </div>
                  <div class="divide-y divide-subtle">
                    ${productData.faqs.map(f => `
                      <div class="px-4 py-3">
                        <p class="text-xs font-black text-primary mb-1">${f.question}</p>
                        <p class="text-xs text-secondary leading-relaxed">${f.answer}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${productData.tip ? `
                <div class="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p class="text-xs font-black text-red-600 uppercase tracking-widest mb-1">💡 Tips Order</p>
                  <p class="text-xs text-red-800 leading-relaxed">${productData.tip}</p>
                </div>
              ` : ''}

              <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
                class="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-sm">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Tanya Harga & Pesan Sekarang
              </a>
            </div>
          `;
        },
      };
      if (loadingIdRef.current === productData.id) setActiveTool(syntheticProduct);
      return;
    }
  };

  // ── Blog post ──
  const handleSelectBlogPost = (post: BlogPost) => {
    scrollPositionRef.current = window.scrollY;
    clearAll();
    setActiveBlogPost(post);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState(null, '', `/blog/${post.slug}`);
    if (!post.content) {
      fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(post.slug)}&published=eq.true&limit=1`,
        { headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? '', Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? ''}` } }
      ).then(r => r.json()).then(rows => { if (rows[0]) setActiveBlogPost(rows[0]); }).catch(() => {});
    }
  };

  // ── Close / back ──
  const handleClose = () => {
    clearAll();
    window.history.pushState(null, '', '/');
    requestAnimationFrame(() => window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' }));
    const lastId = localStorage.getItem('last_product_id');
    if (lastId) {
      const prod = initialProducts.find(p => p.id === lastId);
      if (prod) setLastTool(prod);
    }
  };

  const isHome = !activeToolData && !activeBlogPost && searchQuery === '';

  // Handle scroll from query param
  useEffect(() => {
    if (isHome) {
      const urlParams = new URLSearchParams(window.location.search);
      const scrollId = urlParams.get('scroll');
      if (scrollId) {
        setTimeout(() => {
          const element = document.getElementById(scrollId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // Clean up URL
            window.history.replaceState(null, '', '/');
          }
        }, 100);
      }
    }
  }, [isHome]);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-500/30">
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        onNavClick={handleNavClick}
      />

      <main
        id="main-container"
        className="w-full max-w-6xl mx-auto"
      >
        <div className={!isHome || isViewingAllBlogs || isViewingAllProducts 
          ? "p-3 sm:p-5" 
          : "pt-2 pb-16 px-4 sm:px-4 lg:px-8 space-y-10"
        }>
          <Hero
            activeTool={activeTool}
            activeToolData={activeToolData}
            activeBlogPost={activeBlogPost}
            showBlogList={isViewingAllBlogs}
            showProductList={isViewingAllProducts}
            recentPosts={recentPosts}
            onClose={handleClose}
            totalProducts={initialProducts.length}
            lastTool={lastTool}
            onOpenLastProduct={() => lastTool && handleSelectTool(lastTool)}
            searchQuery={searchQuery}
            products={initialProducts}
            onSelectTool={(prod) => { handleSelectTool(prod); setSearchQuery(''); }}
            onSelectBlogPost={handleSelectBlogPost}
          />

          {isHome && !isViewingAllBlogs && !isViewingAllProducts && (<>
            {/* 1. Produk — jawab "apa yang dijual?" */}
            <div id="produk"><ProductGrid products={initialProducts} onSelect={handleSelectTool} /></div>

            {/* 2. Proses — edukasi softsell */}
            <div id="cara-order"><Process /></div>

            {/* 3. Why Us — membangun otoritas & SEO */}
            <div id="tentang"><WhyUs /></div>

            {/* 4. Social proof — trust */}
            <Testimonials />

            {/* 5. FAQ — menjawab keraguan & SEO long-tail */}
            <div id="faq"><Faq /></div>

            {/* 6. CTA — single, clean */}
            <SingleCta />

            {/* 7. Blog preview — konten & SEO */}
            {recentPosts.length > 0 && (
              <div id="blog">
                <BlogPreview posts={recentPosts.slice(0, 6)} onSelectPost={handleSelectBlogPost} />
              </div>
            )}

            {/* Footer */}
            <footer className="py-8 mt-4 border-t border-arsenic/8 text-center space-y-1">
              <p className="text-sm font-black text-primary tracking-tight">jasprint</p>
              <p className="text-[11px] text-quaternary font-medium">&copy; 2026 · Made with ♥ in Bandung</p>
            </footer>
          </>)}
        </div>
      </main>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed z-[100] bottom-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:text-red-600 hover:shadow-xl transition-all active:scale-95 border border-arsenic/10"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}