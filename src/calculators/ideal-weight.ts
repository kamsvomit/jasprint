import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Berat Badan Ideal',
  id: 'ideal-weight',
  description: 'Hitung rentang berat badan ideal Anda berdasarkan tinggi badan.',
  longDescription: `Halo, teman-teman yang peduli dengan kesehatan! Seringkali kita merasa tidak percaya diri saat melihat angka di timbangan, padahal angka tersebut belum tentu mencerminkan kondisi kesehatan kita yang sebenarnya. Berat badan yang "ideal" bukan hanya soal penampilan, tapi lebih kepada menjaga keseimbangan agar tubuh kita bisa berfungsi dengan optimal dan terhindar dari risiko berbagai penyakit. Kalkulator Berat Badan Ideal ini kami sediakan sebagai panduan awal untuk membantumu menemukan rentang berat badan yang paling sehat bagi postur tubuhmu.

Alat ini menggunakan standar Indeks Massa Tubuh (IMT) atau BMI yang diakui secara internasional untuk menghitung rentang berat badan yang dianggap normal bagi tinggi badanmu. Kamu cukup memasukkan tinggi badan dalam sentimeter, dan kalkulator ini akan memberikan rentang berat badan minimum dan maksimum yang disarankan. Dengan mengetahui rentang ini, kamu bisa memiliki target yang lebih realistis dan sehat, bukan sekadar mengejar angka tertentu yang mungkin tidak sesuai dengan struktur tulang atau komposisi tubuhmu.

Tips dari kami: ingatlah bahwa berat badan ideal hanyalah salah satu indikator kesehatan. Komposisi tubuh, seperti rasio lemak dan otot, juga sangat penting. Seseorang yang rajin berolahraga mungkin memiliki berat badan di atas rentang ideal karena massa otot yang padat, namun tetap dalam kondisi yang sangat sehat. Jangan biarkan angka di timbangan mendikte kebahagiaanmu. Fokuslah pada kebiasaan makan yang bernutrisi, aktivitas fisik yang menyenangkan, dan istirahat yang cukup untuk mencapai kesejahteraan tubuh yang menyeluruh.

Tetaplah semangat dalam menjaga kesehatanmu! Kami di Kalkulator Warga percaya bahwa setiap tubuh itu indah dan berharga. Gunakan alat ini sebagai pengingat untuk selalu merawat diri dengan penuh kasih sayang. Kesehatan adalah perjalanan, bukan tujuan akhir, jadi nikmatilah setiap prosesnya dengan sabar dan konsisten. Semoga kamu selalu merasa bertenaga, percaya diri, dan bahagia dalam menjalani hari-hari dengan tubuh yang sehat dan bugar.`,
  category: 'Kesehatan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    
    const calcBtn = createButton('Hitung Berat Ideal', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const h = parseValue(hInput.value) / 100;
      if (h > 0) {
        const min = 18.5 * (h * h);
        const max = 24.9 * (h * h);
        resDisplay.textContent = `${min.toFixed(1)}kg - ${max.toFixed(1)}kg`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
