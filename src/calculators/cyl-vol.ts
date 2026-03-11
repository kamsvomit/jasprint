import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Volume Tabung',
  id: 'cyl-vol',
  description: 'Hitung volume tabung berdasarkan jari-jari dan tinggi.',
  longDescription: `Halo, kamu yang lagi butuh menghitung volume sesuatu yang berbentuk tabung atau silinder—entah itu tangki air, toren, pipa, kaleng, kolom beton, drum minyak, atau mungkin sekadar untuk menyelesaikan soal matematika. Bentuk tabung (silinder) adalah salah satu bentuk tiga dimensi yang paling sering ditemui dalam kehidupan nyata, dan mengetahui volumenya penting untuk banyak keperluan praktis. Kalkulator Volume Tabung ini hadir untuk memudahkan perhitunganmu, akurat dan instan, tanpa perlu pusing mengingat rumus.

Cara menggunakannya sangat mudah. Masukkan jari-jari alas tabung dan tinggi tabung—keduanya dalam satuan yang sama—lalu klik Hitung Volume. Alat ini menggunakan rumus V = π × r² × t, di mana π adalah Pi (≈3,14159), r adalah jari-jari alas, dan t adalah tinggi tabung. Ingat, jari-jari adalah setengah dari diameter—jadi kalau kamu mengukur diameter tangki airmu dan hasilnya 60 cm, maka jari-jarinya adalah 30 cm. Hasil yang ditampilkan dalam satuan kubik sesuai satuan yang kamu masukkan: cm³ untuk centimeter, m³ untuk meter, dan seterusnya. Untuk mengkonversi ke liter, ingat bahwa 1.000 cm³ = 1 liter.

Perhitungan volume tabung ini berguna sekali dalam berbagai situasi nyata: menghitung kapasitas toren atau tangki air silinder untuk kebutuhan rumah tangga, menentukan volume beton untuk pengecoran kolom bulat dalam konstruksi, menghitung kapasitas tangki BBM atau gas LPG berbentuk tabung, mengetahui volume drum atau barrel untuk keperluan industri, serta memperkirakan kapasitas pipa saluran air atau sistem irigasi. Di dunia teknik dan rekayasa, perhitungan volume silinder juga menjadi dasar dalam mendesain sistem perpipaan, vessel bertekanan, dan berbagai komponen mekanis.

Geometri tiga dimensi mungkin terasa abstrak di bangku sekolah, tapi nilainya sangat konkret dalam kehidupan sehari-hari. Kami di Kalkulator Warga senang bisa menjembatani dunia teori dan praktik melalui alat-alat sederhana seperti ini. Gunakan kalkulator volume bangun ruang ini kapanpun kamu butuhkan, dan jangan ragu untuk mengeksplorasi berbagai kalkulator lainnya yang kami sediakan. Karena setiap perhitungan yang tepat adalah langkah menuju keputusan yang lebih baik.`,
  category: 'Matematika',
  render(container) {
    const { wrapper: rWrap, input: rInput } = createInput('Jari-jari', 'radius', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tinggi', 'height', 'number');
    
    const calcBtn = createButton('Hitung Volume', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(rWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const r = parseValue(rInput.value);
      const t = parseValue(tInput.value);
      if (r > 0 && t > 0) {
        const vol = Math.PI * r * r * t;
        resDisplay.textContent = `${vol.toFixed(2)} unit³`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      rInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};