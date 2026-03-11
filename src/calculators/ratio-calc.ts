import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Rasio',
  id: 'ratio-calc',
  description: 'Hitung perbandingan atau rasio antara dua angka.',
  longDescription: `Halo, para pelajar, mahasiswa, dan profesional yang sedang berurusan dengan data! Memahami perbandingan atau rasio adalah salah satu konsep matematika dasar yang paling sering kita temui dalam kehidupan sehari-hari—mulai dari mencampur bahan bangunan, membagi keuntungan bisnis, hingga memahami skala pada peta. Namun, menyederhanakan dua angka besar menjadi bentuk rasio yang paling sederhana terkadang bisa memakan waktu jika dilakukan secara manual. Kalkulator Rasio ini kami hadirkan untuk membantumu menemukan perbandingan yang tepat dengan cepat dan akurat.

Cara kerja alat hitung rasio online ini sangat membantu untuk berbagai keperluan teknis maupun akademis. Kamu cukup memasukkan dua angka yang ingin dibandingkan (Angka A dan Angka B). Alat ini akan secara otomatis mencari faktor persekutuan terbesar (FPB) dan menyederhanakan kedua angka tersebut ke dalam bentuk rasio yang paling kecil (misalnya 2:1 atau 3:5). Dengan hasil yang instan ini, kamu bisa lebih mudah memahami proporsi data yang sedang kamu kerjakan tanpa perlu pusing dengan hitungan pembagian yang rumit.

Tips matematika dari kami: rasio sangat berguna untuk menjaga konsistensi dalam berbagai hal. Misalnya dalam memasak, rasio bumbu yang tepat akan menjaga rasa masakan tetap sama meskipun porsinya ditambah. Dalam investasi, rasio risiko dan imbal hasil membantu kamu membuat keputusan yang lebih bijak. Pemahaman yang baik tentang rasio akan membantumu melihat pola dan hubungan antar data dengan lebih jernih. Matematika bukan hanya soal angka, tapi soal memahami keseimbangan.

Semoga kalkulator rasio sederhana ini mempermudah tugas-tugasmu setiap hari. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu pendidikan dan praktis yang bisa diakses oleh siapa saja dengan mudah. Jangan biarkan angka-angka besar membuatmu bingung. Teruslah belajar dan kembangkan kemampuan analisismu, dan kami selalu siap mendukung setiap proses belajarmu melalui alat hitung yang praktis, jujur, dan akurat. Selamat berhitung dan semoga sukses dengan pekerjaanmu!`,
  category: 'Matematika',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Angka A', 'a', 'number');
    const { wrapper: bWrap, input: bInput } = createInput('Angka B', 'b', 'number');
    
    const calcBtn = createButton('Hitung Rasio', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(bWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    calcBtn.onclick = () => {
      const a = parseInt(aInput.value);
      const b = parseInt(bInput.value);
      if (a > 0 && b > 0) {
        const common = gcd(a, b);
        resDisplay.textContent = `${a / common} : ${b / common}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
