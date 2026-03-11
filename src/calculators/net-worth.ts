import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kekayaan Bersih',
  id: 'net-worth',
  description: 'Hitung total kekayaan bersih Anda (Aset - Liabilitas).',
  longDescription: `Halo, para pejuang kemandirian finansial yang luar biasa! Memahami kondisi keuangan pribadi bukan hanya soal berapa banyak uang yang ada di rekening bank, melainkan gambaran besar tentang seluruh aset dan kewajiban yang kamu miliki. Kekayaan Bersih (Net Worth) adalah indikator kesehatan finansial yang paling jujur untuk mengetahui apakah kamu sedang melangkah maju menuju tujuan keuanganmu. Kalkulator Kekayaan Bersih ini kami sediakan untuk membantumu memantau progres finansialmu dengan cara yang sederhana dan transparan.

Cara kerja alat hitung kekayaan pribadi online ini sangat mendasar namun sangat bermakna. Kamu cukup memasukkan total nilai seluruh asetmu (seperti tabungan, investasi, properti, kendaraan) dan dikurangi dengan total seluruh liabilitas atau hutangmu (seperti cicilan KPR, kredit kendaraan, hutang kartu kredit). Hasilnya adalah angka kekayaan bersihmu saat ini. Dengan melakukan perhitungan ini secara berkala, kamu bisa mengevaluasi apakah asetmu terus tumbuh atau justru hutangmu yang semakin menumpuk, sehingga kamu bisa mengambil langkah perbaikan yang tepat.

Tips mengelola kekayaan dari kami: fokuslah untuk terus meningkatkan nilai aset produktif dan secara konsisten melunasi hutang-hutang konsumtif. Jangan terlalu terpaku pada angka nominalnya di awal, yang terpenting adalah tren pertumbuhannya dari waktu ke waktu. Perencanaan keuangan yang baik dimulai dari kejujuran pada diri sendiri tentang kondisi saat ini. Jadikan angka kekayaan bersih ini sebagai motivasi untuk terus belajar mengelola uang dengan lebih bijak demi masa depan yang lebih sejahtera dan bebas dari beban finansial.

Semoga kalkulator kekayaan bersih ini menjadi alat bantu yang memotivasi perjalanan finansialmu. Kami di Kalkulator Warga bangga bisa mendukung semangat literasi keuangan seluruh warga Indonesia untuk masa depan yang lebih mandiri. Teruslah berjuang, kelola asetmu dengan penuh tanggung jawab, dan jangan pernah berhenti untuk mengembangkan diri. Kami selalu siap mendukung setiap langkah perjuangan finansialmu melalui alat bantu yang praktis, jujur, dan memudahkan ini. Selamat merencanakan masa depan yang cerah!`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Total Aset (Rp)', 'assets', 'number');
    const { wrapper: lWrap, input: lInput } = createInput('Total Liabilitas/Hutang (Rp)', 'liab', 'number');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const assets = parseFloat(aInput.value) || 0;
      const liab = parseFloat(lInput.value) || 0;
      const net = assets - liab;
      showResult(formatCurrency(net));
    };

    resetBtn.onclick = () => {
      aInput.value = ''; lInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
