import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Biner ke Desimal',
  id: 'bin-to-dec',
  description: 'Konversi angka biner ke desimal.',
  longDescription: `Halo, para pejuang coding, mahasiswa teknik informatika, dan siapa saja yang lagi belajar dunia pemrograman dan sistem komputer. Konversi bilangan biner ke desimal adalah salah satu skill dasar yang wajib dikuasai, tapi tidak sedikit yang masih sering bingung—apalagi kalau angka binernya panjang dan harus dihitung manual satu per satu. Kalkulator Biner ke Desimal ini hadir sebagai teman belajarmu yang sabar dan selalu siap membantu, kapanpun kamu butuh jawaban yang cepat dan tepat.

Cara kerjanya sangat mudah. Masukkan angka biner yang ingin kamu konversi—misalnya 1010 atau 11001101—lalu klik Konversi. Alat ini akan langsung mengubahnya ke bilangan desimal yang kita pakai sehari-hari. Secara teknis, sistem bilangan biner (basis 2) hanya mengenal dua digit: 0 dan 1. Setiap posisi digit dari kanan mewakili pangkat 2 yang meningkat—mulai dari 2⁰, 2¹, 2², dan seterusnya. Komputer dan semua perangkat digital bekerja dengan logika biner ini, makanya memahami cara konversi bilangan biner ke desimal adalah fondasi penting dalam ilmu komputer (computer science) dan teknik digital.

Buat kamu yang lagi belajar: cara paling mudah memahami konversi ini adalah dengan latihan. Coba masukkan angka biner sederhana dulu seperti 1, 10, 11, 100—perhatikan pola hasilnya. Kamu akan mulai melihat bahwa 1 = 1, 10 = 2, 11 = 3, 100 = 4, dan seterusnya. Ini bukan kebetulan—ini adalah pola matematis yang indah dan konsisten. Selain untuk pelajaran, pemahaman biner sangat berguna saat kamu bekerja dengan bit manipulation dalam pemrograman, memahami warna hex dalam desain web, atau menganalisis data jaringan komputer.

Teruslah belajar dan jangan menyerah! Setiap developer handal pernah berada di posisi yang sama—bingung dengan angka-angka biner yang terasa asing. Tapi percayalah, dengan latihan yang konsisten, semua itu akan terasa mudah dan alami. Kami di Kalkulator Warga mendukung perjalanan belajarmu sepenuhnya. Gunakan kalkulator konversi biner ini sesering mungkin sebagai alat bantu belajarmu, dan jadikan setiap perhitungan sebagai kesempatan untuk memahami lebih dalam cara kerja dunia digital.`,
  category: 'Matematika',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Angka Biner', 'bin', 'text');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bin = bInput.value.trim();
      if (/^[01]+$/.test(bin)) {
        const dec = parseInt(bin, 2);
        showResult(dec.toString());
      } else {
        showError('Harap masukkan angka biner yang valid (hanya 0 dan 1).');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};