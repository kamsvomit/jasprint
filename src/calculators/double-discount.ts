import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  id: 'double-discount',
  name: 'Diskon Ganda (A% + B%)',
  description: 'Hitung total potongan harga untuk promo diskon bertingkat.',
  longDescription: `Halo, para ahli belanja dan pemburu promo spesial! Kami tahu betapa menggodanya tulisan "Diskon 50% + 20%" yang sering terpampang besar di pusat perbelanjaan atau banner marketplace. Namun, tahukah kamu bahwa diskon ganda tidak berarti diskon 70%? Seringkali kita merasa bingung menghitung harga akhirnya di tengah hiruk-pikuk belanja. Kalkulator Diskon Ganda ini hadir untuk memberikan kejelasan instan, sehingga kamu tahu persis berapa harga yang harus dibayar dan berapa sebenarnya diskon efektif yang kamu dapatkan.

Cara kerja alat ini mengikuti logika ritel yang sebenarnya: diskon pertama (A%) dipotong dari harga awal, kemudian diskon kedua (B%) dipotong dari harga yang sudah didiskon tadi. Masukkan harga awal barang, persentase diskon pertama, dan persentase diskon kedua. Alat ini akan menghitung harga final secara otomatis. Kamu juga akan melihat total uang yang berhasil kamu hemat dan persentase diskon efektifnya. Informasi ini sangat berguna agar kamu tidak merasa tertipu oleh teknik pemasaran yang terlihat sangat besar namun sebenarnya memiliki perhitungan tersendiri.

Tips belanja cerdas dari kami: jangan biarkan angka persentase yang bertumpuk membuatmu kehilangan kendali atas anggaran. Selalu fokus pada harga final yang harus dibayar. Terkadang, satu diskon besar (misalnya langsung 60%) bisa lebih menguntungkan daripada diskon ganda (misalnya 40% + 20%). Gunakan kalkulator ini untuk membandingkan berbagai promo yang ada sehingga kamu selalu mendapatkan penawaran terbaik untuk uang yang kamu keluarkan dengan susah payah.

Selamat berburu promo dengan lebih cerdas! Kami bangga bisa menjadi teman belanjamu yang paling teliti. Jangan biarkan strategi pemasaran mengaburkan logika keuanganmu; tetaplah menjadi konsumen yang kritis dan terinformasi. Kami di Kalkulator Warga selalu siap membantumu mengurai kerumitan angka diskon agar pengalaman belanjamu tetap menyenangkan dan tetap hemat di kantong.`,
  category: 'Belanja',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga Awal', 'price', 'number');
    const { wrapper: d1Wrap, input: d1Input } = createInput('Diskon Pertama (%)', 'disc1', 'number', '50');
    const { wrapper: d2Wrap, input: d2Input } = createInput('Diskon Kedua (%)', 'disc2', 'number', '20');
    
    const calcBtn = createButton('Hitung Harga Akhir');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(d1Wrap);
    container.appendChild(d2Wrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(hInput.value);
      const d1 = parseValue(d1Input.value) || 0;
      const d2 = parseValue(d2Input.value) || 0;
      
      if (!hInput.value) {
        showError('Harap masukkan harga awal.');
        return;
      }

      if (price > 0) {
        const afterD1 = price * (1 - d1 / 100);
        const final = afterD1 * (1 - d2 / 100);
        const totalSaved = price - final;
        const effectiveDiscount = (totalSaved / price) * 100;
        
        showResult(formatCurrency(final));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.innerHTML = `
          Hemat: ${formatCurrency(totalSaved)}<br>
          Diskon Efektif: ${effectiveDiscount.toFixed(1)}%
        `;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Harga harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; d1Input.value = '50'; d2Input.value = '20';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator;
