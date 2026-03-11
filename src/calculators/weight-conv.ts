import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Konversi Berat',
  id: 'weight-conv',
  description: 'Konversi antara Kilogram, Gram, Pound, dan Ounce.',
  longDescription: `Halo, para pecinta kuliner, pengirim paket, dan siapapun yang sedang berurusan dengan timbangan! Berat adalah salah satu ukuran yang paling sering kita temui, namun sistem satuan yang berbeda di berbagai negara seringkali membuat kita bingung. Apakah 5 pound itu lebih berat dari 2 kilogram? Berapa gram sebenarnya satu ounce itu? Kalkulator Konversi Berat Lengkap ini kami hadirkan untuk memberikan jawaban instan bagi setiap kebutuhan konversimu, mulai dari urusan dapur hingga pengiriman barang internasional.

Cara kerja alat konversi berat online ini sangat fleksibel dan mencakup satuan-satuan yang paling umum digunakan di dunia. Kamu bisa dengan mudah mengubah nilai antara Kilogram (kg), Gram (g), Pound (lbs), dan Ounce (oz). Cukup masukkan angkanya, pilih satuan asal dan tujuan, dan alat ini akan memberikan hasil yang akurat secara otomatis. Sangat berguna bagi kamu yang sedang mengikuti resep masakan dari luar negeri, menghitung berat bagasi pesawat, atau bagi para pengusaha yang sedang mengurus pengiriman kargo internasional. Kami ingin memastikan setiap hitungan beratmu selalu tepat dan tidak membingungkan.

Tips menarik tentang berat: tahukah kamu bahwa sistem metrik (kg dan gram) digunakan oleh hampir seluruh dunia, sementara sistem imperial (pound dan ounce) masih sangat dominan di Amerika Serikat dan Inggris? Memahami konversi ini bukan hanya soal angka, tapi juga soal memahami standar global yang berlaku. Ketelitian dalam berat sangat penting, terutama dalam pengiriman barang di mana selisih beberapa gram saja bisa mempengaruhi biaya ongkos kirim. Selalu pastikan kamu menggunakan satuan yang benar untuk menghindari kesalahan komunikasi dan biaya tambahan.

Semoga kalkulator konversi berat ini bermanfaat untuk setiap aktivitas harian, hobi, dan bisnismu. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan warga melalui alat bantu yang praktis dan akurat. Jangan biarkan perbedaan satuan menghambat produktivitasmu. Teruslah berkarya, kelola setiap detail dengan teliti, dan kami selalu siap mendukung setiap langkah informasimu melalui alat hitung yang jujur dan membantu. Selamat beraktivitas dan semoga harimu selalu produktif!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Nilai', 'val', 'number');
    const fromSelect = document.createElement('select');
    fromSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-2';
    ['KG', 'Gram', 'Lbs', 'Oz'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      fromSelect.appendChild(opt);
    });
    
    const toSelect = document.createElement('select');
    toSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-4';
    ['KG', 'Gram', 'Lbs', 'Oz'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      toSelect.appendChild(opt);
    });

    const calcBtn = createButton('Konversi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(fromSelect);
    container.appendChild(toSelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const factors: any = { 'KG': 1, 'Gram': 0.001, 'Lbs': 0.453592, 'Oz': 0.0283495 };

    calcBtn.onclick = () => {
      const val = parseValue(vInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;
      if (!isNaN(val)) {
        const res = (val * factors[from]) / factors[to];
        resDisplay.textContent = `${res.toFixed(2)} ${to}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
