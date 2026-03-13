import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts, formatDate } from '../../lib/blog';
import { ArrowLeft, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Tips Cetak — jasprint',
  description: 'Tips desain, panduan cetak, dan info seputar percetakan dari tim jasprint Bandung.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-arsenic/[0.02]">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="space-y-1">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Tips & Info</p>
          <h1 className="text-2xl font-black text-primary tracking-tight">Artikel Terbaru</h1>
          <p className="text-sm text-secondary">
            Tips desain, panduan cetak, dan info seputar percetakan dari tim jasprint.
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-arsenic/20" />
            <p className="text-sm font-bold text-secondary">Belum ada artikel.</p>
            <p className="text-xs text-quaternary">Cek lagi nanti ya!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 p-4 rounded-2xl category-section hover:shadow-md transition-all"
              >
                {/* Thumbnail */}
                {post.cover_url ? (
                  <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-arsenic/5">
                    <img
                      src={post.cover_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-red-200" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-center space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.category && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    )}
                    <span className="text-[10px] text-quaternary font-medium">
                      {formatDate(post.published_at)}
                    </span>
                  </div>
                  <p className="text-sm font-black text-primary leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </p>
                  {post.excerpt && (
                    <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
