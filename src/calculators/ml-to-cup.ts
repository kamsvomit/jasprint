import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator ML ke Cup',
  id: 'ml-to-cup',
  description: 'Konversi mililiter ke cup (US).',
  longDescription: `Halo, para pecinta masak dan pembuat kue di rumah! Seringkali saat kita mencoba resep baru dari internet atau buku masak internasional, kita menemukan takaran bahan cair dalam satuan "cup". Sementara itu, gelas ukur yang kita miliki di dapur biasanya menggunakan satuan mililiter (ml). Kalkulator Konversi ML ke Cup ini kami buat khusus untuk membantumu mengubah takaran cairan dengan presisi, sehingga hasil masakan atau kuemu selalu pas dan lezat sesuai resep aslinya.

Cara kerja alat konversi takaran dapur online ini sangat memudahkan aktivitas memasakmu. Kamu hanya perlu memasukkan angka dalam mililiter, dan alat ini akan secara otomatis menghitung nilai setaranya dalam satuan cup standar US (sekitar 236,5 ml). Sangat berguna bagi kamu yang sedang membuat kue, memasak sup, atau sekadar ingin memastikan perbandingan bahan cair dalam masakanmu sudah benar. Kami ingin membantu menghilangkan keraguanmu di dapur agar proses memasak menjadi lebih menyenangkan dan bebas stres.

Tips sukses di dapur dari kami: untuk hasil kue yang sempurna, ketepatan takaran adalah segalanya. Gunakan gelas ukur yang standar dan pastikan kamu melihat skala ukur pada posisi mata yang sejajar untuk menghindari kesalahan baca. Memahami konversi satuan adalah keterampilan dasar yang sangat berharga bagi setiap koki rumah tangga. Dengan takaran yang tepat, kamu bisa lebih percaya diri dalam mencoba berbagai resep baru dan menyajikannya untuk orang-orang tersayang.

Semoga kalkulator konversi takaran ini bermanfaat untuk setiap kreasi kulinermu. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan dapur warga melalui alat bantu yang praktis dan akurat. Jangan biarkan perbedaan satuan menghambat bakat memasakmu. Teruslah berkreasi di dapur, sajikan hidangan yang penuh cinta, dan kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur dan membantu. Selamat memasak dan semoga hidanganmu selalu menggugah selera!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: mWrap, input: mInput } = createInput('Mililiter (ml)', 'ml', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const ml = parseFloat(mInput.value);
      if (!isNaN(ml)) {
        const cup = ml / 236.588;
        resDisplay.textContent = `${cup.toFixed(2)} Cup`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
