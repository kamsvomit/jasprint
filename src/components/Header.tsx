"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, X, Menu } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  onNavPage: (page: NavPage) => void;
}

const WA_NUMBER = '628123456789';
const WA_MSG = encodeURIComponent('Halo jasprint! Saya mau konsultasi cetak nih 🙏');
const ICON_STYLE = { color: '#dc2626', stroke: 'currentColor' };

export default function Header({ onSearch, searchQuery, theme, toggleTheme, onNavPage }: HeaderProps) {
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
    onNavPage(page);
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
            Percetakan jasprint Bandung
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

          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-black text-xs py-2 px-3 rounded-full transition-colors ml-1"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Order WA
          </a>

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
            <div className="mx-3 my-2 border-t border-subtle" />
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2.5 mx-3 mb-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-black text-sm rounded-xl transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Order via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}