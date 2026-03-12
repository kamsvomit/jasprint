import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllSlugs, formatDate } from '../../../lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = 'https://jasprint.vercel.app';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artikel tidak ditemukan' };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    keywords: post.category ? [post.category, 'tips cetak', 'percetakan bandung', 'jasprint'] : undefined,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'jasprint Bandung',
      type: 'article',
      publishedTime: post.published_at,
      authors: post.author ? [post.author] : ['jasprint'],
      images: post.cover_url
        ? [{ url: post.cover_url, width: 1200, height: 630, alt: post.title }]
        : [{ url: `${SITE_URL}/icon-512.png`, width: 512, height: 512, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_url ? [post.cover_url] : [`${SITE_URL}/icon-512.png`],
    },
  };
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_url ?? `${SITE_URL}/icon-512.png`,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Person', name: post.author ?? 'jasprint' },
    publisher: {
      '@type': 'Organization',
      name: 'jasprint',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  // Halaman ini tidak dirender ke user — konten muncul via ClientPage pop-up.
  // Tapi tetap butuh halaman ini agar GSC bisa crawl URL /blog/[slug] dengan metadata yang benar.
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Redirect ke home — konten tampil via client-side pop-up */}
      <meta httpEquiv="refresh" content={`0; url=${SITE_URL}?post=${slug}`} />
    </>
  );
}