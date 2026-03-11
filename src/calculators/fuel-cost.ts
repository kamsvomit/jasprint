import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Biaya Bensin',
  id: 'fuel-cost',
  description: 'Hitung biaya bahan bakar untuk sebuah perjalanan.',
  longDescription: `Halo, para pengelana dan pejuang jalanan! Merencanakan perjalanan jauh, baik itu untuk mudik lebaran, liburan keluarga, atau urusan bisnis, tentu membutuhkan persiapan anggaran yang matang. Salah satu pengeluaran terbesar yang seringkali sulit diprediksi adalah biaya bahan bakar. Kalkulator Biaya Bensin online ini kami hadirkan untuk membantumu menghitung estimasi biaya bensin yang harus kamu siapkan, sehingga perjalananmu bisa lebih terencana dan bebas dari rasa khawatir kehabisan dana di tengah jalan.

Cara kerja alat hitung biaya bensin ini sangat praktis. Kamu hanya perlu memasukkan jarak tempuh perjalananmu dalam kilometer, rata-rata konsumsi BBM kendaraanmu (misalnya 1 liter untuk berapa kilometer), dan harga bensin per liter saat ini (Pertalite, Pertamax, atau Dexlite). Alat ini akan secara otomatis menghitung berapa liter bensin yang dibutuhkan dan total biaya rupiah yang harus dikeluarkan. Dengan mengetahui angka ini, kamu bisa lebih bijak dalam mengatur uang saku dan biaya tol selama perjalanan.

Tips hemat bensin dari kami: pastikan tekanan ban kendaraanmu sesuai standar dan hindari membawa beban yang tidak perlu untuk menjaga efisiensi bahan bakar. Selain itu, gaya mengemudi yang halus (tidak sering rem mendadak atau gas pol) juga sangat berpengaruh pada keiritan bensin. Jika kamu sedang merencanakan perjalanan jauh seperti mudik, gunakan kalkulator ini untuk membandingkan biaya jika menggunakan beberapa rute alternatif. Perencanaan yang baik adalah kunci perjalanan yang aman, nyaman, dan ekonomis.

Semoga kalkulator biaya perjalanan ini membantu kelancaran setiap petualanganmu. Kami di Kalkulator Warga ingin memastikan setiap warga bisa bepergian dengan hati yang tenang karena semua biaya sudah terhitung dengan benar. Jangan biarkan urusan bensin merusak momen bahagiamu bersama keluarga. Selamat berkendara, patuhi rambu lalu lintas, dan semoga selamat sampai tujuan. Kami selalu siap mendukung setiap langkah dan roda yang berputar dalam hidupmu.`,
  category: 'Lainnya',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Jarak (km)', 'dist', 'number');
    const { wrapper: fWrap, input: fInput } = createInput('Konsumsi BBM (L/100km)', 'eff', 'number', '8');
    const { wrapper: pWrap, input: pInput } = createInput('Harga BBM (Rp per Liter)', 'price', 'number');
    
    const calcBtn = createButton('Hitung Biaya');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(fWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dist = parseFloat(dInput.value);
      const eff = parseFloat(fInput.value) || 8;
      const price = parseFloat(pInput.value);
      
      if (dist > 0 && price > 0) {
        const liters = (dist / 100) * eff;
        const cost = liters * price;
        resDisplay.textContent = `Biaya: ${formatCurrency(cost)}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = ''; fInput.value = '8'; pInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
