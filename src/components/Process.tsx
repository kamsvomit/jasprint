"use client";

import React from 'react';
import { MessageSquare, Palette, Printer, Truck } from 'lucide-react';

const STEPS = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Konsultasi",
    desc: "Ngobrol santai via WA tentang kebutuhan cetak kamu."
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Desain & Fix",
    desc: "Kirim desain kamu atau kami bantu buatkan sampai cocok."
  },
  {
    icon: <Printer className="w-5 h-5" />,
    title: "Proses Cetak",
    desc: "Pesanan kamu langsung masuk mesin dengan kualitas premium."
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Kirim / Ambil",
    desc: "Pesanan siap dikirim ke alamatmu atau diambil di workshop."
  }
];

export default function Process() {
  return (
    <section className="py-12 px-4 sm:px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black tracking-tight text-primary">Proses Cetak di <span className="text-red-600">jasprint</span></h2>
          <p className="text-sm text-secondary mt-2 max-w-lg mx-auto">
            Gak perlu ribet datang ke workshop. Semua bisa diurus dari rumah, semudah kirim pesan WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line for desktop */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-[1px] bg-arsenic/10 -z-10" />
              )}
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-card border border-arsenic/10 shadow-sm flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-primary uppercase tracking-widest">Langkah {index + 1}</p>
                  <h3 className="text-base font-bold text-primary">{step.title}</h3>
                  <p className="text-xs text-secondary leading-relaxed px-4">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
