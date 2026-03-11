import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Galon ke Liter',
  id: 'gal-to-l',
  description: 'Konversi galon (US) ke liter.',
  longDescription: `Halo, para pengelola rumah tangga, pecinta otomotif, dan pengusaha air minum! Seringkali kita menemukan satuan "galon" saat membeli bahan bakar, oli, atau air mineral dalam kemasan besar. Namun, tahukah kamu bahwa ukuran galon bisa berbeda antara standar Amerika (US Gallon) dan Inggris (Imperial Gallon)? Kalkulator Konversi Galon ke Liter ini kami fokuskan pada standar US Gallon yang paling umum digunakan secara internasional, untuk membantumu mengetahui volume cairan secara pasti dalam satuan liter yang lebih familiar bagi kita di Indonesia.

Cara kerja alat konversi volume online ini sangat praktis untuk kebutuhan sehari-hari. Kamu hanya perlu memasukkan angka dalam satuan galon, dan alat ini akan secara otomatis menghitung nilai setaranya dalam liter. Sangat berguna bagi kamu yang ingin menghitung kapasitas tangki air, kebutuhan bahan bakar kendaraan, atau saat ingin membandingkan harga produk cairan dalam berbagai kemasan. Kami ingin memastikan bahwa kamu selalu mendapatkan nilai yang jujur dan akurat dalam setiap transaksi atau perencanaan yang melibatkan volume cairan.

Tips praktis untukmu: sebagai gambaran, 1 galon US itu setara dengan sekitar 3,78 liter. Mengetahui angka dasar ini akan sangat membantumu saat berbelanja atau mengisi bahan bakar di tempat yang menggunakan satuan galon. Selalu pastikan kamu mengetahui kapasitas wadahmu agar tidak terjadi tumpahan atau kekurangan saat melakukan pengisian. Ketelitian dalam mengukur volume adalah bagian dari efisiensi pengelolaan sumber daya di rumah tangga maupun di tempat kerja.

Semoga kalkulator konversi volume ini bermanfaat untuk setiap kebutuhan harianmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang memudahkan urusan warga tanpa biaya apapun. Teruslah mengelola kebutuhan rumah tangga dan bisnismu dengan lebih cerdas dan terencana. Kami selalu siap mendukung setiap aktivitasmu dengan alat hitung yang praktis, jujur, dan akurat. Selamat beraktivitas dan semoga segala urusanmu berjalan dengan lancar dan efisien!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Galon', 'gallons', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const gal = parseFloat(gInput.value);
      if (!isNaN(gal)) {
        const l = gal / 0.264172;
        resDisplay.textContent = `${l.toFixed(2)} Liter`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
