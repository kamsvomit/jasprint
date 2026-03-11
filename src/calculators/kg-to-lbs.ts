import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator KG ke Pon',
  id: 'kg-to-lbs',
  description: 'Konversi kilogram ke pon (lbs).',
  longDescription: `Halo, para penjelajah dunia dan penggemar belanja internasional! Seringkali kita merasa bingung saat melihat label berat produk dari luar negeri, terutama dari Amerika Serikat atau Inggris, yang menggunakan satuan Pon atau Pounds (lbs). Apakah 1 kg itu berat? Berapa pon sebenarnya berat badan kita jika diukur dengan standar internasional? Kalkulator Konversi KG ke Pon ini kami sediakan untuk menghilangkan kebingunganmu secara instan, memberikan hasil yang akurat hanya dalam satu klik.

Alat ini bekerja dengan menggunakan faktor konversi standar internasional, di mana 1 kilogram setara dengan kurang lebih 2,20462 pon. Kamu cukup memasukkan angka dalam satuan Kilogram (kg) yang ingin kamu ubah, dan sistem kami akan menghitungnya secara otomatis. Ini sangat berguna saat kamu sedang membaca resep masakan internasional, berbelanja suplemen kebugaran, atau sekadar ingin membandingkan berat barang kiriman dari luar negeri dengan timbangan lokalmu.

Tips dari kami untuk urusan berat: ingatlah bahwa satuan Pon (lbs) seringkali digunakan dalam konteks olahraga angkat beban atau spesifikasi teknis barang-barang dari wilayah Amerika Utara. Memahami konversi ini akan membantumu lebih percaya diri saat berkomunikasi atau bertransaksi dalam skala global. Meskipun kita terbiasa dengan sistem metrik (kg), memiliki kemampuan untuk beralih antar satuan berat adalah keterampilan praktis yang sangat bermanfaat di era informasi yang tanpa batas ini.

Semoga alat bantu sederhana ini memudahkan urusanmu sehari-hari! Kami di Kalkulator Warga berkomitmen untuk terus menyediakan alat konversi yang praktis dan mudah diakses oleh siapa saja. Jangan biarkan perbedaan satuan menghambat aktivitasmu; biarkan kami yang menangani perhitungan rumitnya untukmu. Tetaplah bereksplorasi, tetaplah belajar hal-hal baru, dan jadikan setiap informasi sebagai jembatan untuk memahami dunia dengan lebih luas dan mendalam.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Kilogram', 'kg', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const kg = parseFloat(kInput.value);
      if (!isNaN(kg)) {
        const lbs = kg * 2.20462;
        resDisplay.textContent = `${lbs.toFixed(2)} Pon (Lbs)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
