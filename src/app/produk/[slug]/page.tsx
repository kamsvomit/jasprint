import React from 'react';
import { getAllProducts, getProductBySlug } from '../../../lib/products';
import { getRecentPosts } from '../../../lib/blog';
import ClientPage from '../../ClientPage';
import { Metadata } from 'next';
import { SITE_URL, WA_NUMBER, SITE_NAME } from '../../../lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

const keywordMap: Record<string, string[]> = {
  'brosur':     ['cetak brosur bandung', 'cetak leaflet murah', 'cetak brosur trifold', 'percetakan brosur bandung', 'cetak brosur online', 'harga cetak brosur'],
  'kartu-nama': ['cetak kartu nama bandung', 'kartu nama murah', 'cetak kartu nama premium', 'percetakan kartu nama bandung', 'harga kartu nama'],
  'sticker':    ['cetak sticker bandung', 'cetak sticker custom', 'cetak sticker vinyl', 'cetak label sticker murah', 'sticker die cut bandung'],
  'spanduk':    ['cetak spanduk bandung', 'cetak banner murah', 'cetak spanduk flexi', 'percetakan spanduk bandung', 'harga cetak spanduk'],
  'nota':       ['cetak nota ncr bandung', 'cetak faktur custom', 'cetak nota murah', 'percetakan nota bandung', 'nota rangkap 2 3'],
  'undangan':   ['cetak undangan bandung', 'cetak undangan pernikahan murah', 'cetak undangan custom', 'percetakan undangan bandung', 'undangan pernikahan murah'],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prod = await getProductBySlug(slug);

  if (!prod) return { title: 'Produk Tidak Ditemukan' };

  const desc = prod.description.length > 160
    ? prod.description.substring(0, 157) + '...'
    : prod.description;

  // Pakai foto upload pertama kalau ada, fallback ke icon
  const ogImage = prod.images?.[0] ?? `${SITE_URL}/icon-512.png`;
  const ogImageWidth = prod.images?.[0] ? 1200 : 512;
  const ogImageHeight = prod.images?.[0] ? 630 : 512;

  const keywords = [
    prod.name,
    `cetak ${prod.name.toLowerCase()}`,
    `harga ${prod.name.toLowerCase()}`,
    'percetakan murah bandung',
    'jasprint bandung',
    ...(keywordMap[slug] ?? []),
  ];

  const title = `${prod.name} Murah Berkualitas — Percetakan jasprint Bandung`;

  return {
    title,
    description: desc,
    keywords,
    alternates: { canonical: `${SITE_URL}/produk/${prod.slug || prod.id}` },
    openGraph: {
      title,
      description: desc,
      url: `${SITE_URL}/produk/${prod.slug || prod.id}`,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'id_ID',
      images: [{
        url: ogImage,
        width: ogImageWidth,
        height: ogImageHeight,
        alt: `${prod.name} — jasprint Bandung`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(prod => ({ slug: prod.slug || prod.id }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [products, recentPosts] = await Promise.all([
    getAllProducts(),
    getRecentPosts(3),
  ]);

  const initialProduct = products.find(p => p.slug === slug || p.id === slug) ?? null;
  const ogImage = initialProduct?.images?.[0] ?? `${SITE_URL}/icon-512.png`;

  // ── Schema.org: Product ───────────────────────────────────────────────
  const productSchema = initialProduct ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: initialProduct.name,
    description: initialProduct.description,
    image: initialProduct.images?.length ? initialProduct.images : [`${SITE_URL}/icon-512.png`],
    brand: { '@type': 'Brand', name: 'jasprint' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: initialProduct.prices?.[0]?.price?.replace(/[^0-9]/g, '') || undefined,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/produk/${initialProduct.slug || initialProduct.id}`,
      seller: {
        '@type': 'LocalBusiness',
        name: 'Percetakan jasprint Bandung',
        telephone: `+${WA_NUMBER}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bandung',
          addressRegion: 'Jawa Barat',
          addressCountry: 'ID',
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
  } : null;

  // ── Schema.org: Breadcrumb ────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Produk', item: `${SITE_URL}/#produk` },
      ...(initialProduct ? [{
        '@type': 'ListItem',
        position: 3,
        name: initialProduct.name,
        item: `${SITE_URL}/produk/${initialProduct.slug || initialProduct.id}`,
      }] : []),
    ],
  };

  // ── Schema.org: FAQ (dari data produk + default) ──────────────────────
  const faqItems = [
    ...(initialProduct?.faqs ?? []).map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
    {
      '@type': 'Question',
      name: `Berapa harga ${initialProduct?.name.toLowerCase() ?? 'produk ini'} di jasprint?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: initialProduct?.prices?.length
          ? `Harga mulai dari ${initialProduct.prices[0].price}. Hubungi kami via WhatsApp untuk penawaran terbaik.`
          : `Hubungi kami via WhatsApp untuk mendapatkan penawaran harga terbaik sesuai spesifikasi.`,
      },
    },
    {
      '@type': 'Question',
      name: `Berapa lama pengerjaan ${initialProduct?.name.toLowerCase() ?? 'produk ini'}?`,
      acceptedAnswer: { '@type': 'Answer', text: '1–3 hari kerja setelah desain disetujui dan DP dikonfirmasi. Tersedia layanan ekspres.' },
    },
    {
      '@type': 'Question',
      name: 'Apakah jasprint melayani pengiriman ke luar Bandung?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ya! jasprint melayani pengiriman ke seluruh Indonesia via JNE, J&T, SiCepat, dan ekspedisi lainnya.' },
    },
  ];

  const faqSchema = initialProduct ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ClientPage
        initialProducts={products}
        initialActiveTool={initialProduct}
        recentPosts={recentPosts}
      />
    </>
  );
}
