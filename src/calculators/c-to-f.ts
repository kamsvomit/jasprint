import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Celsius ke Fahrenheit',
  id: 'c-to-f',
  description: 'Konversi suhu Celsius ke Fahrenheit.',
  longDescription: `Halo, kamu yang lagi bingung baca suhu dalam Fahrenheit—entah itu di aplikasi cuaca, resep masakan dari luar negeri, atau mungkin lagi ngobrol sama teman yang tinggal di Amerika. Perbedaan satuan suhu ini memang sering bikin kepala pusing, apalagi kalau kamu terbiasa dengan Celsius seperti kebanyakan orang Indonesia. Kalkulator Celsius ke Fahrenheit ini hadir untuk menghapus kebingunganmu seketika, dengan konversi yang cepat, akurat, dan tanpa perlu hafal rumus apapun.

Cara pakainya sangat mudah—masukkan nilai suhu dalam derajat Celsius, klik Konversi, dan hasil dalam Fahrenheit langsung muncul. Rumus yang digunakan adalah: °F = (°C × 9/5) + 32. Jadi kalau kamu memasukkan 100°C (titik didih air), hasilnya adalah 212°F. Suhu tubuh normal manusia yang 37°C setara dengan 98,6°F. Dan suhu kamar yang nyaman sekitar 25°C adalah 77°F. Memahami konversi suhu Celsius ke Fahrenheit ini sangat berguna dalam banyak situasi kehidupan sehari-hari.

Tahukah kamu kapan konversi ini paling sering dibutuhkan? Pertama, saat memasak menggunakan resep berbahasa Inggris dari website atau buku masak luar negeri—suhu oven hampir selalu ditulis dalam Fahrenheit. Kedua, saat traveling ke Amerika Serikat, Kepulauan Bahama, atau beberapa negara lain yang masih memakai Fahrenheit—prakiraan cuaca di sana tertulis dalam °F. Ketiga, dalam dunia medis dan industri, kamu mungkin menemukan spesifikasi teknis yang menggunakan Fahrenheit. Dengan alat konversi suhu ini, kamu tidak perlu lagi mengalami momen canggung saat kebingungan.

Simpan halaman ini di bookmark kamu, ya! Karena meskipun terdengar sepele, kebutuhan konversi suhu Celsius ke Fahrenheit bisa muncul kapan saja dan di mana saja. Kami di Kalkulator Warga percaya bahwa alat yang sederhana pun bisa membuat perbedaan besar dalam kelancaran aktivitasmu sehari-hari. Tidak ada pertanyaan yang terlalu kecil untuk dijawab, dan tidak ada kebingungan yang terlalu remeh untuk diselesaikan. Karena hidup lebih menyenangkan ketika kamu paham apa yang sedang kamu hadapi.`,
  category: 'Konversi',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Celsius (°C)', 'celsius', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const c = parseFloat(cInput.value);
      if (!isNaN(c)) {
        const f = (c * 9/5) + 32;
        resDisplay.textContent = `${f.toFixed(1)} °F`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};