import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator KPR',
  id: 'kpr-calc',
  description: 'Hitung cicilan bulanan untuk Kredit Pemilikan Rumah.',
  longDescription: `Halo, calon pemilik rumah impian. Memiliki hunian sendiri adalah salah satu pencapaian terbesar dalam hidup, sebuah tempat untuk pulang dan membangun kenangan bersama orang-orang tercinta. Namun, kami paham bahwa proses menuju ke sana seringkali terasa menakutkan, terutama saat berhadapan dengan angka-angka cicilan yang besar. Kalkulator KPR ini hadir untuk menemani langkahmu, memberikan gambaran yang jelas dan transparan tentang komitmen keuangan yang akan kamu ambil, sehingga impianmu memiliki rumah tidak menjadi beban yang menyesakkan.

Cara kerja alat ini dirancang agar mudah dipahami oleh siapa saja. Masukkan harga rumah yang kamu incar, jumlah uang muka (DP) yang sudah kamu siapkan, suku bunga tahunan dari bank, serta jangka waktu atau tenor pinjaman. Alat ini akan menghitung estimasi cicilan bulanan yang harus kamu bayar. Dengan mengetahui angka ini lebih awal, kamu bisa menyesuaikan pilihan rumah atau memperbesar tabungan DP agar cicilan nantinya tetap terasa ringan di kantong.

Tips dari kami untuk kamu yang sedang berjuang: pastikan cicilan KPR-mu tidak melebihi 30% dari total penghasilan bulananmu. Ini penting agar kamu masih memiliki ruang gerak untuk kebutuhan hidup sehari-hari dan tabungan lainnya. Jangan terburu-buru, bandingkan bunga dari beberapa bank, dan pilihlah yang paling sesuai dengan kondisi keuanganmu. Membeli rumah adalah maraton, bukan sprint; butuh kesabaran dan perencanaan yang matang agar kamu bisa menikmati rumah barumu dengan hati yang tenang.

Jangan pernah menyerah pada impianmu. Mungkin hari ini terasa berat untuk mengumpulkan DP, tapi setiap rupiah yang kamu sisihkan membawamu selangkah lebih dekat ke pintu rumahmu sendiri. Kamu sedang membangun masa depan, dan itu adalah perjuangan yang sangat mulia. Kami di Kalkulator Warga mendoakan agar proses KPR-mu berjalan lancar dan kamu segera bisa menempati hunian yang nyaman. Kami bangga bisa menjadi bagian kecil dari perjalanan besarmu ini.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Harga Rumah', 'price', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Uang Muka (DP)', 'dp', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Bunga Tahunan (%)', 'rate', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tenor (Tahun)', 'term', 'number');
    
    const calcBtn = createButton('Hitung Cicilan', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(dWrap);
    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(pInput.value);
      const dp = parseValue(dInput.value) || 0;
      const p = price - dp;
      const r = (parseValue(rInput.value) / 100) / 12;
      const n = parseValue(tInput.value) * 12;
      
      if (p > 0 && r > 0 && n > 0) {
        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resDisplay.textContent = `${formatCurrency(monthly)} / bulan`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; dInput.value = ''; rInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
