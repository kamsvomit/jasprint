"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header, { NavPage } from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import SocialProof from '../components/SocialProof';
import SingleCta from '../components/SingleCta';
import BlogPreview from '../components/BlogPreview';
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
  const [activeNavPage, setActiveNavPage] = useState<NavPage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lastTool, setLastTool] = useState<ProductData | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loadingIdRef = useRef<string | null>(null);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const clearAll = () => {
    setActiveTool(null);
    setActiveToolData(null);
    setActiveBlogPost(null);
    setActiveNavPage(null);
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
    window.history.pushState(null, '', `/produk/${productData.id}`);
    try {
      const module = await import(`../products/${productData.filename}`);
      if (loadingIdRef.current !== productData.id) return;
      const prod = module.default || module[Object.keys(module)[0]];
      setActiveTool(prod);
    } catch (e) {
      if (loadingIdRef.current === productData.id) console.error('Failed to load product:', e);
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

  // ── Nav page ──
  const handleNavPage = (page: NavPage) => {
    scrollPositionRef.current = window.scrollY;

    // Blog: fetch posts list dan render
    if (page.id === 'blog') {
      clearAll();
      setActiveNavPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState(null, '', '/blog');
      return;
    }

    clearAll();
    setActiveNavPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState(null, '', `/${page.id}`);
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

  const isHome = !activeToolData && !activeBlogPost && !activeNavPage && searchQuery === '';

  return (
    <div className="min-h-screen flex flex-col bg-arsenic/[0.02] selection:bg-red-500/30">
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
        onNavPage={handleNavPage}
      />

      <main
        id="main-container"
        className={`w-full max-w-6xl mx-auto pb-12 px-0 sm:px-4 lg:px-8 ${
          !isHome ? 'pt-0 px-4' : 'space-y-10 pt-2'
        }`}
      >
        <div className={isHome ? 'px-4 sm:px-0' : 'px-4 sm:px-0'}>
          <Hero
            activeTool={activeTool}
            activeToolData={activeToolData}
            activeBlogPost={activeBlogPost}
            activeNavPage={activeNavPage}
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
        </div>

        {isHome && (<>
          {/* 1. Produk — jawab "apa yang dijual?" */}
          <div id="produk"><ProductGrid products={initialProducts} onSelect={handleSelectTool} /></div>

          {/* 2. Social proof — trust */}
          <SocialProof />

          {/* 3. CTA — single, clean */}
          <SingleCta />

          {/* 4. Blog preview — konten & SEO */}
          {recentPosts.length > 0 && (
            <BlogPreview posts={recentPosts} onSelectPost={handleSelectBlogPost} />
          )}

          {/* Footer */}
          <footer className="px-4 sm:px-5 py-6 border-t border-arsenic/10 space-y-4">
            <div className="text-center">
              <p className="text-sm font-black text-arsenic tracking-tight">jasprint</p>
              <p className="text-[10px] text-arsenic/40 font-medium mt-1 tracking-widest uppercase">
                Jasa Percetakan Bandung &copy; 2026
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs text-arsenic/40 font-medium">Bagikan:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Percetakan jasprint Bandung — Cetak murah berkualitas! ${SITE_URL}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 text-xs font-semibold hover:bg-green-100 transition-colors"
              >
                WhatsApp
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-arsenic/5 text-arsenic/60 text-xs font-semibold hover:bg-arsenic/10 transition-colors"
              >
                Salin Link
              </button>
            </div>
          </footer>
        </>)}
      </main>

      {isHome && (
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo jasprint! Saya mau konsultasi cetak nih 🙏')}`}
          target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black text-xs py-3 px-4 rounded-full shadow-2xl transition-all active:scale-95"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Order via WA
        </a>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed z-[100] w-10 h-10 bg-white dark:bg-arsenic rounded-full shadow-lg flex items-center justify-center text-red-500 hover:text-red-600 hover:shadow-xl transition-all active:scale-95 border border-arsenic/10 ${isHome ? 'bottom-20 right-6' : 'bottom-6 right-6'}`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}