import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Inci ke CM',
  id: 'in-to-cm',
  description: 'Konversi inci ke sentimeter.',
  longDescription: `Halo, para pecinta teknologi, desainer interior, dan penggemar belanja online! Pernahkah kamu merasa bingung saat melihat spesifikasi produk seperti ukuran layar televisi, lebar monitor, atau dimensi furnitur yang menggunakan satuan "Inci"? Berapa sebenarnya ukuran tersebut jika kita bayangkan dalam satuan Sentimeter yang lebih akrab bagi kita di Indonesia? Kalkulator Konversi Inci ke CM ini kami hadirkan untuk memberikan jawaban instan dan akurat, membantu kamu memvisualisasikan ukuran benda dengan lebih nyata.

Alat ini bekerja dengan menggunakan standar konversi panjang internasional yang presisi. Kamu cukup memasukkan angka dalam satuan Inci (in), dan sistem kami akan mengalikannya dengan faktor 2,54 untuk mendapatkan hasil dalam Sentimeter (cm). Ini sangat berguna saat kamu ingin memastikan apakah sebuah televisi baru akan muat di rak dindingmu, atau saat kamu sedang mengikuti panduan DIY (Do It Yourself) dari luar negeri yang menggunakan standar inci.

Tips dari kami untuk urusan dimensi: ingatlah bahwa 1 inci itu setara dengan 2,54 sentimeter. Memahami perbandingan ini akan membantumu lebih cepat dalam memperkirakan ukuran benda tanpa harus selalu membawa penggaris. Di dunia industri dan teknologi, satuan inci masih menjadi standar global untuk banyak komponen. Memiliki kemampuan untuk beralih antar satuan panjang ini akan membuatmu lebih percaya diri saat berbelanja produk impor atau saat sedang merancang tata letak ruangan di rumahmu.

Semoga alat bantu sederhana ini memudahkan setiap rencana dan aktivitas harianmu! Kami di Kalkulator Warga selalu berusaha menyediakan alat yang praktis untuk mendukung kebutuhan informasi masyarakat modern. Jangan biarkan perbedaan standar pengukuran menjadi kendala dalam mewujudkan ide-idemu. Teruslah berkreasi, teruslah berinovasi, dan biarkan kami membantu menyederhanakan setiap hitungan dimensi yang kamu temui di sepanjang jalan.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Inci', 'inches', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const inch = parseFloat(iInput.value);
      if (!isNaN(inch)) {
        const cm = inch * 2.54;
        resDisplay.textContent = `${cm.toFixed(2)} CM`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      iInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
