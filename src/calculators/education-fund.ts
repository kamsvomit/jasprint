import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  id: 'education-fund',
  name: 'Dana Pendidikan',
  description: 'Hitung berapa banyak tabungan yang Anda butuhkan untuk pendidikan anak di masa depan.',
  longDescription: `Halo, para orang tua yang penuh kasih dan visioner! Kami sangat memahami bahwa pendidikan adalah warisan terbaik yang bisa kita berikan kepada anak-anak kita. Di tengah dunia yang terus berubah, pendidikan yang berkualitas menjadi kunci bagi mereka untuk meraih impian dan masa depan yang cerah. Namun, kita juga menyadari bahwa biaya pendidikan terus meningkat setiap tahunnya. Kalkulator Dana Pendidikan ini kami hadirkan untuk membantumu merencanakan persiapan finansial tersebut sejak dini, agar impian buah hatimu tidak terhambat oleh kendala biaya.

Alat ini dirancang khusus untuk menghitung estimasi biaya pendidikan di masa depan dengan mempertimbangkan biaya saat ini, jangka waktu (kapan anak akan masuk sekolah/kuliah), dan tingkat inflasi pendidikan yang biasanya lebih tinggi dari inflasi umum. Kalkulator ini tidak hanya memberikan angka target total, tetapi juga memberikan gambaran berapa besar tabungan bulanan yang perlu kamu sisihkan. Memiliki rencana yang terukur akan memberikan ketenangan pikiran bagimu sebagai orang tua dalam mendampingi tumbuh kembang anak.

Tips merencanakan dana pendidikan dari kami: mulailah sedini mungkin, bahkan sejak anak baru lahir. Waktu yang panjang akan memberikan kesempatan bagi investasimu untuk tumbuh lebih maksimal. Manfaatkan instrumen keuangan yang sesuai dengan jangka waktu kebutuhanmu; misalnya, gunakan instrumen yang lebih stabil untuk kebutuhan jangka pendek (seperti masuk SD) dan instrumen dengan potensi pertumbuhan lebih tinggi untuk jangka panjang (seperti kuliah). Ingatlah bahwa setiap rupiah yang kamu sisihkan hari ini adalah investasi berharga bagi kesuksesan anakmu di masa depan.

Terima kasih sudah menjadi orang tua yang luar biasa dan peduli pada masa depan anak! Kami di Kalkulator Warga merasa terhormat bisa membantumu merancang jembatan menuju impian buah hatimu. Jangan biarkan angka-angka besar membuatmu gentar; hadapilah dengan perencanaan yang matang dan konsisten. Semoga setiap usaha dan doa yang kamu curahkan untuk pendidikan anakmu membuahkan hasil yang membanggakan dan membawa keberkahan bagi keluarga. Kami selalu siap mendukung setiap langkahmu dalam memberikan yang terbaik bagi generasi penerus.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Biaya Pendidikan Saat Ini', 'cost', 'number', 'Contoh: 100.000.000');
    const { wrapper: yWrap, input: yInput } = createInput('Jangka Waktu (Tahun)', 'years', 'number', '10');
    const { wrapper: iWrap, input: iInput } = createInput('Estimasi Inflasi Pendidikan (%)', 'inflation', 'number', '10');
    
    const calcBtn = createButton('Hitung Target Dana');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(cWrap);
    container.appendChild(yWrap);
    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const cost = parseValue(cInput.value);
      const years = parseValue(yInput.value) || 10;
      const inflation = (parseValue(iInput.value) || 10) / 100;
      
      if (!cInput.value) {
        showError('Harap masukkan biaya pendidikan saat ini.');
        return;
      }

      if (cost > 0) {
        const futureCost = cost * Math.pow(1 + inflation, years);
        const monthlySave = futureCost / (years * 12);
        
        showResult(formatCurrency(futureCost));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.innerHTML = `
          Biaya di masa depan (setelah ${years} tahun).<br>
          Estimasi tabungan: ${formatCurrency(monthlySave)} / bulan.
        `;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Biaya harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = ''; yInput.value = '10'; iInput.value = '10';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator;
