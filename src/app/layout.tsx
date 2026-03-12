import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import { SITE_URL, SITE_NAME, WA_NUMBER } from "../lib/constants";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const OG_IMAGE = `${SITE_URL}/icon-512.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Percetakan jasprint Bandung — Cetak Murah Berkualitas',
    template: '%s — jasprint Bandung',
  },
  description: 'Jasa percetakan murah dan berkualitas di Bandung sejak 1990. Cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan. Pesan via WhatsApp, kirim se-Indonesia.',
  keywords: [
    'percetakan bandung',
    'jasa cetak bandung',
    'cetak murah bandung',
    'cetak brosur bandung',
    'cetak spanduk bandung',
    'cetak kartu nama bandung',
    'cetak sticker bandung',
    'cetak nota bandung',
    'cetak undangan bandung',
    'percetakan murah',
    'jasprint',
    'jasprint bandung',
  ],
  authors: [{ name: 'jasprint', url: SITE_URL }],
  creator: 'jasprint',
  publisher: 'jasprint',
  category: 'Jasa Percetakan',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: { 'id-ID': `${SITE_URL}/`, 'x-default': `${SITE_URL}/` },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Percetakan jasprint Bandung — Cetak Murah Berkualitas',
    description: 'Jasa percetakan murah dan berkualitas di Bandung sejak 1990. Cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan. Pesan via WhatsApp, kirim se-Indonesia.',
    url: `${SITE_URL}/`,
    locale: 'id_ID',
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: 'Percetakan jasprint Bandung' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percetakan jasprint Bandung — Cetak Murah Berkualitas',
    description: 'Jasa percetakan murah dan berkualitas di Bandung sejak 1990. Cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan.',
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'jasprint',
  alternateName: 'Percetakan jasprint Bandung',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/icon-512.png`,
  description: 'Jasa percetakan murah dan berkualitas di Bandung sejak 1990. Melayani cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan.',
  telephone: `+${WA_NUMBER}`,
  priceRange: '$$',
  currenciesAccepted: 'IDR',
  paymentAccepted: 'Cash, Bank Transfer, GoPay, OVO, Dana',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bandung',
    addressRegion: 'Jawa Barat',
    postalCode: '40000',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.9175,
    longitude: 107.6191,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    `https://wa.me/${WA_NUMBER}`,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Percetakan jasprint',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cetak Brosur', url: `${SITE_URL}/produk/brosur` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cetak Spanduk', url: `${SITE_URL}/produk/spanduk` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cetak Kartu Nama', url: `${SITE_URL}/produk/kartu-nama` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cetak Sticker', url: `${SITE_URL}/produk/sticker` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cetak Nota', url: `${SITE_URL}/produk/nota` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cetak Undangan', url: `${SITE_URL}/produk/undangan` } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Bagaimana cara memesan cetak di jasprint?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pesan via WhatsApp — ceritakan kebutuhan, dapatkan estimasi harga, kirim file desain, bayar DP, cetak, dan terima pesanan. Konsultasi gratis.' },
    },
    {
      '@type': 'Question',
      name: 'Berapa lama proses cetak di jasprint?',
      acceptedAnswer: { '@type': 'Answer', text: 'Standar 1–3 hari kerja setelah desain disetujui dan DP dikonfirmasi. Tersedia juga layanan ekspres untuk kebutuhan mendesak.' },
    },
    {
      '@type': 'Question',
      name: 'Apakah jasprint melayani pengiriman ke luar Bandung?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ya, jasprint melayani pengiriman ke seluruh Indonesia via JNE, J&T, SiCepat, Anteraja, dan ekspedisi lainnya.' },
    },
    {
      '@type': 'Question',
      name: 'Apa saja metode pembayaran yang diterima jasprint?',
      acceptedAnswer: { '@type': 'Answer', text: 'Transfer bank (BCA, Mandiri, BRI, BNI), dompet digital (GoPay, OVO, Dana, ShopeePay), dan tunai di workshop.' },
    },
    {
      '@type': 'Question',
      name: 'Apakah jasprint bisa membantu pembuatan desain?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ya, jasprint menyediakan layanan desain grafis dengan biaya terjangkau. Konsultasi desain awal gratis via WhatsApp.' },
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: 'Jasa percetakan murah dan berkualitas di Bandung sejak 1990.',
  publisher: { '@id': `${SITE_URL}/#business` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://exzasfnbsgjvzuqpthdd.supabase.co" />
        <link rel="dns-prefetch" href="https://exzasfnbsgjvzuqpthdd.supabase.co" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}