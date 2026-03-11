import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue, setupEnterKeyNavigation } from '../utils';

export const listrikBulanan: Calculator = {
  id: 'listrik-bulanan',
  name: 'Biaya Listrik Bulanan',
  description: 'Estimasi tagihan listrik bulanan berdasarkan pemakaian kWh.',
  longDescription: `Halo, para pengelola rumah tangga yang cermat! Kami sangat paham betapa berdebarnya hati saat melihat petugas PLN datang atau saat token listrik mulai berbunyi "tit-tit-tit". Listrik adalah kebutuhan pokok yang harganya terus menyesuaikan, dan tanpa pengawasan yang baik, tagihannya bisa melonjak tanpa kita sadari. Kalkulator Biaya Listrik Bulanan ini hadir untuk membantumu memprediksi berapa budget yang harus kamu siapkan, sehingga tidak ada lagi kejutan pahit di akhir bulan.

Alat ini bekerja dengan cara yang sangat sederhana namun efektif. Kamu cukup memasukkan total pemakaian listrikmu dalam satuan kWh (kilo Watt hour) dan tarif per kWh yang berlaku untuk golongan listrik rumahmu (misalnya Rp 1.444,70 untuk R-1/TR). Alat ini akan mengalikan keduanya untuk memberikan estimasi total tagihan. Jika kamu pengguna token (prabayar), alat ini membantumu memperkirakan berapa lama token yang kamu beli akan bertahan berdasarkan rata-rata pemakaian harianmu.

Tips hemat listrik dari kami: mulailah dengan kebiasaan kecil seperti mematikan lampu di ruangan yang tidak digunakan dan mencabut kabel charger yang sudah tidak terpakai. Penggunaan alat elektronik dengan daya besar seperti AC, mesin cuci, atau setrika sebaiknya diatur jadwalnya agar tidak berbarengan dan melebihi kapasitas daya rumah. Selain itu, beralih ke lampu LED bisa menghemat konsumsi listrik secara signifikan dalam jangka panjang. Ingat, setiap kWh yang kamu hemat adalah tabungan untuk kebutuhan keluarga lainnya.

Semoga pengelolaan rumah tanggamu semakin lancar dan berkah! Kami percaya bahwa ketenangan pikiran dimulai dari anggaran yang terencana dengan baik. Jangan biarkan tagihan listrik menjadi beban; jadilah manajer energi yang cerdas di rumahmu sendiri. Kami di Kalkulator Warga selalu siap menjadi asisten setiamu dalam menghitung dan merencanakan setiap pengeluaran rumah tangga agar hidupmu terasa lebih ringan dan teratur.`,
  category: 'Rumah',
  render(container) {
    const { wrapper: kWrap, input: kInput } = createInput('Pemakaian (kWh)', 'kwh', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tarif per kWh (Rp)', 'rate', 'number', '1444');
    
    const calcBtn = createButton('Hitung Tagihan');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(kWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const kwh = parseValue(kInput.value);
      const rate = parseValue(tInput.value) || 1444;
      
      if (!kInput.value) {
        showError('Harap masukkan jumlah pemakaian kWh.');
        return;
      }

      if (kwh >= 0) {
        const total = kwh * rate;
        showResult(formatCurrency(total));
      } else {
        showError('Pemakaian tidak boleh negatif.');
      }
    };

    resetBtn.onclick = () => {
      kInput.value = ''; tInput.value = '1.444';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};

export default listrikBulanan;
