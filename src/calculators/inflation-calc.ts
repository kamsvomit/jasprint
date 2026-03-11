import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Inflasi',
  id: 'inflation-calc',
  description: 'Hitung nilai masa depan uang berdasarkan tingkat inflasi.',
  longDescription: `Halo, teman-teman yang sedang merencanakan masa depan! Pernahkah kamu merasa bahwa uang 100 ribu rupiah hari ini tidak bisa membeli barang sebanyak 10 tahun yang lalu? Itulah yang disebut dengan inflasi—penurunan daya beli uang seiring berjalannya waktu. Memahami inflasi sangat penting agar tabungan yang kamu kumpulkan dengan susah payah hari ini tetap memiliki nilai yang cukup untuk memenuhi kebutuhanmu di masa depan. Kalkulator Inflasi online ini kami buat untuk membantumu melihat realitas ekonomi dengan lebih jelas dan bijak.

Cara kerja alat hitung inflasi ini sangat mencerahkan. Kamu cukup memasukkan jumlah uang yang kamu miliki sekarang, estimasi tingkat inflasi tahunan (rata-rata di Indonesia sekitar 3-5%), dan jangka waktu dalam tahun. Alat ini akan menghitung berapa nilai uang tersebut di masa depan, atau sebaliknya, berapa harga barang yang sama setelah beberapa tahun kemudian. Dengan angka ini, kamu bisa lebih realistis dalam menentukan target tabungan pensiun, dana pendidikan anak, atau investasi properti agar tidak "termakan" oleh kenaikan harga barang dan jasa.

Tips dari kami untuk menjaga kekayaanmu: jangan biarkan uangmu menganggur di bawah bantal atau hanya di tabungan biasa yang bunganya di bawah tingkat inflasi. Pertimbangkan untuk menempatkan dana jangka panjangmu di instrumen investasi yang memiliki potensi imbal hasil di atas inflasi, seperti reksadana, saham, atau emas. Inflasi memang tidak bisa kita hentikan, tapi dengan perencanaan yang tepat dan pemahaman yang baik melalui kalkulator ini, kita bisa memastikan masa depan finansial keluarga tetap aman dan terjaga.

Semoga kalkulator nilai masa depan uang ini bermanfaat untuk perencanaan finansialmu. Kami di Kalkulator Warga ingin setiap warga Indonesia memiliki literasi keuangan yang baik agar bisa menghadapi tantangan ekonomi dengan lebih siap. Jangan biarkan ketidaktahuan membuatmu merugi di masa depan. Mari kita belajar mengelola uang dengan lebih cerdas, karena setiap rupiah yang kamu selamatkan dari inflasi adalah investasi untuk kebahagiaan hari tuamu nanti.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Jumlah Sekarang (Rp)', 'amount', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Tingkat Inflasi (%)', 'rate', 'number', '3');
    const { wrapper: yWrap, input: yInput } = createInput('Tahun', 'years', 'number');
    
    const calcBtn = createButton('Hitung Nilai Masa Depan');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(rWrap);
    container.appendChild(yWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const amount = parseFloat(aInput.value);
      const rate = (parseFloat(rInput.value) || 3) / 100;
      const years = parseFloat(yInput.value);
      
      if (amount > 0 && years > 0) {
        const future = amount * Math.pow(1 + rate, years);
        showResult(formatCurrency(future));
      } else {
        showError('Harap masukkan jumlah dan tahun yang valid.');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; yInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
