import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Masa Pensiun',
  id: 'retirement-age',
  description: 'Hitung berapa tahun lagi Anda akan pensiun.',
  longDescription: `Halo, para pejuang masa depan yang sedang meniti karier! Pernahkah kamu merasa lelah dengan rutinitas pekerjaan dan mulai membayangkan masa-masa santai di hari tua? Memikirkan masa pensiun bukan berarti kita malas bekerja, melainkan bentuk kesadaran untuk mempersiapkan fase hidup yang lebih tenang dan bahagia. Kalkulator Masa Pensiun online ini kami hadirkan untuk membantumu melihat sisa waktu produktifmu, sehingga kamu bisa merencanakan tabungan dan investasi dengan lebih matang mulai sekarang.

Cara kerja alat hitung sisa masa kerja ini sangat sederhana namun memberikan perspektif yang kuat. Kamu cukup memasukkan umurmu saat ini dan target umur di mana kamu ingin berhenti bekerja (pensiun). Alat ini akan menghitung berapa tahun lagi waktu yang kamu miliki untuk mengumpulkan pundi-pundi kekayaan. Dengan mengetahui sisa waktu ini, kamu bisa lebih bijak dalam mengatur prioritas keuangan, apakah harus lebih agresif dalam berinvestasi atau mulai membangun bisnis sampingan untuk bekal hari tua.

Tips dari kami untuk masa pensiun yang sejahtera: jangan menunggu usia tua untuk mulai menabung dana pensiun. Semakin dini kamu memulai, semakin besar manfaat bunga majemuk (compounding interest) yang akan kamu dapatkan. Manfaatkan program jaminan hari tua dari kantor atau mulai sisihkan minimal 10% dari penghasilan bulananmu ke instrumen investasi jangka panjang. Ingatlah bahwa pensiun bukan akhir dari segalanya, melainkan awal dari kebebasan untuk melakukan hal-hal yang benar-benar kamu cintai tanpa tekanan finansial.

Semoga kalkulator perencanaan pensiun ini memotivasimu untuk bekerja lebih giat dan menabung lebih cerdas. Kami di Kalkulator Warga ingin setiap warga Indonesia bisa menikmati masa tua dengan martabat dan kecukupan. Jangan biarkan masa depanmu menjadi misteri yang menakutkan; jadikan itu sebagai tujuan yang terencana dengan baik. Teruslah berkarya selagi muda, dan biarkan hasil jerih payahmu menjagamu di masa tua nanti. Kami selalu siap menemani setiap langkah perencanaan hidupmu.`,
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Umur Sekarang', 'age', 'number', 'Contoh: 30');
    const { wrapper: rWrap, input: rInput } = createInput('Target Umur Pensiun', 'target', 'number', '58');
    
    const calcBtn = createButton('Hitung', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const age = parseValue(aInput.value);
      const target = parseValue(rInput.value) || 58;
      if (age > 0 && target > age) {
        resDisplay.textContent = `${target - age} Tahun Lagi`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; rInput.value = '58';
      resWrap.classList.add('hidden');
    };
  }
};
