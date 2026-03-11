import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Harga Per Unit',
  id: 'unit-price-id',
  description: 'Bandingkan nilai barang dengan menghitung harga per unit atau berat.',
  longDescription: `Halo, para konsumen cerdas dan pengusaha yang teliti! Dalam dunia perdagangan, harga label seringkali tidak menceritakan keseluruhan cerita. Apakah harga Rp15.000 untuk 250 gram kopi lebih murah daripada Rp50.000 untuk 1 kilogram? Tanpa menghitung harga per satuannya, kita seringkali sulit menentukan nilai sebenarnya dari sebuah barang. Kalkulator Harga Per Unit ini hadir untuk membantumu membedah harga dan menemukan nilai ekonomi yang sesungguhnya dari setiap produk yang kamu beli atau jual.

Cara kerja alat hitung harga satuan online ini sangat praktis untuk berbagai keperluan belanja dan bisnis. Kamu cukup memasukkan total harga barang dan jumlah atau beratnya. Alat ini akan secara otomatis menghitung berapa harga yang kamu bayar untuk setiap satu unit (gram, mililiter, keping, dll). Sangat berguna bagi ibu rumah tangga yang ingin menghemat belanja bulanan, pedagang yang ingin menentukan harga jual kembali, atau siapapun yang ingin memastikan mereka mendapatkan penawaran terbaik. Kami ingin transparansi harga menjadi bagian dari setiap keputusan finansialmu.

Tips manajemen keuangan dari kami: biasakan untuk selalu mengecek harga per unit sebelum memutuskan membeli barang dalam jumlah banyak. Pengetahuan ini akan melindungimu dari strategi harga yang terkadang membingungkan konsumen. Selain itu, bagi para pelaku UMKM, menghitung harga per unit adalah langkah awal yang krusial dalam menentukan margin keuntungan yang sehat. Ketelitian dalam angka adalah fondasi dari pengelolaan uang yang sukses, baik untuk skala rumah tangga maupun bisnis.

Semoga kalkulator harga per unit sederhana ini bermanfaat untuk setiap aktivitas ekonomi dan belanjamu. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan warga melalui alat bantu yang praktis dan akurat. Jangan biarkan angka-angka di label harga membingungkanmu. Teruslah menjadi konsumen yang cerdas, kelola bisnismu dengan presisi, dan kami selalu siap mendukung setiap langkah finansialmu melalui alat hitung yang jujur dan membantu. Selamat menghitung dan berbelanja dengan bijak!`,
  category: 'Belanja',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Total Harga', 'price', 'number');
    const { wrapper: qWrap, input: qInput } = createInput('Jumlah/Berat', 'qty', 'number');
    
    const calcBtn = createButton('Hitung', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(qWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const qty = parseValue(qInput.value);
      if (price >= 0 && qty > 0) {
        const unitPrice = price / qty;
        resDisplay.textContent = `${unitPrice.toFixed(2)} per unit`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; qInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
