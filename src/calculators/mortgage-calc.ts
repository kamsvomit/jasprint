import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator KPR',
  id: 'mortgage-calc',
  description: 'Hitung cicilan bulanan KPR termasuk pajak dan asuransi.',
  longDescription: `Halo, para calon pemilik rumah impian! Memiliki hunian sendiri adalah salah satu pencapaian terbesar dalam hidup yang memberikan rasa aman dan stabilitas bagi keluarga. Namun, proses Kredit Pemilikan Rumah (KPR) seringkali terasa rumit dengan berbagai istilah bunga dan perhitungan cicilan yang membingungkan. Kalkulator KPR ini kami hadirkan sebagai asisten setiamu untuk memberikan gambaran cicilan bulanan yang akurat, sehingga kamu bisa merencanakan keuangan keluarga dengan lebih matang.

Cara kerja alat hitung cicilan rumah online ini sangat membantu dalam perencanaan anggaran jangka panjang. Kamu cukup memasukkan harga rumah yang diinginkan, jumlah uang muka (DP) yang siap kamu bayarkan, suku bunga tahunan, dan jangka waktu pinjaman (tenor). Alat ini akan menghitung estimasi cicilan pokok dan bunga setiap bulannya. Dengan mengetahui angka ini, kamu bisa lebih percaya diri saat berkonsultasi dengan bank dan memilih skema KPR yang paling sesuai dengan kemampuan finansialmu.

Tips cerdas sebelum mengambil KPR: pastikan cicilan bulananmu tidak melebihi 30% dari total penghasilan bersih keluarga agar arus kas rumah tanggamu tetap sehat. Selain cicilan, jangan lupa untuk menyiapkan dana cadangan untuk biaya-biaya di awal seperti biaya notaris, pajak pembeli (BPHTB), dan biaya administrasi bank. Perencanaan yang teliti adalah kunci agar impian memiliki rumah tidak menjadi beban finansial di masa depan. Rumah yang nyaman dimulai dari perencanaan keuangan yang aman.

Semoga kalkulator KPR ini mempermudah langkahmu dalam mewujudkan hunian impian. Kami di Kalkulator Warga senang bisa membantu setiap keluarga Indonesia dalam mengelola rencana besar mereka dengan lebih mudah. Jangan biarkan kerumitan angka menghambat impianmu. Teruslah berjuang untuk masa depan keluarga yang lebih baik, dan kami selalu siap mendukung setiap langkah perencanaan finansialmu melalui alat hitung yang praktis, jujur, dan akurat.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Rumah (Rp)', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (Rp)', 'down', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Suku Bunga (%)', 'rate', 'number', '6');
    const { wrapper: tWrap, input: tInput } = createInput('Jangka Waktu (Tahun)', 'term', 'number', '30');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseFloat(pInput.value);
      const down = parseFloat(dInput.value) || 0;
      const p = price - down;
      const r = (parseFloat(rInput.value) || 6) / 100 / 12;
      const n = (parseFloat(tInput.value) || 30) * 12;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        showResult(formatCurrency(monthly));
      } else {
        showError('Harap masukkan data yang valid.');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
