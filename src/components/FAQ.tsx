"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { question: "Bagaimana cara memesan produk di jasprint?", answer: "Anda bisa memilih produk yang diinginkan dari katalog kami, lalu klik tombol 'Pesan via WhatsApp' untuk langsung berkonsultasi mengenai spesifikasi, desain, dan harga dengan tim kami." },
  { question: "Apakah bisa cetak dengan desain sendiri?", answer: "Tentu saja. Kami menerima file desain siap cetak dalam format PDF, AI, PSD, atau JPG/PNG resolusi tinggi. Jika belum memiliki desain, tim kami juga bisa membantu proses desain Anda." },
  { question: "Berapa lama proses pengerjaan cetakan?", answer: "Waktu pengerjaan bervariasi tergantung jenis produk dan jumlah pesanan. Umumnya berkisar antara 1-3 hari kerja setelah desain disetujui dan pembayaran dikonfirmasi." },
  { question: "Apakah ada minimal order untuk setiap produk?", answer: "Beberapa produk memiliki minimal order tertentu (seperti kartu nama per box atau brosur per rim), namun ada juga produk yang bisa dipesan satuan seperti spanduk atau sticker meteran." },
  { question: "Apakah jasprint melayani pengiriman ke luar kota?", answer: "Ya, kami melayani pengiriman ke seluruh wilayah Indonesia menggunakan jasa ekspedisi terpercaya. Untuk area Bandung, tersedia juga layanan pengiriman instan." },
  { question: "Bagaimana sistem pembayarannya?", answer: "Pembayaran dapat dilakukan melalui transfer bank atau dompet digital. Untuk pesanan dalam jumlah besar, kami memberlakukan sistem DP (Down Payment) di awal." },
  { question: "Apakah hasil cetak dijamin akurat warnanya?", answer: "Kami menggunakan mesin cetak terkalibrasi untuk hasil warna terbaik. Namun, perlu dipahami bahwa akan ada sedikit perbedaan antara tampilan layar (RGB) dengan hasil cetak (CMYK)." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 sm:px-5 space-y-6">
      <div>
        <h2 className="text-xl font-black text-primary tracking-tight">Pertanyaan Sering Diajukan</h2>
        <p className="text-xs text-tertiary font-medium mt-1 uppercase tracking-widest">Segala hal yang perlu Anda ketahui</p>
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