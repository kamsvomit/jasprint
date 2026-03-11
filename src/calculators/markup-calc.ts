import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  id: 'markup-calc',
  name: 'Harga Jual (Markup)',
  description: 'Tentukan harga jual berdasarkan modal dan margin keuntungan yang diinginkan.',
  longDescription: `Halo, para pengusaha kreatif dan pemilik toko yang visioner! Menentukan harga jual adalah salah satu keputusan paling strategis dalam menjalankan bisnis. Kamu tentu ingin harga yang kompetitif namun tetap memberikan keuntungan yang cukup untuk operasional dan pengembangan usaha. Kalkulator Harga Jual (Markup) ini kami rancang khusus untuk membantumu menentukan titik harga yang ideal berdasarkan modal yang kamu keluarkan dan target margin keuntungan yang kamu harapkan.

Logika perhitungan alat ini menggunakan metode markup persentase dari harga jual. Kamu cukup memasukkan modal (HPP) per unit produk dan persentase margin keuntungan yang kamu inginkan. Alat ini akan menghitung harga jual yang tepat agar margin tersebut tercapai setelah dikurangi modal. Ini sangat berbeda dengan sekadar menambahkan persentase ke modal; metode ini memastikan bahwa persentase keuntungan yang kamu lihat benar-benar mencerminkan porsi dari harga jual akhirmu.

Tips strategi harga dari kami: dalam menentukan margin, pertimbangkan juga biaya-biaya tak terduga dan posisi brand kamu di pasar. Jika produkmu memiliki nilai tambah yang unik, jangan takut untuk mengambil margin yang lebih tinggi. Namun, jika persaingan sangat ketat, kamu mungkin perlu bermain di margin yang lebih tipis namun dengan volume penjualan yang lebih besar. Selalu pantau harga kompetitor sebagai referensi, tapi jangan biarkan mereka mendikte kesehatan keuangan bisnismu sepenuhnya.

Semoga bisnismu semakin maju dan menguntungkan! Kami percaya bahwa setiap produk hebat layak mendapatkan harga yang adil bagi penjual maupun pembeli. Gunakan kalkulator ini untuk bereksperimen dengan berbagai skenario harga sehingga kamu bisa menemukan "sweet spot" yang memaksimalkan profitmu. Kami di Kalkulator Warga selalu mendukung semangat kewirausahaanmu dengan menyediakan alat bantu manajemen harga yang profesional namun mudah digunakan.`,
  category: 'Bisnis',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Modal (HPP)', 'cost', 'number');
    const { wrapper: mWrap, input: mInput } = createInput('Margin Keuntungan (%)', 'margin', 'number', '20');
    
    const calcBtn = createButton('Hitung Harga Jual');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cost = parseValue(cInput.value);
      const margin = parseValue(mInput.value) || 0;
      
      if (!cInput.value) {
        showError('Harap masukkan modal produk.');
        return;
      }

      if (cost > 0) {
        const sellPrice = cost / (1 - margin / 100);
        const profit = sellPrice - cost;
        
        showResult(formatCurrency(sellPrice));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Profit per unit: ${formatCurrency(profit)}`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Modal harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = ''; mInput.value = '20';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator;
