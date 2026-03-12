import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllSlugs, formatDate } from '../../../lib/blog';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artikel tidak ditemukan — jasprint' };

  return {
    title: `${post.title} — jasprint`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_url ? [{ url: post.cover_url }] : [],
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-arsenic/[0.02]">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Blog
        </Link>

        {/* Cover */}
        {post.cover_url && (
          <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-arsenic/5">
            <img
              src={post.cover_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta */}
        <div className="space-y-3">
          {post.category && (
            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 dark:bg-red-500/10 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
          )}

          <h1 className="text-2xl font-black text-primary tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.published_at)}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-subtle" />

        {/* Content */}
        {post.content ? (
          <article
            className="prose prose-sm prose-slate max-w-none
              prose-headings:font-black prose-headings:text-primary prose-headings:tracking-tight
              prose-p:text-secondary prose-p:leading-relaxed
              prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-primary prose-strong:font-black
              prose-li:text-secondary
              prose-img:rounded-2xl
              dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-sm text-secondary italic">Konten tidak tersedia.</p>
        )}

        {/* Footer CTA */}
        <div className="pt-4 border-t border-subtle">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-500/10 dark:to-orange-500/5 space-y-3">
            <p className="text-sm font-black text-primary">Mau cetak sekarang?</p>
            <p className="text-xs text-secondary leading-relaxed">
              Tim jasprint siap bantu dari konsultasi sampai produk jadi. Respon cepat via WhatsApp.
            </p>
            <a
              href="https://wa.me/628123456789?text=Halo%20jasprint%21%20Saya%20mau%20konsultasi%20cetak%20nih%20%F0%9F%99%8F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-2.5 px-4 rounded-xl text-sm transition-all"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
