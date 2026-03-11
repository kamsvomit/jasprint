import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Hektar ke Akre',
  id: 'ha-to-acre',
  description: 'Konversi hektar ke akre.',
  longDescription: `Halo, para pengelola lahan, petani modern, dan pecinta properti! Dalam urusan pertanahan, kita seringkali berhadapan dengan berbagai satuan luas lahan yang berbeda-beda tergantung pada standar yang digunakan. Di Indonesia, kita sangat akrab dengan satuan "hektar" (ha), namun saat membaca literatur internasional atau melihat properti di luar negeri, satuan "akre" (acre) seringkali muncul. Kalkulator Konversi Hektar ke Akre ini kami hadirkan untuk membantumu memahami luas lahan secara global dengan cepat dan presisi.

Cara kerja alat konversi luas tanah online ini sangat sederhana. Kamu hanya perlu memasukkan angka dalam satuan hektar, dan alat ini akan secara otomatis menghitung nilai setaranya dalam akre. Sangat berguna bagi kamu yang sedang merencanakan investasi properti internasional, mempelajari geografi, atau mengelola proyek perkebunan skala besar. Kami ingin memastikan bahwa perbedaan standar pengukuran tidak menjadi kendala bagi pemahaman dan pengambilan keputusanmu dalam mengelola aset lahan yang berharga.

Tips praktis untukmu: sebagai gambaran kasar, 1 hektar itu setara dengan sekitar 2,47 akre. Mengetahui perbandingan dasar ini akan sangat membantumu saat melakukan estimasi cepat saat membaca berita atau dokumen pertanahan internasional. Namun, untuk keperluan transaksi atau perencanaan teknis yang membutuhkan akurasi tinggi, selalu gunakan kalkulator kami untuk mendapatkan hasil yang pasti. Pemahaman yang baik tentang satuan luas adalah kunci dalam manajemen aset dan investasi yang cerdas.

Semoga kalkulator konversi luas ini bermanfaat untuk setiap kebutuhan pengelolaan lahanmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang akurat dan mudah diakses oleh seluruh warga. Teruslah mengelola aset dan lahanmu dengan penuh tanggung jawab dan visi masa depan. Kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur, praktis, dan membantu. Selamat beraktivitas dan semoga setiap jengkal lahanmu membawa keberkahan dan kesuksesan!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Hektar', 'ha', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ha = parseFloat(hInput.value);
      if (!isNaN(ha)) {
        const acre = ha / 0.404686;
        resDisplay.textContent = `${acre.toFixed(2)} Akre`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
