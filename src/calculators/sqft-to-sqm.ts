import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator ft² ke m²',
  id: 'sqft-to-sqm',
  description: 'Konversi kaki persegi (ft²) ke meter persegi (m²).',
  longDescription: `Halo, para pemilik properti, desainer interior, dan siapapun yang sedang berurusan dengan pengukuran luas bangunan! Saat kita membaca spesifikasi properti dari luar negeri atau melihat katalog furnitur internasional, satuan "kaki persegi" atau Square Feet (ft²) seringkali muncul. Di Indonesia, kita jauh lebih terbiasa menggunakan Meter Persegi (m²). Kalkulator Konversi ft² ke m² ini hadir untuk membantumu memahami luas area dengan lebih mudah, cepat, dan akurat.

Cara kerja alat konversi luas online ini sangat praktis untuk berbagai keperluan properti dan desainmu. Kamu cukup memasukkan angka dalam satuan kaki persegi (ft²), dan alat ini akan secara otomatis menghitung nilai setaranya dalam meter persegi (m²). Sangat berguna bagi kamu yang sedang membandingkan harga sewa apartemen di luar negeri, menghitung luas ruangan untuk renovasi, atau sekadar ingin tahu seberapa luas sebenarnya bidang yang sedang kamu bicarakan. Kami ingin memastikan perbedaan sistem satuan tidak lagi menjadi kendala dalam perencanaanmu.

Tips pengukuran properti dari kami: selalu pastikan kamu memiliki data luas yang akurat sebelum membeli material bangunan atau furnitur besar. Ingatlah bahwa 1 meter persegi itu setara dengan sekitar 10,76 kaki persegi. Memahami konversi ini akan membantumu berkomunikasi lebih baik dengan kontraktor atau penjual properti internasional. Ketelitian dalam memahami luas area adalah langkah awal dari penataan ruang yang efisien dan nyaman.

Semoga kalkulator konversi luas sederhana ini bermanfaat untuk setiap proyek properti dan desainmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang memudahkan urusan harian warga tanpa biaya apapun. Teruslah berencana dan wujudkan hunian impianmu dengan perhitungan yang tepat. Kami selalu siap mendukung setiap aktivitasmu melalui alat hitung yang praktis, jujur, dan akurat. Selamat merencanakan ruanganmu!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: fWrap, input: fInput } = createInput('Kaki persegi (ft²)', 'sqft', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(fWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const sqft = parseFloat(fInput.value);
      if (!isNaN(sqft)) {
        const sqm = sqft / 10.7639;
        resDisplay.textContent = `${sqm.toFixed(2)} m²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      fInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
