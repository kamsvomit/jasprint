"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Header({ onSearch, searchQuery, theme, toggleTheme }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  useEffect(() => {
    if (searchQuery && !isSearchOpen) {
      setIsSearchOpen(true);
    }
  }, [searchQuery, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const searchContainer = inputRef.current?.parentElement;
      
      // Check if click is on a search result item
      const isSearchResult = target.closest('.search-result-item');
      
      if (isSearchOpen && searchContainer && !searchContainer.contains(target) && !isSearchResult) {
        setIsSearchOpen(false);
        if (searchQuery !== '') {
          onSearch('');
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSearchOpen, searchQuery, onSearch]);

  return (
    <header className="sticky top-0 z-[100] h-12 header-apple">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 h-full flex items-center justify-between">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            {/* printer body */}
            <rect x="4" y="8" width="16" height="10" rx="2" fill="url(#brand-grad)"/>
            {/* paper top */}
            <rect x="7" y="4" width="10" height="5" rx="1" fill="url(#brand-grad)"/>
            {/* paper output */}
            <rect x="7" y="14" width="10" height="5" rx="1" fill="white" opacity="0.85"/>
            {/* dot */}
            <circle cx="17" cy="12" r="1.2" fill="white" opacity="0.7"/>
          </svg>
          <h1 className="text-sm font-bold tracking-tight" style={{ background: 'linear-gradient(90deg,#dc2626,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Percetakan jasprint Bandung
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-1.5 hover:bg-arsenic/5 rounded-md transition-colors" 
            title="Ganti Tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" style={{ stroke: 'url(#brand-grad)' }} />
            ) : (
              <Moon className="w-4 h-4" style={{ stroke: 'url(#brand-grad)' }} />
            )}
          </button>
          
          <div className="relative flex items-center">
            <input 
              ref={inputRef}
              type="text" 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Cari produk..." 
              className={cn(
                "h-7 bg-transparent border border-arsenic/15 rounded-md text-[11px] font-medium text-arsenic placeholder:text-arsenic focus:outline-none transition-all duration-300",
                isSearchOpen ? "w-40 opacity-100 px-3 mr-2" : "w-0 opacity-0 px-0"
              )}
            />
            <button 
              onClick={() => {
                if (isSearchOpen) {
                  setIsSearchOpen(false);
                  onSearch('');
                } else {
                  setIsSearchOpen(true);
                }
              }}
              className="p-1.5 hover:bg-arsenic/5 rounded-md transition-colors"
            >
              <Search className="w-4 h-4" style={{ stroke: 'url(#brand-grad)' }} />
            </button>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}