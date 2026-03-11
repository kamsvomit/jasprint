import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator MPH ke KM/jam',
  id: 'mph-to-kmh',
  description: 'Konversi mil per jam ke kilometer per jam.',
  longDescription: `Halo, para pecinta otomotif dan pelancong dunia! Saat kita membaca spesifikasi kendaraan dari luar negeri atau sedang bepergian ke negara yang menggunakan sistem imperial, satuan kecepatan "mil per jam" atau Miles Per Hour (MPH) seringkali membuat kita bingung. Di Indonesia, kita sudah sangat terbiasa dengan Kilometer per jam (KM/jam). Kalkulator Konversi MPH ke KM/jam ini hadir sebagai solusi instan untuk membantumu memahami kecepatan kendaraan dengan lebih mudah dan akurat.

Cara kerja alat konversi kecepatan online ini sangat praktis. Kamu hanya perlu memasukkan angka dalam satuan MPH, dan alat ini akan secara otomatis menghitung nilai setaranya dalam KM/jam. Sangat berguna bagi kamu yang sedang menonton balapan internasional, membaca ulasan mobil luar negeri, atau sedang merencanakan perjalanan ke negara yang menggunakan standar kecepatan berbeda. Kami ingin memastikan bahwa perbedaan sistem satuan tidak lagi menjadi penghalang bagi pemahamanmu tentang performa kendaraan.

Tips keselamatan berkendara: selalu perhatikan batas kecepatan yang berlaku di jalan raya, apa pun satuan yang digunakan. Ingatlah bahwa 60 MPH itu setara dengan sekitar 96 KM/jam, kecepatan yang cukup tinggi untuk jalan umum. Selalu utamakan keselamatan diri dan orang lain dengan berkendara secara bijak dan mematuhi rambu-rambu lalu lintas. Pengetahuan tentang kecepatan adalah bagian penting dari kesadaran berkendara yang aman dan bertanggung jawab.

Semoga kalkulator konversi kecepatan sederhana ini bermanfaat untuk setiap kebutuhan informasimu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang memudahkan urusan harian warga tanpa biaya apapun. Teruslah bereksplorasi dan perkaya wawasanmu tentang dunia otomotif. Kami selalu siap mendukung setiap aktivitasmu dengan alat hitung yang praktis, jujur, dan akurat. Selamat beraktivitas dan semoga setiap perjalananmu selalu aman dan menyenangkan!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('MPH', 'mph', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const mph = parseFloat(mInput.value);
      if (!isNaN(mph)) {
        const kmh = mph / 0.621371;
        resDisplay.textContent = `${kmh.toFixed(1)} KM/jam`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
