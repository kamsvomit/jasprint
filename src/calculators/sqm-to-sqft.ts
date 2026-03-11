import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator m² ke ft²',
  id: 'sqm-to-sqft',
  description: 'Konversi meter persegi (m²) ke kaki persegi (ft²).',
  longDescription: `Halo, para pengusaha properti, arsitek, dan pelancong dunia! Saat kita ingin memasarkan properti ke pasar internasional atau sedang mencari informasi hunian di negara yang menggunakan sistem imperial, kita seringkali perlu mengubah satuan "meter persegi" (m²) yang biasa kita gunakan di Indonesia menjadi "kaki persegi" atau Square Feet (ft²). Kalkulator Konversi m² ke ft² ini hadir sebagai solusi instan untuk membantumu menyajikan data luas area dengan standar internasional yang mudah dipahami.

Cara kerja alat konversi luas online ini sangat membantu dalam komunikasi bisnis dan perencanaan globalmu. Kamu cukup memasukkan angka dalam satuan meter persegi (m²), dan alat ini akan menghitung nilai setaranya dalam kaki persegi (ft²) secara otomatis. Sangat berguna bagi kamu yang sedang membuat brosur properti untuk ekspatriat, mengisi formulir aplikasi visa yang menanyakan luas tempat tinggal, atau sekadar ingin membandingkan standar luas bangunan antar negara. Kami ingin mempermudah setiap langkah informasimu agar lebih profesional dan akurat.

Tips pemasaran properti dari kami: menyajikan data dalam dua satuan (m² dan ft²) menunjukkan profesionalisme dan perhatianmu terhadap audiens internasional. Ingatlah bahwa 1 meter persegi itu kira-kira 10,76 kali lebih besar dari 1 kaki persegi. Dengan memberikan informasi yang lengkap dan mudah dipahami, kamu membangun kepercayaan dengan calon mitra atau pelangganmu. Pengetahuan tentang standar internasional adalah nilai tambah dalam dunia yang semakin terhubung ini.

Semoga kalkulator konversi luas sederhana ini bermanfaat untuk setiap kebutuhan profesional dan pribadimu. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan harian warga melalui alat bantu yang praktis dan akurat. Jangan biarkan perbedaan satuan menghambat peluang globalmu. Teruslah berkembang, perluas jangkauan bisnismu, dan kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur dan membantu. Selamat beraktivitas!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Meter Persegi (m²)', 'sqm', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const sqm = parseFloat(mInput.value);
      if (!isNaN(sqm)) {
        const sqft = sqm * 10.7639;
        resDisplay.textContent = `${sqft.toFixed(2)} ft²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
