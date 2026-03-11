import { MetadataRoute } from 'next';
import { getAllProducts } from '../lib/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const baseUrl = 'https://jasprint.vercel.app';

  const productUrls = products.map((prod) => ({
    url: `${baseUrl}/produk/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
  ];
}
