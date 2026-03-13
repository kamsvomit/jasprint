"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { WA_NUMBER } from '../lib/constants';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Apakah bisa cetak satuan atau harus banyak?",
    answer: "Tergantung produknya. Untuk beberapa item seperti kartu nama atau sticker, kami memiliki minimum order yang sangat terjangkau. Untuk spanduk atau banner, Anda bisa cetak mulai dari 1 pcs saja."
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer: "Rata-rata proses cetak memakan waktu 1-3 hari kerja setelah desain disetujui. Namun, kami juga menyediakan layanan kilat untuk kebutuhan mendesak."
  },
  {
    question: "Apakah jasprint bisa bantu buatkan desainnya?",
    answer: "Tentu! Kami memiliki tim desainer yang siap membantu mewujudkan ide Anda. Anda cukup memberikan konsep atau referensi, dan kami akan buatkan desain yang profesional."
  },
  {
    question: "Bagaimana cara pengiriman ke luar kota Bandung?",
    answer: "Kami bekerja sama dengan berbagai ekspedisi terpercaya (JNE, J&T, SiCepat, dll) untuk pengiriman ke seluruh Indonesia. Kami pastikan packing aman agar produk sampai dalam kondisi sempurna."
  },
  {
    question: "Apakah ada garansi jika hasil cetak tidak sesuai?",
    answer: "Kepuasan Anda adalah prioritas kami. Jika terjadi kesalahan cetak yang disebabkan oleh kelalaian kami, kami siap memberikan solusi terbaik berupa cetak ulang atau kompensasi lainnya."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 sm:px-5">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-primary">Pertanyaan Umum</h2>
            <p className="text-sm text-secondary">Segala hal yang sering ditanyakan pelanggan jasprint.</p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={index}
              className="border border-arsenic/10 rounded-2xl overflow-hidden bg-card transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-subtle/50 transition-colors"
              >
                <span className="text-sm font-bold text-primary pr-4">{item.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-quaternary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 text-sm text-secondary leading-relaxed border-t border-arsenic/5 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-5 rounded-2xl bg-subtle/50 border border-dashed border-arsenic/20 text-center">
          <p className="text-xs text-secondary font-medium">
            Punya pertanyaan lain? <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo jasprint! Saya mau tanya soal FAQ ini...')}`} target="_blank" rel="noopener noreferrer" className="text-red-500 font-bold hover:underline">Tanyakan langsung via WhatsApp</a>, kami siap membantu!
          </p>
        </div>
      </div>
    </section>
  );
}
