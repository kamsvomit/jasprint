import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Cat',
  id: 'paint-calc',
  description: 'Hitung berapa banyak cat yang Anda butuhkan untuk sebuah ruangan.',
  longDescription: `Halo, para pemilik rumah yang kreatif dan pengelola renovasi yang hebat! Memberikan warna baru pada dinding ruangan adalah cara termudah dan paling efektif untuk menyegarkan suasana rumah. Namun, salah satu tantangan saat ingin mengecat sendiri adalah menghitung berapa banyak kaleng cat yang harus dibeli. Membeli terlalu sedikit akan menghambat pekerjaan, sementara membeli terlalu banyak adalah pemborosan biaya. Kalkulator Cat ini kami buat khusus untuk membantumu merencanakan kebutuhan cat dengan lebih presisi dan hemat.

Cara kerja alat hitung kebutuhan cat online ini sangat membantu dalam perencanaan anggaran renovasimu. Kamu cukup memasukkan lebar dan tinggi dinding, jumlah dinding yang akan dicat, serta daya sebar cat yang biasanya tertera pada kemasan (rata-rata 10-12 m² per liter). Alat ini akan menghitung estimasi total liter cat yang kamu butuhkan. Dengan angka ini, kamu bisa lebih percaya diri saat pergi ke toko bangunan dan menghindari pengeluaran yang tidak perlu untuk sisa cat yang akhirnya hanya akan mengering di gudang.

Tips mengecat dari kami: selalu bersihkan permukaan dinding dari debu dan kotoran sebelum mulai mengecat agar hasilnya halus dan tahan lama. Jika kamu ingin mengubah warna dinding dari gelap ke terang, mungkin kamu akan membutuhkan lapisan cat dasar (primer) atau jumlah lapisan cat yang lebih banyak. Perencanaan yang matang adalah kunci dari hasil pengecatan yang indah dan profesional. Rumah yang ceria dimulai dari pilihan warna dan perhitungan yang benar.

Semoga kalkulator kebutuhan cat ini mempermudah langkahmu dalam mempercantik hunian. Kami di Kalkulator Warga senang bisa membantu setiap keluarga Indonesia dalam mengelola proyek renovasi mandiri mereka dengan lebih mudah. Jangan biarkan urusan teknis menghambat kreativitasmu dalam menata rumah. Teruslah berkarya, ciptakan suasana rumah yang nyaman dan penuh warna, dan kami selalu siap mendukung setiap detail pembangunanmu melalui alat hitung yang praktis ini.`,
  category: 'Rumah',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Lebar Dinding (m)', 'width', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Dinding (m)', 'height', 'number');
    const { wrapper: nWrap, input: nInput } = createInput('Jumlah Dinding', 'walls', 'number', '4');
    const { wrapper: cWrap, input: cInput } = createInput('Daya Sebar (m² per liter)', 'cov', 'number', '10');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(nWrap);
    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const h = parseFloat(hInput.value);
      const n = parseFloat(nInput.value) || 4;
      const cov = parseFloat(cInput.value) || 10;
      
      if (w > 0 && h > 0) {
        const totalArea = w * h * n;
        const liters = totalArea / cov;
        resDisplay.textContent = `${liters.toFixed(1)} Liter`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = ''; nInput.value = '4'; cInput.value = '10';
      resWrap.classList.add('hidden');
    };
  }
};
