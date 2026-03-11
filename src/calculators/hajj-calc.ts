import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  id: 'hajj-calc',
  name: 'Dana Haji/Umroh',
  description: 'Hitung berapa banyak tabungan yang Anda butuhkan untuk ibadah Haji atau Umroh.',
  longDescription: `Halo, calon tamu Allah! Menunaikan ibadah Haji atau Umroh adalah impian terbesar bagi setiap Muslim. Kita semua merindukan momen saat bisa bersimpuh di depan Ka'bah dan berziarah ke makam Rasulullah SAW. Namun, kita juga tahu bahwa biaya perjalanan suci ini tidaklah sedikit dan cenderung naik setiap tahunnya. Kalkulator Dana Haji dan Umroh ini kami buat khusus untuk membantumu merencanakan tabungan dengan lebih matang, agar niat sucimu tidak hanya menjadi angan-angan, tapi benar-benar terwujud di masa depan.

Cara kerja alat hitung dana haji online ini sangat membantu dalam perencanaan jangka panjang. Kamu hanya perlu memasukkan estimasi biaya haji atau umroh saat ini, target tahun keberangkatanmu, serta perkiraan kenaikan biaya per tahun (inflasi). Alat ini akan menghitung berapa total biaya yang harus kamu siapkan di masa depan dan berapa jumlah tabungan bulanan yang harus kamu sisihkan mulai sekarang. Dengan angka yang jelas, kamu bisa lebih disiplin dalam menabung dan mengelola pengeluaran harian demi mewujudkan panggilan ke tanah suci.

Tips dari kami untuk kamu yang sedang berjuang: jangan pernah merasa tabunganmu terlalu kecil. Mulailah dengan apa yang kamu punya, karena setiap rupiah yang kamu sisihkan adalah bukti kesungguhan niatmu. Kamu juga bisa mempertimbangkan untuk menabung dalam bentuk emas atau instrumen investasi syariah lainnya untuk melindungi nilai tabunganmu dari inflasi. Ingatlah bahwa Allah memanggil mereka yang terpanggil hatinya, dan perencanaan yang matang adalah bagian dari ikhtiar kita untuk memenuhi panggilan tersebut.

Semoga niat tulusmu untuk beribadah ke tanah suci dimudahkan jalannya oleh Allah SWT. Kami di Kalkulator Warga merasa sangat terhormat bisa menjadi bagian kecil dari persiapan spiritual dan finansialmu. Jangan lelah untuk berdoa dan berusaha, karena tidak ada yang mustahil bagi mereka yang bersungguh-sungguh. Semoga kita semua diberikan kesempatan untuk menjadi tamu Allah dan kembali dengan haji yang mabrur serta umroh yang maqbul. Amin ya Rabbal Alamin.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: cWrap, input: cInput } = createInput('Biaya Saat Ini (Rp)', 'cost', 'number', 'Contoh: 50.000.000');
    const { wrapper: yWrap, input: yInput } = createInput('Target Berangkat (Tahun)', 'years', 'number', '5');
    const { wrapper: iWrap, input: iInput } = createInput('Estimasi Kenaikan Biaya (%)', 'inflation', 'number', '5');
    
    const calcBtn = createButton('Hitung Target');
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
      const years = parseValue(yInput.value) || 5;
      const inflation = (parseValue(iInput.value) || 5) / 100;
      
      if (!cInput.value) {
        showError('Harap masukkan biaya saat ini.');
        return;
      }

      if (cost > 0) {
        const futureCost = cost * Math.pow(1 + inflation, years);
        const monthlySave = futureCost / (years * 12);
        
        showResult(formatCurrency(futureCost));
        const infoEl = document.createElement('div');
        infoEl.className = 'text-sm font-medium text-slate-500 mt-1';
        infoEl.innerHTML = `
          Estimasi biaya di masa depan.<br>
          Tabungan per bulan: ${formatCurrency(monthlySave)}.
        `;
        resWrap.querySelector('div:last-child')?.appendChild(infoEl);
      } else {
        showError('Biaya harus lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      cInput.value = ''; yInput.value = '5'; iInput.value = '5';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default calculator;
