import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Zakat Fitrah',
  id: 'zakat-fitrah',
  description: 'Hitung jumlah zakat fitrah untuk keluarga Anda.',
  longDescription: `Halo, teman-teman semua. Menjelang akhir bulan Ramadhan, salah satu kewajiban yang paling dinantikan dan membahagiakan adalah menunaikan zakat fitrah. Zakat fitrah bukan hanya sekadar kewajiban agama, tapi juga simbol kepedulian kita terhadap sesama agar semua orang bisa merayakan hari raya dengan penuh sukacita. Kami di Kalkulator Warga ingin memastikan proses hitung zakat fitrah keluarga kamu jadi lebih mudah, cepat, dan akurat, sehingga kamu bisa lebih fokus pada ibadah di hari-hari terakhir bulan suci.

Cara menggunakan kalkulator zakat fitrah online ini sangat praktis. Kamu cukup memasukkan jumlah anggota keluarga yang akan dizakatkan (termasuk diri sendiri, pasangan, anak-anak, hingga asisten rumah tangga jika kamu yang menanggungnya). Kemudian, masukkan harga beras per kilogram yang biasa kamu konsumsi sehari-hari. Alat ini secara otomatis akan menghitung total zakat dalam bentuk uang maupun berat beras (standar 2,5 kg atau 3,5 liter per jiwa). Dengan begitu, kamu tidak perlu lagi bingung berapa zakat fitrah yang harus dibayar tahun ini.

Tips dari kami untuk kamu: pastikan harga beras yang dimasukkan adalah harga beras yang memang kamu makan sehari-hari, bukan harga beras termurah di pasar jika kamu biasanya makan beras kualitas premium. Menunaikan zakat dengan kualitas yang sama dengan apa yang kita konsumsi adalah bentuk syukur yang paling tulus. Selain itu, usahakan untuk menunaikan zakat fitrah lebih awal sebelum shalat Idul Fitri agar panitia zakat atau amil memiliki cukup waktu untuk menyalurkannya kepada mereka yang berhak menerima.

Semoga ibadah puasamu dan zakat fitrah yang kamu tunaikan diterima oleh Allah SWT dan membawa keberkahan bagi keluargamu. Kami bangga bisa membantu mempermudah langkah ibadahmu melalui alat hitung zakat sederhana ini. Mari kita sambut hari kemenangan dengan hati yang bersih dan penuh rasa berbagi. Selamat merayakan Idul Fitri bersama orang-orang tersayang!`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Jumlah Orang', 'people', 'number', '1');
    const { wrapper: hWrap, input: hInput } = createInput('Harga Beras (per kg)', 'price', 'number', '15000');
    
    const calcBtn = createButton('Hitung Zakat', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(hWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const people = parseValue(pInput.value) || 1;
      const price = parseValue(hInput.value) || 15000;
      const totalKg = people * 2.5;
      const totalMoney = totalKg * price;
      
      resDisplay.innerHTML = `
        <div>Rp ${totalMoney.toLocaleString('id-ID')}</div>
        <div class="text-sm text-gray-500 mt-1">Setara ${totalKg} kg Beras</div>
      `;
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      pInput.value = '1'; hInput.value = '15000';
      resWrap.classList.add('hidden');
    };
  }
};
