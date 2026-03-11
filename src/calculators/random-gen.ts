import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Pembuat Angka Acak',
  id: 'random-gen',
  description: 'Buat angka acak di antara dua nilai.',
  longDescription: `Halo, kamu yang sedang butuh bantuan untuk membuat keputusan atau sekadar butuh angka acak untuk berbagai keperluan! Terkadang, kita dihadapkan pada situasi di mana kita butuh elemen kejutan atau keadilan yang murni, seperti saat memilih pemenang undian kecil-kecilan, menentukan urutan presentasi, atau mencari inspirasi angka untuk permainan. Pembuat Angka Acak (Random Number Generator) ini hadir sebagai solusi praktis yang jujur dan tidak memihak untuk membantumu mendapatkan angka yang benar-benar acak dalam sekejap.

Cara kerja alat pembuat angka acak online ini sangat sederhana dan fleksibel. Kamu cukup menentukan batas minimal dan batas maksimal angka yang kamu inginkan. Klik tombol "Buat Angka", dan sistem kami akan secara otomatis memilih satu angka di antara rentang tersebut untukmu. Alat ini menggunakan algoritma matematika yang memastikan setiap angka dalam rentang yang kamu pilih memiliki peluang yang sama untuk muncul, sehingga keadilan dan transparansi tetap terjaga dalam setiap penggunaannya.

Tips penggunaan dari kami: gunakan alat ini untuk hal-hal yang menyenangkan dan membantu produktivitasmu. Misalnya, kamu bisa menggunakannya untuk menentukan siapa yang harus mencuci piring hari ini di rumah, atau untuk memilih nomor halaman buku secara acak untuk dibaca. Ingatlah bahwa meskipun angka ini acak, keputusan besar dalam hidup tetaplah membutuhkan pertimbangan akal sehat dan hati nurani. Jadikan alat ini sebagai teman seru untuk memecah kebuntuan dalam hal-hal kecil sehari-hari.

Semoga pembuat angka acak ini memberikan sedikit keseruan dan kemudahan dalam harimu. Kami di Kalkulator Warga senang bisa menyediakan berbagai alat bantu yang ringan namun bermanfaat untuk mendukung aktivitas harian warga. Jangan biarkan keraguan menghambat langkahmu, terkadang sedikit elemen acak bisa membawa perspektif baru yang menarik. Teruslah beraktivitas dengan ceria, dan kami selalu siap mendukung setiap kebutuhan praktismu melalui alat bantu yang jujur dan memudahkan ini. Selamat mencoba keberuntunganmu!`,
  category: 'Lainnya',
  render(container) {
    const { wrapper: minWrap, input: minInput } = createInput('Minimal', 'min', 'number', '1');
    const { wrapper: maxWrap, input: maxInput } = createInput('Maksimal', 'max', 'number', '100');
    
    const calcBtn = createButton('Buat Angka');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(minWrap);
    container.appendChild(maxWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const min = parseInt(minInput.value) || 1;
      const max = parseInt(maxInput.value) || 100;
      if (max > min) {
        const res = Math.floor(Math.random() * (max - min + 1)) + min;
        resDisplay.textContent = `Hasil: ${res}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      minInput.value = '1'; maxInput.value = '100';
      resWrap.classList.add('hidden');
    };
  }
};
