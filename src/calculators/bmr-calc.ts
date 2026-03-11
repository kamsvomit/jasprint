import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator BMR',
  id: 'bmr-calc',
  description: 'Hitung Basal Metabolic Rate (BMR) menggunakan rumus Mifflin-St Jeor.',
  longDescription: `Halo, para pejuang hidup sehat! Pernahkah kamu bertanya-tanya, berapa sebenarnya energi yang dibutuhkan tubuhmu hanya untuk sekadar bernapas, memompa jantung, dan menjaga organ-organ tetap bekerja saat kamu sedang beristirahat total? Itulah yang disebut dengan Basal Metabolic Rate (BMR). Memahami BMR adalah langkah fundamental bagi siapa saja yang ingin mengatur berat badan, baik itu untuk menurunkannya, menjaganya, atau membangun massa otot secara efektif.

Alat ini menggunakan rumus Mifflin-St Jeor yang dikenal sangat akurat untuk populasi modern. Kamu hanya perlu memasukkan berat badan, tinggi badan, dan usiamu. Kalkulator ini akan menghitung jumlah kalori minimum yang dibutuhkan tubuhmu setiap harinya. Angka ini adalah "biaya operasional" dasar tubuhmu. Jika kamu makan di bawah angka ini secara ekstrem dalam jangka panjang, tubuhmu justru bisa masuk ke mode bertahan hidup yang memperlambat metabolisme. Jadi, gunakan angka ini sebagai panduan dasar yang sehat.

Tips kebugaran dari kami: BMR hanyalah titik awal. Total kebutuhan kalori harianmu akan lebih tinggi tergantung pada tingkat aktivitas fisikmu. Jika kamu ingin menurunkan berat badan, usahakan untuk menciptakan defisit kalori yang moderat (sekitar 200-500 kkal di bawah total kebutuhan harian, bukan di bawah BMR). Jangan lupa untuk tetap mengonsumsi nutrisi yang seimbang dan cukup protein agar massa ototmu tetap terjaga. Kesehatan adalah investasi jangka panjang, jadi lakukanlah segala sesuatunya dengan cara yang berkelanjutan.

Semoga perjalanan sehatmu menyenangkan dan membuahkan hasil! Kami di Kalkulator Warga sangat mendukung setiap langkah kecilmu menuju gaya hidup yang lebih bugar. Jangan biarkan angka-angka ini membuatmu stres; jadikan mereka sebagai teman yang membantumu memahami tubuhmu sendiri dengan lebih baik. Ingat, setiap tubuh itu unik, dan yang terpenting adalah bagaimana kamu merasa nyaman dan bertenaga dalam menjalani aktivitas sehari-hari.`,
  category: 'Kebugaran',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    const { wrapper: aWrap, input: aInput } = createInput('Usia', 'age', 'number');
    
    const calcBtn = createButton('Hitung BMR');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(aWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const h = parseFloat(hInput.value);
      const a = parseFloat(aInput.value);
      
      if (w > 0 && h > 0 && a > 0) {
        const bmr = 10 * w + 6.25 * h - 5 * a + 5;
        resDisplay.textContent = `${Math.round(bmr)} kkal / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = ''; aInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default calculator;
