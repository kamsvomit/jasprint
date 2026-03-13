"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, X, Menu } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WA_NUMBER, WA_MSG } from '../lib/constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface NavPage {
  id: string;
  label: string;
  emoji: string;
}

export const NAV_PAGES: NavPage[] = [
  { id: 'cara-order',  label: 'Cara Order',   emoji: '📦' },
  { id: 'faq',         label: 'FAQ',           emoji: '❓' },
  { id: 'tentang',     label: 'Tentang Kami',  emoji: '🏅' },
  { id: 'blog',        label: 'Blog',          emoji: '📝' },
];

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ICON_STYLE = { color: '#dc2626', stroke: 'currentColor' };

export default function Header({ onSearch, searchQuery, theme, toggleTheme }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery && !isSearchOpen) setIsSearchOpen(true);
  }, [searchQuery, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) inputRef.current.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const searchContainer = inputRef.current?.parentElement;
      if (isSearchOpen && searchContainer && !searchContainer.contains(target)) {
        setIsSearchOpen(false);
        if (searchQuery !== '') onSearch('');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSearchOpen, searchQuery, onSearch]);

  useEffect(() => {
    const onScroll = () => { if (isMenuOpen) setIsMenuOpen(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  const handleNavClick = (page: NavPage) => {
    setIsMenuOpen(false);
    
    // Jika navigasi ke blog, arahkan ke halaman blog penuh
    if (page.id === 'blog') {
      window.location.href = '/blog';
      return;
    }

    // Jika di homepage, coba scroll ke section
    if (window.location.pathname === '/') {
      const element = document.getElementById(page.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    } else {
      // Jika tidak di homepage, arahkan ke homepage dengan query scroll
      window.location.href = `/?scroll=${page.id}`;
      return;
    }
  };

  return (
    <header className="sticky top-0 z-[100] header-apple">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 h-14 flex items-center justify-between gap-6">

        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => window.location.href = '/'}>
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="8" width="16" height="10" rx="2" fill="url(#brand-grad)"/>
            <rect x="7" y="4" width="10" height="5" rx="1" fill="url(#brand-grad)"/>
            <rect x="7" y="14" width="10" height="5" rx="1" fill="white" opacity="0.85"/>
            <circle cx="17" cy="12" r="1.2" fill="white" opacity="0.7"/>
          </svg>
          <h1 className="text-sm font-bold tracking-tight whitespace-nowrap" style={{ background: 'linear-gradient(90deg,#dc2626,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Jasprint
          </h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_PAGES.map(page => (
            <button
              key={page.id}
              onClick={() => handleNavClick(page)}
              className="px-3 py-1.5 text-sm font-semibold text-secondary hover:text-primary rounded-lg hover:bg-arsenic/5 transition-colors whitespace-nowrap"
            >
              {page.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={toggleTheme} className="p-1.5 hover:bg-arsenic/5 rounded-md transition-colors">
            {theme === 'dark'
              ? <Sun className="w-4 h-4" style={ICON_STYLE} />
              : <Moon className="w-4 h-4" style={ICON_STYLE} />
            }
          </button>

          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              placeholder="Cari produk..."
              className={cn(
                "h-7 bg-transparent border border-arsenic/15 rounded-md text-[11px] font-medium text-arsenic placeholder:text-arsenic focus:outline-none transition-all duration-300",
                isSearchOpen ? "w-36 opacity-100 px-3 mr-1" : "w-0 opacity-0 px-0"
              )}
            />
            <button
              onClick={() => { if (isSearchOpen) { setIsSearchOpen(false); onSearch(''); } else setIsSearchOpen(true); }}
              className="p-1.5 hover:bg-arsenic/5 rounded-md transition-colors"
            >
              <Search className="w-4 h-4" style={ICON_STYLE} />
            </button>
          </div>



          <button
            onClick={() => setIsMenuOpen(v => !v)}
            className="md:hidden p-1.5 hover:bg-arsenic/5 rounded-md transition-colors"
          >
            {isMenuOpen
              ? <X className="w-4 h-4" style={ICON_STYLE} />
              : <Menu className="w-4 h-4" style={ICON_STYLE} />
            }
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-14 right-0 w-56 header-apple border-t border-arsenic/10 shadow-xl rounded-bl-2xl overflow-hidden">
          <nav className="py-2">
            {NAV_PAGES.map(page => (
              <button
                key={page.id}
                onClick={() => handleNavClick(page)}
                className="w-full text-left px-5 py-3 text-sm font-semibold text-primary hover:bg-subtle transition-colors flex items-center gap-2.5"
              >
                <span>{page.emoji}</span>
                {page.label}
              </button>
            ))}

          </nav>
        </div>
      )}
    </header>
  );
}