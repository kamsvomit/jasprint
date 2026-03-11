import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pelunasan Kartu Kredit',
  id: 'cc-payoff',
  description: 'Hitung berapa bulan untuk melunasi hutang kartu kredit.',
  longDescription: `Halo, kamu yang mungkin sedang merasa tertekan dengan tagihan kartu kredit yang terasa tidak ada habisnya. Pertama-tama, tarik napas. Kamu tidak sendirian—jutaan orang di seluruh dunia bergulat dengan hutang kartu kredit, dan kabar baiknya adalah: hutang ini bisa dilunasi, asalkan kamu punya strategi yang tepat. Kalkulator Pelunasan Kartu Kredit ini dirancang untuk memberikanmu gambaran yang jujur dan transparan—berapa bulan waktu yang kamu butuhkan untuk terbebas dari jeratan hutang itu, berdasarkan berapa yang kamu bayar setiap bulannya.

Cara pakainya langsung dan tidak membuang waktu. Masukkan total saldo hutang kartu kreditmu saat ini, suku bunga per tahun yang dikenakan (biasanya tertera di tagihan, rata-rata kartu kredit di Indonesia berkisar 18–27% per tahun), dan jumlah yang mampu kamu bayarkan setiap bulan. Kalkulator ini akan menghitung berapa bulan yang kamu butuhkan untuk melunasi hutang tersebut sepenuhnya. Perlu diingat: jika pembayaran bulananmu kurang dari nilai bunga yang dikenakan bulan itu, hutangmu justru akan terus membengkak—bukan berkurang. Ini adalah jebakan bunga majemuk (compound interest) yang harus kamu waspadai.

Strategi paling efektif untuk melunasi hutang kartu kredit lebih cepat: pertama, selalu bayar lebih dari pembayaran minimum—pembayaran minimum biasanya hanya cukup untuk menutup bunga tanpa menyentuh pokoknya. Kedua, pertimbangkan metode avalanche (lunasi kartu dengan bunga tertinggi dulu) atau metode snowball (lunasi hutang terkecil dulu untuk membangun momentum). Ketiga, kalau memungkinkan, ajukan balance transfer ke kartu dengan bunga lebih rendah atau cari pinjaman personal dengan bunga lebih ringan untuk melunasi hutang kartu kreditmu. Setiap rupiah ekstra yang kamu bayarkan di atas minimum adalah langkah nyata menuju kebebasan finansialmu.

Kami tahu perjuangan ini tidak mudah, terutama di tengah tekanan biaya hidup yang terus naik. Tapi percayalah—satu langkah kecil hari ini, konsisten setiap bulan, akan membawamu ke titik di mana kamu bisa bernapas lega tanpa beban tagihan yang menghantui. Kami di Kalkulator Warga ingin menjadi bagian dari perjalananmu menuju kebebasan finansial itu. Hitung sekarang, buat rencanamu, dan mulailah bergerak—karena hari terbaik untuk memulai adalah hari ini.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Saldo Hutang (Rp)', 'balance', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Suku Bunga (%)', 'rate', 'number', '18');
    const { wrapper: mWrap, input: mInput } = createInput('Pembayaran Bulanan (Rp)', 'monthly', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(rWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const b = parseFloat(bInput.value);
      const r = (parseFloat(rInput.value) || 18) / 100 / 12;
      const m = parseFloat(mInput.value);
      
      if (b > 0 && m > b * r) {
        const months = -Math.log(1 - (b * r) / m) / Math.log(1 + r);
        showResult(`${Math.ceil(months)} Bulan`);
      } else if (m <= b * r && b > 0) {
        showError('Pembayaran terlalu rendah untuk menutupi bunga.');
      } else {
        showError('Harap masukkan saldo dan pembayaran yang valid.');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = ''; mInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};