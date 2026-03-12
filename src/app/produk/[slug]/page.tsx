import React from 'react';
import { getAllProducts } from '../../../lib/products';
import ClientPage from '../../ClientPage';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = 'https://jasprint.vercel.app';
const WA_NUMBER = '628123456789';

const keywordMap: Record<string, string[]> = {
  'brosur':     ['cetak brosur bandung', 'cetak leaflet murah', 'cetak brosur trifold', 'percetakan brosur bandung', 'cetak brosur online'],
  'kartu-nama': ['cetak kartu nama bandung', 'kartu nama murah', 'cetak kartu nama premium', 'percetakan kartu nama bandung'],
  'sticker':    ['cetak sticker bandung', 'cetak sticker custom', 'cetak sticker vinyl', 'cetak label sticker murah'],
  'spanduk':    ['cetak spanduk bandung', 'cetak banner murah', 'cetak spanduk flexi', 'percetakan spanduk bandung'],
  'nota':       ['cetak nota ncr bandung', 'cetak faktur custom', 'cetak nota murah', 'percetakan nota bandung'],
  'undangan':   ['cetak undangan bandung', 'cetak undangan pernikahan murah', 'cetak undangan custom', 'percetakan undangan bandung'],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const products = await getAllProducts();
  const prod = products.find(p => p.id === slug);

  if (!prod) return { title: 'Produk Tidak Ditemukan' };

  const desc = prod.description.length > 160
    ? prod.description.substring(0, 157) + '...'
    : prod.description;

  const keywords = [
    prod.name,
    `cetak ${prod.name.toLowerCase()}`,
    'percetakan murah bandung',
    'jasprint bandung',
    ...(keywordMap[slug] || []),
  ];

  return {
    title: `${prod.name} Murah Berkualitas — Percetakan jasprint Bandung`,
    description: desc,
    keywords,
    alternates: { canonical: `${SITE_URL}/produk/${prod.id}` },
    openGraph: {
      title: `${prod.name} — Percetakan jasprint Bandung`,
      description: desc,
      url: `${SITE_URL}/produk/${prod.id}`,
      siteName: 'Percetakan jasprint Bandung',
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((prod) => ({ slug: prod.id }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const products = await getAllProducts();
  const initialProduct = products.find(p => p.id === slug) || null;

  const productSchema = initialProduct ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: initialProduct.name,
    description: initialProduct.description,
    brand: { '@type': 'Brand', name: 'jasprint' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Percetakan jasprint Bandung',
        telephone: `+${WA_NUMBER}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Bandung', addressRegion: 'Jawa Barat', addressCountry: 'ID' },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '120',
    },
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Produk', item: `${SITE_URL}/produk` },
      ...(initialProduct ? [{ '@type': 'ListItem', position: 3, name: initialProduct.name, item: `${SITE_URL}/produk/${slug}` }] : []),
    ],
  };

  const faqSchema = initialProduct ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Berapa harga ${initialProduct.name.toLowerCase()} di jasprint?`,
        acceptedAnswer: { '@type': 'Answer', text: `Harga ${initialProduct.name.toLowerCase()} di jasprint sangat terjangkau dan kompetitif. Hubungi kami via WhatsApp untuk mendapatkan penawaran harga terbaik sesuai spesifikasi yang kamu butuhkan.` },
      },
      {
        '@type': 'Question',
        name: `Berapa lama pengerjaan ${initialProduct.name.toLowerCase()}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Pengerjaan ${initialProduct.name.toLowerCase()} di jasprint standar 1–3 hari kerja tergantung jenis produk dan jumlah order. Untuk kebutuhan mendesak, hubungi kami untuk diskusi pengerjaan ekspres.` },
      },
      {
        '@type': 'Question',
        name: `Apakah jasprint melayani pengiriman ke luar Bandung?`,
        acceptedAnswer: { '@type': 'Answer', text: `Ya! jasprint melayani pengiriman ke seluruh Indonesia via JNE, J&T, SiCepat, dan ekspedisi lainnya. Untuk area Bandung tersedia layanan antar gratis dengan syarat tertentu.` },
      },
    ],
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ClientPage initialProducts={products} initialActiveTool={initialProduct} />
    </>
  );
}