import { MetadataRoute } from 'next';
import { getAllProducts } from '../lib/products';
import { getAllSlugs } from '../lib/blog';
import { SITE_URL as BASE_URL } from '../lib/constants';

export const revalidate = 3600; // revalidate tiap jam

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogSlugs] = await Promise.all([
    getAllProducts(),
    getAllSlugs(),
  ]);

  const productUrls: MetadataRoute.Sitemap = products.map(prod => ({
    url: `${BASE_URL}/produk/${prod.slug || prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    { url: BASE_URL,                       lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/blog`,             lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/cara-order`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/faq`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/tentang`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productUrls,
    ...blogUrls,
  ];
}
