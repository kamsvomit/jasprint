'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getStoredUser, signOut, type AdminUser } from '../../lib/supabase-admin';

const NAV = [
  { href: '/admin/dashboard',   icon: '⬛', label: 'Dashboard'  },
  { href: '/admin/produk',      icon: '🖨️', label: 'Produk'      },
  { href: '/admin/blog',        icon: '📝', label: 'Blog'        },
  { href: '/admin/components',  icon: '🧩', label: 'Komponen'   },
  { href: '/admin/settings',    icon: '⚙️', label: 'Pengaturan' },
];

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminShell({ children, title, subtitle }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const u = getStoredUser();
    if (!u) { router.replace('/admin/login'); return; }
    setUser(u);
  }, [router]);

  async function handleLogout() {
    await signOut();
    router.replace('/admin/login');
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-[#121212] border-r border-zinc-800/50 z-30
        flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-zinc-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/20">
              <span className="text-white text-sm font-black">J</span>
            </div>
            <div>
              <p className="text-zinc-100 font-black text-sm leading-none tracking-tight">jasprint</p>
              <p className="text-zinc-500 text-[10px] font-medium mt-0.5 uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(item => {
            const active = pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all
                  ${active
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }
                `}
              >
                <span className="text-base leading-none opacity-80">{item.icon}</span>
                {item.label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />}
              </a>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-zinc-800/50">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-zinc-800/30">
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-black text-white">
                {user.email[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-200 text-xs font-bold truncate">{user.email}</p>
              <p className="text-zinc-500 text-[10px]">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              title="Keluar"
              className="p-1.5 hover:bg-zinc-700/50 rounded-lg transition-colors text-zinc-500 hover:text-red-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          <a
            href="/"
            target="_blank"
            className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all text-xs font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Lihat Website
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-zinc-800/50 bg-[#121212]/80 backdrop-blur-md flex items-center px-4 lg:px-6 gap-3 flex-shrink-0 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-zinc-100 font-black text-base leading-tight">{title}</h1>
            {subtitle && <p className="text-zinc-500 text-xs">{subtitle}</p>}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-[#0a0a0a]">
          {children}
        </main>
      </div>
    </div>
  );
}