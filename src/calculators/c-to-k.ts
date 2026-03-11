import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Celsius ke Kelvin',
  id: 'c-to-k',
  description: 'Konversi suhu Celsius ke Kelvin.',
  longDescription: `Halo, para pejuang ilmu pengetahuan—mahasiswa fisika, kimia, teknik, atau siapapun yang lagi berkutat dengan soal atau laporan yang membutuhkan satuan suhu Kelvin. Berbeda dari Celsius dan Fahrenheit yang lebih sering dipakai dalam kehidupan sehari-hari, Kelvin adalah satuan suhu yang digunakan dalam sains dan fisika tingkat lanjut. Kalau kamu pernah bingung kenapa soal termodinamika harus pakai Kelvin, kamu tidak sendirian. Kalkulator Celsius ke Kelvin ini hadir untuk memudahkan konversimu, cepat dan tanpa drama.

Cara kerjanya super simpel: masukkan nilai suhu dalam derajat Celsius, lalu klik Konversi. Alat ini akan langsung menghitungnya menggunakan rumus K = °C + 273,15. Kenapa 273,15? Karena itulah titik nol absolut dalam Kelvin—suhu terendah yang secara teoritis mungkin ada di alam semesta, di mana semua gerakan partikel berhenti total. Menariknya, tidak ada derajat dalam Kelvin (kamu tidak menulis °K, melainkan cukup K). Titik beku air adalah 273,15 K, titik didih air adalah 373,15 K, dan suhu ruangan yang nyaman sekitar 25°C adalah 298,15 K.

Konversi Celsius ke Kelvin paling sering dibutuhkan dalam beberapa konteks ilmiah: perhitungan hukum gas ideal (PV = nRT), termodinamika dan entropi, reaksi kimia yang melibatkan perubahan energi, serta astrofisika dan penelitian suhu benda langit. Jika kamu seorang mahasiswa yang sering mengerjakan laporan praktikum atau tugas akhir, konversi ini mungkin sudah jadi rutinitas harian. Dengan kalkulator ini, kamu bisa menghemat waktu dan fokus pada hal yang lebih penting—memahami konsepnya.

Terus semangat belajarnya, ya! Ilmu sains memang penuh tantangan, tapi setiap kali kamu berhasil memahami satu konsep baru—sekecil apapun—itu adalah kemenangan yang nyata. Kami di Kalkulator Warga bangga bisa menemani perjalanan belajarmu. Jadikan kalkulator konversi suhu ini sebagai salah satu alat bantu andalanmu, dan jangan ragu untuk memanfaatkan semua fitur lain yang kami sediakan untuk mendukung studimu sehari-hari.`,
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
        const k = c + 273.15;
        resDisplay.textContent = `${k.toFixed(2)} K`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};