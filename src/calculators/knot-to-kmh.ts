import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Knot ke KM/jam',
  id: 'knot-to-kmh',
  description: 'Konversi knot ke kilometer per jam.',
  longDescription: `Halo, para pelaut, pecinta dunia penerbangan, dan penggemar navigasi! Dalam dunia maritim dan dirgantara, kecepatan tidak diukur dalam kilometer per jam, melainkan dalam satuan "knot". Satu knot setara dengan satu mil laut per jam. Bagi kita yang terbiasa dengan transportasi darat, membayangkan seberapa cepat 20 knot dalam satuan kilometer per jam bisa menjadi hal yang menarik untuk diketahui. Kalkulator Konversi Knot ke KM/jam ini kami sediakan untuk memberikan gambaran kecepatan yang akurat bagi setiap kebutuhan navigasi dan pengetahuanmu.

Cara kerja alat konversi kecepatan navigasi online ini sangat mudah. Kamu hanya perlu memasukkan angka dalam satuan knot, dan alat ini akan secara otomatis menghitung nilai setaranya dalam kilometer per jam (KM/jam). Sangat berguna bagi kamu yang sedang belajar tentang pelayaran, mengikuti berita tentang kapal laut atau pesawat terbang, atau bagi kamu yang hobi memancing dan ingin tahu kecepatan arus laut. Kami ingin membantu mendekatkan dunia navigasi yang terlihat teknis ini agar lebih mudah dipahami oleh siapa saja.

Tips menarik untukmu: tahukah kamu bahwa istilah "knot" berasal dari cara pelaut zaman dahulu mengukur kecepatan kapal dengan membuang tali yang memiliki simpul (knots) ke laut? Sejarah navigasi sangatlah kaya dan menarik untuk dipelajari. Dengan memahami konversi satuan ini, kamu bisa lebih menghargai teknologi dan keahlian para pelaut dan pilot dalam mengarungi lautan dan angkasa. Pengetahuan tentang kecepatan adalah bagian penting dari pemahaman kita tentang mobilitas manusia di berbagai medan.

Semoga kalkulator konversi knot ini bermanfaat untuk menambah wawasan dan membantu aktivitas navigasimu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang informatif dan praktis bagi seluruh warga. Teruslah belajar dan jelajahi cakrawala baru dengan penuh rasa ingin tahu. Kami selalu siap mendukung setiap langkah penjelajahanmu melalui alat hitung yang jujur dan akurat. Selamat berlayar atau terbang, dan semoga setiap perjalananmu membawa pengalaman yang berharga!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Knot', 'knots', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const knot = parseFloat(kInput.value);
      if (!isNaN(knot)) {
        const kmh = knot * 1.852;
        resDisplay.textContent = `${kmh.toFixed(1)} KM/jam`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
