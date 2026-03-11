import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Lantai',
  id: 'flooring-calc',
  description: 'Hitung jumlah material lantai yang dibutuhkan untuk sebuah ruangan.',
  longDescription: `Halo, para pemilik rumah dan pengelola renovasi yang hebat! Mempercantik rumah dengan lantai baru, baik itu keramik, granit, parket, atau vinyl, adalah investasi yang memberikan kenyamanan dan keindahan bagi keluarga. Namun, salah satu tantangan terbesar adalah menghitung dengan tepat berapa banyak material yang harus beli agar tidak kurang di tengah jalan atau tidak tersisa terlalu banyak yang akhirnya terbuang percuma. Kalkulator Lantai ini kami buat khusus untuk membantumu merencanakan kebutuhan material dengan lebih presisi dan hemat biaya.

Cara kerja alat hitung kebutuhan lantai online ini sangat membantu dalam perencanaan anggaran. Kamu cukup memasukkan panjang dan lebar ruangan yang akan dipasang lantai, serta estimasi persentase sisa atau buangan (waste) untuk potongan di sudut-sudut ruangan (biasanya disarankan 10%). Alat ini akan menghitung total luas area yang harus ditutup. Dengan angka ini, kamu bisa lebih percaya diri saat berkonsultasi dengan toko bangunan atau tukang, sehingga kamu bisa menghindari pemborosan dana yang tidak perlu.

Tips cerdas dari kami untuk renovasi lantai: selalu beli sedikit lebih banyak dari luas bersih ruangan untuk cadangan jika ada material yang pecah atau salah potong. Simpanlah sisa material yang masih bagus sebagai cadangan di masa depan jika ada bagian lantai yang rusak dan perlu diganti, karena seringkali motif yang sama sulit ditemukan kembali di kemudian hari. Perencanaan yang matang adalah kunci renovasi yang sukses dan bebas stres. Rumah yang indah dimulai dari perhitungan yang benar.

Semoga kalkulator material lantai ini mempermudah langkahmu dalam mewujudkan rumah impian. Kami di Kalkulator Warga senang bisa membantu setiap keluarga Indonesia dalam mengelola proyek renovasi mereka dengan lebih mudah. Jangan biarkan urusan teknis menghambat kreativitasmu dalam menata rumah. Teruslah berkarya, ciptakan hunian yang nyaman bagi orang-orang tersayang, dan kami selalu siap mendukung setiap detail pembangunan rumahmu melalui alat hitung yang praktis ini.`,
  category: 'Rumah',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Panjang Ruangan (m)', 'length', 'number');
    const { wrapper: wWrap, input: wInput } = createInput('Lebar Ruangan (m)', 'width', 'number');
    const { wrapper: w2Wrap, input: w2Input } = createInput('Estimasi Sisa/Buang (%)', 'waste', 'number', '10');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(wWrap);
    container.appendChild(w2Wrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      const w = parseFloat(wInput.value);
      const waste = parseFloat(w2Input.value) || 10;
      
      if (l > 0 && w > 0) {
        const area = l * w;
        const total = area * (1 + waste / 100);
        resDisplay.textContent = `${total.toFixed(2)} m²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = ''; wInput.value = ''; w2Input.value = '10';
      resWrap.classList.add('hidden');
    };
  }
};
