import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  id: 'renovation-calc',
  name: 'Biaya Renovasi',
  description: 'Estimasi biaya renovasi rumah berdasarkan luas area dan kualitas material.',
  longDescription: `Halo, para pemilik rumah yang sedang berencana memberikan wajah baru bagi hunian tercinta! Renovasi rumah adalah langkah besar yang mendebarkan sekaligus menantang bagi keuangan keluarga. Seringkali kita merasa bingung harus mulai dari mana saat ingin menyiapkan anggaran, atau merasa khawatir biaya yang dikeluarkan akan membengkak jauh dari perkiraan awal. Kalkulator Biaya Renovasi ini kami hadirkan sebagai langkah awal untuk membantumu membuat estimasi anggaran kasar, sehingga kamu bisa merencanakan renovasi dengan lebih tenang dan terukur.

Cara kerja alat hitung anggaran renovasi online ini dirancang untuk memberikan gambaran cepat bagi perencanaanmu. Kamu cukup memasukkan total luas area yang ingin direnovasi (dalam meter persegi) dan perkiraan biaya per meter persegi berdasarkan kualitas material yang kamu inginkan (misalnya standar, menengah, atau mewah). Alat ini akan menghitung total estimasi biaya yang mungkin kamu butuhkan. Dengan angka dasar ini, kamu bisa mulai menabung, mencari kontraktor yang tepat, atau menyesuaikan kembali skala renovasi agar tetap sesuai dengan kemampuan finansialmu.

Tips renovasi dari kami: selalu siapkan dana cadangan sebesar 10-20% dari total estimasi biaya untuk mengantisipasi pengeluaran tak terduga yang sering muncul di tengah proses pengerjaan. Selain itu, pastikan kamu memiliki rencana desain yang jelas sebelum mulai membeli material atau menyewa tukang agar tidak terjadi bongkar-pasang yang membuang biaya. Perencanaan yang matang adalah pondasi dari rumah yang indah tanpa harus mengorbankan stabilitas keuangan keluarga. Rumah yang nyaman adalah rumah yang dibangun dengan penuh perhitungan.

Semoga kalkulator estimasi biaya renovasi ini mempermudah langkahmu dalam mewujudkan rumah impian yang lebih segar. Kami di Kalkulator Warga bangga bisa membantu setiap keluarga Indonesia dalam mengelola rencana besar mereka dengan lebih mudah dan transparan. Jangan biarkan kekhawatiran soal biaya menghambat impianmu untuk memiliki hunian yang lebih baik. Teruslah berencana, kelola anggaranmu dengan bijak, dan kami selalu siap mendukung setiap langkah pembangunanmu melalui alat hitung yang praktis dan jujur ini. Selamat merenovasi rumah!`,
  category: 'Rumah',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Luas Area (m2)', 'area', 'number', 'Contoh: 50');
    const { wrapper: qWrap, input: qInput } = createInput('Biaya per m2 (Rp)', 'rate', 'number', 'Contoh: 3.500.000');
    
    const calcBtn = createButton('Hitung Estimasi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(qWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const area = parseValue(aInput.value);
      const rate = parseValue(qInput.value);
      
      if (!aInput.value || !qInput.value) {
        showError('Harap masukkan luas area dan biaya per m2.');
        return;
      }

      if (area > 0 && rate > 0) {
        const total = area * rate;
        showResult(formatCurrency(total));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.textContent = `Estimasi total biaya renovasi.`;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Data harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; qInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator;
