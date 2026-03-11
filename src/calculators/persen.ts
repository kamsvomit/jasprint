import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue, setupEnterKeyNavigation } from '../utils';

export const persen: Calculator = {
  id: 'persen',
  name: 'Persen',
  description: 'Hitung nilai persentase dari suatu angka.',
  longDescription: `Halo, teman-teman pembelajar dan pejuang angka! Kami tahu bahwa matematika seringkali terasa seperti bahasa asing yang membingungkan, terutama saat kita berhadapan dengan konsep persentase dalam kehidupan sehari-hari. Entah itu saat menghitung kenaikan harga, pembagian keuntungan, atau sekadar ingin tahu berapa porsi dari sesuatu, Kalkulator Persen ini hadir sebagai asisten setiamu. Kami ingin memudahkanmu agar tidak perlu lagi pusing dengan rumus pembagian dan perkalian manual yang rawan kesalahan.

Cara kerja alat ini sangat mendasar namun sangat fungsional. Kamu hanya perlu memasukkan angka persentase yang diinginkan dan nilai total dari angka tersebut. Secara matematis, alat ini akan membagi persentase dengan 100 lalu mengalikannya dengan nilai total. Hasilnya akan muncul secara instan, memberikanmu jawaban pasti tanpa perlu menebak-nebak. Ini adalah alat esensial bagi siapa saja, mulai dari pelajar, pedagang, hingga ibu rumah tangga yang sedang mengatur anggaran.

Tips dari kami: memahami persentase adalah kunci untuk literasi keuangan yang lebih baik. Misalnya, jika kamu tahu bahwa 10% dari pendapatanmu harus ditabung, alat ini akan membantumu menentukan nominal pastinya dengan cepat. Jangan biarkan angka-angka besar membuatmu merasa kewalahan. Dengan memecahnya menjadi persentase yang lebih kecil, segala sesuatunya akan terasa lebih terukur dan mudah dikelola.

Tetap semangat dalam mengelola setiap angka dalam hidupmu! Kami percaya bahwa dengan alat yang tepat, setiap orang bisa menjadi lebih cerdas dalam mengambil keputusan. Jangan ragu untuk menggunakan kalkulator ini kapan pun kamu merasa ragu dengan perhitunganmu. Kami di Kalkulator Warga berkomitmen untuk terus menyediakan alat bantu yang sederhana namun berdampak besar bagi kemudahan hidupmu sehari-hari.`,
  category: 'Matematika & Umum',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Persen (%)', 'percent', 'number');
    const { wrapper: vWrap, input: vInput } = createInput('Dari Nilai', 'val', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(vWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(pInput.value);
      const v = parseValue(vInput.value);
      
      if (!pInput.value || !vInput.value) {
        showError('Harap masukkan persentase dan nilai angka.');
        return;
      }

      if (!isNaN(p) && !isNaN(v)) {
        const res = (p / 100) * v;
        showResult(res.toLocaleString('id-ID'));
      } else {
        showError('Masukkan angka yang valid.');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; vInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default persen;
