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
    <div className="min-h-screen flex flex-col bg-arsenic/[0.02] selection:bg-red-500/30">
      <Header
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
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
              <BlogPreview posts={recentPosts} onSelectPost={handleSelectBlogPost} />
            </div>
          )}

          {/* Footer */}
          <footer className="px-4 sm:px-5 py-8 mt-4 border-t border-arsenic/8 text-center space-y-1">
            <p className="text-sm font-black text-primary tracking-tight">jasprint</p>
            <p className="text-[11px] text-quaternary font-medium">&copy; 2026 · Made with ♥ in Bandung</p>
          </footer>

        </>)}
      </main>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed z-[100] bottom-6 right-6 w-10 h-10 bg-white dark:bg-arsenic rounded-full shadow-lg flex items-center justify-center text-red-500 hover:text-red-600 hover:shadow-xl transition-all active:scale-95 border border-arsenic/10"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}