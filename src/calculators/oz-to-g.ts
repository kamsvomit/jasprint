import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Ons ke Gram',
  id: 'oz-to-g',
  description: 'Konversi ons (ounces) ke gram.',
  longDescription: `Halo, para koki rumah tangga dan pecinta timbangan yang teliti! Seringkali saat kita mengikuti resep masakan internasional atau membaca label nutrisi produk impor, kita menemukan satuan berat "ons" atau "ounces" (oz). Di Indonesia, istilah "ons" terkadang memiliki pemahaman yang berbeda (sering dianggap 100 gram), namun dalam standar internasional, 1 ounce setara dengan sekitar 28,35 gram. Kalkulator Konversi Ons ke Gram ini kami buat untuk menghilangkan kebingungan tersebut dan memastikan takaran masakan atau produkmu selalu tepat dan akurat.

Cara kerja alat konversi berat online ini sangat membantu dalam urusan dapur dan hobi. Kamu cukup memasukkan angka dalam ounces (oz), dan alat ini akan menghitung nilai setaranya dalam gram secara otomatis. Sangat berguna bagi kamu yang sedang mencoba resep kue baru, menimbang bahan makanan untuk diet, atau bagi pengusaha kecil yang ingin memastikan takaran produknya sesuai standar. Kami ingin membantu mempermudah setiap detail takaranmu agar hasil akhir karyamu selalu konsisten dan berkualitas tinggi.

Tips praktis untukmu: selalu perhatikan apakah resep yang kamu gunakan menggunakan standar "ounces" internasional (sekitar 28 gram) atau "ons" lokal Indonesia (100 gram) agar tidak terjadi kesalahan rasa atau tekstur pada masakanmu. Memiliki alat konversi yang handal di ponselmu adalah cara cerdas untuk memastikan setiap masakan yang kamu sajikan untuk keluarga tercinta selalu sempurna. Ketepatan dalam takaran adalah kunci dari kelezatan yang tak terlupakan.

Semoga kalkulator konversi berat sederhana ini bermanfaat untuk setiap kreasi dapurmu. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan harian warga melalui alat bantu yang praktis dan akurat. Jangan biarkan perbedaan satuan menghambat bakat memasakmu. Teruslah berinovasi di dapur, sajikan hidangan yang terbaik, dan kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur dan membantu. Selamat memasak dan semoga hidanganmu selalu menggugah selera!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: oWrap, input: oInput } = createInput('Ons (Oz)', 'ounces', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(oWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const oz = parseFloat(oInput.value);
      if (!isNaN(oz)) {
        const g = oz / 0.035274;
        resDisplay.textContent = `${g.toFixed(2)} Gram`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      oInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
