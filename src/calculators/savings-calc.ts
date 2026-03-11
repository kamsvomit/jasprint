import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Tabungan',
  id: 'savings-calc',
  description: 'Hitung pertumbuhan tabungan Anda dengan bunga majemuk.',
  longDescription: `Halo, para perencana masa depan yang visioner! Kami sangat mengagumi niatmu untuk mulai menabung. Menabung bukan sekadar menyisihkan uang, melainkan bentuk investasi pada dirimu sendiri di masa depan. Namun, seringkali kita sulit membayangkan seberapa besar uang kita akan tumbuh jika kita konsisten menabung setiap bulan, terutama dengan adanya faktor bunga atau bagi hasil. Kalkulator Tabungan ini kami hadirkan untuk memberikan visualisasi nyata tentang kekuatan bunga majemuk (compound interest) pada tabunganmu.

Alat ini dirancang untuk menghitung proyeksi saldo tabunganmu berdasarkan setoran awal, setoran rutin bulanan, tingkat bunga tahunan, dan jangka waktu menabung. Dengan algoritma yang akurat, kamu bisa melihat bagaimana uang kecil yang kamu sisihkan secara konsisten bisa berubah menjadi jumlah yang signifikan dalam jangka panjang. Memiliki target angka yang jelas akan membuatmu lebih termotivasi untuk tetap disiplin dalam menabung, meskipun godaan belanja seringkali datang menghampiri.

Tips menabung dari kami: kunci utama keberhasilan menabung bukanlah besarnya nominal di awal, melainkan konsistensi. Cobalah untuk mengotomatiskan setoran tabunganmu tepat setelah gajian agar kamu tidak merasa "kehilangan" uang tersebut. Ingatlah pepatah lama, "sedikit demi sedikit, lama-lama menjadi bukit." Bunga majemuk bekerja paling efektif dalam jangka waktu yang lama, jadi mulailah sedini mungkin, sekecil apapun itu. Setiap rupiah yang kamu simpan hari ini adalah langkah menuju kebebasan finansialmu di masa depan.

Terima kasih sudah mempercayakan perencanaan tabunganmu kepada kami! Kami di Kalkulator Warga selalu siap mendukung setiap langkahmu menuju kesejahteraan finansial. Jangan biarkan masa depanmu menjadi teka-teki; mulailah merencanakannya dengan angka-angka yang pasti. Semoga tabunganmu terus tumbuh subur dan menjadi pondasi yang kuat bagi impian-impianmu yang luar biasa. Kami bangga bisa menjadi bagian dari perjalanan suksesmu.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Setoran Awal', 'initial', 'number', 'Contoh: 1.000.000');
    const { wrapper: mWrap, input: mInput } = createInput('Setoran Bulanan', 'monthly', 'number', 'Contoh: 500.000');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga Tahunan (%)', 'rate', 'number', 'Contoh: 6');
    const { wrapper: yWrap, input: yInput } = createInput('Jangka Waktu (Tahun)', 'years', 'number', 'Contoh: 5');
    
    const calcBtn = createButton('Hitung Pertumbuhan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(mWrap);
    container.appendChild(rWrap);
    container.appendChild(yWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      let balance = parseValue(iInput.value) || 0;
      const monthly = parseValue(mInput.value) || 0;
      const rate = (parseValue(rInput.value) || 0) / 100 / 12;
      const months = (parseValue(yInput.value) || 0) * 12;
      
      for (let i = 0; i < months; i++) {
        balance = (balance + monthly) * (1 + rate);
      }
      
      resDisplay.textContent = formatCurrency(balance);
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      iInput.value = ''; mInput.value = ''; rInput.value = ''; yInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
