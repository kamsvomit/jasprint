import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Desimal ke Biner',
  id: 'dec-to-bin',
  description: 'Konversi angka desimal ke biner.',
  longDescription: `Halo, para pelajar, mahasiswa, dan pecinta teknologi! Memahami sistem bilangan biner adalah pintu masuk utama untuk mengerti bagaimana komputer dan perangkat digital bekerja di balik layar. Meskipun kita sehari-hari menggunakan sistem desimal (basis 10), mesin hanya mengenal angka 0 dan 1 (basis 2). Kalkulator Konversi Desimal ke Biner ini kami sediakan untuk membantumu belajar dan memverifikasi hasil perhitunganmu dengan cepat, sehingga proses belajarmu di bidang informatika atau matematika menjadi lebih menyenangkan dan mudah.

Cara kerja alat konversi biner online ini sangat sederhana. Kamu cukup memasukkan angka desimal yang ingin kamu ubah, dan dalam sekejap alat ini akan menampilkan deretan angka biner yang setara. Ini sangat berguna bagi kamu yang sedang mengerjakan tugas sekolah, mendalami logika pemrograman, atau sekadar penasaran dengan bahasa mesin. Kami ingin memastikan bahwa konsep yang terlihat rumit ini bisa dipahami oleh siapa saja dengan bantuan alat yang praktis and akurat.

Tips belajar sistem bilangan: cobalah untuk memahami metode pembagian dua secara berulang untuk melakukan konversi manual. Gunakan kalkulator ini sebagai alat verifikasi untuk memastikan pemahamanmu sudah benar. Memahami biner akan membantumu mengerti konsep dasar penyimpanan data, alamat IP, dan banyak aspek teknis lainnya di dunia digital. Jangan pernah merasa takut dengan angka; jadikan mereka sebagai teman untuk membuka wawasan baru di era teknologi informasi yang berkembang pesat ini.

Semoga kalkulator desimal ke biner ini membantu perjalanan belajarmu. Kami di Kalkulator Warga bangga bisa mendukung pendidikan dan literasi digital bagi seluruh warga Indonesia. Teruslah bereksplorasi dan jangan berhenti belajar hal-hal baru. Dunia digital menyimpan banyak rahasia menarik, dan kami senang bisa menjadi bagian kecil dari proses penemuanmu. Mari kita tingkatkan kemampuan teknis kita untuk masa depan yang lebih cerdas dan inovatif bersama-sama!`,
  category: 'Matematika',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Angka Desimal', 'dec', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dec = parseInt(dInput.value.replace(/\D/g, ''));
      if (!isNaN(dec)) {
        showResult(dec.toString(2));
      } else {
        showError('Harap masukkan angka desimal yang valid.');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
