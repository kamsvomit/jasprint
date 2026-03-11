import React from 'react';
import { Shield, Zap, Heart, Smartphone } from 'lucide-react';

export default function AboutContent() {
  return (
    <section className="px-4 sm:px-5 space-y-6">
      <div className="space-y-3">
        <h2 className="text-xl font-black text-primary tracking-tight">Mengenal jasprint Lebih Dekat</h2>
        <p className="text-sm text-secondary leading-relaxed">
          jasprint adalah jasa percetakan profesional di Bandung yang berkomitmen memberikan hasil cetak terbaik dengan harga yang kompetitif. Kami melayani berbagai kebutuhan cetak mulai dari promosi bisnis hingga keperluan personal dengan proses yang cepat dan mudah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: <Shield className="w-5 h-5 text-red-500" />, bg: 'bg-red-50 dark:bg-red-500/10', title: 'Kualitas Terjamin', desc: 'Kami menggunakan mesin cetak modern dan bahan berkualitas tinggi untuk memastikan setiap produk cetak Anda tampil sempurna dan profesional.' },
          { icon: <Zap className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-50 dark:bg-orange-500/10', title: 'Pengerjaan Cepat', desc: 'Kami memahami waktu Anda sangat berharga. Dengan alur kerja yang efisien, kami menjamin pengerjaan tepat waktu sesuai kesepakatan.' },
          { icon: <Heart className="w-5 h-5 text-pink-500" />, bg: 'bg-pink-50 dark:bg-pink-500/10', title: 'Harga Kompetitif', desc: 'Dapatkan kualitas cetak premium dengan harga yang bersahabat. Kami menawarkan berbagai paket harga yang bisa disesuaikan dengan budget Anda.' },
          { icon: <Smartphone className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-500/10', title: 'Pesan Online Mudah', desc: 'Tidak perlu repot datang ke toko. Anda bisa melakukan pemesanan dan konsultasi desain secara online melalui WhatsApp kami.' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl category-section space-y-3">
            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
              {item.icon}
            </div>
            <h3 className="text-sm font-bold text-primary">{item.title}</h3>
            <p className="text-xs text-secondary leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-black text-primary tracking-tight">Mengapa Memilih jasprint?</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Dengan pengalaman bertahun-tahun di industri percetakan, jasprint hadir sebagai solusi cetak terpercaya di Bandung. Kami mengutamakan kepuasan pelanggan dengan memberikan hasil cetak yang tajam, warna yang akurat, dan pelayanan yang ramah.
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-subtle">
        <h2 className="text-xl font-black text-primary tracking-tight">Cara Pemesanan di jasprint</h2>
        <div className="space-y-4">
          {[
            { n: '1', title: 'Pilih Produk', desc: 'Telusuri katalog produk kami dan pilih layanan cetak yang Anda butuhkan, seperti brosur, spanduk, atau kartu nama.' },
            { n: '2', title: 'Konsultasi & Desain', desc: 'Hubungi kami melalui WhatsApp untuk konsultasi spesifikasi cetak dan pengiriman file desain Anda.' },
            { n: '3', title: 'Proses Cetak', desc: 'Setelah konfirmasi pesanan dan pembayaran, kami akan segera memproses cetakan Anda dengan standar kualitas tinggi.' },
            { n: '4', title: 'Pengiriman / Pengambilan', desc: 'Pesanan yang sudah selesai bisa diambil langsung di workshop kami atau dikirim ke alamat Anda melalui jasa kurir.' },
          ].map((item) => (
            <div key={item.n} className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold" style={{background:'var(--text-primary)', color:'var(--card-bg)'}}>
                {item.n}
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                <strong className="text-primary">{item.title}:</strong> {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
