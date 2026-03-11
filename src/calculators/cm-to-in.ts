import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator CM ke Inci',
  id: 'cm-to-in',
  description: 'Konversi sentimeter ke inci.',
  longDescription: `Halo, para pengrajin, desainer, dan penggemar gadget! Seringkali kita merasa bingung saat harus menyesuaikan ukuran benda dalam satuan Sentimeter (cm) ke dalam satuan Inci (inch), terutama saat sedang berbelanja perangkat elektronik, layar televisi, atau bahkan saat mengikuti panduan kerajinan tangan internasional. Berapa inci sebenarnya ukuran 25 cm itu? Kalkulator Konversi CM ke Inci ini kami hadirkan untuk memberikan jawaban instan dan akurat bagi setiap kebutuhan pengukuranmu.

Alat ini bekerja dengan menggunakan standar konversi panjang internasional yang presisi. Kamu cukup memasukkan angka dalam satuan Sentimeter (cm), dan sistem kami akan membaginya dengan faktor 2,54 untuk mendapatkan hasil dalam Inci (in). Ini sangat praktis saat kamu ingin mengetahui ukuran diagonal layar smartphone, lebar bingkai foto, atau ukuran pakaian yang seringkali menggunakan standar inci di pasar global.

Tips dari kami untuk urusan pengukuran: ingatlah bahwa 1 inci itu setara dengan tepat 2,54 sentimeter. Memahami perbandingan ini akan membantumu lebih cepat dalam memperkirakan ukuran benda tanpa harus selalu bergantung pada alat ukur fisik. Di dunia digital dan manufaktur, satuan inci masih menjadi standar yang sangat dominan. Memiliki kemampuan untuk beralih antar satuan panjang ini akan membuat pekerjaanmu lebih efisien dan hasil karyamu lebih presisi sesuai dengan standar yang diinginkan.

Semoga alat bantu sederhana ini memudahkan setiap proyek kreatif dan urusan belanjamu! Kami di Kalkulator Warga berkomitmen untuk terus menyediakan alat konversi yang praktis dan mudah digunakan untuk mendukung produktivitasmu. Jangan biarkan perbedaan satuan ukuran menghambat kreativitas atau ketelitianmu. Teruslah berkarya, teruslah berinovasi, dan biarkan kami membantu menyederhanakan setiap hitungan dimensi yang kamu temui dalam aktivitas harianmu.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Sentimeter', 'cm', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cm = parseFloat(cInput.value);
      if (!isNaN(cm)) {
        const inch = cm / 2.54;
        resDisplay.textContent = `${inch.toFixed(2)} Inci`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
