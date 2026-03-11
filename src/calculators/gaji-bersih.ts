import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const gajiBersih: Calculator = {
  id: 'gaji-bersih',
  name: 'Gaji Bersih',
  description: 'Hitung gaji bersih setelah potongan (BPJS, Pajak, dll).',
  longDescription: `Halo, rekan-rekan pekerja keras. Kami mengerti bahwa menunggu hari gajian adalah momen yang penuh harap sekaligus cemas. Di tengah kenaikan harga barang pokok, mengetahui berapa tepatnya uang yang akan masuk ke rekening adalah hal krusial untuk mengatur napas keuangan keluarga. Kalkulator Gaji Bersih ini kami rancang untuk membantumu melihat angka riil yang akan kamu bawa pulang, sehingga kamu bisa merencanakan belanja bulanan dengan lebih tenang tanpa takut "boncos" di tengah jalan.

Cara menggunakan alat ini sangat mudah. Masukkan gaji kotor (gross) sesuai kontrak atau slip gajimu, lalu masukkan total potongan yang biasanya ada, seperti iuran BPJS, pajak PPh 21, atau potongan koperasi. Alat ini akan melakukan pengurangan sederhana untuk menampilkan gaji bersihmu. Kami sengaja membuatnya simpel agar kamu tidak perlu pusing dengan rumus akuntansi yang rumit di saat pikiranmu sudah penuh dengan target pekerjaan.

Tips keuangan dari kami: setelah tahu gaji bersihmu, cobalah terapkan rumus 50/30/20. Alokasikan 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan atau dana darurat. Dana darurat sangat penting bagi kita para pekerja agar tetap memiliki jaring pengaman saat terjadi hal-hal yang tidak terduga. Ingat, sekecil apapun uang yang bisa kamu sisihkan, itu adalah bentuk kasih sayangmu pada masa depanmu sendiri.

Tetap semangat bekerja, ya! Setiap tetes keringatmu adalah bukti cinta untuk orang-orang tersayang. Jangan biarkan potongan gaji membuatmu patah semangat; fokuslah pada apa yang bisa kamu kelola dengan bijak. Kamu adalah tulang punggung yang hebat, dan kami di Kalkulator Warga bangga bisa membantumu mengelola hasil jerih payahmu dengan lebih baik.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Kotor (Gross)', 'gross', 'number');
    const { wrapper: pWrap, input: pInput } = createInput('Total Potongan', 'deductions', 'number', '0');
    
    const calcBtn = createButton('Hitung Gaji Bersih');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const gross = parseValue(gInput.value);
      const deductions = parseValue(pInput.value) || 0;
      
      if (!gInput.value) {
        showError('Harap masukkan nominal gaji kotor Anda.');
        return;
      }

      if (gross >= 0) {
        const net = gross - deductions;
        showResult(formatCurrency(net));
      } else {
        showError('Gaji kotor tidak boleh negatif.');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; pInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default gajiBersih;
