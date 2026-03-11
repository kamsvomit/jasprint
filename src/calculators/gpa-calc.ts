import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator IPK',
  id: 'gpa-calc',
  description: 'Hitung IPK Anda berdasarkan nilai dan SKS.',
  longDescription: `Halo, para mahasiswa pejuang gelar dan masa depan cerah! Masa kuliah adalah waktu yang penuh tantangan, di mana setiap nilai mata kuliah menjadi batu bata yang menyusun kesuksesan akademikmu. Indeks Prestasi Kumulatif (IPK) bukan sekadar angka di atas kertas, melainkan cerminan dari kerja keras, kedisiplinan, dan pemahamanmu selama menempuh pendidikan tinggi. Kalkulator IPK online ini kami hadirkan untuk membantumu memantau progres akademikmu dengan mudah, sehingga kamu bisa tetap fokus pada target kelulusan dan karier impianmu.

Cara kerja alat hitung IPK ini sangat membantu dalam perencanaan studi. Kamu cukup memasukkan nilai yang kamu peroleh (dalam skala 0-4) dan jumlah SKS untuk setiap mata kuliah. Alat ini akan menghitung rata-rata tertimbang untuk memberikan angka IPK yang akurat. Sangat berguna bagi kamu yang ingin mengevaluasi hasil semester ini, merencanakan target nilai untuk semester depan, atau saat ingin melamar beasiswa dan pekerjaan yang membutuhkan standar IPK tertentu. Kami ingin membantu mengurangi beban pikiranmu agar kamu bisa lebih bersemangat dalam belajar.

Tips sukses akademik dari kami: jangan hanya terpaku pada hasil akhir, tapi nikmatilah proses belajarnya. Jika IPK-mu saat ini belum sesuai harapan, jangan berkecil hati; gunakan hasil hitungan ini sebagai motivasi untuk memperbaiki strategi belajar di semester berikutnya. Konsultasikan dengan dosen pembimbingmu dan manfaatkan waktu kuliah sebaik mungkin untuk membangun jaringan dan keterampilan praktis. Ingatlah bahwa IPK adalah kunci pembuka pintu, namun karakter dan keahlianmu lah yang akan membawamu melangkah jauh di dunia kerja nanti.

Semoga kalkulator IPK sederhana ini menjadi teman setia dalam perjalanan akademikmu. Kami di Kalkulator Warga bangga bisa mendukung semangat belajar generasi muda Indonesia untuk masa depan yang lebih baik. Teruslah berjuang, raih prestasi setinggi mungkin, dan jangan pernah berhenti untuk mengembangkan diri. Kami selalu siap mendukung setiap langkah perjuanganmu di kampus melalui alat bantu yang praktis dan memudahkan ini. Selamat belajar dan semoga sukses meraih cita-citamu!`,
  category: 'Lainnya',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Nilai (pisahkan dengan koma, 0-4)', 'grades', 'text', '4, 3.5, 3');
    const { wrapper: cWrap, input: cInput } = createInput('SKS (pisahkan dengan koma)', 'credits', 'text', '3, 3, 4');
    
    const calcBtn = createButton('Hitung IPK');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const grades = gInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      const credits = cInput.value.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
      
      if (grades.length > 0 && grades.length === credits.length) {
        let totalPoints = 0;
        let totalCredits = 0;
        for (let i = 0; i < grades.length; i++) {
          totalPoints += grades[i] * credits[i];
          totalCredits += credits[i];
        }
        const gpa = totalPoints / totalCredits;
        resDisplay.textContent = `IPK: ${gpa.toFixed(2)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
