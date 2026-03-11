import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Cup ke ML',
  id: 'cup-to-ml',
  description: 'Konversi cup (US) ke mililiter.',
  longDescription: `Halo, kamu yang lagi di dapur dengan resep di tangan tapi bingung karena satuannya "cup" sementara gelas takarmu hanya ada skala mililiter. Masalah klasik yang hampir semua orang pernah alami, terutama dengan semakin banyaknya resep dari luar negeri yang beredar di internet dan media sosial. Tidak perlu frustrasi—Kalkulator Cup ke ML ini hadir tepat untuk situasi seperti ini, memberikanmu konversi yang akurat dalam hitungan detik sehingga masakan atau minumanmu bisa segera dilanjutkan.

Cara pakainya tidak bisa lebih mudah dari ini. Masukkan jumlah cup yang tertera di resepmu, klik Konversi, dan langsung dapatkan hasilnya dalam mililiter. Secara teknis, 1 Cup standar Amerika Serikat (US Cup) setara dengan 236,588 mililiter—atau dibulatkan menjadi sekitar 237 ml untuk keperluan praktis dapur. Jadi 2 cup = ±473 ml, 0,5 cup = ±118 ml, dan seterusnya. Perlu diketahui juga bahwa ada perbedaan antara US Cup (236 ml), Metric Cup yang dipakai di Australia dan Kanada (250 ml), dan Imperial Cup yang lebih jarang digunakan. Alat ini menggunakan standar US Cup yang paling umum dipakai dalam resep-resep populer di internet.

Konversi cup ke mililiter paling sering dibutuhkan saat memasak atau membuat minuman mengikuti resep berbahasa Inggris. Misalnya resep smoothie, kue, pancake, saus, sup, atau minuman kopi specialty yang sering menggunakan cup sebagai satuan. Selain itu, dalam dunia baking khususnya, memahami konversi ini sangat penting karena proporsi cairan mempengaruhi tekstur akhir produk. Terlalu banyak atau terlalu sedikit cairan bisa mengubah roti yang seharusnya empuk menjadi keras, atau kue yang seharusnya lembab menjadi kering. Dengan konversi yang tepat, eksperimen masakmu akan jauh lebih berhasil.

Semoga kalkulator konversi satuan masak ini bisa jadi asisten setiamu di dapur! Kami di Kalkulator Warga percaya bahwa memasak seharusnya jadi aktivitas yang menyenangkan dan memuaskan—bukan penuh frustrasi akibat kebingungan satuan. Eksplorasi terus berbagai resep baru dari seluruh dunia, dan jangan biarkan perbedaan satuan menjadi penghalang kreativitas kulinermu. Selamat memasak, dan semoga hasilnya selalu lezat!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Cup', 'cups', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cup = parseFloat(cInput.value);
      if (!isNaN(cup)) {
        const ml = cup * 236.588;
        resDisplay.textContent = `${ml.toFixed(0)} ml`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};