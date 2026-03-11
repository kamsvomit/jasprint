import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Nilai Akhir',
  id: 'grade-calc',
  description: 'Hitung nilai akhir berbobot.',
  longDescription: `Halo, para pelajar dan mahasiswa yang berdedikasi! Dalam dunia pendidikan, seringkali nilai akhir sebuah mata pelajaran atau kuliah tidak hanya ditentukan dari satu ujian saja. Ada berbagai komponen seperti tugas, kuis, UTS, dan UAS yang masing-masing memiliki bobot persentase yang berbeda. Menghitung nilai akhir secara manual bisa menjadi membingungkan dan berisiko salah hitung. Kalkulator Nilai Akhir Berbobot ini kami sediakan untuk membantumu mengetahui estimasi nilai akhirmu dengan akurat dan cepat.

Cara kerja alat hitung nilai sekolah online ini sangat memudahkan perencanaan studimu. Kamu cukup memasukkan deretan nilai yang kamu peroleh dan bobot persentase masing-masing nilai tersebut. Alat ini akan secara otomatis menghitung rata-rata tertimbang untuk memberikan hasil akhir dalam bentuk persentase. Dengan mengetahui nilai akhirmu lebih awal, kamu bisa mengevaluasi performa akademikmu dan menentukan strategi belajar yang lebih baik untuk mencapai target nilai yang kamu inginkan.

Tips sukses belajar dari kami: selalu perhatikan silabus mata pelajaran di awal semester untuk mengetahui komponen penilaian dan bobotnya. Fokuslah pada komponen yang memiliki bobot besar, namun jangan abaikan tugas-tugas kecil karena mereka bisa menjadi penyelamat nilai akhirmu. Gunakan kalkulator ini secara berkala setelah setiap ujian atau tugas selesai untuk memantau progresmu. Ingatlah bahwa setiap usaha kecil yang kamu lakukan hari ini adalah investasi untuk masa depanmu yang gemilang.

Semoga kalkulator nilai akhir ini membantu memotivasi belajarmu. Kami di Kalkulator Warga bangga bisa menjadi bagian dari perjalanan pendidikanmu dengan menyediakan alat bantu yang praktis dan gratis. Teruslah berprestasi, raih cita-citamu dengan penuh semangat, dan jangan pernah berhenti untuk mengeksplorasi ilmu pengetahuan. Kami selalu siap mendukung setiap langkah perjuanganmu di dunia pendidikan melalui alat hitung yang jujur dan memudahkan ini.`,
  category: 'Lainnya',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Nilai (%) (pisahkan dengan koma)', 'grades', 'text', '80, 90, 70');
    const { wrapper: wWrap, input: wInput } = createInput('Bobot (%) (pisahkan dengan koma)', 'weights', 'text', '30, 40, 30');
    
    const calcBtn = createButton('Hitung Nilai');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(wWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const grades = gInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      const weights = wInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (grades.length > 0 && grades.length === weights.length) {
        let total = 0;
        let totalWeight = 0;
        for (let i = 0; i < grades.length; i++) {
          total += (grades[i] * (weights[i] / 100));
          totalWeight += weights[i];
        }
        showResult(`${total.toFixed(2)}%`);
      } else {
        showError('Harap masukkan jumlah nilai dan bobot yang sama.');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; wInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
