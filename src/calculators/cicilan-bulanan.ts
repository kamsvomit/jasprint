import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const cicilanBulanan: Calculator = {
  id: 'cicilan-bulanan',
  name: 'Cicilan Bulanan',
  description: 'Hitung estimasi cicilan bulanan untuk pinjaman Anda.',
  longDescription: `Halo, teman-teman yang sedang merencanakan langkah besar. Kami paham bahwa kadang hidup menuntut kita untuk mengambil pinjaman, entah itu untuk modal usaha, biaya pendidikan, atau kebutuhan mendesak lainnya. Keputusan mengambil utang bukanlah hal yang ringan dan seringkali membawa beban pikiran di malam hari. Kalkulator Cicilan Bulanan ini hadir sebagai teman diskusi yang jujur, membantumu melihat kenyataan angka cicilan secara transparan sebelum kamu menandatangani komitmen apapun, agar kamu tetap bisa tidur nyenyak dengan rencana yang matang.

Alat ini menggunakan rumus perhitungan bunga efektif (annuity) yang umum digunakan oleh lembaga keuangan. Kamu hanya perlu memasukkan jumlah pinjaman, suku bunga per tahun, dan jangka waktu atau tenor dalam bulan. Sistem akan secara otomatis menghitung berapa cicilan yang harus kamu bayar setiap bulan, serta total bunga yang akan kamu keluarkan selama masa pinjaman. Informasi ini sangat krusial agar kamu tidak terjebak dalam utang yang melebihi kemampuan bayarmu.

Nasihat bijak dari kami: sebelum mengambil pinjaman, tanyakan pada dirimu sendiri apakah ini untuk kebutuhan produktif atau konsumtif. Jika untuk usaha, pastikan keuntungan usahamu jauh lebih besar dari bunga pinjaman. Selalu miliki rencana cadangan jika pendapatanmu sedang menurun. Jangan pernah meminjam hanya untuk menutup lubang utang lama (gali lubang tutup lubang). Kebebasan finansial dimulai dari keberanian untuk berkata "tidak" pada utang yang tidak perlu.

Kamu adalah pribadi yang bertanggung jawab, dan kami menghargai setiap usahamu untuk memperbaiki taraf hidup. Jangan biarkan cicilan menghimpit kebahagiaanmu; gunakan alat ini untuk mengukur kemampuanmu dengan jujur. Perencanaan yang baik hari ini adalah kunci ketenangan di masa depan. Kami di Kalkulator Warga selalu ada untuk membantumu menghitung setiap langkah finansialmu dengan lebih cerdas dan penuh kehati-hatian.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Jumlah Pinjaman', 'principal', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga per Tahun (%)', 'rate', 'number', 'Contoh: 12');
    const { wrapper: tWrap, input: tInput } = createInput('Tenor (Bulan)', 'months', 'number', 'Contoh: 12');
    
    const calcBtn = createButton('Hitung Cicilan');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(pInput.value);
      const r = parseValue(rInput.value) / 100 / 12;
      const n = parseValue(tInput.value);
      
      if (p > 0 && n > 0) {
        let monthly = 0;
        if (r === 0) {
          monthly = p / n;
        } else {
          monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
        
        const total = monthly * n;
        const interest = total - p;
        
        resDisplay.innerHTML = `
          <div>${formatCurrency(monthly)} <span class="text-sm font-normal text-slate-500">/ bulan</span></div>
          <div class="text-xs font-medium text-slate-500 mt-2">
            Total Bayar: ${formatCurrency(total)}<br>
            Total Bunga: ${formatCurrency(interest)}
          </div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; rInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default cicilanBulanan;
