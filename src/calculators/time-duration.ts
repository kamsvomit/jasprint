import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Durasi Waktu',
  id: 'time-duration',
  description: 'Hitung durasi antara dua waktu.',
  longDescription: `Halo, para profesional yang sibuk, pelajar yang disiplin, dan siapapun yang ingin mengelola waktunya dengan lebih baik! Seringkali kita perlu tahu persis berapa lama sebuah kegiatan berlangsung—mulai dari menghitung jam kerja lembur, durasi belajar, hingga lama perjalanan antar kota. Menghitung selisih jam dan menit secara manual terkadang membingungkan karena sistem waktu yang berbasis 60 menit. Kalkulator Durasi Waktu ini hadir sebagai solusi praktis untuk membantumu menghitung selisih waktu dengan cepat dan akurat.

Cara kerja alat hitung selisih waktu online ini sangat membantu dalam manajemen aktivitas harianmu. Kamu cukup memasukkan waktu mulai dan waktu selesai kegiatanmu. Alat ini akan secara otomatis menghitung total jam dan menit yang telah berlalu. Sangat berguna bagi kamu yang sedang mencatat log kerja, menghitung durasi puasa, atau bagi para atlet yang ingin tahu total waktu latihannya. Kami ingin memastikan setiap detik waktumu terhitung dengan benar sehingga kamu bisa lebih menghargai setiap momen produktifmu.

Tips manajemen waktu dari kami: cobalah untuk mencatat durasi kegiatan utamamu selama satu minggu untuk melihat ke mana sebenarnya waktumu dihabiskan. Dengan mengetahui durasi nyata dari setiap tugas, kamu bisa membuat jadwal harian yang lebih realistis dan menghindari rasa kewalahan. Waktu adalah aset yang paling berharga, dan mengelolanya dengan baik adalah langkah pertama menuju kesuksesan dan keseimbangan hidup. Hargailah waktumu, karena waktu yang sudah berlalu tidak akan pernah kembali.

Semoga kalkulator durasi waktu sederhana ini bermanfaat untuk meningkatkan produktivitas dan keteraturan harimu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu praktis yang memudahkan urusan harian warga tanpa biaya apapun. Jangan biarkan waktu terbuang sia-sia tanpa perencanaan yang baik. Teruslah berkarya, capai target-targetmu dengan manajemen waktu yang cerdas, dan kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur dan membantu. Selamat mengelola waktumu dengan bijak!`,
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: sWrap, input: sInput } = createInput('Waktu Mulai', 'start', 'time');
    const { wrapper: eWrap, input: eInput } = createInput('Waktu Selesai', 'end', 'time');
    
    const calcBtn = createButton('Hitung Durasi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(sWrap);
    container.appendChild(eWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const start = sInput.value.split(':');
      const end = eInput.value.split(':');
      if (start.length === 2 && end.length === 2) {
        let h = parseInt(end[0]) - parseInt(start[0]);
        let m = parseInt(end[1]) - parseInt(start[1]);
        if (m < 0) { m += 60; h--; }
        if (h < 0) h += 24;
        resDisplay.textContent = `${h} Jam ${m} Menit`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      sInput.value = ''; eInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
