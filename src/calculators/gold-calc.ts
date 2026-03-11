import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Harga Emas',
  id: 'gold-calc',
  description: 'Hitung nilai emas berdasarkan berat dan harga pasar.',
  longDescription: `Halo, para investor emas dan pecinta logam mulia! Emas telah lama menjadi instrumen investasi favorit bagi keluarga Indonesia karena sifatnya yang tahan terhadap inflasi (safe haven) dan mudah untuk dicairkan saat dibutuhkan. Namun, seringkali kita merasa bingung saat ingin menghitung berapa sebenarnya nilai emas yang kita miliki di rumah atau saat ingin membelinya di toko emas. Kalkulator Harga Emas online ini kami hadirkan untuk membantumu mengetahui nilai aset emasmu secara instan dan akurat sesuai dengan harga pasar terkini.

Cara menggunakan alat hitung nilai emas ini sangat praktis. Kamu hanya perlu memasukkan berat emas yang kamu miliki dalam gram (misalnya 5 gram, 10 gram, atau 100 gram), kemudian masukkan harga emas per gram saat ini (misalnya harga emas Antam atau harga emas lokal di daerahmu). Klik tombol hitung, dan dalam sekejap kamu akan mendapatkan total nilai rupiah dari emasmu. Alat ini sangat berguna bagi kamu yang ingin memantau perkembangan nilai investasi emasmu secara rutin atau saat ingin merencanakan penjualan emas untuk kebutuhan mendesak.

Tips berharga dari kami untuk investasi emasmu: selalu pantau harga emas secara berkala karena harga emas dunia dan lokal bisa berubah setiap harinya. Jika kamu berinvestasi emas batangan, pastikan kamu menyimpannya di tempat yang aman dan memiliki sertifikat yang sah agar nilai jualnya tetap tinggi. Ingatlah bahwa emas adalah investasi jangka panjang yang sangat baik untuk menjaga nilai kekayaanmu. Jangan terburu-buru menjual saat harga turun sedikit, karena secara historis harga emas cenderung naik dalam jangka waktu yang lama.

Semoga kalkulator investasi emas ini mempermudah langkahmu dalam mengelola aset berharga. Kami di Kalkulator Warga ingin membantu setiap warga Indonesia agar lebih melek investasi dan memiliki perencanaan keuangan yang kokoh. Emas adalah simbol kemakmuran dan keamanan finansial, dan kami senang bisa menjadi teman setiamu dalam memantau pertumbuhan asetmu. Teruslah menabung emas sedikit demi sedikit, karena bukit emas yang besar dimulai dari butiran gram yang kecil.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Emas (gram)', 'weight', 'number');
    const { wrapper: pWrap, input: pInput } = createInput('Harga per Gram (Rp)', 'price', 'number', '1000000');
    
    const calcBtn = createButton('Hitung Nilai', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const weight = parseValue(wInput.value);
      const price = parseValue(pInput.value) || 1000000;
      if (weight > 0) {
        const total = weight * price;
        resDisplay.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; pInput.value = '1000000';
      resWrap.classList.add('hidden');
    };
  }
};
