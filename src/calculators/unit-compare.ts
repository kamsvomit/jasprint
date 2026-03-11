import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Perbandingan Harga Satuan',
  id: 'unit-compare',
  description: 'Bandingkan dua produk untuk melihat mana yang lebih murah per satuannya.',
  longDescription: `Halo, para pembelanja cerdas dan pengelola keuangan rumah tangga yang teliti! Pernahkah kamu berdiri di depan rak supermarket, bingung memilih antara dua merek deterjen: satu kemasan besar 2 liter seharga Rp55.000, dan satu lagi kemasan isi ulang 800ml seharga Rp21.000? Mana yang sebenarnya memberikan nilai lebih untuk uangmu? Kalkulator Perbandingan Harga Satuan ini hadir sebagai asisten belanja pribadimu untuk memastikan kamu selalu mendapatkan harga terbaik untuk setiap rupiah yang kamu keluarkan.

Cara kerja alat pembanding harga online ini sangat membantu dalam menghemat pengeluaran bulananmu. Kamu cukup memasukkan harga dan jumlah (berat, volume, atau isi) dari dua produk yang ingin dibandingkan. Alat ini akan secara otomatis menghitung harga per satuannya dan memberitahumu produk mana yang lebih ekonomis. Tidak perlu lagi menghitung manual di tengah keramaian toko; cukup gunakan ponselmu dan buat keputusan belanja yang lebih cerdas dalam hitungan detik. Kami ingin membantumu menjadi konsumen yang lebih kritis dan hemat.

Tips belanja hemat dari kami: jangan selalu berasumsi bahwa kemasan yang lebih besar (bulk buy) pasti lebih murah. Terkadang, promo pada kemasan kecil atau perbedaan ukuran yang tidak standar bisa menipu mata kita. Dengan mengetahui harga per unit, kamu bisa menghindari trik pemasaran dan benar-benar menghemat uang dalam jangka panjang. Ingat, penghematan kecil yang dilakukan secara konsisten pada setiap barang belanjaan akan terakumulasi menjadi jumlah yang signifikan di akhir bulan.

Semoga kalkulator perbandingan harga ini bermanfaat untuk setiap perjalanan belanjamu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang memudahkan urusan ekonomi harian warga. Jangan biarkan anggaranmu bocor karena keputusan belanja yang kurang tepat. Teruslah menjadi pembelanja yang bijak, kelola keuanganmu dengan cerdas, dan kami selalu siap mendukung setiap langkah hematmu melalui alat hitung yang praktis, jujur, dan akurat. Selamat berbelanja dengan cerdas!`,
  category: 'Belanja',
  render(container) {
    const { wrapper: p1Wrap, input: p1Input } = createInput('Harga Produk 1 (Rp)', 'p1', 'number');
    const { wrapper: q1Wrap, input: q1Input } = createInput('Jumlah/Qty Produk 1', 'q1', 'number');
    const { wrapper: p2Wrap, input: p2Input } = createInput('Harga Produk 2 (Rp)', 'p2', 'number');
    const { wrapper: q2Wrap, input: q2Input } = createInput('Jumlah/Qty Produk 2', 'q2', 'number');
    
    const calcBtn = createButton('Bandingkan');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(p1Wrap);
    container.appendChild(q1Wrap);
    container.appendChild(p2Wrap);
    container.appendChild(q2Wrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p1 = parseFloat(p1Input.value);
      const q1 = parseFloat(q1Input.value);
      const p2 = parseFloat(p2Input.value);
      const q2 = parseFloat(q2Input.value);
      
      if (q1 > 0 && q2 > 0) {
        const u1 = p1 / q1;
        const u2 = p2 / q2;
        const resultText = u1 < u2 ? 'Produk 1 lebih murah' : (u1 > u2 ? 'Produk 2 lebih murah' : 'Keduanya sama');
        showResult(resultText);
      } else {
        showError('Harap masukkan jumlah yang valid (lebih dari 0).');
      }
    };

    resetBtn.onclick = () => {
      p1Input.value = ''; q1Input.value = ''; p2Input.value = ''; q2Input.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
