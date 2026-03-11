import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kecepatan',
  id: 'speed-calc-id',
  description: 'Hitung kecepatan rata-rata berdasarkan jarak dan waktu.',
  longDescription: `Halo, para pelajar, pengemudi, dan siapapun yang sedang merencanakan perjalanan! Memahami hubungan antara jarak, waktu, dan kecepatan adalah salah satu konsep fisika dasar yang paling sering kita gunakan dalam mobilitas sehari-hari. Apakah kamu ingin tahu seberapa cepat kamu harus berkendara agar sampai tepat waktu, atau ingin menghitung kecepatan rata-rata larimu di pagi hari? Kalkulator Kecepatan ini hadir sebagai alat bantu praktis untuk memberikan jawaban instan atas pertanyaan-pertanyaan tersebut dengan akurasi yang tepat.

Cara kerja alat hitung kecepatan rata-rata online ini sangat membantu untuk berbagai keperluan mobilitasmu. Kamu cukup memasukkan total jarak yang ditempuh (dalam kilometer) dan total waktu yang dihabiskan (dalam jam). Alat ini akan secara otomatis membagi jarak dengan waktu untuk memberikan hasil kecepatan rata-ratamu dalam satuan km/jam. Sangat berguna bagi kamu yang sedang merencanakan perjalanan luar kota, menghitung performa kendaraan, atau bagi siswa yang sedang mengerjakan tugas sekolah tentang gerak lurus beraturan.

Tips perjalanan dari kami: selalu utamakan keselamatan di atas kecepatan. Mengetahui kecepatan rata-rata perjalananmu sangat membantu dalam manajemen waktu, namun jangan pernah mengabaikan batas kecepatan yang aman dan aturan lalu lintas yang berlaku. Perencanaan perjalanan yang baik adalah yang memperhitungkan waktu istirahat dan kondisi jalan, bukan hanya soal seberapa cepat kita bisa sampai. Perjalanan yang menyenangkan adalah perjalanan yang sampai ke tujuan dengan selamat dan tanpa rasa terburu-buru yang berlebihan.

Semoga kalkulator kecepatan sederhana ini bermanfaat untuk setiap rencana perjalanan dan tugasmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu matematika dan fisika dasar yang mudah diakses oleh seluruh warga untuk mempermudah urusan harian. Jangan biarkan angka-angka membuat rencanamu terhambat. Teruslah bergerak maju, kelola waktumu dengan bijak, dan kami selalu siap mendukung setiap langkah mobilitasmu melalui alat hitung yang praktis, jujur, dan akurat. Selamat menempuh perjalanan dan semoga sampai tujuan dengan selamat!`,
  category: 'Matematika',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak (km)', 'dist', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Waktu (jam)', 'time', 'number');
    
    const calcBtn = createButton('Hitung Kecepatan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const d = parseValue(dInput.value);
      const t = parseValue(tInput.value);
      if (d > 0 && t > 0) {
        const speed = d / t;
        resDisplay.textContent = `${speed.toFixed(2)} km/jam`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
