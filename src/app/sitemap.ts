import { MetadataRoute } from 'next';
import { getAllProducts } from '../lib/products';
import { getAllSlugs } from '../lib/blog';

const BASE_URL = 'https://jasprint.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogSlugs] = await Promise.all([
    getAllProducts(),
    getAllSlugs(),
  ]);

  const productUrls = products.map(prod => ({
    url: `${BASE_URL}/produk/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogSlugs.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    // Home — highest priority
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },

    // Nav pages
    { url: `${BASE_URL}/cara-order`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/faq`,        lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/tentang`,    lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/blog`,       lastModified: new Date(), changeFrequency: 'daily'   as const, priority: 0.7 },

    // Produk
    ...productUrls,

    // Blog posts
    ...blogUrls,
  ];
}