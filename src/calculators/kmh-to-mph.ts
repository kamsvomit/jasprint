import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator KM/jam ke MPH',
  id: 'kmh-to-mph',
  description: 'Konversi kilometer per jam ke mil per jam.',
  longDescription: `Halo, para pecinta otomotif, pelancong dunia, dan penggemar kecepatan! Saat kita membaca spesifikasi kendaraan luar negeri, menonton balapan internasional, atau bepergian ke negara seperti Amerika Serikat dan Inggris, kita sering menemukan satuan kecepatan "mil per jam" atau Miles Per Hour (MPH). Di Indonesia, kita lebih terbiasa dengan Kilometer per jam (KM/jam). Kalkulator Konversi KM/jam ke MPH ini hadir sebagai asisten instanmu untuk memahami seberapa cepat sebenarnya laju kendaraan tersebut dalam satuan yang lebih familiar.

Cara kerja alat konversi kecepatan online ini sangat praktis. Kamu cukup memasukkan angka dalam KM/jam, dan alat ini akan menghitung nilai setaranya dalam MPH secara akurat. Sangat berguna bagi kamu yang sedang membandingkan performa mobil impian, memahami batas kecepatan saat berkendara di luar negeri, atau sekadar ingin tahu konversi kecepatan dalam berbagai konteks. Kami ingin membantu mempermudah pemahamanmu tentang kecepatan agar kamu bisa berkendara dengan lebih aman dan berwawasan luas.

Tips keselamatan berkendara: selalu perhatikan rambu batas kecepatan di jalan manapun kamu berada. Ingatlah bahwa 60 MPH itu setara dengan sekitar 96 KM/jam, yang merupakan kecepatan yang cukup tinggi untuk jalan raya. Memahami konversi ini bukan hanya soal angka, tapi juga soal keselamatan dan kesadaran akan laju kendaraanmu. Jadilah pengendara yang cerdas dan bertanggung jawab dengan selalu memantau kecepatan kendaraanmu demi keselamatan diri sendiri dan orang lain di jalan.

Semoga kalkulator konversi kecepatan ini bermanfaat untuk setiap perjalanan dan hobi otomotifmu. Kami di Kalkulator Warga senang bisa menyediakan alat bantu yang memudahkan urusan harian warga tanpa biaya. Teruslah bereksplorasi, nikmati setiap perjalananmu, dan kami selalu siap mendukung setiap aktivitasmu dengan alat hitung yang praktis dan akurat. Selamat berkendara dengan aman dan semoga setiap tujuanmu tercapai dengan selamat dan menyenangkan!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('KM/jam', 'kmh', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const kmh = parseFloat(kInput.value);
      if (!isNaN(kmh)) {
        const mph = kmh * 0.621371;
        resDisplay.textContent = `${mph.toFixed(1)} MPH`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
