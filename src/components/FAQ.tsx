"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Bagaimana cara memesan produk cetak di jasprint?",
    answer: "Memesan di jasprint sangat mudah. Pilih produk yang Anda butuhkan dari katalog kami, kemudian klik tombol 'Pesan via WhatsApp' untuk langsung terhubung dengan tim kami. Anda bisa berkonsultasi mengenai spesifikasi ukuran, bahan, jumlah cetak, desain, dan estimasi harga. Kami akan memandu Anda dari awal hingga pesanan selesai dan siap diterima."
  },
  {
    question: "Apakah bisa cetak dengan desain sendiri?",
    answer: "Tentu saja bisa. jasprint menerima file desain siap cetak dalam berbagai format, antara lain PDF, AI (Adobe Illustrator), PSD (Photoshop), CorelDraw CDR, serta JPG atau PNG dengan resolusi minimal 300 DPI. Pastikan desain sudah dalam mode warna CMYK untuk hasil cetak yang optimal. Jika Anda belum memiliki desain atau masih dalam tahap konsep, tim kreatif kami siap membantu proses desain dengan biaya yang terjangkau."
  },
  {
    question: "Berapa lama proses pengerjaan cetak di jasprint?",
    answer: "Estimasi waktu pengerjaan bervariasi tergantung jenis produk, jumlah pesanan, dan tingkat kesibukan produksi. Secara umum, pesanan standar diselesaikan dalam 1 hingga 3 hari kerja setelah desain disetujui dan pembayaran dikonfirmasi. Untuk pesanan dalam jumlah besar atau produk khusus, bisa memakan waktu 3 hingga 5 hari kerja. Kami selalu menginformasikan estimasi waktu pengerjaan di awal pemesanan."
  },
  {
    question: "Apakah ada minimal order untuk setiap produk?",
    answer: "Ketentuan minimal order berbeda-beda untuk setiap produk. Kartu nama umumnya minimal per kotak (100 lembar), brosur minimal per rim (500 lembar), sedangkan spanduk dan sticker bisa dipesan satuan sesuai kebutuhan. Untuk nota dan faktur NCR, minimal order biasanya per buku. Hubungi kami untuk mengetahui ketentuan minimal order spesifik produk yang Anda inginkan."
  },
  {
    question: "Apakah jasprint melayani pengiriman ke luar kota?",
    answer: "Ya, jasprint melayani pengiriman ke seluruh wilayah Indonesia. Kami bekerja sama dengan berbagai jasa ekspedisi terpercaya seperti JNE, J&T, SiCepat, Anteraja, dan lainnya. Biaya pengiriman ditanggung oleh pelanggan dan dihitung berdasarkan berat, dimensi, serta tujuan pengiriman. Untuk area Bandung dan sekitarnya, tersedia juga pilihan pengiriman instan menggunakan ojek online."
  },
  {
    question: "Metode pembayaran apa saja yang diterima jasprint?",
    answer: "jasprint menerima berbagai metode pembayaran untuk kemudahan transaksi Anda. Pembayaran dapat dilakukan melalui transfer bank (BCA, Mandiri, BRI, BNI), dompet digital (GoPay, OVO, Dana, ShopeePay), maupun tunai untuk pelanggan yang datang langsung ke workshop kami di Bandung. Untuk pesanan dalam jumlah besar, berlaku sistem uang muka (DP) minimal 50% di awal, dengan pelunasan sebelum pesanan dikirim."
  },
  {
    question: "Apakah hasil cetak dijamin akurat warnanya?",
    answer: "jasprint menggunakan mesin cetak modern yang terkalibrasi secara berkala untuk memastikan konsistensi dan akurasi warna terbaik. Namun perlu dipahami bahwa terdapat perbedaan karakteristik antara warna layar monitor (mode RGB) dengan hasil cetak (mode CMYK). Untuk hasil warna yang paling akurat, kami sarankan file desain sudah disiapkan dalam mode CMYK dengan profil warna yang sesuai. Anda juga bisa meminta cetak proof atau contoh warna sebelum proses produksi massal."
  },
  {
    question: "Apakah jasprint bisa membantu pembuatan desain?",
    answer: "Ya, jasprint menyediakan layanan desain grafis untuk membantu pelanggan yang belum memiliki file desain siap cetak. Tim desainer kami berpengalaman dalam membuat desain brosur, kartu nama, spanduk, sticker, undangan, dan berbagai kebutuhan cetak lainnya. Biaya desain tergantung kompleksitas pekerjaan dan akan dikomunikasikan sebelum proses dimulai. Konsultasi desain awal gratis via WhatsApp."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 sm:px-5 space-y-6">
      <div>
        <h2 className="text-xl font-black text-primary tracking-tight">Pertanyaan yang Sering Diajukan</h2>
        <p className="text-xs text-tertiary font-medium mt-1 uppercase tracking-widest">Segala hal yang perlu Anda ketahui tentang jasprint</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="category-section rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-subtle transition-colors"
            >
              <span className="text-sm font-bold text-primary pr-4">{faq.question}</span>
              {openIndex === index
                ? <ChevronUp className="w-4 h-4 text-red-500 flex-shrink-0" />
                : <ChevronDown className="w-4 h-4 text-tertiary flex-shrink-0" />
              }
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-sm text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}