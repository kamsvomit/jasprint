import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Luas Lingkaran',
  id: 'circle-area',
  description: 'Hitung luas lingkaran berdasarkan jari-jari.',
  longDescription: `Halo, kamu yang lagi mengerjakan soal matematika, tugas desain, atau mungkin sedang merencanakan sesuatu yang berbentuk lingkaran—mulai dari meja makan bundar, kolam renang, taman melingkar, sampai logo perusahaan. Menghitung luas lingkaran adalah salah satu perhitungan geometri yang paling sering dibutuhkan dalam kehidupan nyata, tapi angka Pi (π) yang panjang dan tak berujung itu sering bikin ragu saat menghitung manual. Kalkulator Luas Lingkaran ini hadir agar kamu bisa dapat hasil yang akurat dalam hitungan detik, tanpa perlu repot.

Cara pakainya sangat mudah—cukup masukkan nilai jari-jari lingkaran (radius), lalu klik Hitung Luas. Alat ini menggunakan rumus luas lingkaran yang baku: L = π × r², di mana π (Pi) bernilai sekitar 3,14159265. Jadi kalau jari-jarinya 7 cm, maka luasnya adalah π × 7² = 153,94 cm². Satuan hasilnya mengikuti satuan jari-jari yang kamu masukkan—kalau jari-jarinya dalam meter, maka luasnya dalam meter persegi (m²). Perlu diingat juga perbedaan antara jari-jari (r) dan diameter (d): jari-jari adalah setengah dari diameter, jadi kalau kamu hanya tahu diameternya, bagi dua dulu sebelum dimasukkan ke sini.

Penggunaan rumus luas lingkaran sangat luas dalam kehidupan nyata. Dalam dunia konstruksi dan arsitektur, kamu butuh ini untuk menghitung luas lantai berbentuk bundar, kubah, atau kolom. Dalam pertanian, untuk menghitung area irigasi sistem pivot yang berbentuk lingkaran. Dalam desain grafis dan manufaktur, untuk menghitung kebutuhan material berbentuk bulat. Bahkan dalam memasak—kalau kamu ingin tahu luas permukaan loyang pizza atau kue bundar untuk menyesuaikan takaran adonan, rumus ini jawabannya. Kalkulator geometri lingkaran online ini bisa dipakai untuk semua kebutuhan tersebut.

Matematika itu bukan musuh, teman-teman—matematika adalah alat yang luar biasa berguna kalau kamu tahu cara memakainya. Dan kami di Kalkulator Warga ada di sini untuk memastikan kamu selalu punya akses ke alat yang tepat, kapanpun kamu butuhkan. Gunakan kalkulator luas lingkaran ini sesering mungkin, rekomendasikan ke teman-temanmu, dan jadikan matematika sebagai sahabat sehari-harimu. Karena ketika kamu bisa menghitung, kamu bisa merencanakan—dan ketika kamu bisa merencanakan, tidak ada impian yang terlalu besar.`,
  category: 'Matematika',
  render(container) {
    const { wrapper: rWrap, input: rInput } = createInput('Jari-jari (r)', 'radius', 'number');
    
    const calcBtn = createButton('Hitung Luas', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const r = parseValue(rInput.value);
      if (r > 0) {
        const area = Math.PI * r * r;
        resDisplay.textContent = `${area.toFixed(2)} unit²`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      rInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};