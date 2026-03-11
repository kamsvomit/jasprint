import React from 'react';
import { getAllProducts } from '../../../lib/products';
import ClientPage from '../../ClientPage';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const products = await getAllProducts();
  const prod = products.find(p => p.id === slug);
  
  if (!prod) return { title: 'Produk Tidak Ditemukan' };

  const description = prod.description.length > 160 
    ? prod.description.substring(0, 157) + "..." 
    : prod.description;

  return {
    title: `${prod.name} — Percetakan jasprint`,
    description: description,
    keywords: [prod.name, `cetak ${prod.name}`, 'percetakan murah', 'percetakan bandung'],
    alternates: {
      canonical: `https://jasprint.vercel.app/produk/${prod.id}`,
    },
    openGraph: {
      title: `${prod.name} — Percetakan jasprint`,
      description: description,
      url: `https://jasprint.vercel.app/produk/${prod.id}`,
    }
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((prod) => ({
    slug: prod.id,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const products = await getAllProducts();
  const initialTool = products.find(p => p.id === slug) || null;
  
  const jsonLd = initialTool ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": initialTool.name,
    "description": initialTool.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ClientPage initialProducts={products} initialActiveTool={initialTool} />
    </>
  );
}
