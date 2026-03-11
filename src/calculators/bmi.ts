import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue, setupEnterKeyNavigation } from '../utils';

export const bmi: Calculator = {
  id: 'bmi',
  name: 'BMI (Body Mass Index)',
  description: 'Hitung indeks massa tubuh untuk memantau kesehatan Anda.',
  longDescription: `Halo, teman-teman pejuang keluarga. Kami tahu betapa melelahkannya hari-hari yang kamu lalui—berangkat pagi, pulang malam, demi masa depan yang lebih baik. Kadang, dalam hiruk-pikuk pekerjaan dan tanggung jawab, kita lupa untuk sekadar menarik napas dan memperhatikan diri sendiri. Kalkulator BMI ini hadir bukan untuk menambah beban pikiranmu, melainkan sebagai teman setia yang ingin memastikan bahwa tubuhmu tetap kuat untuk terus melangkah. Kami ingin kamu tahu bahwa kesehatanmu adalah aset paling berharga, jauh melampaui angka-angka di slip gaji.

Cara kerja alat ini sangat sederhana, kok. Kamu hanya perlu memasukkan berat badanmu dalam kilogram dan tinggi badan dalam sentimeter. Secara teknis, BMI atau Indeks Massa Tubuh dihitung dengan membagi berat badanmu dengan kuadrat tinggi badanmu (dalam meter). Hasilnya akan memberikan gambaran kasar apakah berat badanmu sudah ideal, kurang, atau mungkin perlu sedikit perhatian lebih. Ini adalah cara paling praktis bagi warga awam untuk memantau kondisi fisik tanpa harus menggunakan alat medis yang rumit.

Sebagai bentuk dukungan kami, ada sedikit tips kesehatan untukmu. Jika hasil BMI menunjukkan angka yang kurang ideal, jangan berkecil hati. Cobalah untuk mulai berjalan kaki setidaknya 15 menit setiap hari atau mengganti camilan gorengan dengan buah-buahan segar. Ingat, perubahan kecil yang konsisten jauh lebih baik daripada diet ekstrem yang menyiksa mental. Jangan lupa juga untuk minum air putih yang cukup agar fokusmu tetap terjaga saat bekerja keras mencari nafkah.

Tetap semangat ya! Kamu sudah melakukan pekerjaan yang luar biasa sejauh ini. Jangan biarkan angka BMI ini membuatmu merasa gagal atau tertekan. Anggap saja ini sebagai pengingat lembut untuk lebih menyayangi dirimu sendiri. Kamu adalah pahlawan bagi orang-orang tersayang di rumah, dan pahlawan butuh tubuh yang sehat untuk terus berjuang. Kami di Kalkulator Warga selalu ada di sini untuk mendukung setiap langkah kecilmu menuju hidup yang lebih seimbang dan bahagia.`,
  category: 'Kesehatan',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Berat Badan (kg)', 'weight', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Badan (cm)', 'height', 'number');
    
    const calcBtn = createButton('Hitung BMI');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const weight = parseValue(wInput.value);
      const heightCm = parseValue(hInput.value);
      
      if (!wInput.value || !hInput.value) {
        showError('Harap masukkan berat dan tinggi badan Anda.');
        return;
      }

      if (weight > 0 && heightCm > 0) {
        const heightM = heightCm / 100;
        const bmiVal = weight / (heightM * heightM);
        
        let status = '';
        let color = '';
        
        if (bmiVal < 18.5) { status = 'Kurus'; color = 'text-blue-500'; }
        else if (bmiVal < 25) { status = 'Normal'; color = 'text-green-500'; }
        else if (bmiVal < 30) { status = 'Gemuk'; color = 'text-yellow-500'; }
        else { status = 'Obesitas'; color = 'text-red-500'; }
        
        showResult(`${bmiVal.toFixed(1)}`);
        const statusEl = document.createElement('div');
        statusEl.className = `text-sm font-medium ${color} mt-1`;
        statusEl.textContent = `Status: ${status}`;
        resWrap.querySelector('div:last-child')?.appendChild(statusEl);
      } else {
        showError('Data yang dimasukkan harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default bmi;
