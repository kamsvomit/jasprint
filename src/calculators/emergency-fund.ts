import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  id: 'emergency-fund',
  name: 'Dana Darurat',
  description: 'Hitung berapa banyak dana darurat yang harus Anda miliki berdasarkan pengeluaran bulanan.',
  longDescription: `Halo, para pengelola keuangan yang waspada dan bijaksana! Hidup seringkali memberikan kejutan yang tidak terduga, mulai dari perbaikan kendaraan yang mendadak, biaya kesehatan yang tiba-laki muncul, hingga situasi kehilangan pekerjaan. Di sinilah pentingnya memiliki "Dana Darurat" sebagai jaring pengaman finansial agar hidupmu tetap stabil saat badai datang. Kalkulator Dana Darurat ini kami rancang untuk membantumu menghitung target angka yang ideal agar kamu dan keluargamu merasa aman dan terlindungi.

Alat ini bekerja dengan cara yang sangat sederhana namun fundamental. Kamu cukup memasukkan rata-rata pengeluaran bulananmu dan memilih jangka waktu perlindungan yang kamu inginkan (biasanya 3, 6, atau 12 bulan). Kalkulator ini akan menghitung total dana yang harus kamu kumpulkan sebagai cadangan. Memiliki target angka yang spesifik adalah langkah pertama untuk mulai membangun benteng pertahanan finansialmu, memberikan ketenangan pikiran dalam menjalani aktivitas sehari-hari.

Tips membangun dana darurat dari kami: jangan merasa terbebani jika angka targetnya terlihat besar di awal. Mulailah dengan menyisihkan jumlah kecil secara rutin setiap bulan. Prioritaskan pengumpulan dana darurat sebelum kamu mulai berinvestasi pada instrumen yang lebih berisiko. Simpanlah dana ini di tempat yang likuid atau mudah dicairkan, namun tetap terpisah dari rekening belanja harianmu agar tidak terpakai secara tidak sengaja. Ingat, dana darurat bukan tentang seberapa besar penghasilanmu, tapi tentang seberapa siap kamu menghadapi masa depan.

Terima kasih sudah peduli dengan kesehatan finansialmu! Kami di Kalkulator Warga merasa terhormat bisa membantumu merencanakan jaring pengaman bagi orang-orang tercinta. Jangan biarkan ketidakpastian membuatmu cemas; hadapilah dengan persiapan yang matang. Semoga setiap rupiah yang kamu sisihkan untuk dana darurat ini memberikan rasa aman dan menjadi berkah bagi masa depanmu. Kami selalu di sini untuk mendukungmu membangun fondasi keuangan yang kokoh dan mandiri.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: eWrap, input: eInput } = createInput('Pengeluaran Bulanan', 'expense', 'number', 'Contoh: 5.000.000');
    const { wrapper: mWrap, input: mInput } = createInput('Jangka Waktu (Bulan)', 'months', 'number', '6');
    
    const calcBtn = createButton('Hitung Target');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(eWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const expense = parseValue(eInput.value);
      const months = parseValue(mInput.value) || 6;
      
      if (!eInput.value) {
        showError('Harap masukkan pengeluaran bulanan Anda.');
        return;
      }

      if (expense > 0) {
        const target = expense * months;
        showResult(formatCurrency(target));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Target dana darurat untuk ${months} bulan.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Pengeluaran harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      eInput.value = ''; mInput.value = '6';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator;
