import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kaki ke Meter',
  id: 'ft-to-m',
  description: 'Konversi kaki (feet) ke meter.',
  longDescription: `Halo, para profesional, pelajar, dan pecinta desain! Dalam dunia konstruksi, penerbangan, atau saat membaca spesifikasi produk internasional, kita seringkali menemukan satuan panjang "kaki" atau "feet". Bagi kita di Indonesia yang menggunakan sistem metrik, membayangkan berapa sebenarnya panjang dalam meter bisa menjadi tantangan tersendiri. Kalkulator Konversi Kaki ke Meter ini kami hadirkan sebagai solusi instan untuk memberikan gambaran yang akurat dan cepat, sehingga pekerjaan atau tugasmu bisa selesai dengan lebih efisien.

Cara kerja alat konversi satuan panjang online ini sangat praktis. Kamu hanya perlu memasukkan angka dalam satuan kaki (ft), dan dalam sekejap alat ini akan menampilkan hasil konversinya dalam meter (m). Sangat berguna bagi kamu yang sedang menghitung ketinggian plafon, panjang material bangunan, atau sedang mempelajari geografi dan fisika. Kami ingin memastikan bahwa perbedaan sistem satuan tidak lagi menjadi penghalang bagi produktivitas dan pemahamanmu dalam berbagai bidang.

Tips praktis untukmu: sebagai gambaran kasar, 1 meter itu sedikit lebih panjang dari 3 kaki (tepatnya sekitar 3,28 kaki). Mengetahui perbandingan dasar ini akan membantumu melakukan estimasi cepat di lapangan. Namun, untuk keperluan teknis yang membutuhkan akurasi tinggi, selalu gunakan kalkulator kami untuk menghindari kesalahan fatal dalam perhitungan. Ketelitian dalam satuan adalah tanda profesionalisme dan kunci keberhasilan dalam setiap proyek yang kamu jalankan.

Semoga kalkulator konversi sederhana ini bermanfaat untuk setiap kebutuhan teknismu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang akurat dan mudah diakses oleh siapa saja. Teruslah berkarya dan tingkatkan kualitas pekerjaanmu dengan perhitungan yang tepat. Kami selalu siap mendukung setiap langkah pembangunan dan pembelajaranmu melalui alat hitung yang jujur dan membantu. Selamat bekerja dan semoga setiap proyekmu berjalan lancar dan sukses!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: fWrap, input: fInput } = createInput('Kaki', 'feet', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(fWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ft = parseFloat(fInput.value);
      if (!isNaN(ft)) {
        const m = ft / 3.28084;
        resDisplay.textContent = `${m.toFixed(2)} Meter`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      fInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
