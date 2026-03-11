import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  id: 'retirement-fund',
  name: 'Dana Pensiun',
  description: 'Hitung berapa banyak tabungan yang Anda butuhkan untuk masa pensiun yang nyaman.',
  longDescription: `Halo, para perencana masa depan yang bijaksana! Pernahkah kamu membayangkan bagaimana hari-harimu saat sudah tidak lagi bekerja nanti? Masa pensiun seharusnya menjadi masa keemasan di mana kamu bisa menikmati hasil jerih payahmu dengan tenang, berkumpul bersama keluarga, atau menekuni hobi yang selama ini tertunda. Namun, kenyamanan di masa tua tidak datang begitu saja; ia membutuhkan perencanaan yang matang sejak dini. Kalkulator Dana Pensiun ini kami hadirkan untuk membantumu memvisualisasikan berapa besar "gunung emas" yang perlu kamu bangun agar masa tuamu tetap sejahtera.

Alat ini menggunakan model perhitungan yang mempertimbangkan pengeluaran bulanan yang kamu inginkan saat pensiun, jangka waktu masa pensiun, dan yang paling penting: estimasi inflasi tahunan. Inflasi adalah faktor yang sering terlupakan, padahal ia sangat mempengaruhi daya beli uangmu di masa depan. Dengan memasukkan variabel-variabel ini, kalkulator kami akan memberikan estimasi total dana yang kamu butuhkan. Angka ini mungkin terlihat besar, namun jangan khawatir, tujuannya adalah agar kamu memiliki target yang realistis untuk mulai menabung atau berinvestasi hari ini.

Tips merencanakan pensiun dari kami: mulailah sedini mungkin, karena waktu adalah sahabat terbaik bagi pertumbuhan asetmu. Manfaatkan instrumen investasi yang memiliki potensi imbal hasil di atas tingkat inflasi untuk jangka panjang. Jangan hanya mengandalkan satu sumber pendapatan di masa tua; cobalah untuk membangun portofolio yang beragam. Ingatlah bahwa gaya hidup saat pensiun nanti sangat bergantung pada keputusan keuangan yang kamu ambil hari ini. Jadikan perencanaan ini sebagai bentuk kasih sayangmu pada dirimu sendiri di masa depan.

Terima kasih sudah mulai memikirkan masa depanmu dengan serius! Kami di Kalkulator Warga merasa bangga bisa menjadi teman diskusimu dalam merancang masa tua yang indah. Jangan biarkan masa pensiun menjadi beban pikiran; hadapilah dengan persiapan yang terukur dan penuh optimisme. Semoga setiap langkah kecil yang kamu ambil hari ini membawa keberkahan dan kemandirian finansial di masa depan. Kami selalu siap membantumu menghitung setiap detail impianmu agar menjadi kenyataan yang membahagiakan.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: eWrap, input: eInput } = createInput('Pengeluaran Bulanan Saat Pensiun', 'expense', 'number', 'Contoh: 10.000.000');
    const { wrapper: yWrap, input: yInput } = createInput('Jangka Waktu Pensiun (Tahun)', 'years', 'number', '20');
    const { wrapper: iWrap, input: iInput } = createInput('Estimasi Inflasi Tahunan (%)', 'inflation', 'number', '5');
    
    const calcBtn = createButton('Hitung Dana Pensiun');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(eWrap);
    container.appendChild(yWrap);
    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const expense = parseValue(eInput.value);
      const years = parseValue(yInput.value) || 20;
      const inflation = (parseValue(iInput.value) || 5) / 100;
      
      if (!eInput.value) {
        showError('Harap masukkan pengeluaran bulanan yang diinginkan.');
        return;
      }

      if (expense > 0) {
        // Simple calculation: total expense for 'years' adjusted by inflation
        // This is a simplified model for quick estimation
        const totalMonths = years * 12;
        const total = expense * totalMonths * (1 + inflation * (years / 2));
        
        showResult(formatCurrency(total));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Estimasi total dana untuk ${years} tahun masa pensiun.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Pengeluaran harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      eInput.value = ''; yInput.value = '20'; iInput.value = '5';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator;
