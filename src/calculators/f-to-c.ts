import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Fahrenheit ke Celsius',
  id: 'f-to-c',
  description: 'Konversi suhu Fahrenheit ke Celsius.',
  longDescription: `Halo, para penjelajah dunia dan pecinta sains! Seringkali saat kita membaca berita internasional, menonton video resep dari luar negeri, atau bepergian ke negara seperti Amerika Serikat, kita menemukan satuan suhu Fahrenheit yang terasa asing di telinga kita yang terbiasa dengan Celsius. Memahami perbedaan suhu ini sangat penting, baik untuk menyesuaikan suhu oven saat memasak, memahami ramalan cuaca, atau sekadar menambah wawasan. Kalkulator Konversi Fahrenheit ke Celsius ini hadir sebagai jembatan informasi instan untukmu.

Cara kerja alat konversi suhu online ini sangat mudah. Kamu hanya perlu memasukkan angka dalam derajat Fahrenheit, dan alat ini akan secara otomatis menghitung nilai setaranya dalam derajat Celsius menggunakan rumus yang akurat. Tidak perlu lagi bingung membayangkan seberapa panas 100°F atau seberapa dingin 32°F. Kami ingin membantu mempermudah aktivitasmu, baik saat kamu sedang belajar di sekolah, bekerja di laboratorium, atau sedang merencanakan perjalanan ke luar negeri.

Tips praktis untukmu: ingatlah titik-titik acuan penting, seperti 32°F yang setara dengan 0°C (titik beku air) dan 212°F yang setara dengan 100°C (titik didih air). Dengan memahami acuan ini, kamu bisa memiliki perkiraan suhu dengan lebih cepat bahkan tanpa alat bantu. Namun, untuk hasil yang presisi, kalkulator kami selalu siap membantumu kapan saja. Pengetahuan tentang konversi satuan adalah keterampilan kecil yang sangat berguna dalam kehidupan sehari-hari yang semakin global ini.

Semoga kalkulator suhu sederhana ini bermanfaat untuk setiap kebutuhanmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu yang praktis dan membantu tanpa biaya apapun. Teruslah belajar dan perkaya wawasanmu tentang dunia. Kami selalu siap mendukung setiap aktivitasmu, mulai dari dapur hingga ruang kelas, dengan alat hitung yang jujur dan akurat. Selamat bereksplorasi dan semoga harimu selalu menyenangkan dengan suhu yang pas!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: fWrap, input: fInput } = createInput('Fahrenheit (°F)', 'fahrenheit', 'number');
    
    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(fWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const f = parseFloat(fInput.value);
      if (!isNaN(f)) {
        const c = (f - 32) * 5/9;
        resDisplay.textContent = `${c.toFixed(1)} °C`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      fInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
