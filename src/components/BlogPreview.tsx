"use client";
import React from 'react';
import { BlogPost, formatDate } from '../lib/blog';
import { ArrowRight, BookOpen } from 'lucide-react';

interface BlogPreviewProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

function PostCard({ post, onSelect }: { post: BlogPost; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group flex flex-col rounded-2xl category-section overflow-hidden hover:shadow-md transition-all text-left w-full"
    >
      {post.cover_url ? (
        <div className="aspect-[16/9] overflow-hidden bg-arsenic/5">
          <img
            src={post.cover_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/10 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-red-200" />
        </div>
      )}

      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          {post.category && (
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
          )}
          <span className="text-[10px] text-quaternary font-medium ml-auto">
            {formatDate(post.published_at)}
          </span>
        </div>

        <p className="text-sm font-black text-primary leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
          {post.title}
        </p>

        {post.excerpt && (
          <p className="text-xs text-secondary leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-1 text-red-500 pt-1">
          <span className="text-xs font-bold">Baca selengkapnya</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
}

export default function BlogPreview({ posts, onSelectPost }: BlogPreviewProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="px-4 sm:px-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Tips & Info</p>
          <p className="text-xl font-black text-primary tracking-tight">Artikel Terbaru</p>
        </div>
        <a 
          href="/blog" 
          className="flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-red-500 transition-colors group"
        >
          Lihat Semua
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} onSelect={() => onSelectPost(post)} />
          </div>
        ))}
      </div>
    </section>
  );
}