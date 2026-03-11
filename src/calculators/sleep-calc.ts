import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Tidur',
  id: 'sleep-calc',
  description: 'Cari tahu kapan harus tidur atau bangun untuk merasa segar.',
  longDescription: `Halo, para pejuang produktivitas yang sering merasa kurang istirahat! Seringkali kita bangun tidur dengan perasaan masih lelah dan mengantuk, meskipun kita merasa sudah tidur cukup lama. Hal ini sering terjadi karena kita bangun di tengah-tengah siklus tidur yang dalam. Tubuh manusia tidur dalam siklus yang biasanya berlangsung sekitar 90 menit. Kalkulator Tidur ini kami hadirkan untuk membantumu menentukan waktu tidur atau waktu bangun yang ideal agar kamu bisa bangun dengan perasaan segar, bertenaga, dan siap menghadapi hari.

Cara kerja alat bantu tidur sehat online ini didasarkan pada sains siklus tidur. Kamu cukup memasukkan jam berapa kamu harus bangun di pagi hari, dan alat ini akan menghitung mundur waktu tidur yang paling disarankan agar kamu menyelesaikan siklus tidurmu dengan sempurna. Bangun di akhir siklus tidur akan membuatmu merasa jauh lebih waspada dan tidak "pusing" dibandingkan bangun saat sedang tidur nyenyak. Dengan mengatur jadwal tidur yang selaras dengan ritme alami tubuh, kualitas istirahatmu akan meningkat drastis meskipun durasinya mungkin tidak terlalu panjang.

Tips tidur berkualitas dari kami: cobalah untuk menjaga jadwal tidur yang konsisten setiap hari, bahkan di hari libur sekalipun. Hindari penggunaan layar ponsel atau komputer setidaknya 30 menit sebelum tidur karena cahaya biru dapat menghambat produksi hormon melatonin yang membantu kita tidur. Ciptakan suasana kamar yang sejuk, gelap, dan tenang untuk mendukung istirahat yang maksimal. Tidur yang cukup bukan hanya soal kuantitas, tapi soal kualitas dan ketepatan waktu yang mendukung pemulihan tubuh dan pikiranmu.

Semoga kalkulator waktu tidur ini membantu meningkatkan kualitas hidup dan kesehatanmu setiap hari. Kami di Kalkulator Warga peduli dengan kesejahteraan seluruh warga Indonesia dan percaya bahwa kesehatan dimulai dari istirahat yang cukup. Jangan biarkan kelelahan menghambat potensimu. Teruslah menjaga kesehatan, istirahatlah dengan cerdas, dan kami selalu siap mendukung setiap langkah hidup sehatmu melalui alat bantu yang praktis dan memudahkan ini. Selamat tidur nyenyak dan bangunlah dengan semangat baru!`,
  category: 'Kesehatan',
  render(container) {
    const { wrapper: tWrap, input: tInput } = createInput('Waktu Bangun', 'wake', 'time', '07:00');
    
    const calcBtn = createButton('Hitung Waktu Tidur', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const wake = tInput.value.split(':');
      if (wake.length === 2) {
        const date = new Date();
        date.setHours(parseInt(wake[0]), parseInt(wake[1]), 0);
        const sleep = new Date(date.getTime() - 9 * 60 * 60 * 1000); // 9 hours before
        resDisplay.textContent = `Tidur jam: ${sleep.getHours().toString().padStart(2, '0')}:${sleep.getMinutes().toString().padStart(2, '0')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
