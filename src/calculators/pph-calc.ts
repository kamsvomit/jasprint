import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pajak Penghasilan (PPh)',
  id: 'pph-calc',
  description: 'Estimasi pajak penghasilan bulanan Anda.',
  longDescription: `Halo, warga negara yang taat pajak. Kami tahu, melihat potongan pajak di slip gaji kadang terasa sedikit "menyakitkan" setelah sebulan penuh bekerja keras. Namun, pajak adalah kontribusi nyata kita untuk pembangunan fasilitas umum yang kita nikmati bersama. Kalkulator Pajak Penghasilan (PPh) ini kami buat untuk membantumu memahami berapa estimasi pajak yang dipotong dari penghasilanmu, sehingga kamu tidak lagi merasa bingung atau kaget saat melihat perbedaan antara gaji kotor dan gaji bersih.

Alat ini bekerja dengan logika perhitungan pajak penghasilan yang disederhanakan. Kamu cukup memasukkan total gaji bulananmu, dan sistem akan memberikan estimasi potongan pajak berdasarkan tarif yang berlaku umum. Meskipun ini adalah estimasi awal, informasi ini sangat berguna untuk perencanaan keuangan pribadimu, membantumu mengalokasikan dana dengan lebih akurat sejak awal bulan.

Nasihat kami: pahamilah hak dan kewajiban perpajakanmu. Jika kamu memiliki tanggungan keluarga atau pengurang pajak lainnya (PTKP), pajak yang kamu bayar bisa jadi lebih kecil. Jangan ragu untuk mempelajari lebih lanjut tentang aturan pajak terbaru atau berkonsultasi dengan bagian keuangan di tempatmu bekerja. Menjadi warga yang cerdas pajak berarti kamu memiliki kendali lebih baik atas hak-hak keuanganmu sendiri.

Terima kasih sudah menjadi bagian dari pembangunan bangsa melalui pajak yang kamu bayar. Kerja kerasmu tidak hanya menghidupi keluarga, tapi juga berkontribusi bagi orang banyak. Jangan biarkan urusan administrasi pajak membuatmu pusing; biarkan kami membantu memberikan gambaran sederhananya. Tetaplah fokus pada produktivitas dan pengembangan dirimu. Kami di Kalkulator Warga berkomitmen untuk terus menyediakan alat yang memudahkan urusan finansialmu sehari-hari.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Bulanan', 'salary', 'number');
    
    const calcBtn = createButton('Hitung Pajak', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      if (salary > 0) {
        // Simple estimation for demo
        let tax = 0;
        if (salary > 5000000) tax = (salary - 5000000) * 0.05;
        resDisplay.textContent = formatCurrency(tax);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
