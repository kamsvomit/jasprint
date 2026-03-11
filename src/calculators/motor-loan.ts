import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kredit Motor',
  id: 'motor-loan',
  description: 'Hitung cicilan bulanan untuk kredit motor.',
  longDescription: `Halo, calon pemilik motor baru! Memiliki sepeda motor sendiri adalah langkah besar untuk meningkatkan mobilitas dan produktivitas harianmu. Namun, kami paham bahwa membeli motor secara tunai seringkali terasa berat, sehingga pilihan kredit atau cicilan menjadi solusi yang paling masuk akal bagi banyak orang. Kalkulator Kredit Motor ini kami sediakan untuk membantumu menghitung estimasi cicilan bulanan dengan transparan, agar impianmu memiliki motor tidak menjadi beban finansial yang memberatkan di kemudian hari.

Cara kerja alat hitung cicilan motor online ini sangat mudah dipahami. Kamu hanya perlu memasukkan harga motor yang kamu incar, jumlah uang muka (DP) yang sudah kamu siapkan, suku bunga tahunan dari leasing atau bank, serta jangka waktu atau tenor pinjaman (misalnya 11, 23, atau 35 bulan). Alat ini akan menghitung estimasi angsuran bulanan yang harus kamu bayar. Dengan mengetahui angka ini lebih awal, kamu bisa menyesuaikan pilihan motor atau memperbesar tabungan DP agar cicilan nantinya tetap terasa ringan dan tidak mengganggu kebutuhan pokok lainnya.

Tips cerdas dari kami sebelum mengambil kredit motor: pastikan total cicilan bulananmu tidak melebihi 30% dari penghasilan bersihmu. Selain itu, cobalah untuk menyiapkan DP yang lebih besar agar beban bunga dan cicilan bulananmu menjadi lebih kecil. Bandingkan juga penawaran dari beberapa perusahaan pembiayaan (leasing) untuk mendapatkan bunga yang paling kompetitif. Membeli motor adalah investasi untuk kelancaran aktivitasmu, jadi pastikan setiap keputusan yang kamu ambil sudah melalui perhitungan yang matang dan realistis.

Semoga kalkulator simulasi kredit motor ini mempermudah langkahmu dalam memiliki kendaraan impian. Kami di Kalkulator Warga senang bisa membantu setiap warga agar lebih melek finansial dan berani melangkah dengan perencanaan yang benar. Jangan biarkan ketidaktahuan akan angka cicilan membuatmu ragu untuk maju. Teruslah berjuang untuk masa depan yang lebih baik, dan semoga motor barumu nanti membawa lebih banyak rezeki dan kemudahan bagi keluargamu. Kami selalu siap mendukung setiap impian besarmu melalui alat hitung sederhana ini.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Motor', 'price', 'number', 'Contoh: 25.000.000');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (DP)', 'dp', 'number', 'Contoh: 5.000.000');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga Tahunan (%)', 'rate', 'number', '15');
    const { wrapper: tWrap, input: tInput } = createInput('Tenor (Bulan)', 'term', 'number', '35');
    
    const calcBtn = createButton('Hitung Cicilan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const dp = parseValue(dInput.value) || 0;
      const p = price - dp;
      const r = (parseValue(rInput.value) / 100) / 12;
      const n = parseValue(tInput.value);
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resDisplay.textContent = `${formatCurrency(monthly)} / bulan`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = ''; rInput.value = '15'; tInput.value = '35';
      resWrap.classList.add('hidden');
    };
  }
};
