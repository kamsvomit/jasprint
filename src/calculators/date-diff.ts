import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Selisih Tanggal',
  id: 'date-diff',
  description: 'Hitung jumlah hari antara dua tanggal.',
  longDescription: `Halo, teman-teman yang sedang menanti momen spesial! Seringkali kita merasa tidak sabar menunggu hari besar, seperti hari pernikahan, ulang tahun, atau liburan panjang yang sudah lama direncanakan. Atau mungkin, kamu perlu menghitung durasi sebuah proyek atau masa kerja untuk keperluan administratif. Kalkulator Selisih Tanggal online ini kami hadirkan untuk membantumu menghitung jumlah hari secara tepat dan instan, sehingga kamu tidak perlu lagi menghitung manual di kalender yang seringkali membingungkan.

Cara kerja alat hitung hari ini sangat praktis. Kamu hanya perlu memasukkan tanggal mulai dan tanggal selesai yang ingin kamu hitung selisihnya. Alat ini akan secara otomatis menghitung total hari di antara kedua tanggal tersebut. Sangat berguna bagi kamu yang sedang menjalankan program diet, menghitung usia kehamilan, atau sekadar ingin tahu berapa hari lagi menuju hari raya. Kami ingin membantu mempermudah perencanaan waktumu agar setiap momen berharga bisa dipersiapkan dengan lebih baik.

Tips dari kami untuk manajemen waktu: gunakan hasil hitungan ini untuk membuat checklist persiapan. Jika kamu tahu masih ada 30 hari lagi menuju acara penting, kamu bisa membagi tugas-tugasmu menjadi target mingguan yang lebih ringan. Mengetahui durasi waktu yang tersisa akan membantumu mengurangi rasa cemas dan meningkatkan produktivitas. Ingatlah bahwa waktu adalah aset yang paling berharga, dan mengelolanya dengan bijak adalah kunci kesuksesan dalam setiap rencana yang kamu buat.

Semoga kalkulator durasi hari ini bermanfaat untuk setiap rencana besarmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang jujur dan memudahkan urusan harianmu. Jangan biarkan ketidakpastian waktu menghambat langkahmu. Teruslah berkarya, rencanakan setiap momen dengan matang, dan mari kita sambut masa depan dengan penuh kesiapan. Kami selalu siap mendukung setiap detik perjalanan hidupmu melalui alat hitung sederhana ini.`,
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: sWrap, input: sInput } = createInput('Tanggal Mulai', 'start', 'date');
    const { wrapper: eWrap, input: eInput } = createInput('Tanggal Selesai', 'end', 'date');
    
    const calcBtn = createButton('Hitung Selisih', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(sWrap);
    container.appendChild(eWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const start = new Date(sInput.value);
      const end = new Date(eInput.value);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diff = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        resDisplay.textContent = `${days} Hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      sInput.value = ''; eInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
