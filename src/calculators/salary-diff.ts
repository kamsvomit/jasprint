import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Selisih Gaji',
  id: 'salary-diff',
  description: 'Bandingkan dua penawaran gaji (Gross vs Net).',
  longDescription: `Halo, para profesional hebat yang sedang menapaki tangga karier! Mendapatkan penawaran kerja baru adalah momen yang sangat membanggakan, namun seringkali membingungkan saat kita harus membandingkan dua angka gaji yang berbeda formatnya. Ada perusahaan yang menawarkan gaji "Gross" (gaji kotor sebelum potong pajak dan BPJS), dan ada yang menawarkan "Net" (gaji bersih yang kamu terima di tangan). Kalkulator Selisih Gaji ini hadir untuk membantumu melihat perbandingan yang lebih adil, sehingga kamu bisa memilih tawaran yang benar-benar memberikan manfaat finansial terbaik untukmu.

Cara kerja alat banding gaji online ini sangat membantu dalam proses negosiasi kariermu. Kamu bisa memasukkan angka Gaji A (misalnya dalam format Gross) dan Gaji B (misalnya dalam format Net). Alat ini akan melakukan estimasi perhitungan kasar untuk menyetarakan keduanya, sehingga kamu bisa melihat selisih sebenarnya yang akan masuk ke rekeningmu setiap bulan. Dengan informasi ini, kamu tidak lagi terjebak oleh angka nominal yang terlihat besar di awal namun ternyata memiliki potongan yang banyak, sehingga keputusan kariermu didasarkan pada data yang nyata.

Tips negosiasi gaji dari kami: selain gaji pokok, perhatikan juga tunjangan-tunjangan lain seperti asuransi kesehatan tambahan, bonus tahunan, tunjangan transportasi, dan budaya kerja di perusahaan tersebut. Jangan ragu untuk menanyakan detail potongan pajak (PPH 21) dan iuran BPJS kepada pihak HRD agar kamu mendapatkan gambaran yang sangat akurat. Karier yang cemerlang dimulai dari keberanian untuk menegosiasikan nilai dirimu dengan cara yang profesional dan berbasis data. Kamu berhak mendapatkan apresiasi yang layak atas kerja kerasmu.

Semoga kalkulator selisih gaji ini mempermudah langkahmu dalam mengambil keputusan karier yang besar. Kami di Kalkulator Warga bangga bisa mendukung kemajuan karier seluruh warga Indonesia dengan menyediakan alat bantu yang praktis dan memudahkan. Jangan biarkan kebingungan soal angka menghambat kesuksesanmu. Teruslah berkembang, raih peluang yang ada, dan kami selalu siap mendukung setiap langkah perjuangan kariermu melalui alat hitung yang jujur dan membantu. Selamat menempuh babak baru dalam kariermu!`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: aWrap, input: aInput } = createInput('Gaji A (Gross)', 'a', 'number', 'Contoh: 10.000.000');
    const { wrapper: bWrap, input: bInput } = createInput('Gaji B (Net)', 'b', 'number', 'Contoh: 9.500.000');
    
    const calcBtn = createButton('Bandingkan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(aWrap);
    container.appendChild(bWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const a = parseValue(aInput.value);
      const b = parseValue(bInput.value);
      if (a > 0 && b > 0) {
        const aNet = a * 0.9; // Estimasi kasar potong pajak/bpjs
        const diff = b - aNet;
        resDisplay.innerHTML = `
          <div class="${diff > 0 ? 'text-green-400' : 'text-red-400'}">${formatCurrency(Math.abs(diff))}</div>
          <div class="text-xs text-gray-500 mt-1">${diff > 0 ? 'Gaji B lebih tinggi' : 'Gaji A (estimasi net) lebih tinggi'}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      aInput.value = ''; bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
