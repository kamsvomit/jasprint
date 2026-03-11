import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator ROI',
  id: 'roi-calc',
  description: 'Hitung Return on Investment (ROI) untuk investasi Anda.',
  longDescription: `Halo, para investor cerdas dan pelaku bisnis! Dalam dunia keuangan, pertanyaan yang paling sering muncul adalah: "Apakah investasi ini menguntungkan?" Untuk menjawabnya, kamu butuh sebuah metrik yang jelas dan terukur, yaitu ROI atau Return on Investment. ROI adalah persentase keuntungan atau kerugian yang dihasilkan dari sebuah investasi dibandingkan dengan biaya awalnya. Kalkulator ROI online ini kami hadirkan untuk membantumu mengevaluasi performa investasimu secara cepat, akurat, dan tanpa ribet.

Cara kerja alat hitung keuntungan investasi ini sangat esensial bagi setiap pengelola keuangan. Kamu hanya perlu memasukkan jumlah investasi awal (modal) yang kamu keluarkan dan nilai akhir (hasil) yang kamu terima dari investasi tersebut. Alat ini akan menghitung selisihnya dan menyajikannya dalam bentuk persentase. Jika hasilnya positif, berarti investasimu menguntungkan; jika negatif, berarti kamu mengalami kerugian. Dengan angka ROI yang jelas, kamu bisa membandingkan berbagai peluang investasi dan memilih mana yang memberikan hasil paling optimal bagi pertumbuhan kekayaanmu.

Tips dari kami untuk evaluasi investasi: jangan hanya terpaku pada angka ROI yang tinggi. Perhatikan juga faktor risiko dan jangka waktu investasi tersebut. Investasi dengan ROI tinggi seringkali disertai dengan risiko yang juga tinggi. Selain itu, ROI tidak mempertimbangkan nilai waktu dari uang (time value of money), jadi pastikan kamu juga melihat metrik lain seperti IRR (Internal Rate of Return) jika investasimu bersifat jangka panjang. Menjadi investor yang bijak berarti memahami angka-angka di balik setiap keputusan yang kamu ambil.

Semoga kalkulator efisiensi investasi ini membantu kesuksesan finansialmu. Kami di Kalkulator Warga ingin setiap warga Indonesia memiliki kemampuan untuk menganalisis keuangan mereka sendiri dengan cara yang paling sederhana namun efektif. Jangan biarkan modalmu terbuang percuma tanpa perhitungan yang matang. Teruslah belajar, berinvestasi dengan cerdas, dan biarkan uangmu bekerja keras untuk masa depanmu. Kami selalu siap mendukung setiap langkah strategis dalam perjalanan bisnismu.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: iWrap, input: iInput } = createInput('Investasi Awal', 'invested', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Nilai Akhir', 'returned', 'number');
    
    const calcBtn = createButton('Hitung ROI', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(iWrap);
    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const invested = parseValue(iInput.value);
      const returned = parseValue(rInput.value);
      if (invested > 0) {
        const roi = ((returned - invested) / invested) * 100;
        resDisplay.textContent = `${roi.toFixed(2)}%`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      iInput.value = ''; rInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
