import { Product } from '../types';

import { WA_NUMBER } from '../lib/constants';

export const sticker: Product = {
  id: 'sticker',
  name: 'Cetak Sticker',
  description: 'Cetak sticker custom berkualitas tinggi — vinyl, kromo, transparan, die cut, hingga sticker label produk. Harga murah, hasil tajam, tahan air & cuaca. Cocok untuk branding, kemasan, promosi, dan dekorasi.',
  longDescription: `Sticker bukan sekadar tempelan — ini adalah media branding yang efektif dan terjangkau. Di jasprint, kamu bisa cetak sticker custom sesuai kebutuhan, mulai dari sticker label kemasan produk, sticker promosi, sticker motor & helm, hingga sticker dekorasi dinding.

Bahan & Pilihan Finishing:
Kami menyediakan berbagai pilihan bahan sticker: vinyl outdoor tahan air dan sinar UV, kertas kromo untuk label produk, bahan transparan (clear), serta laminasi glossy atau matte untuk tampilan premium. Tersedia juga potongan die cut sesuai bentuk desain kamu.

Kenapa Pilih jasprint untuk Cetak Sticker?
Mesin cetak resolusi tinggi menghasilkan warna yang tajam dan akurat. Tinta berkualitas memastikan sticker tidak mudah pudar. Pengerjaan cepat dengan hasil konsisten di setiap lembarnya. Bisa pesan dalam jumlah kecil maupun order partai besar.

Cocok untuk Siapa?
Pemilik UMKM dan brand lokal yang butuh sticker label kemasan, pelaku bisnis kuliner untuk sticker toples, botol, dan packaging, komunitas dan event organizer untuk sticker souvenir, serta siapa saja yang butuh sticker custom dengan harga bersahabat.

Cara pesan gampang banget — tinggal kirim desain kamu via WhatsApp, tim kami siap bantu dari proses proof hingga selesai cetak.`,
  category: 'Promosi',
  filename: 'sticker',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-5">

        <div class="grid grid-cols-2 gap-3">
          ${[
            { icon: '🏷️', label: 'Bahan', value: 'Vinyl / Kromo / Transparan' },
            { icon: '✂️', label: 'Potongan', value: 'Die Cut /Sheet / Roll' },
            { icon: '✨', label: 'Laminasi', value: 'Glossy / Matte / Doff' },
            { icon: '💧', label: 'Ketahanan', value: 'Tahan Air & UV' },
          ].map(s => `
            <div class="bg-subtle rounded-xl p-3 flex items-start gap-2.5 border border-subtle">
              <span class="text-lg leading-none mt-0.5">${s.icon}</span>
              <div>
                <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">${s.label}</p>
                <p class="text-xs font-bold text-primary mt-0.5">${s.value}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="rounded-xl border border-subtle overflow-hidden">
          <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Keunggulan Sticker jasprint</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              'Warna tajam & akurat — resolusi cetak tinggi',
              'Tidak mudah pudar, tahan air & sinar matahari',
              'Tersedia ukuran custom sesuai kebutuhan',
              'Bisa cetak satuan hingga ribuan lembar',
              'Proses cepat, bisa same-day untuk order tertentu',
            ].map(f => `
              <div class="flex items-center gap-2.5 px-4 py-2.5">
                <span class="text-red-500 font-black text-sm flex-shrink-0">✓</span>
                <p class="text-xs font-semibold text-secondary">${f}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="rounded-xl border border-subtle overflow-hidden">
          <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Estimasi Harga</p>
          </div>
          <div class="divide-y divide-subtle">
            
            <div class="flex items-center justify-between px-4 py-2.5">
              <p class="text-xs font-bold text-primary">Sticker Vinyl A4 (1 lembar)</p>
              <p class="text-xs font-black text-red-500">Mulai Rp 15.000</p>
            </div>
            <div class="flex items-center justify-between px-4 py-2.5">
              <p class="text-xs font-bold text-primary">Sticker Die Cut (per pcs)</p>
              <p class="text-xs font-black text-red-500">Mulai Rp 2.500/pcs</p>
            </div>
            <div class="flex items-center justify-between px-4 py-2.5">
              <p class="text-xs font-bold text-primary">Sticker Label Roll (per meter)</p>
              <p class="text-xs font-black text-red-500">Mulai Rp 35.000/meter</p>
            </div>
            <div class="flex items-center justify-between px-4 py-2.5">
              <p class="text-xs font-bold text-primary">Custom ukuran / bahan</p>
              <p class="text-xs font-black text-red-500">Hubungi untuk penawaran</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-subtle overflow-hidden">
          <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">FAQ</p>
          </div>
          <div class="divide-y divide-subtle">
            
            <div class="px-4 py-3">
              <p class="text-xs font-black text-primary mb-1">Berapa minimum order sticker?</p>
              <p class="text-xs text-secondary leading-relaxed">Tidak ada minimum! Bisa cetak dari 1 lembar. Tapi semakin banyak, harga per lembar makin murah.</p>
            </div>
            <div class="px-4 py-3">
              <p class="text-xs font-black text-primary mb-1">Apakah sticker tahan air?</p>
              <p class="text-xs text-secondary leading-relaxed">Tergantung bahan. Vinyl outdoor tahan air dan UV. Kromo untuk indoor. Konsultasi dulu ya!</p>
            </div>
            <div class="px-4 py-3">
              <p class="text-xs font-black text-primary mb-1">Berapa lama pengerjaan?</p>
              <p class="text-xs text-secondary leading-relaxed">Standar 1–2 hari kerja. Order sama-day tersedia untuk sticker ukuran kecil dengan syarat tertentu.</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-500/10 rounded-xl p-4 border border-red-100 dark:border-red-500/20">
          <p class="text-xs font-black text-red-600 uppercase tracking-widest mb-1">💡 Tips Order</p>
          <p class="text-xs text-red-800 dark:text-red-300 leading-relaxed">Siapkan file desain format PNG/PDF resolusi minimal 300 DPI. Belum punya desain? Tim kami bisa bantu!</p>
        </div>

        <a
          href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo jasprint! Saya mau tanya cetak sticker custom dong 🙏')}"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-sm"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Tanya Harga & Pesan Sekarang
        </a>

      </div>
    `;
  },
};