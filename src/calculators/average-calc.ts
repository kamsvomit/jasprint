import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Rata-rata',
  id: 'average-calc',
  description: 'Hitung nilai rata-rata dari sekumpulan angka.',
  longDescription: `Halo, teman-teman yang lagi sibuk ngitung nilai, data penjualan, atau mungkin lagi bikin laporan kerja. Menghitung rata-rata atau mean memang terdengar sepele, tapi kalau datanya banyak dan kamu harus cepat, satu kesalahan kecil dalam penjumlahan bisa merusak seluruh perhitungan. Kalkulator Rata-rata ini dibuat khusus buat kamu yang butuh hasil cepat dan akurat—tanpa perlu buka spreadsheet dulu atau ngandelin hapalan rumus matematika yang kadang bikin panik.

Cara pakainya simpel banget. Masukkan semua angka yang ingin kamu rata-ratakan, pisahkan dengan tanda koma—misalnya: 80, 90, 75, 85. Lalu klik Hitung Rata-rata, dan hasilnya langsung muncul. Secara matematis, nilai rata-rata (mean) dihitung dengan menjumlahkan semua angka kemudian membaginya dengan banyaknya data. Ini adalah rumus dasar statistik yang dipakai di mana-mana, mulai dari menghitung rata-rata nilai ujian, rata-rata penjualan harian, rata-rata konsumsi listrik, sampai rata-rata berat badan anggota tim. Kalkulator mean online ini bisa menangani berapapun jumlah datamu secara instan.

Satu tips yang sering terlupakan: rata-rata (mean) bisa sangat dipengaruhi oleh nilai ekstrem atau outlier. Misalnya, kalau ada satu nilai yang jauh lebih besar atau kecil dari yang lain, rata-ratamu bisa jadi tidak merepresentasikan data secara keseluruhan. Dalam kasus seperti itu, kamu mungkin juga perlu mempertimbangkan median (nilai tengah) atau modus (nilai paling sering muncul) sebagai pelengkap analisis. Tapi untuk keperluan sehari-hari—laporan sekolah, rekap kerja, atau analisis sederhana—menghitung rata-rata sudah lebih dari cukup.

Kami berharap kalkulator hitung rata-rata ini bisa jadi andalan kamu setiap hari. Entah kamu seorang guru yang merekap nilai siswa, seorang karyawan yang menyusun laporan bulanan, atau pelajar yang lagi belajar statistik—alat ini ada untukmu. Jangan ragu untuk dipakai sesering mungkin, karena kami di Kalkulator Warga memang hadir untuk membuat hidupmu sedikit lebih mudah dan efisien.`,
  category: 'Matematika',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Angka (pisahkan dengan koma)', 'nums', 'text', '10, 20, 30');
    
    const calcBtn = createButton('Hitung Rata-rata', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const nums = iInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      if (nums.length > 0) {
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        resDisplay.textContent = avg.toFixed(2);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      iInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};