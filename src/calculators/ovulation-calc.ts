import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Masa Subur',
  id: 'ovulation-calc',
  description: 'Estimasi masa subur Anda berdasarkan siklus menstruasi.',
  longDescription: `Halo, para wanita yang sedang merencanakan masa depan! Memahami siklus tubuh sendiri adalah bentuk kepedulian yang luar biasa terhadap kesehatan reproduksi. Baik kamu sedang merencanakan kehamilan atau sekadar ingin lebih mengenal ritme biologismu, mengetahui kapan masa subur terjadi adalah informasi yang sangat berharga. Kalkulator Masa Subur ini kami rancang untuk membantumu memetakan siklus bulananmu dengan lebih mudah dan informatif, sehingga kamu bisa mengambil keputusan yang tepat bagi kesehatanmu.

Alat ini bekerja dengan menghitung estimasi hari ovulasi berdasarkan hari pertama haid terakhir dan rata-rata panjang siklus menstruasimu. Secara umum, ovulasi terjadi sekitar 14 hari sebelum periode haid berikutnya dimulai. Dengan memasukkan data tersebut, kalkulator ini akan memberikan perkiraan tanggal di mana peluang pembuahan paling tinggi. Ini adalah cara yang praktis untuk memantau siklusmu tanpa harus mencatat secara manual yang seringkali membingungkan.

Tips dari kami untuk kesehatan reproduksi: ingatlah bahwa tubuh kita bukanlah mesin yang selalu bekerja dengan presisi yang sama setiap bulannya. Faktor stres, pola makan, kelelahan, hingga kondisi kesehatan bisa mempengaruhi panjang siklus menstruasi. Gunakan hasil dari kalkulator ini sebagai estimasi, dan perhatikan juga sinyal-sinyal alami dari tubuhmu seperti perubahan suhu basal atau tekstur cairan serviks. Menjaga gaya hidup sehat dengan nutrisi seimbang dan olahraga teratur sangat mendukung keteraturan siklusmu.

Semoga informasi ini membantumu merasa lebih percaya diri dan terhubung dengan tubuhmu sendiri! Kami di Kalkulator Warga sangat menghargai setiap upaya wanita dalam menjaga kesehatan dan merencanakan kehidupannya dengan bijak. Jangan ragu untuk berkonsultasi dengan dokter spesialis jika kamu merasa ada ketidakteraturan yang mengkhawatirkan pada siklusmu. Tetaplah sehat, tetaplah bahagia, dan jadikan pemahaman akan diri sendiri sebagai kekuatan untuk menjalani hari-hari dengan lebih tenang dan terencana.`,
  category: 'Kesehatan',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Hari Pertama Haid Terakhir', 'last', 'date');
    const { wrapper: sWrap, input: sInput } = createInput('Panjang Siklus (Hari)', 'cycle', 'number', 'Contoh: 28');
    
    const calcBtn = createButton('Hitung Masa Subur', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(sWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const last = new Date(dInput.value);
      const cycle = parseInt(sInput.value) || 28;
      if (!isNaN(last.getTime())) {
        const ovulation = new Date(last.getTime() + (cycle - 14) * 24 * 60 * 60 * 1000);
        resDisplay.textContent = ovulation.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; sInput.value = '28';
      resWrap.classList.add('hidden');
    };
  }
};
