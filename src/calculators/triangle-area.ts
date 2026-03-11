import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Luas Segitiga',
  id: 'triangle-area',
  description: 'Hitung luas segitiga berdasarkan alas dan tinggi.',
  longDescription: `Halo, para pelajar, mahasiswa, dan siapapun yang sedang berurusan dengan perhitungan geometri! Segitiga adalah salah satu bentuk dasar yang paling sering kita temui dalam arsitektur, desain, dan tentu saja dalam pelajaran matematika di sekolah. Menghitung luasnya mungkin terlihat sederhana dengan rumus "setengah alas kali tinggi", namun saat kita berhadapan dengan angka-angka yang kompleks atau butuh hasil yang cepat untuk verifikasi, alat bantu digital menjadi sangat berharga. Kalkulator Luas Segitiga ini hadir untuk memberikan hasil instan yang akurat untuk setiap kebutuhan hitunganmu.

Cara kerja alat hitung luas segitiga online ini sangat mudah dan langsung pada intinya. Kamu cukup memasukkan nilai alas dan nilai tinggi dari segitiga yang ingin kamu hitung. Klik tombol "Hitung Luas", dan alat ini akan melakukan perhitungan secara otomatis untuk memberikan hasil total luas dalam satuan unit kuadrat. Sangat praktis bagi kamu yang sedang mengerjakan tugas sekolah, merencanakan potongan material berbentuk segitiga, atau sedang mempelajari konsep dasar trigonometri. Kami ingin memastikan setiap proses belajarmu menjadi lebih lancar dan menyenangkan.

Tips belajar geometri dari kami: memahami luas segitiga adalah dasar untuk memahami bentuk-bentuk yang lebih kompleks di masa depan. Jangan ragu untuk bereksperimen dengan berbagai angka untuk melihat bagaimana perubahan alas atau tinggi mempengaruhi luas keseluruhannya. Matematika adalah tentang melihat pola dan hubungan, dan dengan alat bantu yang tepat, kamu bisa menguasai konsep-konsep ini dengan lebih percaya diri. Ingatlah bahwa setiap pemahaman baru adalah langkah menuju kecerdasan yang lebih tinggi.

Semoga kalkulator luas segitiga sederhana ini bermanfaat untuk setiap proses belajarmu dan tugas-tugasmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu pendidikan dasar yang mudah diakses oleh seluruh siswa dan warga Indonesia. Jangan biarkan kesulitan berhitung menghambat semangat belajarmu. Teruslah bereksplorasi dalam dunia geometri, raih prestasi terbaikmu, dan kami selalu siap mendukung setiap langkah cerdasmu melalui alat hitung yang praktis, jujur, dan akurat. Selamat belajar dan sukses selalu!`,
  category: 'Matematika',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Alas', 'base', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tinggi', 'height', 'number');
    
    const calcBtn = createButton('Hitung Luas', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const a = parseValue(aInput.value);
      const t = parseValue(tInput.value);
      if (a > 0 && t > 0) {
        const area = 0.5 * a * t;
        resDisplay.textContent = `${area.toFixed(2)} unit²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
