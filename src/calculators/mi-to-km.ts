import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Mil ke KM',
  id: 'mi-to-km',
  description: 'Konversi mil ke kilometer.',
  longDescription: `Halo, para pelancong dunia dan pecinta otomotif! Pernahkah kamu merasa bingung saat melihat angka kecepatan atau jarak di speedometer mobil impor atau saat sedang berada di negara yang menggunakan satuan "Mil"? Berapa sebenarnya jarak tersebut jika kita ubah ke dalam Kilometer yang lebih akrab bagi kita di Indonesia? Kalkulator Konversi Mil ke KM ini kami hadirkan untuk memberikan jawaban cepat dan akurat, membantu kamu memahami jarak tempuh dengan lebih mudah.

Alat ini bekerja dengan menggunakan standar konversi internasional yang presisi. Kamu cukup memasukkan angka dalam satuan Mil (mi), dan sistem kami akan mengalikannya dengan faktor 1,60934 untuk mendapatkan hasil dalam Kilometer (km). Ini sangat berguna saat kamu sedang mengikuti panduan perjalanan internasional, memantau jarak lari di aplikasi kebugaran yang menggunakan standar mil, atau sekadar ingin tahu berapa kilometer sebenarnya jarak "100 mil" yang sering kita dengar di film-film.

Tips dari kami untuk urusan jarak: ingatlah bahwa 1 mil itu setara dengan sekitar 1,6 kilometer. Jadi, jika kamu melihat angka dalam mil, jarak aslinya dalam kilometer sebenarnya lebih jauh dari angka tersebut. Memahami konversi ini akan membantumu lebih waspada saat berkendara di wilayah yang menggunakan satuan mil agar tidak salah dalam memperkirakan waktu tiba atau konsumsi bahan bakar. Memiliki kemampuan untuk beralih antar satuan jarak adalah bekal berharga bagi siapa saja yang suka bereksplorasi lintas batas.

Semoga alat bantu ini memudahkan setiap perjalananmu! Kami di Kalkulator Warga selalu berusaha menyediakan alat yang praktis untuk mendukung aktivitas harianmu yang dinamis. Jangan biarkan perbedaan standar pengukuran menjadi penghalang bagimu untuk memahami informasi global. Teruslah melangkah, teruslah menjelajah, dan biarkan kami membantu menyederhanakan setiap hitungan jarak yang kamu temui di mana pun kamu berada.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Mil', 'miles', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const mi = parseFloat(mInput.value);
      if (!isNaN(mi)) {
        const km = mi / 0.621371;
        resDisplay.textContent = `${km.toFixed(2)} Kilometer`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
