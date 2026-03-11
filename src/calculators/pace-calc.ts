import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pace Lari',
  id: 'pace-calc',
  description: 'Hitung pace lari Anda berdasarkan jarak dan waktu.',
  longDescription: `Halo, para pelari tangguh dan pejuang gaya hidup aktif! Dalam dunia lari, "pace" atau kecepatan rata-rata per kilometer adalah indikator yang sangat penting untuk memantau performa dan progres latihanmu. Baik kamu seorang pemula yang baru memulai jogging atau pelari maraton yang sedang mengejar target waktu pribadi (PB), mengetahui pace lari sangat membantumu dalam mengatur strategi latihan yang lebih efektif. Kalkulator Pace Lari ini kami sediakan untuk membantumu menghitung kecepatan lari dengan mudah dan akurat.

Cara kerja alat hitung pace lari online ini sangat praktis untuk setiap sesi latihanmu. Kamu cukup memasukkan jarak yang telah kamu tempuh (dalam kilometer) dan total waktu yang kamu habiskan (dalam format jam:menit:detik). Alat ini akan secara otomatis menghitung berapa menit waktu yang kamu butuhkan untuk menempuh setiap satu kilometer. Dengan mengetahui pace-mu, kamu bisa menentukan apakah intensitas latihanmu sudah sesuai dengan target, atau perlu ditingkatkan lagi untuk mencapai performa maksimal.

Tips lari dari kami: jangan terlalu terobsesi dengan angka di awal perjalanan larimu. Fokuslah pada konsistensi dan kenyamanan saat bergerak. Gunakan data pace ini sebagai referensi untuk melihat perkembanganmu dari minggu ke minggu. Ingatlah untuk selalu melakukan pemanasan dan pendinginan yang cukup untuk menghindari cedera. Lari bukan hanya soal kecepatan, tapi soal kesehatan jantung, ketenangan pikiran, dan kebahagiaan saat tubuhmu bergerak aktif.

Semoga kalkulator pace lari ini membantu memotivasi setiap langkah larimu. Kami di Kalkulator Warga bangga bisa mendukung semangat hidup sehat seluruh warga Indonesia dengan menyediakan alat bantu yang praktis dan gratis. Teruslah berlari, jaga kesehatan tubuhmu, dan nikmati setiap momen di lintasan lari. Kami selalu siap mendukung setiap aktivitas olahragamu melalui alat hitung yang jujur dan membantu. Selamat berlari dan salam sehat selalu!`,
  category: 'Kebugaran',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak (km)', 'dist', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Waktu (JJ:MM:DD)', 'time', 'text', '00:30:00');
    
    const calcBtn = createButton('Hitung Pace');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dist = parseFloat(dInput.value);
      const timeParts = tInput.value.split(':').map(Number);
      if (dist > 0 && timeParts.length === 3) {
        const totalSec = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
        const secPerKm = totalSec / dist;
        const min = Math.floor(secPerKm / 60);
        const sec = Math.round(secPerKm % 60);
        resDisplay.textContent = `${min}:${sec.toString().padStart(2, '0')} menit/km`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
