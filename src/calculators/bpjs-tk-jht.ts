import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Estimasi JHT BPJS TK',
  id: 'bpjs-tk-jht',
  description: 'Hitung estimasi saldo Jaminan Hari Tua (JHT) Anda.',
  longDescription: `Halo, kamu yang sudah bekerja keras bertahun-tahun dan ingin tahu berapa kira-kira saldo JHT yang sudah terkumpul. Jaminan Hari Tua atau JHT adalah salah satu manfaat terpenting dari BPJS Ketenagakerjaan—sebuah tabungan paksa yang disiapkan negara untuk memastikan kamu punya bekal finansial saat memasuki masa pensiun atau menghadapi situasi tak terduga. Sayangnya, banyak pekerja yang tidak benar-benar tahu berapa saldo JHT mereka sampai tiba saatnya mencairkan. Kalkulator Estimasi JHT ini hadir supaya kamu tidak lagi buta soal hak-hakmu sendiri.

Cara menggunakannya mudah. Masukkan gaji bulananmu dan sudah berapa tahun kamu bekerja (atau sudah berapa lama kamu terdaftar di BPJS Ketenagakerjaan), lalu klik Hitung Estimasi. Secara teknis, iuran JHT BPJS TK totalnya adalah 5,7% dari upah—sebesar 3,7% ditanggung perusahaan dan 2% dari gajimu sendiri. Jadi selama ini sebenarnya ada uang yang ditabungkan setiap bulan atas namamu, dengan tambahan imbal hasil (bunga) yang ditetapkan setiap tahun oleh pemerintah. Hasil kalkulasi ini adalah estimasi—angka pastinya bisa kamu cek langsung di aplikasi JMO (Jamsostek Mobile) atau kantor BPJS Ketenagakerjaan terdekat.

Tips penting yang perlu kamu tahu: JHT bisa dicairkan sebagian (maksimal 30% untuk keperluan perumahan atau 10% untuk kebutuhan lain) setelah 10 tahun kepesertaan. Pencairan penuh baru bisa dilakukan saat kamu memasuki usia 56 tahun, berhenti bekerja (resign atau PHK), atau mengalami cacat total tetap. Pastikan data kepesertaanmu selalu aktif dan gajimu dilaporkan sesuai upah riil—karena semakin akurat data yang dilaporkan perusahaan, semakin besar manfaat JHT yang kamu terima di kemudian hari.

Jangan anggap remeh JHT, ya! Uang yang terasa "kecil" dipotong setiap bulan itu, jika dikumpulkan selama 10–20 tahun, bisa menjadi jumlah yang sangat signifikan dan meringankan bebanmu di masa depan. Ini adalah salah satu bentuk proteksi finansial yang nyata untuk dirimu dan keluargamu. Kami di Kalkulator Warga ingin mengingatkanmu bahwa setiap rupiah iuran yang kamu bayar adalah investasi untuk versi dirimu di masa depan—dan kamu berhak mendapatkan yang terbaik dari itu.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Bulanan', 'salary', 'number', 'Contoh: 5.000.000');
    const { wrapper: tWrap, input: tInput } = createInput('Lama Bekerja (Tahun)', 'years', 'number', 'Contoh: 5');
    
    const calcBtn = createButton('Hitung Estimasi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      const years = parseValue(tInput.value);
      if (salary > 0 && years > 0) {
        // JHT: 5.7% (3.7% perusahaan, 2% pekerja)
        const monthlyContribution = salary * 0.057;
        const total = monthlyContribution * 12 * years;
        // Asumsi bunga 5% per tahun sederhana
        const withInterest = total * 1.1; 
        resDisplay.textContent = formatCurrency(withInterest);
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};