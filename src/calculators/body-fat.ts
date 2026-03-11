import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Lemak Tubuh',
  id: 'body-fat',
  description: 'Estimasi persentase lemak tubuh menggunakan metode US Navy.',
  longDescription: `Halo, kamu yang lagi serius merawat tubuh dan ingin memahami komposisi badanmu lebih dalam. Banyak orang hanya fokus pada angka timbangan, padahal berat badan saja tidak menceritakan gambaran yang lengkap. Dua orang dengan berat badan yang sama bisa memiliki kondisi kesehatan yang sangat berbeda—tergantung seberapa besar proporsi lemak dan otot dalam tubuh mereka. Kalkulator Persentase Lemak Tubuh ini hadir untuk membantumu memahami kondisi tubuhmu secara lebih mendalam, bukan sekadar angka di timbangan.

Alat ini menggunakan Metode US Navy, salah satu metode pengukuran lemak tubuh yang paling populer dan cukup akurat tanpa memerlukan alat canggih. Cara kerjanya: masukkan lingkar pinggang, lingkar leher, dan tinggi badanmu dalam sentimeter. Formula ini memanfaatkan rasio antara ukuran tubuh tersebut untuk memperkirakan persentase lemak tubuh (body fat percentage). Hasilnya adalah estimasi—bukan pengukuran medis yang presisi—tapi sangat berguna untuk memantau tren perubahan komposisi tubuhmu dari waktu ke waktu, terutama jika kamu sedang dalam program diet atau latihan fisik.

Sebagai panduan umum, persentase lemak tubuh yang sehat untuk pria dewasa berkisar antara 10–20%, dan untuk wanita antara 18–28%. Atlet biasanya memiliki persentase yang lebih rendah. Jika hasil kalkulasimu berada di atas rentang tersebut, jangan panik—ini bukan vonis, melainkan sinyal untuk mulai bergerak lebih aktif dan memperhatikan pola makan. Kombinasi olahraga kardio seperti jogging atau bersepeda dengan latihan kekuatan (resistance training) adalah cara paling efektif untuk menurunkan lemak sekaligus membangun massa otot. Hasilnya? Tubuh lebih kencang, energi lebih tinggi, dan kondisi kesehatan jangka panjang yang lebih baik.

Ingat, perjalanan menuju tubuh yang sehat adalah maraton, bukan sprint. Jangan terlalu keras pada dirimu sendiri. Setiap perubahan kecil yang konsisten—berjalan kaki 30 menit sehari, mengurangi makanan olahan, tidur yang cukup—semuanya berkontribusi nyata. Kami di Kalkulator Warga mendukung perjalanan kesehatanmu sepenuhnya. Gunakan kalkulator lemak tubuh ini secara berkala, catat progresmu, dan rayakan setiap pencapaian kecil. Karena tubuh yang sehat adalah investasi terbaik yang bisa kamu lakukan untuk dirimu sendiri.`,
  category: 'Kebugaran',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Lingkar Pinggang (cm)', 'waist', 'number');
    const { wrapper: nWrap, input: nInput } = createInput('Lingkar Leher (cm)', 'neck', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(nWrap);
    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const n = parseFloat(nInput.value);
      const h = parseFloat(hInput.value);
      
      if (w > 0 && n > 0 && h > 0) {
        // Simple formula for males
        const bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
        resDisplay.textContent = `${bf.toFixed(1)}% Lemak Tubuh`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; nInput.value = ''; hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};