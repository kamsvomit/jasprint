// src/lib/navPages.ts
// Konten tiap halaman nav — di-render langsung di hero area (sama kayak produk)

export interface NavPageContent {
  id: string;
  label: string;
  html: string;
}

import { WA_URL as WA } from './constants';

export const NAV_PAGE_CONTENTS: NavPageContent[] = [

  // ── CARA ORDER ──────────────────────────────────────────────────────────────
  {
    id: 'cara-order',
    label: 'Cara Order',
    html: `
      <div class="space-y-6">
        <div>
          <p class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Prosesnya Mudah</p>
          <p class="text-xl font-black text-primary tracking-tight">Pesan dalam 4 Langkah</p>
          <p class="text-sm text-secondary mt-1">Dari konsultasi sampai terima produk, semua kami handle dengan profesional.</p>
        </div>

        <div class="space-y-3">
          ${[
            { n:'01', emoji:'💬', title:'Chat via WhatsApp', desc:'Ceritakan kebutuhan cetak kamu — jenis produk, ukuran, jumlah, dan tenggat waktu. Gratis konsultasi.' },
            { n:'02', emoji:'💸', title:'Dapat Harga & Konfirmasi', desc:'Kami kasih estimasi harga langsung. Setuju? Kirim file desain dan lakukan pembayaran DP.' },
            { n:'03', emoji:'🖨️', title:'Proses Cetak', desc:'Tim kami mulai proses cetak dengan standar kualitas ketat. Kamu bisa tracking status via WA.' },
            { n:'04', emoji:'📦', title:'Terima Pesanan', desc:'Pesanan selesai dikirim ke alamat kamu atau bisa diambil langsung di workshop kami di Bandung.' },
          ].map(s => `
            <div class="flex gap-4 p-4 rounded-2xl category-section">
              <div class="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center shadow-sm">
                <span class="text-lg">${s.emoji}</span>
              </div>
              <div class="space-y-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-black text-red-400 tracking-widest">${s.n}</span>
                  <p class="text-sm font-black text-primary">${s.title}</p>
                </div>
                <p class="text-xs text-secondary leading-relaxed">${s.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="p-4 rounded-2xl bg-subtle border border-subtle space-y-2">
          <p class="text-sm font-black text-primary">Format file yang diterima:</p>
          <div class="flex flex-wrap gap-2">
            ${['PDF ✓', 'AI ✓', 'CDR ✓', 'PSD ✓', 'JPG/PNG 300dpi ✓'].map(f => `
              <span class="text-xs font-bold text-secondary px-2.5 py-1 rounded-full bg-card border border-subtle">${f}</span>
            `).join('')}
          </div>
          <p class="text-xs text-secondary">Mode warna <strong class="text-primary">CMYK</strong> untuk hasil cetak paling akurat.</p>
        </div>

        <a href="${WA}" target="_blank" rel="noopener noreferrer"
          class="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-3.5 rounded-2xl text-sm transition-all">
          <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Mulai Order Sekarang
        </a>
      </div>
    `,
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────────
  {
    id: 'faq',
    label: 'FAQ',
    html: `
      <div class="space-y-5">
        <div>
          <p class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Bantuan</p>
          <p class="text-xl font-black text-primary tracking-tight">Pertanyaan yang Sering Diajukan</p>
        </div>

        <div class="space-y-2" id="faq-list">
          ${[
            { q:'Bagaimana cara memesan?', a:'Pilih produk → chat WhatsApp → kirim file desain → bayar DP → cetak → terima pesanan. Konsultasi gratis, respon dalam menit.' },
            { q:'Format file apa yang diterima?', a:'PDF (direkomendasikan), AI, CDR, PSD, JPG/PNG minimal 300 DPI. Mode warna CMYK untuk hasil terbaik.' },
            { q:'Berapa lama proses cetak?', a:'Standar 1–3 hari kerja setelah desain disetujui dan DP dikonfirmasi. Pesanan besar atau khusus bisa 3–5 hari kerja.' },
            { q:'Ada minimal order?', a:'Tergantung produk. Kartu nama minimal 100 lembar, brosur minimal 500 lembar, spanduk & sticker bisa satuan. Tanya tim kami untuk detail.' },
            { q:'Apakah bisa kirim ke luar kota?', a:'Ya, kami kirim ke seluruh Indonesia via JNE, J&T, SiCepat, dan lainnya. Ongkir ditanggung pembeli.' },
            { q:'Metode pembayaran apa saja?', a:'Transfer bank (BCA, Mandiri, BRI, BNI), dompet digital (GoPay, OVO, Dana, ShopeePay), dan tunai di workshop.' },
            { q:'Apakah bisa bantu desain?', a:'Bisa. Tim desainer kami siap membantu. Biaya desain tergantung kompleksitas, dikomunikasikan sebelum mulai.' },
          ].map((f, i) => `
            <div class="faq-item category-section rounded-2xl overflow-hidden">
              <button onclick="(function(btn){
                var item = btn.closest('.faq-item');
                var ans = item.querySelector('.faq-ans');
                var icon = item.querySelector('.faq-icon');
                var isOpen = ans.style.maxHeight && ans.style.maxHeight !== '0px';
                document.querySelectorAll('.faq-ans').forEach(function(el){ el.style.maxHeight='0px'; el.style.opacity='0'; });
                document.querySelectorAll('.faq-icon').forEach(function(el){ el.style.transform='rotate(0deg)'; });
                if(!isOpen){ ans.style.maxHeight='200px'; ans.style.opacity='1'; icon.style.transform='rotate(180deg)'; }
              })(this)"
                class="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-subtle transition-colors">
                <span class="text-sm font-bold text-primary pr-4">${f.q}</span>
                <svg class="faq-icon w-4 h-4 text-red-500 flex-shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="faq-ans overflow-hidden transition-all duration-200" style="max-height:0;opacity:0">
                <p class="px-4 pb-4 text-sm text-secondary leading-relaxed">${f.a}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 space-y-2">
          <p class="text-sm font-black text-primary">Masih ada pertanyaan?</p>
          <p class="text-xs text-secondary">Chat langsung dengan tim kami via WhatsApp — respon dalam menit.</p>
          <a href="${WA}" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black py-2 px-4 rounded-xl text-xs transition-all active:scale-95">
            Chat WhatsApp
          </a>
        </div>
      </div>
    `,
  },

  // ── TENTANG KAMI ────────────────────────────────────────────────────────────
  {
    id: 'tentang',
    label: 'Tentang Kami',
    html: `
      <div class="space-y-6">
        <div>
          <p class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Sejak 1990</p>
          <p class="text-xl font-black text-primary tracking-tight">Mengenal jasprint</p>
          <p class="text-sm text-secondary leading-relaxed mt-2">
            jasprint adalah jasa percetakan profesional di Bandung yang telah berdiri sejak 1990.
            Selama 30+ tahun, kami melayani cetak brosur, spanduk, kartu nama, sticker, nota, dan undangan
            untuk ribuan pelanggan — dari UMKM hingga perusahaan besar.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          ${[
            { emoji:'⚡', title:'1–3 Hari Selesai', desc:'Pengerjaan cepat, deadline mepet pun kami bisa handle.' },
            { emoji:'💰', title:'Harga Transparan', desc:'Harga fix di awal, tidak ada biaya tersembunyi.' },
            { emoji:'🎨', title:'Kualitas Premium', desc:'Mesin modern, bahan pilihan, warna akurat.' },
            { emoji:'📱', title:'Pesan via WA', desc:'Konsultasi, kirim file, bayar — semua dari HP.' },
            { emoji:'🚚', title:'Kirim Se-Indonesia', desc:'Ekspedisi terpercaya ke seluruh nusantara.' },
            { emoji:'🏅', title:'30+ Tahun', desc:'Berdiri sejak 1990, kepercayaan kami jaga.' },
          ].map(u => `
            <div class="p-4 rounded-2xl category-section space-y-1.5">
              <span class="text-2xl">${u.emoji}</span>
              <p class="text-sm font-black text-primary leading-tight">${u.title}</p>
              <p class="text-xs text-secondary leading-relaxed">${u.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="grid grid-cols-3 gap-2 p-4 rounded-2xl category-section">
          ${[
            { val:'1.000+', label:'Pelanggan' },
            { val:'30+', label:'Tahun' },
            { val:'< 5 min', label:'Respon WA' },
          ].map(s => `
            <div class="text-center">
              <p class="text-xl font-black text-red-500">${s.val}</p>
              <p class="text-[10px] font-semibold text-secondary uppercase tracking-wide">${s.label}</p>
            </div>
          `).join('')}
        </div>

        <div class="p-4 rounded-2xl category-section space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="text-base">📍</span>
            <p class="text-sm font-black text-primary">Lokasi</p>
          </div>
          <p class="text-xs text-secondary leading-relaxed">Bandung, Jawa Barat. Melayani seluruh Indonesia secara online & offline.</p>
          <p class="text-xs text-secondary">🕐 Senin – Sabtu, 08.00 – 17.00 WIB</p>
        </div>

        <a href="${WA}" target="_blank" rel="noopener noreferrer"
          class="w-full flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-black py-3.5 rounded-2xl text-sm transition-all">
          Hubungi Kami via WhatsApp
        </a>
      </div>
    `,
  },

];
