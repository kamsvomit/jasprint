import { Product } from '../types';

const WA = (msg: string) => `https://wa.me/628123456789?text=${encodeURIComponent(msg)}`;

export const spanduk: Product = {
  id: 'spanduk',
  name: 'Cetak Spanduk & Banner',
  description: 'Cetak spanduk & banner outdoor murah berkualitas — bahan flexi korea, frontlite, backlit, full color, tahan cuaca & UV. Cocok untuk promosi toko, grand opening, acara, pameran, dan papan informasi. Gratis ongkir area Bandung. Pengiriman ke seluruh Indonesia.',
  longDescription: `Spanduk dan banner adalah media promosi outdoor paling efektif dan terjangkau. Dengan ukuran besar dan warna mencolok, spanduk jasprint memastikan bisnis kamu terlihat dari jauh dan diingat calon pelanggan.

Di jasprint, kami cetak spanduk menggunakan mesin printing resolusi tinggi dengan tinta solvent berkualitas yang tahan sinar matahari, hujan, dan cuaca ekstrem. Hasilnya? Warna tetap cerah dan tajam meski dipasang di luar ruangan berbulan-bulan.

Pilihan Bahan Spanduk:
Flexi Korea adalah pilihan paling populer untuk spanduk outdoor karena harganya ekonomis namun cukup kuat. Frontlite cocok untuk spanduk di area terang karena warna lebih vivid. Backlit digunakan untuk spanduk yang disinari dari belakang seperti lightbox. Tersedia juga bahan mesh untuk area berangin agar tidak mudah robek.

Finishing & Aksesoris:
Semua spanduk jasprint dilengkapi jahitan tepi yang rapi agar tidak mudah sobek. Tersedia lubang mata ayam (eyelet) di sudut-sudut spanduk untuk memudahkan pemasangan. Bisa juga ditambahkan tiang bambu atau rangka PVC atas permintaan.

Cocok untuk promosi toko dan usaha, grand opening bisnis baru, spanduk acara pernikahan dan ulang tahun, banner pameran dan expo, papan nama dan informasi.`,
  category: 'Outdoor',
  filename: 'spanduk',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-5">

        <div class="grid grid-cols-2 gap-3">
          ${[
            { icon: '🏗️', label: 'Bahan', value: 'Flexi Korea / Frontlite / Backlit' },
            { icon: '📐', label: 'Ukuran', value: 'Custom sesuai kebutuhan' },
            { icon: '🎨', label: 'Cetak', value: 'Full Color, Resolusi Tinggi' },
            { icon: '🌧️', label: 'Ketahanan', value: 'Tahan Cuaca & UV' },
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
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Estimasi Harga</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              { size: '60 × 160 cm', price: 'Mulai Rp 35.000' },
              { size: '100 × 200 cm', price: 'Mulai Rp 60.000' },
              { size: '100 × 300 cm', price: 'Mulai Rp 80.000' },
              { size: 'Custom / Jumbo', price: 'Hubungi untuk penawaran' },
            ].map(p => `
              <div class="flex items-center justify-between px-4 py-2.5">
                <p class="text-xs font-bold text-primary">${p.size}</p>
                <p class="text-xs font-black text-red-500">${p.price}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="rounded-xl border border-subtle overflow-hidden">
          <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Keunggulan Spanduk jasprint</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              'Warna tajam & tahan lama — tinta solvent berkualitas',
              'Jahitan tepi rapi + lubang mata ayam di setiap sudut',
              'Tahan hujan, panas, dan angin — cocok outdoor',
              'Ukuran bebas — dari kecil hingga spanduk jumbo',
              'Pengerjaan cepat 1–2 hari kerja',
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
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">FAQ Spanduk</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              { q: 'Berapa lama pengerjaan?', a: 'Standar 1–2 hari kerja. Untuk ukuran besar atau jumlah banyak bisa 2–3 hari.' },
              { q: 'Format file apa yang diterima?', a: 'PNG, JPG, PDF, CDR, AI. Resolusi minimal 72 DPI dengan ukuran asli atau skala 1:10.' },
              { q: 'Bisa antar ke luar Bandung?', a: 'Bisa! Kami kirim via JNE, J&T, atau ekspedisi pilihan ke seluruh Indonesia.' },
            ].map(f => `
              <div class="px-4 py-3">
                <p class="text-xs font-black text-primary mb-1">${f.q}</p>
                <p class="text-xs text-secondary leading-relaxed">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-sky-50 dark:bg-sky-500/10 rounded-xl p-4 border border-sky-100 dark:border-sky-500/20">
          <p class="text-xs font-black text-sky-700 dark:text-sky-400 uppercase tracking-widest mb-1">💡 Tips Desain</p>
          <p class="text-xs text-sky-900 dark:text-sky-300 leading-relaxed">File PNG/PDF/CDR resolusi minimal 72 DPI ukuran asli. Belum punya desain? Tim kami siap bantu dari nol!</p>
        </div>

        <a
          href="${WA('Halo jasprint! Saya mau tanya cetak spanduk/banner dong 🙏')}"
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