import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kehamilan',
  id: 'pregnancy-calc',
  description: 'Estimasi tanggal kelahiran bayi Anda.',
  longDescription: `Halo, calon Ibu yang sedang berbahagia! Kabar kehamilan adalah salah satu anugerah terindah yang membawa sejuta harapan dan kebahagiaan bagi keluarga. Kami sangat memahami betapa berdebarnya hati saat menantikan kehadiran sang buah hati di dunia. Kalkulator Kehamilan ini kami hadirkan untuk membantumu memprediksi kapan momen spesial itu akan tiba, sehingga kamu dan pasangan bisa mempersiapkan segala sesuatunya dengan lebih tenang dan terencana.

Alat ini menggunakan metode Naegele yang umum digunakan oleh tenaga medis untuk menghitung estimasi Hari Perkiraan Lahir (HPL). Kamu cukup memasukkan tanggal hari pertama haid terakhirmu (HPHT). Kalkulator ini akan menghitung durasi kehamilan rata-rata selama 280 hari atau 40 minggu untuk memberikan perkiraan tanggal kelahiran. Meskipun ini hanyalah sebuah estimasi dan bayi bisa lahir sedikit lebih cepat atau lebih lambat, memiliki tanggal target sangat membantu dalam merencanakan pemeriksaan rutin dan persiapan persalinan.

Tips dari kami untuk masa kehamilan yang sehat: nikmatilah setiap proses perubahan dalam tubuhmu dengan penuh rasa syukur. Pastikan kamu mendapatkan asupan nutrisi yang cukup, terutama asam folat dan zat besi, serta istirahat yang berkualitas. Jangan ragu untuk berkonsultasi secara rutin dengan dokter atau bidan kepercayaanmu untuk memantau perkembangan janin secara medis. Ingatlah bahwa kesehatan mentalmu juga sangat berpengaruh pada si kecil, jadi usahakan untuk selalu merasa bahagia dan tenang selama masa penantian ini.

Selamat menanti kehadiran sang buah hati! Kami di Kalkulator Warga merasa sangat terhormat bisa menjadi bagian kecil dari perjalanan luar biasamu menuju peran sebagai orang tua. Semoga masa kehamilanmu berjalan lancar, sehat, dan penuh dengan momen-momen indah. Jadikan alat ini sebagai pengingat akan keajaiban kehidupan yang sedang tumbuh di dalam rahimmu. Kami mendoakan yang terbaik untukmu dan si kecil hingga hari persalinan nanti tiba dengan selamat dan penuh sukacita.`,
  category: 'Kesehatan',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Hari Pertama Haid Terakhir', 'last', 'date');
    
    const calcBtn = createButton('Hitung Tanggal Lahir', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const last = new Date(dInput.value);
      if (!isNaN(last.getTime())) {
        const due = new Date(last.getTime() + 280 * 24 * 60 * 60 * 1000);
        resDisplay.textContent = due.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
