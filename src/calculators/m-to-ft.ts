import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Meter ke Kaki',
  id: 'm-to-ft',
  description: 'Konversi meter ke kaki (feet).',
  longDescription: `Halo, para arsitek, desainer interior, dan pecinta DIY! Dalam dunia desain dan konstruksi, kita seringkali perlu beralih antara sistem metrik (meter) dan sistem imperial (kaki/feet). Meskipun di Indonesia kita menggunakan meter sebagai standar utama, banyak referensi desain, furnitur internasional, atau spesifikasi teknis yang masih menggunakan satuan kaki. Kalkulator Konversi Meter ke Kaki ini kami hadirkan sebagai alat bantu instan untuk memudahkanmu memvisualisasikan ukuran dalam berbagai standar dengan presisi.

Cara kerja alat konversi panjang online ini sangat membantu dalam perencanaan proyekmu. Kamu hanya perlu memasukkan angka dalam satuan meter, dan alat ini akan secara otomatis menghitung nilai setaranya dalam kaki (feet). Sangat berguna bagi kamu yang sedang menata ruangan, memesan furnitur dari luar negeri, atau sedang mengerjakan tugas sekolah yang melibatkan konversi satuan. Kami ingin memastikan bahwa perbedaan sistem ukuran tidak lagi menjadi hambatan bagi kreativitas dan ketepatan pekerjaanmu.

Tips praktis untukmu: ingatlah bahwa 1 meter itu setara dengan sekitar 3,28 kaki. Memahami perbandingan dasar ini akan membantumu melakukan estimasi cepat saat berada di toko bangunan atau saat sedang berdiskusi tentang desain ruangan. Selalu gunakan alat ukur yang akurat dan verifikasi perhitunganmu dengan kalkulator kami untuk hasil yang terbaik. Ketelitian dalam setiap inci atau sentimeter adalah kunci dari hasil karya yang indah dan fungsional.

Semoga kalkulator konversi sederhana ini bermanfaat untuk setiap proyek kreatif dan teknismu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang memudahkan urusan warga dalam membangun dan menata hunian mereka. Teruslah berkarya, ciptakan ruang yang nyaman dan estetik bagi keluarga, dan kami selalu siap mendukung setiap detail pembangunanmu melalui alat hitung yang praktis dan akurat. Selamat mendesain dan semoga setiap proyekmu sukses luar biasa!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Meter', 'meters', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const m = parseFloat(mInput.value);
      if (!isNaN(m)) {
        const ft = m * 3.28084;
        resDisplay.textContent = `${ft.toFixed(2)} Kaki`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
