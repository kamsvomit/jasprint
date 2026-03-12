"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PopularCarousel from '../components/PopularCarousel';
import ToolList from '../components/ToolList';
import FAQ from '../components/FAQ';
import AboutContent from '../components/AboutContent';
import { Product } from '../types';
import { ProductData } from '../lib/products';
import { ChevronUp } from 'lucide-react';

interface ClientPageProps {
  initialProducts: ProductData[];
  initialActiveTool?: ProductData | null;
}

export default function ClientPage({ initialProducts, initialActiveTool = null }: ClientPageProps) {
  const [activeTool, setActiveTool] = useState<Product | null>(null);
  const [activeToolData, setActiveToolData] = useState<ProductData | null>(initialActiveTool);
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
      scrollTimeout = setTimeout(() => {
        setShowScrollTop(window.scrollY > 300);
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [initialProducts]);

  useEffect(() => {
    if (initialActiveTool) {
      handleSelectTool(initialActiveTool);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialActiveTool]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSelectTool = async (productData: ProductData) => {
    loadingIdRef.current = productData.id;
    scrollPositionRef.current = window.scrollY;

    const prevLastId = localStorage.getItem('last_product_id');
    if (prevLastId && prevLastId !== productData.id) {
      const prev = initialProducts.find(p => p.id === prevLastId);
      if (prev) setLastTool(prev);
    }

    setActiveToolData(productData);
    setActiveTool(null);
    localStorage.setItem('last_product_id', productData.id);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.history.pushState(null, '', `/produk/${productData.id}`);

    try {
      const module = await import(`../products/${productData.filename}`);
      if (loadingIdRef.current !== productData.id) return;
      const prod = module.default || module[Object.keys(module)[0]];
      setActiveTool(prod);
    } catch (e) {
      if (loadingIdRef.current === productData.id) {
        console.error('Failed to load product module:', e);
      }
    }
  };

  const handleCloseTool = () => {
    setActiveTool(null);
    setActiveToolData(null);
    window.history.pushState(null, '', '/');
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    });
    const lastId = localStorage.getItem('last_product_id');
    if (lastId) {
      const prod = initialProducts.find(p => p.id === lastId);
      if (prod) setLastTool(prod);
    }
  };

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
        className={`w-full max-w-6xl mx-auto pb-8 px-4 sm:px-8 lg:px-12 ${
          (activeToolData || searchQuery) ? 'product-active' : 'space-y-3'
        }`}
      >
        <Hero
          activeTool={activeTool}
          activeToolData={activeToolData}
          onClose={handleCloseTool}
          totalProducts={initialProducts.length}
          lastTool={lastTool}
          onOpenLastProduct={() => lastTool && handleSelectTool(lastTool)}
          searchQuery={searchQuery}
          products={initialProducts}
          onSelectTool={(prod) => {
            handleSelectTool(prod);
            setSearchQuery('');
          }}
        />

        {!activeToolData && searchQuery === '' && (
          <PopularCarousel
            products={initialProducts}
            onSelect={handleSelectTool}
          />
        )}

        {!activeToolData && searchQuery === '' && (
          <ToolList
            products={initialProducts}
            onSelect={handleSelectTool}
            searchQuery={searchQuery}
          />
        )}

        {!activeToolData && searchQuery === '' && <AboutContent />}

        {!activeToolData && searchQuery === '' && <FAQ />}

        {!activeToolData && (
          <footer className="py-6 border-t border-arsenic/10 space-y-4">
            <div className="text-center">
              <p className="text-sm font-black text-arsenic tracking-tight">jasprint</p>
              <p className="text-[10px] text-arsenic/40 font-medium mt-1 tracking-widest uppercase">
                Jasa Percetakan Bandung &copy; 2026
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs text-arsenic/40 font-medium">Bagikan:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Percetakan jasprint Bandung — Cetak murah berkualitas! https://jasprint.vercel.app')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 text-xs font-semibold hover:bg-green-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.12 1.525 5.845L0 24l6.335-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.01-1.374l-.36-.214-3.732.887.948-3.632-.235-.374A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
                WhatsApp
              </a>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-arsenic/5 text-arsenic/60 text-xs font-semibold hover:bg-arsenic/10 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                Salin Link
              </button>
            </div>
          </footer>
        )}
      </main>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-2 bg-white dark:bg-arsenic rounded-full shadow-lg text-red-600 hover:text-red-700 transition-all z-[100]"
        >
          <ChevronUp className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}