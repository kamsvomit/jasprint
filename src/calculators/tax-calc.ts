import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pajak',
  id: 'tax-calc',
  description: 'Hitung jumlah pajak dan harga total setelah pajak.',
  longDescription: `Halo, para pejuang ekonomi dan pelaku usaha! Seringkali kita merasa bingung saat melihat label harga yang belum termasuk pajak, atau saat ingin menghitung berapa sebenarnya beban pajak dari sebuah transaksi. Entah itu untuk keperluan belanja pribadi, menghitung PPN (Pajak Pertambahan Nilai) untuk bisnis kecilmu, atau sekadar ingin tahu total biaya yang harus dikeluarkan, Kalkulator Pajak ini hadir sebagai solusi instan di genggamanmu. Kami ingin membantu kamu mengelola keuangan dengan lebih transparan dan tanpa kejutan di kasir.

Cara kerja alat hitung pajak online ini sangat fleksibel. Kamu hanya perlu memasukkan harga dasar atau harga sebelum pajak, lalu masukkan tarif pajak yang berlaku (misalnya 11% untuk PPN di Indonesia saat ini). Klik tombol hitung, dan dalam sekejap kamu akan mendapatkan rincian nilai pajak dalam rupiah serta total harga akhir yang harus dibayar. Alat ini sangat berguna bagi pemilik toko online, pembeli yang ingin membandingkan harga, atau siapa saja yang ingin melakukan perencanaan anggaran dengan lebih presisi.

Tips cerdas dari kami: selalu perhatikan apakah harga yang tertera di brosur atau website sudah termasuk pajak (nett) atau belum. Jika belum, gunakan kalkulator ini untuk melihat harga aslinya agar kamu tidak salah dalam mengalokasikan dana. Bagi kamu pelaku UMKM, transparansi dalam menghitung pajak juga akan meningkatkan kepercayaan pelangganmu. Ingat, ketaatan pada pajak adalah bagian dari kontribusi kita untuk pembangunan fasilitas umum yang kita nikmati bersama setiap hari.

Semoga kalkulator pajak sederhana ini bisa mempermudah urusan finansialmu sehari-hari. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat yang jujur dan membantu tanpa biaya apapun. Teruslah berkarya dan kembangkan bisnismu dengan perencanaan yang matang. Kami selalu siap mendukung setiap langkah kecilmu menuju kesuksesan finansial yang lebih baik dan terukur.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Sebelum Pajak', 'price', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tarif Pajak (%)', 'tax', 'number', 'Contoh: 11');
    
    const calcBtn = createButton('Hitung Total', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const taxRate = parseValue(tInput.value);
      if (price > 0 && taxRate >= 0) {
        const taxAmount = price * (taxRate / 100);
        const total = price + taxAmount;
        resDisplay.innerHTML = `
          <div>${formatCurrency(total)}</div>
          <div class="text-sm text-gray-500 mt-1">Pajak: ${formatCurrency(taxAmount)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
