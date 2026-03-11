import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pon ke KG',
  id: 'lbs-to-kg',
  description: 'Konversi pon (lbs) ke kilogram.',
  longDescription: `Halo, para pembelanja cerdas dan penggemar produk internasional! Pernahkah kamu merasa bingung saat melihat berat sebuah barang di situs belanja luar negeri yang menggunakan satuan "lbs" atau Pon? Berapa sebenarnya beratnya jika kita timbang dengan timbangan di rumah kita yang menggunakan satuan Kilogram? Kalkulator Konversi Pon ke KG ini kami hadirkan untuk memberikan jawaban instan bagi rasa penasaranmu, membantu kamu memahami berat benda dalam satuan yang lebih akrab di telinga kita.

Cara kerjanya sangat akurat mengikuti standar konversi massa. Kamu cukup memasukkan angka dalam satuan Pon (lbs), dan sistem kami akan mengalikannya dengan faktor 0,453592 untuk mendapatkan hasil dalam Kilogram (kg). Ini sangat praktis saat kamu ingin menghitung berat bagasi pesawat, berat paket kiriman, atau bahkan berat badan atlet favoritmu yang seringkali menggunakan standar pengukuran Amerika Serikat.

Tips dari kami untuk urusan konversi: ingatlah bahwa 1 kg itu kira-kira setara dengan 2,2 pon. Jadi, jika kamu melihat angka dalam pon, kamu bisa memperkirakan beratnya dalam kilogram dengan membaginya dua secara kasar di dalam kepala. Namun, untuk keperluan yang membutuhkan ketelitian tinggi seperti pengiriman barang atau dosis tertentu, gunakanlah kalkulator ini untuk mendapatkan hasil yang presisi. Memahami perbedaan satuan ini akan membuatmu lebih nyaman saat berinteraksi dengan informasi dari berbagai belahan dunia.

Semoga alat bantu ini memudahkan aktivitasmu sehari-hari! Kami di Kalkulator Warga selalu berusaha menyediakan alat yang relevan dengan kebutuhan masyarakat modern yang semakin terhubung secara global. Jangan biarkan perbedaan standar pengukuran menjadi kendala dalam hobi atau pekerjaanmu. Teruslah belajar, teruslah bereksplorasi, dan biarkan kami membantu menyederhanakan setiap hitungan yang kamu temui di sepanjang jalan.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Pon (Lbs)', 'lbs', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const lbs = parseFloat(lInput.value);
      if (!isNaN(lbs)) {
        const kg = lbs / 2.20462;
        resDisplay.textContent = `${kg.toFixed(2)} KG`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
