import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator THR',
  id: 'thr-calc',
  description: 'Hitung Tunjangan Hari Raya (THR) proporsional Anda.',
  longDescription: `Halo, para pejuang nafkah yang sedang menanti hari kemenangan! Kami sangat memahami betapa berartinya Tunjangan Hari Raya (THR) bagi setiap pekerja. THR bukan sekadar tambahan penghasilan, melainkan simbol penghargaan atas dedikasimu selama setahun dan menjadi bekal penting untuk merayakan momen spesial bersama keluarga tercinta. Kalkulator THR ini kami hadirkan agar kamu bisa menghitung berapa hak yang seharusnya kamu terima, sehingga kamu bisa merencanakan pengeluaran hari raya dengan lebih tenang dan bijak.

Cara kerja alat ini mengikuti regulasi ketenagakerjaan yang berlaku di Indonesia. Jika kamu sudah bekerja selama 12 bulan atau lebih secara terus-menerus, kamu berhak mendapatkan THR sebesar satu bulan gaji. Namun, jika masa kerjamu kurang dari 12 bulan (tapi minimal sudah 1 bulan), THR akan dihitung secara proporsional. Kamu cukup memasukkan gaji bulananmu dan jumlah bulan masa kerjamu. Alat ini akan menghitung otomatis nominal THR yang menjadi hakmu, memberikan kejelasan finansial di tengah persiapan hari raya yang biasanya cukup padat.

Tips mengelola THR dari kami: meskipun hari raya identik dengan belanja dan berbagi, usahakan untuk tetap bijak dalam mengalokasikan dana THR-mu. Prioritaskan untuk melunasi kewajiban atau utang jangka pendek jika ada, dan sisihkan sebagian untuk tabungan atau dana darurat. Jangan habiskan seluruh THR hanya untuk konsumsi sesaat; sisakan sedikit untuk membantu transisi keuanganmu setelah masa libur hari raya berakhir. Dengan perencanaan yang baik, kamu bisa merayakan hari kemenangan dengan hati yang gembira tanpa harus merasa pusing dengan kondisi dompet di kemudian hari.

Selamat menyambut hari raya dengan penuh sukacita! Kami di Kalkulator Warga ikut berbahagia atas hasil jerih payahmu selama ini. Semoga THR yang kamu terima membawa keberkahan dan kebahagiaan bagi seluruh anggota keluarga. Teruslah bekerja dengan penuh semangat dan integritas, karena setiap tetes keringatmu adalah ibadah yang sangat berharga. Kami selalu siap membantumu mengelola setiap aspek keuangan harianmu agar hidupmu terasa lebih ringan dan terencana.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Bulanan', 'salary', 'number', 'Contoh: 5.000.000');
    const { wrapper: mWrap, input: mInput } = createInput('Masa Kerja (Bulan)', 'months', 'number', 'Contoh: 12');
    
    const calcBtn = createButton('Hitung THR', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(mWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      const months = parseValue(mInput.value);
      if (salary > 0 && months > 0) {
        let thr = salary;
        if (months < 12) {
          thr = (months / 12) * salary;
        }
        resDisplay.textContent = formatCurrency(thr);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; mInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
