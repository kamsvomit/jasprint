import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Pajak Mobil (PKB)',
  id: 'pkb-calc',
  description: 'Estimasi pajak kendaraan bermotor tahunan (PKB).',
  longDescription: `Halo, para pemilik mobil yang taat aturan! Memiliki mobil sendiri adalah sebuah kemudahan yang luar biasa untuk mobilitas keluarga, namun sebagai pemilik kendaraan, ada kewajiban tahunan yang tidak boleh terlupakan, yaitu membayar Pajak Kendaraan Bermotor (PKB). Kami paham bahwa seringkali kita merasa bingung saat ingin menyiapkan anggaran untuk perpanjangan STNK tahunan. Kalkulator Pajak Mobil ini kami hadirkan untuk membantumu memprediksi berapa biaya PKB yang harus kamu siapkan, sehingga kamu bisa mengatur keuangan bulanan dengan lebih tenang dan terencana.

Cara kerja alat hitung pajak mobil online ini sangat praktis. Kamu cukup memasukkan Nilai Jual Kendaraan Bermotor (NJKB) mobilmu—yang biasanya bisa kamu temukan di lembar STNK bagian belakang. Alat ini akan menghitung estimasi PKB (biasanya 2% dari NJKB untuk kepemilikan mobil pertama). Meskipun ini adalah estimasi awal, angka yang dihasilkan akan memberikan gambaran yang sangat mendekati tagihan aslinya, sehingga kamu tidak akan kaget saat datang ke Samsat atau membayar melalui aplikasi online.

Tips dari kami untuk urusan pajak kendaraan: usahakan untuk selalu membayar pajak tepat waktu sebelum tanggal jatuh tempo. Keterlambatan pembayaran tidak hanya berisiko terkena denda administratif yang terus bertambah, tapi juga bisa membuatmu merasa tidak nyaman saat berkendara di jalan raya. Jika kamu memiliki lebih dari satu mobil atas nama yang sama, ingatlah bahwa ada tarif pajak progresif yang akan membuat biaya pajakmu sedikit lebih tinggi. Menjadi pemilik kendaraan yang tertib administrasi adalah bentuk kepedulianmu terhadap pembangunan fasilitas jalan yang kita nikmati bersama.

Semoga kalkulator estimasi pajak kendaraan ini mempermudah urusan rumah tanggamu. Kami di Kalkulator Warga bangga bisa menjadi asisten setiamu dalam mengelola biaya kepemilikan mobil. Jangan biarkan urusan pajak menjadi beban; jadikan itu sebagai bagian dari perawatan rutin kendaraanmu agar tetap legal dan nyaman digunakan. Teruslah berkendara dengan aman, patuhi rambu lalu lintas, dan semoga setiap perjalananmu selalu membawa kebahagiaan bagi keluarga tercinta. Kami selalu siap membantumu menghitung setiap detail kebutuhan harianmu dengan cara yang paling mudah.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: nWrap, input: nInput } = createInput('Nilai Jual Kendaraan (NJKB)', 'njkb', 'number');
    
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
        const pkb = njkb * 0.02; // 2% for first car
        resDisplay.textContent = `Estimasi: Rp ${pkb.toLocaleString('id-ID')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      nInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
