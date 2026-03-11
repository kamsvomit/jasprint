import { Product } from '../types';

export const kartuNama: Product = {
  id: 'kartu-nama',
  name: 'Cetak Kartu Nama',
  description: 'Cetak kartu nama profesional murah berkualitas premium — art carton, linen, soft touch, dengan finishing UV spot, emboss, atau foil. Kesan pertama yang kuat untuk personal branding dan bisnis kamu. Pengiriman ke seluruh Indonesia.',
  longDescription: `Kartu nama adalah investasi branding paling kecil tapi dampaknya besar. Satu kartu nama yang berkesan bisa membuka peluang bisnis yang tidak terduga. Di jasprint, kami bantu kamu tampil profesional dengan kartu nama berkualitas premium.

Pilihan Spesifikasi Kartu Nama:
Ukuran standar 9×5.5 cm atau custom sesuai kebutuhan. Pilihan kertas mulai dari art carton 260gsm, linen texture, hingga soft touch yang terasa premium di tangan. Finishing UV spot untuk highlight elemen tertentu, laminasi glossy atau matte, serta pilihan hot stamping foil gold/silver untuk kesan eksklusif.

Cetak Satuan atau Box?
Tersedia cetak per box (100 lembar) hingga order partai besar. Cocok untuk profesional individual, tim perusahaan, atau usaha kecil yang baru membangun branding. Harga per lembar makin hemat untuk order lebih banyak.

Cocok untuk Siapa?
Profesional dan freelancer di berbagai bidang, pemilik bisnis dan UMKM yang ingin tampil lebih serius, sales dan marketing yang butuh kartu nama impresif, serta peserta pameran, seminar, dan networking event.

Fun fact: Orang yang menerima kartu nama fisik 10x lebih mungkin menghubungi kamu dibanding yang hanya tukar nomor HP. Jadi jangan anggap remeh kartu nama ya!`,
  category: 'Identitas',
  filename: 'kartu-nama',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-5">

        <div class="grid grid-cols-2 gap-3">
          ${[
            { icon: '📏', label: 'Ukuran', value: '9×5.5 cm / Custom' },
            { icon: '🃏', label: 'Kertas', value: 'Art Carton / Linen / Soft Touch' },
            { icon: '✨', label: 'Finishing', value: 'UV Spot / Foil / Emboss' },
            { icon: '📦', label: 'Kemasan', value: 'Per box 100 lembar' },
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
            <p class="text-[10px] font-black text-quaternary uppercase tracking-widest">Keunggulan Kartu Nama jasprint</p>
          </div>
          <div class="divide-y divide-subtle">
            ${[
              'Cetak double side — depan belakang full color',
              'Kertas tebal premium, tidak mudah bengkok',
              'Finishing presisi — UV spot dan foil yang rapi',
              'Warna konsisten di setiap box cetakan',
              'Proses cepat, siap kirim 2–3 hari kerja',
            ].map(f => `
              <div class="flex items-center gap-2.5 px-4 py-2.5">
                <span class="text-red-500 font-black text-sm flex-shrink-0">✓</span>
                <p class="text-xs font-semibold text-secondary">${f}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-500/10 rounded-xl p-4 border border-red-100 dark:border-red-500/20">
          <p class="text-xs font-black text-red-600 uppercase tracking-widest mb-1">💡 Tips Order</p>
          <p class="text-xs text-red-800 dark:text-red-300 leading-relaxed">File desain PDF/AI dengan bleed 1mm dan resolusi 300 DPI. Pastikan font di-embed atau di-outline ya. Belum ada desain? Hubungi kami!</p>
        </div>

        <a
          href="https://wa.me/628123456789?text=Halo%20jasprint!%20Saya%20mau%20tanya%20cetak%20kartu%20nama%20dong%20%F0%9F%99%8F"
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