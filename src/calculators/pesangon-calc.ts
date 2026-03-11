import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Estimasi Pesangon',
  id: 'pesangon-calc',
  description: 'Hitung estimasi uang pesangon sesuai UU Cipta Kerja.',
  longDescription: `Halo, para pekerja profesional yang sedang merencanakan langkah selanjutnya! Kami sangat memahami bahwa masa transisi dalam karier, baik itu karena pengunduran diri, pensiun, atau pemutusan hubungan kerja, adalah momen yang penuh dengan pertimbangan emosional dan finansial. Uang pesangon adalah hak yang menjadi jaring pengamanmu untuk melangkah ke babak baru dalam hidup. Kalkulator Estimasi Pesangon ini kami hadirkan untuk memberikan gambaran awal yang transparan tentang hak-hak finansialmu berdasarkan regulasi yang berlaku.

Alat ini bekerja dengan menggunakan formula dasar yang mengacu pada ketentuan ketenagakerjaan di Indonesia (seperti UU Cipta Kerja). Kamu cukup memasukkan gaji pokok terakhirmu (ditambah tunjangan tetap) dan total masa kerjamu dalam hitungan tahun. Kalkulator ini akan menghitung estimasi uang pesangon, uang penghargaan masa kerja, dan uang penggantian hak yang mungkin kamu terima. Memiliki angka estimasi ini sangat penting agar kamu bisa merencanakan masa depanmu dengan lebih percaya diri dan tenang.

Tips dari kami untuk masa transisi karier: jangan terburu-buru dalam mengambil keputusan besar saat baru menerima uang pesangon. Gunakan dana tersebut dengan sangat bijak; prioritaskan untuk dana darurat dan kebutuhan pokok selama masa pencarian kerja baru atau persiapan usaha mandiri. Pastikan juga kamu memahami detail kontrak kerjamu dan alasan pengakhiran hubungan kerja, karena hal tersebut bisa mempengaruhi besaran pengali pesangon yang kamu terima. Pengetahuan adalah kekuatan, dan memahami hakmu adalah langkah awal untuk melindungi masa depan finansialmu.

Semoga langkahmu selanjutnya membawa keberhasilan yang lebih besar! Kami di Kalkulator Warga percaya bahwa setiap akhir adalah awal dari sesuatu yang baru dan lebih baik. Jangan biarkan ketidakpastian angka menghambat semangatmu untuk terus berkarya. Gunakan alat ini sebagai referensi awal, dan jangan ragu untuk berkonsultasi dengan ahli hukum atau bagian personalia untuk mendapatkan rincian yang lebih akurat. Kami selalu siap mendukung setiap fase perjalanan kariermu dengan alat bantu yang memudahkan urusan keuanganmu.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Pokok + Tunjangan Tetap', 'salary', 'number', 'Contoh: 5.000.000');
    const { wrapper: tWrap, input: tInput } = createInput('Masa Kerja (Tahun)', 'years', 'number', 'Contoh: 3');
    
    const calcBtn = createButton('Hitung Pesangon', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      const years = parseValue(tInput.value);
      if (salary > 0 && years > 0) {
        let multiplier = 1;
        if (years >= 8) multiplier = 9;
        else multiplier = Math.floor(years) + 1;
        
        const total = salary * multiplier;
        resDisplay.textContent = formatCurrency(total);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
