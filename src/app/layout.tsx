import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jasprint.vercel.app"),
  title: "Percetakan jasprint — Cetak Murah Berkualitas di Bandung",
  description: "Jasa percetakan murah dan berkualitas di Bandung. Cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan dengan hasil terbaik.",
  keywords: ["percetakan", "cetak murah", "percetakan bandung", "cetak brosur", "cetak spanduk", "cetak kartu nama", "jasprint"],
  authors: [{ name: "jasprint" }],
  category: "printing, services, business",
  robots: "index, follow",
  alternates: {
    canonical: "https://jasprint.vercel.app/",
    languages: {
      'id-ID': 'https://jasprint.vercel.app/',
      'x-default': 'https://jasprint.vercel.app/',
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "jasprint",
    title: "Percetakan jasprint — Cetak Murah Berkualitas",
    description: "Jasa percetakan murah dan berkualitas. Cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan.",
    url: "https://jasprint.vercel.app/",
    locale: "id_ID",
    images: [
      {
        url: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Percetakan jasprint — Cetak Murah Berkualitas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Percetakan jasprint — Cetak Murah Berkualitas",
    description: "Jasa percetakan murah dan berkualitas. Cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan.",
    images: ["https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "jasprint",
    "url": "https://jasprint.vercel.app/",
    "description": "Jasa percetakan murah dan berkualitas di Bandung.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bandung",
      "addressCountry": "ID"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Cetak Brosur",
          "url": "https://jasprint.vercel.app/produk/brosur"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cetak Spanduk",
          "url": "https://jasprint.vercel.app/produk/spanduk"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Cetak Kartu Nama",
          "url": "https://jasprint.vercel.app/produk/kartu-nama"
        }
      ]
    }
  };

  return (
    <html lang="id" className={plusJakartaSans.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}