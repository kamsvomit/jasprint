import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Gram ke Ons',
  id: 'g-to-oz',
  description: 'Konversi gram ke ons (ounces).',
  longDescription: `Halo, para koki rumah tangga, pengusaha kuliner, dan pecinta timbangan! Seringkali saat kita mengikuti resep masakan internasional atau membaca label nutrisi produk impor, kita menemukan satuan berat "ons" atau "ounces" (oz). Di Indonesia, istilah "ons" terkadang memiliki pemahaman yang berbeda (sering dianggap 100 gram), namun dalam standar internasional, 1 ounce setara dengan sekitar 28,35 gram. Kalkulator Konversi Gram ke Ons ini kami buat untuk menghilangkan kebingungan tersebut dan memastikan takaran masakan atau produkmu selalu tepat.

Cara kerja alat konversi berat online ini sangat membantu dalam urusan dapur dan bisnis. Kamu cukup memasukkan angka dalam gram, dan alat ini akan menghitung nilai setaranya dalam ounces internasional secara akurat. Sangat berguna bagi kamu yang sedang menjalankan diet dengan hitungan nutrisi yang ketat, atau bagi pengusaha yang ingin mengekspor produk ke pasar global. Kami ingin membantu mempermudah setiap detail takaranmu agar hasil akhir masakan atau produkmu selalu konsisten dan berkualitas tinggi.

Tips dari kami untuk urusan timbangan: selalu perhatikan apakah resep yang kamu gunakan menggunakan standar "ounces" (sekitar 28 gram) atau "ons" lokal Indonesia (100 gram) agar tidak terjadi kesalahan rasa atau tekstur pada masakanmu. Memiliki timbangan digital yang akurat dan alat konversi yang handal adalah investasi kecil yang sangat berharga bagi siapa saja yang serius di dunia kuliner atau perdagangan. Ketepatan dalam takaran adalah bentuk kejujuran dalam berkarya dan kunci kepuasan pelangganmu.

Semoga kalkulator konversi berat ini bermanfaat untuk setiap kreasi dapur dan bisnismu. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan harian warga melalui alat bantu yang sederhana namun esensial. Jangan biarkan perbedaan satuan menghambat kreativitasmu di dapur atau kesuksesan bisnismu. Teruslah berinovasi, sajikan yang terbaik untuk keluarga dan pelanggan, dan kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur dan akurat.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gram', 'grams', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const g = parseFloat(gInput.value);
      if (!isNaN(g)) {
        const oz = g * 0.035274;
        resDisplay.textContent = `${oz.toFixed(2)} Ons (Oz)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
