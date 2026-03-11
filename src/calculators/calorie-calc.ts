import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kalori',
  id: 'calorie-calc',
  description: 'Hitung kebutuhan kalori harian Anda untuk menjaga berat badan.',
  longDescription: `Halo, para pejuang gaya hidup sehat! Mengatur pola makan seringkali terasa seperti teka-teki yang sulit dipecahkan. Kita sering mendengar tentang "kalori masuk vs kalori keluar", tapi berapa sebenarnya angka yang pas untuk tubuhmu sendiri? Kalkulator Kalori ini kami hadirkan sebagai kompas pribadimu dalam menavigasi dunia nutrisi, membantu kamu memahami berapa banyak energi yang benar-benar dibutuhkan tubuhmu untuk menjalankan aktivitas sehari-hari dengan optimal.

Alat ini menghitung estimasi kebutuhan kalori harianmu berdasarkan data fisik dasar seperti berat badan, tinggi badan, dan usia. Angka yang dihasilkan adalah perkiraan energi yang kamu perlukan untuk mempertahankan berat badanmu saat ini dengan tingkat aktivitas yang ringan. Dengan mengetahui angka dasar ini, kamu bisa lebih bijak dalam memilih porsi makanan dan menyusun menu harian yang seimbang, tanpa harus merasa tersiksa karena kekurangan energi atau merasa bersalah karena kelebihan asupan.

Tips nutrisi dari kami: jangan hanya terpaku pada jumlah kalori, tapi perhatikan juga kualitas sumber kalorinya. Pilihlah makanan utuh (whole foods) yang kaya serat, protein, dan lemak sehat daripada makanan olahan yang tinggi gula. Ingatlah bahwa kebutuhan kalori setiap orang bisa berubah-ubah tergantung pada intensitas aktivitas, kondisi kesehatan, dan metabolisme individu. Gunakan angka ini sebagai referensi awal, dan dengarkanlah sinyal lapar serta kenyang yang diberikan oleh tubuhmu sendiri.

Semoga perjalananmu menuju hidup yang lebih sehat semakin lancar dan menyenangkan! Kami di Kalkulator Warga percaya bahwa setiap orang berhak memiliki tubuh yang bertenaga dan sehat. Jangan jadikan hitungan kalori sebagai beban pikiran, melainkan sebagai alat bantu untuk lebih mengenal dan mencintai tubuhmu. Tetaplah aktif, tetaplah bahagia, dan nikmatilah setiap suapan makananmu dengan penuh kesadaran dan rasa syukur.`,
  category: 'Kesehatan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    const { wrapper: aWrap, input: aInput } = createInput('Umur', 'age', 'number');
    
    const calcBtn = createButton('Hitung Kalori', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseValue(wInput.value);
      const h = parseValue(hInput.value);
      const a = parseValue(aInput.value);
      if (w > 0 && h > 0 && a > 0) {
        const bmr = 10 * w + 6.25 * h - 5 * a + 5;
        resDisplay.textContent = `${Math.round(bmr * 1.2)} kkal / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = ''; aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
