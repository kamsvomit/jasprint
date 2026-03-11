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
      const tool = initialProducts.find(p => p.id === lastId);
      if (tool) setLastTool(tool);
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
      const tool = initialProducts.find(p => p.id === lastId);
      if (tool) setLastTool(tool);
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
        className={`w-full max-w-screen-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto pb-8 px-4 sm:px-6 ${
          (activeToolData || searchQuery) ? 'tool-active' : 'space-y-3'
        }`}
      >
        <Hero
          activeTool={activeTool}
          activeToolData={activeToolData}
          onClose={handleCloseTool}
          totalProducts={initialProducts.length}
          lastTool={lastTool}
          onOpenLastTool={() => lastTool && handleSelectTool(lastTool)}
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
          <footer className="py-6 text-center border-t border-arsenic/10">
            <p className="text-sm font-black text-arsenic tracking-tight">jasprint</p>
            <p className="text-[10px] text-arsenic/40 font-medium mt-1 tracking-widest uppercase">
              Jasa Percetakan Bandung &copy; 2026
            </p>
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