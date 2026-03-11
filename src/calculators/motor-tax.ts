import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pajak Motor (STNK)',
  id: 'motor-tax',
  description: 'Estimasi pajak motor tahunan.',
  longDescription: `Halo, para pengendara motor yang taat aturan! Kami tahu bahwa motor bukan sekadar alat transportasi, melainkan partner setia dalam menembus kemacetan dan mengejar waktu setiap harinya. Namun, sebagai pemilik kendaraan, ada kewajiban tahunan yang tidak boleh terlupakan, yaitu membayar Pajak Kendaraan Bermotor (PKB). Kalkulator Pajak Motor ini kami hadirkan untuk membantumu memprediksi berapa biaya perpanjangan STNK yang harus kamu siapkan, sehingga kamu bisa mengatur anggaran bulanan dengan lebih tenang tanpa ada pengeluaran yang mengejutkan.

Cara kerja alat ini sangat praktis. Kamu cukup memasukkan Nilai Jual Kendaraan Bermotor (NJKB) motormu—yang biasanya bisa kamu lihat di lembar STNK bagian belakang. Alat ini akan menghitung estimasi PKB (biasanya 2% dari NJKB untuk kepemilikan pertama) dan menambahkan biaya SWDKLLJ (Sumbangan Wajib Dana Kecelakaan Lalu Lintas Jalan) yang umum berlaku untuk sepeda motor. Meskipun ini adalah estimasi, angka yang dihasilkan akan memberikan gambaran yang sangat mendekati tagihan aslinya.

Tips dari kami untuk urusan pajak kendaraan: usahakan untuk selalu membayar pajak tepat waktu sebelum tanggal jatuh tempo yang tertera di STNK. Keterlambatan pembayaran tidak hanya berisiko terkena denda administratif yang terus bertambah, tapi juga bisa membuatmu merasa tidak tenang saat ada pemeriksaan surat-surat di jalan. Jika kamu memiliki lebih dari satu motor atas nama yang sama, ingatlah bahwa ada tarif pajak progresif yang mungkin berlaku. Menjadi pengendara yang tertib administrasi adalah bentuk kepedulianmu terhadap keselamatan dan kenyamanan bersama di jalan raya.

Hati-hati di jalan dan selamat sampai tujuan! Kami di Kalkulator Warga bangga bisa menjadi asisten setiamu dalam mengelola biaya kepemilikan kendaraan. Jangan biarkan urusan pajak menjadi beban; jadikan itu sebagai bagian dari perawatan rutin kendaraanmu agar tetap legal dan nyaman digunakan. Semoga setiap perjalananmu selalu aman, lancar, dan membawa keberkahan bagi dirimu dan keluarga. Kami selalu siap membantumu menghitung setiap detail kebutuhan harianmu dengan cara yang paling mudah.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: nWrap, input: nInput } = createInput('Nilai Jual (NJKB)', 'njkb', 'number', 'Contoh: 15.000.000');
    
    const calcBtn = createButton('Hitung Estimasi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(nWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const njkb = parseValue(nInput.value);
      if (njkb > 0) {
        const pkb = njkb * 0.02; 
        const swdkllj = 35000; // Motor
        resDisplay.innerHTML = `
          <div>${formatCurrency(pkb + swdkllj)}</div>
          <div class="text-xs text-gray-500 mt-1">Estimasi PKB + SWDKLLJ</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      nInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
