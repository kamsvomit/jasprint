import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kredit Mobil',
  id: 'car-loan',
  description: 'Hitung cicilan bulanan untuk kredit mobil.',
  longDescription: `Halo, kamu yang lagi serius mempertimbangkan untuk beli mobil secara kredit. Punya kendaraan pribadi memang impian banyak orang—bayangkan betapa nyamannya tidak perlu berjejalan di transportasi umum setiap hari, bisa antar jemput keluarga dengan mudah, atau sekadar menikmati perjalanan yang lebih bebas. Tapi di balik kesenangan itu, ada komitmen finansial jangka panjang yang harus kamu perhitungkan dengan matang. Kalkulator Kredit Mobil ini hadir untuk membantumu membuat keputusan yang cerdas, bukan sekadar keputusan yang impulsif.

Cara menggunakannya lengkap dan mudah. Masukkan harga mobil yang kamu inginkan, jumlah uang muka (DP) yang siap kamu bayarkan, nilai tukar tambah jika ada kendaraan lama yang akan disetorkan, suku bunga tahunan dari leasing atau bank, serta tenor atau jangka waktu cicilan dalam bulan. Alat ini akan menghitung cicilan bulanan menggunakan rumus anuitas—metode yang paling umum digunakan oleh perusahaan pembiayaan (leasing) di Indonesia seperti ACC, FIF, Mandiri Tunas Finance, dan lainnya. Hasilnya langsung muncul dalam satuan rupiah, sehingga kamu bisa langsung membandingkan dengan kemampuan finansialmu.

Tips penting sebelum tanda tangan kontrak kredit mobil: pertama, pastikan total cicilan per bulan tidak melebihi 30% dari penghasilan bersihmu—ini adalah batas aman yang disarankan oleh para perencana keuangan. Kedua, perhatikan perbedaan antara bunga flat dan bunga efektif—keduanya terlihat mirip di brosur tapi bisa sangat berbeda dalam total pembayaran. Ketiga, hitung juga biaya-biaya tersembunyi seperti biaya asuransi, administrasi, dan BPKB yang sering tidak disebutkan di awal. Keempat, pertimbangkan apakah kamu akan pakai mobil itu untuk keperluan produktif atau sekadar gaya hidup—karena ini menentukan apakah investasi ini layak secara finansial.

Jangan terburu-buru karena tergiur promo DP ringan atau cicilan kecil tanpa melihat gambaran besarnya. Sebuah keputusan kredit yang salah bisa membebanimu selama 3 hingga 5 tahun ke depan. Tapi dengan perencanaan yang tepat dan perhitungan yang matang, kredit mobil bisa menjadi langkah cerdas menuju kualitas hidup yang lebih baik. Kami di Kalkulator Warga ada di sini untuk memastikan kamu membuat pilihan dengan mata terbuka dan kepala yang jernih. Hitung dulu, baru putuskan!`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Mobil (Rp)', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (Rp)', 'down', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Nilai Tukar Tambah (Rp)', 'trade', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Suku Bunga (%)', 'rate', 'number', '5');
    const { wrapper: mWrap, input: mInput } = createInput('Jangka Waktu (Bulan)', 'term', 'number', '60');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(tWrap);
    container.appendChild(rWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseFloat(pInput.value);
      const down = parseFloat(dInput.value) || 0;
      const trade = parseFloat(tInput.value) || 0;
      const p = price - down - trade;
      const r = (parseFloat(rInput.value) || 5) / 100 / 12;
      const n = parseFloat(mInput.value) || 60;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        showResult(formatCurrency(monthly));
      } else {
        showError('Harap masukkan data yang valid.');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};