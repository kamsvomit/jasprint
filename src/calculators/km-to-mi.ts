import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator KM ke Mil',
  id: 'km-to-mi',
  description: 'Konversi kilometer ke mil.',
  longDescription: `Halo, para penjelajah jalanan dan penggemar otomotif! Pernahkah kamu merasa bingung saat membaca spesifikasi kendaraan atau melihat papan penunjuk jalan di luar negeri yang menggunakan satuan "Mil"? Berapa sebenarnya jarak tersebut jika kita bayangkan dalam satuan Kilometer yang biasa kita gunakan di Indonesia? Kalkulator Konversi KM ke Mil ini kami hadirkan untuk memberikan gambaran instan tentang jarak tempuhmu dalam standar internasional yang berbeda.

Alat ini bekerja dengan menggunakan faktor konversi jarak yang presisi. Kamu cukup memasukkan angka dalam satuan Kilometer (km), dan sistem kami akan mengalikannya dengan faktor 0,621371 untuk mendapatkan hasil dalam Mil (mi). Ini sangat berguna saat kamu sedang merencanakan perjalanan di negara yang menggunakan sistem imperial, memantau performa lari atau bersepeda di aplikasi yang menggunakan standar mil, atau sekadar ingin membandingkan jarak tempuh kendaraanmu dengan standar global.

Tips dari kami untuk urusan jarak: ingatlah bahwa 1 mil itu lebih jauh daripada 1 kilometer. Secara kasar, 5 mil itu hampir sama dengan 8 kilometer. Memahami perbandingan ini akan membantumu lebih cepat dalam memperkirakan waktu tempuh saat berada di wilayah yang menggunakan satuan mil. Meskipun di Indonesia kita sangat terbiasa dengan kilometer, memiliki pemahaman tentang satuan mil akan membuatmu lebih percaya diri saat membaca peta internasional atau mengikuti berita otomotif dari mancanegara.

Semoga alat bantu sederhana ini memudahkan setiap petualanganmu! Kami di Kalkulator Warga berkomitmen untuk terus menyediakan alat konversi yang praktis dan akurat untuk mendukung mobilitasmu. Jangan biarkan perbedaan satuan jarak menghambat rasa ingin tahumu tentang dunia. Teruslah melangkah, teruslah menjelajah, dan biarkan kami membantu menyederhanakan setiap hitungan jarak yang kamu temui di sepanjang perjalanan hidupmu.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Kilometer', 'km', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const km = parseFloat(kInput.value);
      if (!isNaN(km)) {
        const mi = km * 0.621371;
        resDisplay.textContent = `${mi.toFixed(2)} Mil`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
