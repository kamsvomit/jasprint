import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Liter ke Galon',
  id: 'l-to-gal',
  description: 'Konversi liter ke galon (US).',
  longDescription: `Halo, para pengelola kebutuhan rumah tangga dan pecinta otomotif! Di Indonesia, kita sangat terbiasa menggunakan satuan "liter" untuk mengukur volume cairan, mulai dari air minum hingga bahan bakar kendaraan. Namun, saat kita melihat spesifikasi produk internasional atau mengikuti panduan dari luar negeri, satuan "galon" (US Gallon) seringkali digunakan. Kalkulator Konversi Liter ke Galon ini kami buat untuk membantumu mengetahui volume cairan dalam standar internasional dengan cepat, sehingga kamu tidak lagi bingung saat berhadapan dengan satuan yang berbeda.

Cara kerja alat konversi volume cairan online ini sangat praktis. Kamu cukup memasukkan angka dalam satuan liter, dan alat ini akan menghitung nilai setaranya dalam galon US secara akurat. Sangat berguna bagi kamu yang ingin menghitung kapasitas tangki kendaraan yang menggunakan standar galon, atau saat ingin membeli produk cairan impor dalam kemasan galon. Kami ingin memastikan bahwa kamu selalu memiliki informasi yang tepat untuk mengelola kebutuhan cairanmu dengan lebih efisien dan terencana.

Tips praktis untukmu: sebagai gambaran, 1 galon US itu setara dengan sekitar 3,78 liter. Mengetahui perbandingan ini akan sangat membantumu saat melakukan estimasi cepat di supermarket atau pom bensin. Selalu perhatikan label kemasan dengan teliti untuk memastikan kamu mendapatkan volume yang sesuai dengan kebutuhanmu. Ketelitian dalam mengukur volume adalah langkah awal dalam penghematan dan pengelolaan sumber daya rumah tangga yang lebih baik.

Semoga kalkulator konversi volume ini bermanfaat untuk setiap kebutuhan harianmu. Kami di Kalkulator Warga senang bisa menyediakan alat bantu yang memudahkan urusan warga melalui teknologi yang sederhana namun bermanfaat. Teruslah mengelola kebutuhan rumah tangga dan hobimu dengan lebih cerdas dan teliti. Kami selalu siap mendukung setiap aktivitasmu dengan alat hitung yang praktis, jujur, dan akurat. Selamat beraktivitas dan semoga segala urusanmu berjalan dengan lancar!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Liter', 'liters', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      if (!isNaN(l)) {
        const gal = l * 0.264172;
        resDisplay.textContent = `${gal.toFixed(2)} Galon`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
