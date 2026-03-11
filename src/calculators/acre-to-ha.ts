import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Akre ke Hektar',
  id: 'acre-to-ha',
  description: 'Konversi akre ke hektar.',
  longDescription: `Halo, kamu yang lagi berkutat dengan urusan lahan, properti, atau mungkin lagi riset beli tanah pertanian. Kami tahu, urusan konversi satuan luas tanah itu sering bikin kepala pusing—terutama kalau kamu terbiasa pakai hektar tapi tiba-tiba ketemu dokumen atau listing yang pakai satuan akre. Jangan khawatir, kamu tidak sendirian. Banyak sekali orang Indonesia yang menghadapi kebingungan yang sama, terutama saat berhadapan dengan data dari sistem properti internasional atau dokumen impor. Kalkulator Akre ke Hektar ini hadir untuk menghapus kebingungan itu selamanya.

Cara menggunakannya gampang banget. Cukup masukkan angka luas lahan dalam satuan akre, lalu klik tombol Konversi. Secara teknis, 1 akre setara dengan 0,404686 hektar. Jadi jika kamu punya lahan seluas 5 akre, maka luasnya adalah sekitar 2,02 hektar. Satuan akre sendiri umum dipakai di negara-negara seperti Amerika Serikat dan Inggris, sementara hektar adalah satuan yang lebih familiar dan resmi digunakan di Indonesia. Alat konversi akre ke hektar ini memastikan hasil yang akurat dan instan, tanpa perlu repot menghitung manual atau mencari-cari rumus konversi di internet.

Tips berguna buat kamu: kalau kamu sedang dalam proses jual beli tanah atau lahan pertanian, pastikan kamu selalu mengkonfirmasi satuan yang digunakan dalam sertifikat atau dokumen resmi. Di Indonesia, BPN (Badan Pertanahan Nasional) umumnya menggunakan satuan meter persegi atau hektar. Selain itu, 1 hektar sama dengan 10.000 meter persegi, jadi setelah mengkonversi akre ke hektar, kamu bisa mudah menghitung ke satuan lainnya juga. Pengetahuan ini sangat berguna, terutama kalau kamu seorang petani, investor properti, atau pekerja di bidang perkebunan dan kehutanan.

Semoga kalkulator konversi satuan luas ini bisa memperlancar urusanmu ya! Entah itu untuk keperluan pertanian, perkebunan sawit, properti, atau sekadar tugas sekolah dan kuliah—kami di Kalkulator Warga senang bisa membantu. Bookmark halaman ini biar kamu gak perlu cari-cari lagi setiap kali butuh konversi akre ke hektar. Karena satu langkah kecil dalam urusan tanah, bisa berdampak besar untuk masa depanmu.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Akre', 'acres', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const acre = parseFloat(aInput.value);
      if (!isNaN(acre)) {
        const ha = acre * 0.404686;
        resDisplay.textContent = `${ha.toFixed(2)} Hektar`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};