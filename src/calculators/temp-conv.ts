import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Konversi Suhu',
  id: 'temp-conv',
  description: 'Konversi antara Celsius, Fahrenheit, dan Kelvin.',
  longDescription: `Halo, para penjelajah dunia, pecinta sains, dan koki rumah tangga yang teliti! Memahami suhu adalah bagian penting dari kehidupan kita sehari-hari—mulai dari mengecek cuaca saat ingin bepergian, mengikuti resep masakan internasional, hingga mengerjakan tugas laboratorium. Namun, adanya perbedaan satuan suhu seperti Celsius, Fahrenheit, dan Kelvin seringkali membuat kita bingung. Kalkulator Konversi Suhu Lengkap ini kami hadirkan sebagai solusi satu pintu untuk mengubah berbagai satuan suhu dengan cepat, mudah, dan akurat.

Cara kerja alat konversi suhu online ini sangat fleksibel dan mencakup semua kebutuhanmu. Kamu bisa memilih satuan asal (misalnya Celsius) dan satuan tujuan (seperti Fahrenheit atau Kelvin), lalu masukkan nilainya. Alat ini akan secara otomatis menghitung konversinya menggunakan rumus standar internasional. Sangat berguna bagi kamu yang sedang membaca berita cuaca dari luar negeri, mempelajari termodinamika, atau sedang mengatur suhu oven berdasarkan resep dari buku masak asing. Kami ingin memastikan informasi suhu yang kamu terima selalu jelas dan dapat dipahami.

Tips menarik tentang suhu: tahukah kamu bahwa Celsius adalah standar yang paling umum digunakan di dunia, sementara Fahrenheit masih digunakan secara luas di Amerika Serikat? Sedangkan Kelvin adalah satuan standar dalam dunia sains karena dimulai dari titik nol absolut. Memahami perbedaan ini akan memperluas wawasanmu dan membantumu berkomunikasi lebih baik dalam konteks global maupun ilmiah. Pengetahuan adalah kunci untuk beradaptasi dengan berbagai standar yang ada di dunia.

Semoga kalkulator konversi suhu ini bermanfaat untuk setiap aktivitas harian dan studimu. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan warga melalui alat bantu yang praktis dan akurat. Jangan biarkan perbedaan satuan menghambat pemahamanmu. Teruslah belajar, jelajahi dunia dengan penuh rasa ingin tahu, dan kami selalu siap mendukung setiap langkah informasimu melalui alat hitung yang jujur dan membantu. Selamat beraktivitas dan semoga harimu selalu menyenangkan!`,
  category: 'Konversi',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Nilai', 'val', 'number');
    const fromSelect = document.createElement('select');
    fromSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-2';
    ['Celsius', 'Fahrenheit', 'Kelvin'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      fromSelect.appendChild(opt);
    });
    
    const toSelect = document.createElement('select');
    toSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-4';
    ['Celsius', 'Fahrenheit', 'Kelvin'].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u; opt.textContent = u;
      toSelect.appendChild(opt);
    });

    const calcBtn = createButton('Konversi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(fromSelect);
    container.appendChild(toSelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      let val = parseValue(vInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;
      
      if (!isNaN(val)) {
        // Convert to Celsius first
        let c = val;
        if (from === 'Fahrenheit') c = (val - 32) * 5/9;
        if (from === 'Kelvin') c = val - 273.15;
        
        // Convert from Celsius to target
        let res = c;
        if (to === 'Fahrenheit') res = (c * 9/5) + 32;
        if (to === 'Kelvin') res = c + 273.15;
        
        resDisplay.textContent = `${res.toFixed(2)} ${to}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
