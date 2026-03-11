import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kebutuhan Air',
  id: 'water-intake',
  description: 'Hitung berapa banyak air yang harus Anda minum setiap hari berdasarkan berat badan.',
  longDescription: `Halo, teman-masing pejuang kesehatan! Seringkali kita merasa lemas, pusing, atau sulit berkonsentrasi saat bekerja, padahal mungkin tubuh kita hanya sedang "berteriak" meminta air. Menjaga hidrasi tubuh adalah salah satu cara paling sederhana namun paling efektif untuk menjaga kesehatan jangka panjang. Kita semua tahu anjuran minum 8 gelas sehari, tapi tahukah kamu bahwa kebutuhan air setiap orang sebenarnya berbeda-beda tergantung pada berat badannya? Kalkulator Kebutuhan Air Harian ini kami buat untuk membantumu menemukan jumlah asupan air yang tepat agar tubuhmu tetap segar dan berfungsi optimal.

Cara kerja alat hitung air minum online ini sangat praktis. Kamu hanya perlu memasukkan berat badanmu dalam kilogram. Alat ini akan menggunakan rumus standar kesehatan (sekitar 33ml per kg berat badan) untuk menghitung berapa liter air yang harus kamu konsumsi setiap harinya. Dengan angka yang spesifik ini, kamu tidak lagi menebak-nebak apakah kamu sudah cukup minum atau belum. Hidrasi yang cukup sangat penting untuk melancarkan pencernaan, menjaga kesehatan kulit, hingga membantu proses detoksifikasi alami tubuhmu.

Tips dari kami untuk menjaga hidrasi: jangan menunggu haus untuk minum. Haus adalah tanda bahwa tubuhmu sudah mulai mengalami dehidrasi. Cobalah untuk selalu membawa botol minum saat beraktivitas dan minumlah sedikit demi sedikit secara rutin sepanjang hari. Jika kamu sering lupa, kamu bisa menggunakan aplikasi pengingat minum atau menandai botol minummu dengan target waktu. Ingatlah bahwa air putih adalah minuman terbaik bagi tubuhmu, jauh lebih sehat daripada minuman manis atau bersoda yang justru bisa menambah beban kerja ginjalmu.

Semoga kalkulator hidrasi harian ini membantumu menjadi pribadi yang lebih sehat dan bugar. Kami di Kalkulator Warga percaya bahwa kesehatan adalah modal utama untuk bisa terus berjuang mencari nafkah dan membahagiakan orang-orang tersayang. Jangan sepelekan segelas air putih, karena itu adalah investasi termurah untuk masa depan kesehatanmu. Tetap semangat, jaga pola hidup sehat, dan mari kita mulai hari ini dengan segelas air putih yang menyegarkan. Kami selalu siap mendukung setiap langkah kecilmu menuju hidup yang lebih berkualitas.`,
  category: 'Kesehatan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    
    const calcBtn = createButton('Hitung Kebutuhan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const weight = parseValue(wInput.value);
      if (weight > 0) {
        const liters = weight * 0.033;
        resDisplay.textContent = `${liters.toFixed(1)} Liter / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
