import { Product } from '../types';

export const brosur: Product = {
  id: 'brosur',
  name: 'Cetak Brosur',
  description: 'Cetak brosur & leaflet custom murah berkualitas — art paper, glossy, matte, full color, lipat 2 atau lipat 3. Ideal untuk promosi bisnis, event, restoran, properti, dan kampanye pemasaran. Pengiriman ke seluruh Indonesia.',
  longDescription: `Brosur yang bagus adalah ujung tombak promosi bisnis kamu. Di jasprint, kami cetak brosur dengan warna yang hidup, detail yang tajam, dan kertas berkualitas yang bikin calon pelanggan betah baca sampai habis.

Pilihan Spesifikasi Brosur:
Tersedia berbagai ukuran mulai dari A5, A4, hingga custom. Pilihan kertas art paper 100gsm, 120gsm, hingga 150gsm. Finishing laminasi glossy untuk kesan cerah dan mewah, atau matte/doff untuk tampilan elegan modern. Tersedia juga pilihan lipat 2 (bifold) dan lipat 3 (trifold) untuk brosur yang lebih informatif dan praktis dibawa.

Kenapa Brosur Masih Efektif?
Di era digital sekalipun, brosur fisik terbukti meningkatkan konversi karena bisa dipegang dan dibaca langsung. Cocok untuk pameran, toko, meja resepsionis, atau dibagikan di lokasi ramai. Dengan desain yang menarik dan cetak berkualitas dari jasprint, brosur kamu pasti standout.

Cocok untuk:
Restoran dan kafe untuk menu promo, agen properti dan developer perumahan, klinik, apotek, dan layanan kesehatan, event organizer dan panitia acara, serta UMKM dan bisnis retail yang butuh media promosi offline yang efektif.

Proses order mudah — kirim desain, konfirmasi spek, bayar, cetak, kirim. Sesimpel itu!`,
  category: 'Promosi',
  filename: 'brosur',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-5">

        <div class="grid grid-cols-2 gap-3">
          ${[
            { icon: '📐', label: 'Ukuran', value: 'A5 / A4 / Custom' },
            { icon: '📄', label: 'Kertas', value: 'Art Paper 100–150 gsm' },
            { icon: '✨', label: 'Finishing', value: 'Glossy / Matte / Doff' },
            { icon: '🔀', label: 'Lipatan', value: 'Flat / Lipat 2 / Lipat 3' },
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
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Keunggulan Brosur jasprint</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              'Cetak full color CMYK — warna akurat dan vivid',
              'Kertas tebal premium, tidak mudah sobek',
              'Hasil laminasi halus dan rata di setiap lembar',
              'Bisa cetak dari 100 lembar hingga ribuan',
              'Tersedia jasa desain jika belum punya file',
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
              <p class="text-xs font-bold text-primary">A5 Single / Flat (100 pcs)</p>
              <p class="text-xs font-black text-red-500">Mulai Rp 120.000</p>
            </div>
            <div class="flex items-center justify-between px-4 py-2.5">
              <p class="text-xs font-bold text-primary">A5 Lipat 2 / Trifold (100 pcs)</p>
              <p class="text-xs font-black text-red-500">Mulai Rp 180.000</p>
            </div>
            <div class="flex items-center justify-between px-4 py-2.5">
              <p class="text-xs font-bold text-primary">A4 Full Color (100 pcs)</p>
              <p class="text-xs font-black text-red-500">Mulai Rp 200.000</p>
            </div>
            <div class="flex items-center justify-between px-4 py-2.5">
              <p class="text-xs font-bold text-primary">Custom ukuran / spek</p>
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
              <p class="text-xs font-black text-primary mb-1">Berapa minimum order brosur?</p>
              <p class="text-xs text-secondary leading-relaxed">Minimum 100 lembar. Semakin banyak, semakin murah harga per lembarnya.</p>
            </div>
            <div class="px-4 py-3">
              <p class="text-xs font-black text-primary mb-1">Format file apa yang diterima?</p>
              <p class="text-xs text-secondary leading-relaxed">PDF, AI, PSD, CDR resolusi 300 DPI dengan bleed 3mm. Belum ada desain? Tim kami bisa bantu!</p>
            </div>
            <div class="px-4 py-3">
              <p class="text-xs font-black text-primary mb-1">Berapa lama pengerjaan?</p>
              <p class="text-xs text-secondary leading-relaxed">Standar 2–3 hari kerja setelah file desain disetujui.</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-500/10 rounded-xl p-4 border border-red-100 dark:border-red-500/20">
          <p class="text-xs font-black text-red-600 uppercase tracking-widest mb-1">💡 Tips Order</p>
          <p class="text-xs text-red-800 dark:text-red-300 leading-relaxed">File desain PDF/AI/PSD dengan resolusi 300 DPI dan bleed 3mm. Belum ada desain? Hubungi kami, tim desainer kami siap bantu!</p>
        </div>

        <a
          href="https://wa.me/628123456789?text=Halo%20jasprint!%20Saya%20mau%20tanya%20cetak%20brosur%20dong%20%F0%9F%99%8F"
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