import React from 'react';
import { Shield, Zap, Heart, Smartphone, MapPin, Clock, Star, Truck } from 'lucide-react';

export default function AboutContent() {
  return (
    <section className="px-4 sm:px-5 space-y-6">

      {/* Tentang Jasprint */}
      <div className="space-y-3">
        <h2 className="text-xl font-black text-primary tracking-tight">Mengenal jasprint Lebih Dekat</h2>
        <p className="text-sm text-secondary leading-relaxed">
          jasprint adalah jasa percetakan profesional di Bandung yang telah berdiri sejak tahun 1990. Selama lebih dari 30 tahun, kami berkomitmen memberikan hasil cetak terbaik dengan harga yang kompetitif. Kami melayani berbagai kebutuhan cetak mulai dari promosi bisnis, identitas merek, hingga keperluan personal dengan proses yang cepat, mudah, dan dapat diandalkan.
        </p>
        <p className="text-sm text-secondary leading-relaxed">
          Berlokasi di Bandung, Jawa Barat, jasprint telah dipercaya oleh ribuan pelanggan dari berbagai kalangan — mulai dari UMKM, perusahaan besar, instansi pemerintah, hingga perorangan. Kami menyediakan layanan cetak brosur, cetak spanduk, cetak kartu nama, cetak sticker, cetak nota, dan undangan pernikahan dengan kualitas premium.
        </p>
      </div>

      {/* Keunggulan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: <Shield className="w-5 h-5 text-red-500" />, bg: 'bg-red-50 dark:bg-red-500/10', title: 'Kualitas Terjamin', desc: 'Kami menggunakan mesin cetak modern dan bahan berkualitas tinggi untuk memastikan setiap produk cetak tampil sempurna, warna akurat, dan tahan lama.' },
          { icon: <Zap className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-50 dark:bg-orange-500/10', title: 'Pengerjaan Cepat', desc: 'Kami memahami waktu Anda sangat berharga. Dengan alur kerja yang efisien dan tim berpengalaman, kami menjamin pengerjaan tepat waktu sesuai kesepakatan.' },
          { icon: <Heart className="w-5 h-5 text-pink-500" />, bg: 'bg-pink-50 dark:bg-pink-500/10', title: 'Harga Transparan', desc: 'Dapatkan kualitas cetak premium dengan harga yang bersahabat dan transparan. Tidak ada biaya tersembunyi. Cocok untuk semua skala kebutuhan dan budget.' },
          { icon: <Smartphone className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-500/10', title: 'Pesan via WhatsApp', desc: 'Tidak perlu repot datang ke toko. Konsultasi desain, kirim file, konfirmasi pesanan — semua bisa dilakukan praktis melalui WhatsApp kapan saja.' },
          { icon: <Truck className="w-5 h-5 text-green-500" />, bg: 'bg-green-50 dark:bg-green-500/10', title: 'Pengiriman Se-Indonesia', desc: 'Pesanan selesai bisa diambil langsung di workshop kami di Bandung, atau kami kirimkan ke seluruh wilayah Indonesia melalui jasa kurir terpercaya.' },
          { icon: <Star className="w-5 h-5 text-yellow-500" />, bg: 'bg-yellow-50 dark:bg-yellow-500/10', title: '30+ Tahun Berpengalaman', desc: 'Sejak 1990, jasprint telah melayani ribuan pelanggan dengan penuh dedikasi. Pengalaman panjang kami adalah jaminan kepercayaan dan kualitas terbaik.' },
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

      {/* Mengapa Jasprint */}
      <div className="space-y-3">
        <h2 className="text-xl font-black text-primary tracking-tight">Mengapa Memilih jasprint?</h2>
        <p className="text-sm text-secondary leading-relaxed">
          Dengan pengalaman lebih dari tiga dekade di industri percetakan, jasprint hadir sebagai solusi cetak terpercaya di Bandung. Kami mengutamakan kepuasan pelanggan dengan memberikan hasil cetak yang tajam, warna yang akurat, dan pelayanan yang ramah serta responsif.
        </p>
        <p className="text-sm text-secondary leading-relaxed">
          Setiap pesanan kami tangani dengan serius — dari pemilihan bahan, setting warna, hingga finishing. Kami juga menyediakan layanan konsultasi desain gratis bagi Anda yang belum memiliki file siap cetak. Tim kami siap membantu mewujudkan kebutuhan cetak Anda menjadi kenyataan.
        </p>
      </div>

      {/* Produk Layanan */}
      <div className="space-y-3">
        <h2 className="text-xl font-black text-primary tracking-tight">Produk Layanan Percetakan jasprint</h2>
        <p className="text-sm text-secondary leading-relaxed">
          jasprint menyediakan berbagai layanan cetak untuk kebutuhan promosi, branding, dan administrasi bisnis Anda. Produk unggulan kami meliputi cetak brosur full color, cetak spanduk dan banner outdoor, cetak kartu nama profesional, cetak sticker custom berbagai ukuran, cetak nota dan faktur NCR, serta cetak undangan pernikahan dan acara.
        </p>
        <p className="text-sm text-secondary leading-relaxed">
          Semua produk tersedia dalam berbagai ukuran, material, dan finishing sesuai kebutuhan. Minimum order fleksibel — mulai dari cetak satuan hingga cetak massal untuk kebutuhan perusahaan. Hubungi kami untuk mendapatkan penawaran harga terbaik.
        </p>
      </div>

      {/* Cara Pemesanan */}
      <div className="space-y-4 pt-4 border-t border-subtle">
        <h2 className="text-xl font-black text-primary tracking-tight">Cara Pemesanan di jasprint</h2>
        <div className="space-y-4">
          {[
            { n: '1', title: 'Pilih Produk', desc: 'Telusuri katalog produk kami dan pilih layanan cetak yang Anda butuhkan, seperti brosur, spanduk, kartu nama, sticker, nota, atau undangan.' },
            { n: '2', title: 'Konsultasi & Desain', desc: 'Hubungi kami melalui WhatsApp untuk konsultasi spesifikasi cetak, estimasi harga, dan pengiriman file desain Anda. Belum punya desain? Tim kami siap membantu.' },
            { n: '3', title: 'Konfirmasi & Pembayaran', desc: 'Setelah sepakat dengan spesifikasi dan harga, lakukan konfirmasi pesanan dan pembayaran. Kami menerima berbagai metode pembayaran.' },
            { n: '4', title: 'Proses Cetak', desc: 'Tim cetak kami memproses pesanan Anda menggunakan mesin modern dengan standar kualitas ketat. Estimasi pengerjaan akan diinformasikan di awal.' },
            { n: '5', title: 'Pengiriman / Pengambilan', desc: 'Pesanan yang sudah selesai bisa diambil langsung di workshop kami di Bandung, atau kami kirimkan ke alamat Anda di seluruh Indonesia via jasa kurir.' },
          ].map((item) => (
            <div key={item.n} className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{background:'var(--text-primary)', color:'var(--card-bg)'}}>
                {item.n}
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                <strong className="text-primary">{item.title}:</strong> {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lokasi */}
      <div className="p-4 rounded-xl category-section space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
          <h3 className="text-sm font-bold text-primary">Lokasi jasprint</h3>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          jasprint berlokasi di Bandung, Jawa Barat. Kami melayani pelanggan dari seluruh Indonesia secara online maupun offline. Kunjungi workshop kami atau hubungi via WhatsApp untuk informasi alamat lengkap dan jam operasional.
        </p>
        <div className="flex items-center gap-2 pt-1">
          <Clock className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
          <p className="text-xs text-secondary">Senin – Sabtu, 08.00 – 17.00 WIB</p>
        </div>
      </div>

    </section>
  );
}