import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const diskonPersen: Calculator = {
  id: 'diskon-persen',
  name: 'Diskon Persen',
  description: 'Hitung potongan harga dalam bentuk persentase.',
  longDescription: `Halo, para pemburu diskon dan pejuang hemat! Kami tahu rasanya mata berbinar saat melihat tulisan "Sale" di etalase toko atau aplikasi belanja. Namun, seringkali kita bingung menghitung berapa harga akhirnya di tengah keramaian pasar atau keterbatasan waktu saat flash sale. Kalkulator Diskon Persen ini kami buat agar kamu bisa membuat keputusan belanja yang cerdas dalam hitungan detik, memastikan setiap rupiah yang kamu keluarkan benar-benar sepadan dengan nilai yang kamu dapatkan.

Cara pakainya sangat praktis: masukkan harga awal barang, lalu masukkan persentase diskon yang ditawarkan. Alat ini akan menghitung berapa nominal potongan harganya dan berapa harga final yang harus kamu bayar di kasir. Tidak perlu lagi menghitung manual di kepala atau merasa ragu apakah diskonnya benar-benar menguntungkan. Kami ingin kamu belanja dengan penuh percaya diri dan kendali penuh atas anggaranmu.

Nasihat belanja dari kami: jangan terjebak membeli barang hanya karena diskonnya besar jika sebenarnya kamu tidak membutuhkannya. Belanja hemat bukan berarti membeli banyak barang murah, tapi membeli barang berkualitas dengan harga terbaik. Selalu bandingkan harga setelah diskon dengan anggaran bulananmu. Ingat, uang yang berhasil kamu hemat hari ini bisa menjadi modal untuk impianmu yang lebih besar di masa depan.

Selamat berbelanja dengan bijak! Kamu sudah bekerja keras mencari uang, jadi kamu berhak mendapatkan yang terbaik dengan harga yang paling masuk akal. Jangan biarkan godaan diskon mengganggu stabilitas keuanganmu. Dengan perencanaan yang matang, kamu bisa tetap tampil gaya atau memenuhi kebutuhan rumah tangga tanpa harus merasa bersalah. Kami di Kalkulator Warga senang bisa menjadi asisten belanja pribadimu yang selalu siap membantu kapan saja.`,
  category: 'Belanja & Diskon',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga Awal', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Diskon (%)', 'discount', 'number');
    
    const calcBtn = createButton('Hitung Diskon');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(hInput.value);
      const discount = parseValue(dInput.value);
      
      if (!hInput.value || !dInput.value) {
        showError('Harap masukkan harga awal dan persentase diskon.');
        return;
      }

      if (price > 0 && discount >= 0) {
        const amount = (discount / 100) * price;
        const final = price - amount;
        
        showResult(formatCurrency(final));
        const hematEl = document.createElement('div');
        hematEl.className = 'text-sm font-medium text-slate-500 mt-1';
        hematEl.textContent = `Hemat: ${formatCurrency(amount)}`;
        resWrap.querySelector('div:last-child')?.appendChild(hematEl);
      } else {
        showError('Harga harus lebih dari 0 dan diskon tidak boleh negatif.');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; dInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default diskonPersen;
