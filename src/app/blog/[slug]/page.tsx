import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllSlugs, getRecentPosts } from '../../../lib/blog';
import { getAllProducts } from '../../../lib/products';
import ClientPage from '../../ClientPage';
import { SITE_URL } from '../../../lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
  const [post, products, recentPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllProducts(),
    getRecentPosts(3)
  ]);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ClientPage 
        initialProducts={products} 
        initialActiveBlogPost={post}
        recentPosts={recentPosts}
      />
    </>
  );
}
