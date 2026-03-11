import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Akar Kuadrat',
  id: 'sqrt-calc',
  description: 'Hitung akar kuadrat dari sebuah angka.',
  longDescription: `Halo, para pelajar, mahasiswa, dan pecinta matematika yang sedang bergelut dengan angka! Akar kuadrat adalah salah satu operasi dasar matematika yang sangat penting, namun seringkali sulit dihitung di luar kepala, terutama untuk angka-angka yang bukan merupakan kuadrat sempurna. Baik kamu sedang mengerjakan tugas sekolah, menghitung sisi miring segitiga dengan rumus Pythagoras, atau sedang melakukan analisis data teknis, Kalkulator Akar Kuadrat ini hadir untuk memberikan hasil yang cepat, tepat, dan akurat.

Cara kerja alat hitung akar kuadrat online ini sangat membantu dalam mempermudah tugas-tugas akademis dan teknismu. Kamu cukup memasukkan angka yang ingin dicari akar kuadratnya, dan alat ini akan secara otomatis memberikan hasilnya hingga beberapa angka di belakang desimal. Tidak perlu lagi pusing dengan rumus manual yang panjang atau menebak-nebak hasilnya. Kami ingin memastikan setiap perhitungan matematikamu menjadi lebih ringan sehingga kamu bisa fokus pada pemahaman konsep yang lebih dalam.

Tips belajar matematika dari kami: memahami akar kuadrat adalah kunci untuk menguasai banyak topik tingkat lanjut seperti aljabar, geometri, dan statistika. Jangan takut dengan angka-angka yang terlihat rumit; dengan alat bantu yang tepat, matematika bisa menjadi subjek yang sangat menarik dan logis. Jadikan kalkulator ini sebagai teman belajarmu untuk memverifikasi jawaban dan meningkatkan rasa percayamu dalam mengerjakan soal-soal hitungan.

Semoga kalkulator akar kuadrat sederhana ini bermanfaat untuk setiap proses belajarmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu pendidikan yang mudah diakses oleh seluruh siswa dan warga Indonesia. Jangan biarkan kesulitan berhitung menghambat semangat belajarmu. Teruslah bereksplorasi dalam dunia angka, raih prestasi terbaikmu, dan kami selalu siap mendukung setiap langkah cerdasmu melalui alat hitung yang praktis, jujur, dan akurat. Selamat belajar dan sukses selalu!`,
  category: 'Matematika',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Angka', 'val', 'number');
    
    const calcBtn = createButton('Hitung Akar', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const val = parseValue(vInput.value);
      if (val >= 0) {
        resDisplay.textContent = Math.sqrt(val).toFixed(4);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
