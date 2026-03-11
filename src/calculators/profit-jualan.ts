import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const profitJualan: Calculator = {
  id: 'profit-jualan',
  name: 'Profit Jualan',
  description: 'Hitung keuntungan bersih dari penjualan produk Anda.',
  longDescription: `Halo, para pedagang tangguh dan pejuang omzet! Kami sangat mengagumi semangat pantang menyerahmu dalam menjajakan produk, baik itu di pasar, toko kelontong, maupun di marketplace online. Namun, seringkali kita terjebak dalam rasa senang melihat uang masuk (omzet) tanpa menyadari berapa sebenarnya keuntungan bersih yang benar-benar bisa kita kantongi. Kalkulator Profit Jualan ini kami rancang agar kamu bisa membedakan mana uang modal yang harus diputar kembali dan mana keuntungan murni yang menjadi hakmu.

Cara menggunakan alat ini sangat detail untuk memastikan akurasi. Masukkan harga jual produkmu, lalu masukkan modal atau HPP (Harga Pokok Produksi) per unitnya. Jangan lupa masukkan juga biaya operasional lainnya seperti biaya packing, ongkos kirim yang kamu tanggung, atau biaya admin marketplace jika ada. Alat ini akan menghitung selisihnya untuk menampilkan profit bersih dan margin keuntungan dalam persentase. Dengan angka yang jelas, kamu bisa mengevaluasi apakah strategi hargamu sudah tepat atau perlu disesuaikan.

Tips sukses berjualan dari kami: jangan hanya fokus pada volume penjualan yang besar, tapi perhatikan juga kualitas profitmu. Kadang, menjual sedikit barang dengan margin yang sehat lebih baik daripada menjual banyak barang tapi keuntungannya habis dimakan biaya operasional. Selalu sisihkan sebagian keuntungan untuk pengembangan usaha atau dana cadangan bisnis. Ingat, bisnis yang langgeng adalah bisnis yang dikelola dengan data dan angka yang jujur, bukan sekadar perasaan atau perkiraan semata.

Teruslah berjuang dan semoga daganganmu laris manis! Kamu adalah penggerak roda ekonomi yang luar biasa. Jangan pernah lelah untuk belajar dan memperbaiki cara mengelola keuangan bisnismu. Kami di Kalkulator Warga merasa terhormat bisa menjadi bagian dari kesuksesanmu melalui alat hitung profit yang praktis ini. Semoga setiap transaksi yang kamu lakukan membawa keberkahan dan kemajuan bagi ekonomi keluargamu.`,
  category: 'Bisnis & Jualan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga Jual', 'sell-price', 'number', 'Contoh: 50.000');
    const { wrapper: mWrap, input: mInput } = createInput('Modal (HPP)', 'cost-price', 'number', 'Contoh: 35.000');
    const { wrapper: oWrap, input: oInput } = createInput('Biaya Operasional (Opsional)', 'ops-cost', 'number', '0');
    
    const calcBtn = createButton('Hitung Profit');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(mWrap);
    container.appendChild(oWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const sell = parseValue(hInput.value);
      const cost = parseValue(mInput.value);
      const ops = parseValue(oInput.value) || 0;
      
      if (sell > 0 && cost > 0) {
        const profit = sell - cost - ops;
        const margin = (profit / sell) * 100;
        
        resDisplay.innerHTML = `
          <div class="${profit >= 0 ? 'text-green-500' : 'text-red-500'}">${formatCurrency(profit)}</div>
          <div class="text-sm font-medium text-slate-500 mt-1">Margin: ${margin.toFixed(2)}%</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; mInput.value = ''; oInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default profitJualan;
