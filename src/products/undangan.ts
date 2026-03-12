import { Product } from '../types';

const WA = (msg: string) => `https://wa.me/628123456789?text=${encodeURIComponent(msg)}`;

export const undangan: Product = {
  id: 'undangan',
  name: 'Cetak Undangan',
  description: 'Cetak undangan pernikahan, khitanan, ulang tahun & acara spesial murah berkualitas premium — kertas tebal, full color, finishing laminasi glossy atau doff. Desain custom sesuai tema. Pengiriman ke seluruh Indonesia.',
  longDescription: `Undangan adalah kesan pertama yang diterima tamu sebelum menghadiri acara istimewa kamu. Undangan yang indah bukan hanya menyampaikan informasi — ia mencerminkan keistimewaan acara yang kamu selenggarakan.

Di jasprint, kami cetak undangan dengan kualitas premium menggunakan kertas tebal berkualitas, cetak full color yang tajam, dan pilihan finishing yang memberikan kesan mewah. Kami telah membantu ribuan pelanggan mencetak undangan pernikahan, khitanan, ulang tahun, dan berbagai acara spesial lainnya.

Jenis Undangan yang Kami Layani:
Undangan pernikahan soft cover maupun hard cover, undangan khitanan dan aqiqah, undangan ulang tahun anak maupun dewasa, undangan syukuran dan tasyakuran, undangan rapat dan acara formal perusahaan, serta undangan wisuda dan acara akademik.

Pilihan Bahan & Finishing:
Kami menyediakan berbagai pilihan kertas undangan mulai dari art carton 260gsm, linen emboss, hingga kertas pearlescent yang berkilau elegan. Untuk finishing tersedia laminasi glossy, laminasi doff yang elegan, UV spot untuk efek kilap, serta hot stamping foil emas atau perak untuk kesan premium.

Proses Mudah via WhatsApp:
Cukup kirim desain atau referensi yang diinginkan via WhatsApp. Tim kami siap bantu revisi desain, proof warna, hingga pastikan undangan sampai tepat waktu sebelum hari H.`,
  category: 'Acara',
  filename: 'undangan',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-5">

        <div class="grid grid-cols-2 gap-3">
          ${[
            { icon: '📄', label: 'Bahan', value: 'Art Carton / Linen / Pearlescent' },
            { icon: '✨', label: 'Finishing', value: 'Glossy / Doff / Foil / UV Spot' },
            { icon: '📐', label: 'Ukuran', value: 'A5, A6, Custom' },
            { icon: '🎨', label: 'Cetak', value: 'Full Color, Detail Tajam' },
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
              { type: 'Undangan Simple (100 pcs)', price: 'Mulai Rp 350.000' },
              { type: 'Undangan Premium Laminasi (100 pcs)', price: 'Mulai Rp 550.000' },
              { type: 'Undangan Hard Cover / Foil', price: 'Hubungi untuk penawaran' },
            ].map(p => `
              <div class="flex items-center justify-between px-4 py-2.5">
                <p class="text-xs font-bold text-primary">${p.type}</p>
                <p class="text-xs font-black text-red-500">${p.price}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="rounded-xl border border-subtle overflow-hidden">
          <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Jenis Undangan</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              '💍 Undangan Pernikahan — soft cover & hard cover',
              '🕌 Undangan Khitanan & Aqiqah',
              '🎂 Undangan Ulang Tahun anak & dewasa',
              '🎓 Undangan Wisuda & Acara Formal',
              '🏢 Undangan Rapat & Acara Perusahaan',
            ].map(f => `
              <div class="flex items-center gap-2.5 px-4 py-2.5">
                <p class="text-xs font-semibold text-secondary">${f}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="rounded-xl border border-subtle overflow-hidden">
          <div class="px-4 py-2.5 bg-subtle border-b border-subtle">
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Keunggulan Undangan jasprint</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              'Kertas tebal & berkualitas, terasa premium di tangan',
              'Warna cetak akurat, detail halus terjaga sempurna',
              'Finishing laminasi rapi, tidak mudah lecek',
              'Tersedia desain custom sesuai tema acara',
              'Pengerjaan tepat waktu, siap sebelum hari H',
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
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">FAQ Undangan</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              { q: 'Berapa lama waktu pengerjaan?', a: 'Standar 3–5 hari kerja. Untuk undangan hard cover atau foil bisa 5–7 hari. Pesan minimal 2 minggu sebelum acara.' },
              { q: 'Apakah bisa bantu desain?', a: 'Bisa! Tim desainer kami siap bantu dari nol. Cukup kirim tema, warna, dan informasi acara via WhatsApp.' },
              { q: 'Minimum order berapa pcs?', a: 'Minimum 50 pcs. Semakin banyak order, semakin murah harga per undangannya.' },
            ].map(f => `
              <div class="px-4 py-3">
                <p class="text-xs font-black text-primary mb-1">${f.q}</p>
                <p class="text-xs text-secondary leading-relaxed">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-pink-50 dark:bg-pink-500/10 rounded-xl p-4 border border-pink-100 dark:border-pink-500/20">
          <p class="text-xs font-black text-pink-700 dark:text-pink-400 uppercase tracking-widest mb-1">💡 Tips Order</p>
          <p class="text-xs text-pink-900 dark:text-pink-300 leading-relaxed">Pesan minimal 2–3 minggu sebelum acara. Sertakan nama, tanggal, lokasi, dan dress code saat konsultasi. Kami bisa bantu desain jika belum punya!</p>
        </div>

        <a
          href="${WA('Halo jasprint! Saya mau tanya cetak undangan dong 🙏')}"
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