import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Luas Persegi Panjang',
  id: 'rect-area',
  description: 'Hitung luas persegi panjang berdasarkan panjang dan lebar.',
  longDescription: `Halo, para pelajar, tukang bangunan, dan siapapun yang sedang berurusan dengan pengukuran bidang! Menghitung luas persegi panjang adalah salah satu perhitungan geometri yang paling dasar namun paling sering dibutuhkan dalam kehidupan nyata—mulai dari menghitung luas tanah, luas lantai untuk pemasangan keramik, hingga luas kertas untuk prakarya. Meskipun rumusnya sederhana, terkadang kita butuh hasil yang cepat dan akurat untuk angka-angka yang memiliki desimal. Kalkulator Luas Persegi Panjang ini hadir untuk membantumu mendapatkan hasil instan tanpa perlu mencari coretan kertas.

Cara kerja alat hitung luas bidang online ini sangat mudah dan langsung pada intinya. Kamu cukup memasukkan nilai panjang dan nilai lebar dari bidang yang ingin kamu hitung. Klik tombol "Hitung Luas", dan alat ini akan mengalikan keduanya untuk memberikan hasil total luas dalam satuan unit kuadrat. Sangat praktis bagi kamu yang sedang merencanakan tata letak ruangan, menghitung kebutuhan material bangunan, atau sedang mengerjakan tugas sekolah. Kami ingin memastikan setiap pengukuranmu terdokumentasi dengan angka yang benar.

Tips pengukuran dari kami: pastikan kamu menggunakan satuan yang sama (misalnya semuanya dalam meter atau semuanya dalam centimeter) sebelum memasukkan angka ke dalam kalkulator agar hasilnya konsisten. Jika kamu sedang menghitung luas ruangan untuk renovasi, jangan lupa untuk mengurangi luas area yang tidak perlu dicat atau dipasangi lantai seperti area pintu atau jendela. Ketelitian dalam pengukuran awal akan menghindarkanmu dari pemborosan biaya material di kemudian hari.

Semoga kalkulator luas persegi panjang sederhana ini bermanfaat untuk setiap proyek dan tugasmu. Kami di Kalkulator Warga berkomitmen untuk menyediakan alat bantu matematika dasar yang mudah diakses oleh seluruh warga untuk mempermudah urusan harian. Jangan biarkan angka-angka membuat pekerjaanmu terhambat. Teruslah berkarya dan bangun masa depanmu dengan perhitungan yang matang, dan kami selalu siap mendukung setiap langkah teknismu melalui alat hitung yang praktis, jujur, dan akurat. Selamat bekerja dan sukses selalu!`,
  category: 'Matematika',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Panjang', 'length', 'number');
    const { wrapper: lWrap, input: lInput } = createInput('Lebar', 'width', 'number');
    
    const calcBtn = createButton('Hitung Luas', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(lWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const p = parseValue(pInput.value);
      const l = parseValue(lInput.value);
      if (p > 0 && l > 0) {
        resDisplay.textContent = `${(p * l).toFixed(2)} unit²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      pInput.value = ''; lInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
