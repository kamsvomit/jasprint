"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ProductData } from '../lib/products';
import { getToolIcon } from '../lib/icons';
import Link from 'next/link';

interface PopularCarouselProps {
  calculators: ProductData[];
  onSelect: (calc: ProductData) => void;
}

export default function PopularCarousel({ calculators, onSelect }: PopularCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const popularIds = [
    'brosur', 'spanduk', 'kartu-nama', 'sticker', 'nota', 'undangan'
  ];

  const popularCalculators = calculators.filter(c => popularIds.includes(c.id));
  const displayCalculators = [...popularCalculators];
  while (displayCalculators.length < 12 && calculators.length > 0) {
    const extra = calculators.find(c => !popularIds.includes(c.id) && !displayCalculators.includes(c));
    if (extra) displayCalculators.push(extra);
    else break;
  }

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % 3);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="category-section rounded-2xl animate-fade-in overflow-hidden p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          Paling Dicari
        </h3>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
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
          onTransitionEnd={() => setIsTransitioning(false)}
        >
          {[0, 1, 2].map(slideIdx => (
            <div key={slideIdx} className="w-full flex-shrink-0 grid grid-cols-4 gap-4 px-1">
              {displayCalculators.slice(slideIdx * 4, (slideIdx + 1) * 4).map((c, idx) => {
                const icon = getToolIcon(c.id);
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
          ))}
        </div>
      </div>
    </div>
  );
}