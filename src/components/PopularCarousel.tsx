"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ProductData } from '../lib/products';
import { getToolIcon } from '../lib/icons';
import Link from 'next/link';

interface PopularCarouselProps {
  products: ProductData[];
  onSelect: (prod: ProductData) => void;
}

export default function PopularCarousel({ products, onSelect }: PopularCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const popularIds = ['brosur', 'spanduk', 'kartu-nama', 'sticker', 'nota', 'undangan'];

  const popularProducts = products.filter(p => popularIds.includes(p.id));
  const displayProducts = [...popularProducts];
  while (displayProducts.length < 12 && products.length > 0) {
    const extra = products.find(p => !popularIds.includes(p.id) && !displayProducts.includes(p));
    if (extra) displayProducts.push(extra);
    else break;
  }

  const slides = [
    displayProducts.slice(0, 4),
    displayProducts.slice(4, 8),
    displayProducts.slice(8, 12),
  ].filter(s => s.length > 0);

  const nextSlide = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsTransitioning(false), 700);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <div className="category-section rounded-2xl animate-fade-in overflow-hidden p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          Paling Dicari
        </h3>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`carousel-dot h-1 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-3 bg-red-500' : 'w-1 bg-subtle'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, sIdx) => (
            <div key={sIdx} className="min-w-full grid grid-cols-4 gap-3">
              {slide.map((prod) => {
                const icon = getToolIcon(prod.id);
                return (
                  <Link
                    key={prod.id}
                    href={`/produk/${prod.id}`}
                    onClick={(e) => { e.preventDefault(); onSelect(prod); }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-subtle flex items-center justify-center border border-subtle group-hover:scale-105 transition-transform">
                      {icon.svg}
                    </div>
                    <span className="text-xs font-bold text-primary text-center leading-tight line-clamp-2">{prod.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}