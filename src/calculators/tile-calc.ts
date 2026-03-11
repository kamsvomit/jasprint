import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Keramik',
  id: 'tile-calc',
  description: 'Hitung berapa banyak keramik yang Anda butuhkan untuk lantai atau dinding.',
  longDescription: `Halo, para pemilik rumah yang sedang merencanakan renovasi dan pengelola pembangunan yang teliti! Memasang keramik baru pada lantai atau dinding adalah cara yang luar biasa untuk meningkatkan estetika dan nilai hunianmu. Namun, salah satu tantangan terbesar adalah menghitung jumlah keping keramik yang tepat agar tidak kurang saat pengerjaan berlangsung, namun juga tidak terlalu banyak hingga menjadi pemborosan. Kalkulator Keramik ini kami buat khusus untuk membantumu merencanakan kebutuhan material dengan lebih presisi dan efisien.

Cara kerja alat hitung kebutuhan keramik online ini sangat membantu dalam perencanaan anggaran renovasimu. Kamu cukup memasukkan luas area yang akan dipasangi keramik (lebar dan panjang area) serta ukuran keramik yang kamu pilih (misalnya 40x40 cm atau 60x60 cm). Alat ini akan menghitung estimasi jumlah keping keramik yang kamu butuhkan, lengkap dengan tambahan 10% untuk cadangan sisa potongan (wastage). Dengan angka ini, kamu bisa membeli material dengan lebih tenang dan memastikan pengerjaan di rumahmu berjalan lancar tanpa hambatan kekurangan bahan.

Tips pemasangan keramik dari kami: selalu beli keramik dari batch produksi yang sama untuk memastikan warna dan teksturnya benar-benar seragam. Simpanlah beberapa keping keramik sisa sebagai cadangan jika di masa depan ada keramik yang pecah atau perlu diganti, karena model keramik yang sama mungkin sulit ditemukan beberapa tahun kemudian. Perencanaan yang matang adalah kunci dari hasil renovasi yang rapi dan memuaskan. Rumah yang indah dimulai dari perhitungan yang benar.

Semoga kalkulator kebutuhan keramik ini mempermudah langkahmu dalam mempercantik hunian. Kami di Kalkulator Warga senang bisa membantu setiap keluarga Indonesia dalam mengelola proyek renovasi mandiri mereka dengan lebih mudah. Jangan biarkan urusan teknis menghambat impianmu untuk memiliki rumah yang nyaman. Teruslah membangun, ciptakan suasana rumah yang kamu idamkan, dan kami selalu siap mendukung setiap detail pembangunanmu melalui alat hitung yang praktis ini. Selamat merenovasi!`,
  category: 'Rumah',
  render(container) {
    const { wrapper: awWrap, input: awInput } = createInput('Lebar Area (m)', 'awidth', 'number');
    const { wrapper: ahWrap, input: ahInput } = createInput('Tinggi/Panjang Area (m)', 'aheight', 'number');
    const { wrapper: twWrap, input: twInput } = createInput('Lebar Keramik (cm)', 'twidth', 'number', '30');
    const { wrapper: thWrap, input: thInput } = createInput('Tinggi Keramik (cm)', 'theight', 'number', '30');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(awWrap);
    container.appendChild(ahWrap);
    container.appendChild(twWrap);
    container.appendChild(thWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const aw = parseFloat(awInput.value);
      const ah = parseFloat(ahInput.value);
      const tw = parseFloat(twInput.value) / 100;
      const th = parseFloat(thInput.value) / 100;
      
      if (aw > 0 && ah > 0 && tw > 0 && th > 0) {
        const area = aw * ah;
        const tileArea = tw * th;
        const tiles = area / tileArea;
        resDisplay.textContent = `${Math.ceil(tiles * 1.1)} Keramik (termasuk 10% sisa)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      awInput.value = ''; ahInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
