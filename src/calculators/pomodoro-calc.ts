import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pomodoro',
  id: 'pomodoro-calc',
  description: 'Hitung jadwal sesi fokus dan istirahat Anda.',
  longDescription: `Halo, para pejuang produktivitas dan pembelajar yang bersemangat! Seringkali saat kita bekerja atau belajar dalam waktu lama, fokus kita perlahan menurun dan rasa lelah mulai menghambat progres kita. Teknik Pomodoro adalah salah satu metode manajemen waktu yang paling populer dan efektif untuk menjaga konsentrasi tetap tajam dengan cara membagi waktu kerja menjadi sesi-sesi fokus yang diselingi dengan istirahat pendek. Kalkulator Pomodoro ini kami hadirkan untuk membantumu merancang jadwal kerja yang lebih seimbang dan produktif.

Cara kerja alat bantu manajemen waktu online ini sangat membantu dalam mengatur ritme kerjamu. Kamu cukup memasukkan total waktu yang ingin kamu alokasikan untuk bekerja atau belajar. Alat ini akan secara otomatis menghitung berapa banyak sesi fokus (biasanya 25 menit) dan sesi istirahat pendek (5 menit) yang bisa kamu jalankan. Dengan mengikuti jadwal yang teratur, otakmu akan tetap segar dan kamu bisa menyelesaikan lebih banyak tugas tanpa merasa kelelahan yang berlebihan di akhir hari.

Tips produktivitas dari kami: saat sesi fokus berlangsung, jauhkan segala gangguan seperti notifikasi ponsel atau media sosial agar konsentrasimu tidak terpecah. Gunakan waktu istirahat pendek untuk benar-benar menjauh dari layar, melakukan peregangan ringan, atau minum air putih agar energi tubuhmu kembali pulih. Konsistensi adalah kunci dari keberhasilan teknik ini. Jadikan manajemen waktu sebagai kebiasaan yang membantumu mencapai target-target besar dalam hidup dengan cara yang lebih sehat dan teratur.

Semoga kalkulator jadwal pomodoro ini membantu meningkatkan efisiensi kerjamu setiap hari. Kami di Kalkulator Warga senang bisa mendukung semangat produktivitas warga Indonesia dengan menyediakan alat bantu yang praktis dan memudahkan. Jangan biarkan waktu berlalu begitu saja tanpa hasil yang nyata. Teruslah berkarya, capai impianmu dengan fokus yang kuat, dan kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur dan membantu. Selamat bekerja dengan lebih cerdas dan tetaplah produktif!`,
  category: 'Produktivitas',
  render(container) {
    const { wrapper: tWrap, input: tInput } = createInput('Total Waktu Kerja (Menit)', 'total', 'number', '120');
    
    const calcBtn = createButton('Buat Jadwal', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const total = parseInt(tInput.value);
      if (total > 0) {
        const sessions = Math.floor(total / 25);
        resDisplay.innerHTML = `
          <div>${sessions} Sesi Fokus (25m)</div>
          <div class="text-sm text-gray-500 mt-1">${sessions - 1} Istirahat Pendek (5m)</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
