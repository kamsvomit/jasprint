import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Detak Jantung Maksimal',
  id: 'max-hr',
  description: 'Estimasi detak jantung maksimal Anda berdasarkan usia.',
  longDescription: `Halo, para pejuang kebugaran dan pecinta gaya hidup sehat! Saat kita berolahraga, memantau intensitas latihan adalah kunci untuk mendapatkan hasil yang optimal sekaligus menjaga keamanan jantung kita. Salah satu indikator penting dalam latihan kardio adalah Detak Jantung Maksimal (Maximum Heart Rate). Kalkulator Detak Jantung Maksimal ini kami sediakan untuk memberikan estimasi batas atas detak jantungmu saat melakukan aktivitas fisik yang intens, sehingga kamu bisa berolahraga dalam zona target yang tepat.

Cara kerja alat hitung detak jantung online ini sangat sederhana namun esensial. Kamu cukup memasukkan usiamu, dan alat ini akan menghitung estimasi detak jantung maksimal menggunakan rumus standar (220 - usia). Dengan mengetahui angka ini, kamu bisa menentukan zona latihanmu, misalnya zona pembakaran lemak (60-70% dari detak jantung maksimal) atau zona peningkatan stamina (70-85%). Kami ingin membantumu berolahraga dengan lebih cerdas dan terukur demi kesehatan jantung jangka panjang.

Tips olahraga aman dari kami: selalu lakukan pemanasan sebelum memulai latihan intens dan pendinginan setelahnya. Jika kamu baru memulai program olahraga atau memiliki kondisi kesehatan tertentu, sangat disarankan untuk berkonsultasi dengan dokter terlebih dahulu. Jangan memaksakan diri melampaui batas kemampuanmu; dengarkan sinyal dari tubuhmu. Olahraga yang konsisten dan terukur adalah investasi terbaik untuk masa tua yang bugar dan penuh energi.

Semoga kalkulator detak jantung ini membantu perjalanan kebugaranmu. Kami di Kalkulator Warga bangga bisa mendukung semangat hidup sehat seluruh warga Indonesia dengan menyediakan alat bantu yang praktis dan gratis. Teruslah bergerak, jaga kesehatan jantungmu, dan nikmati setiap tetes keringat sebagai langkah menuju dirimu yang lebih sehat. Kami selalu siap mendukung setiap aktivitas olahragamu melalui alat hitung yang jujur dan membantu. Selamat berlatih dan salam sehat!`,
  category: 'Kebugaran',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Usia', 'age', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const age = parseFloat(aInput.value);
      if (age > 0) {
        const maxHr = 220 - age;
        resDisplay.textContent = `${maxHr} BPM (Detak per Menit)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
