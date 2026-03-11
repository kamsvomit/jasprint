import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kurs Mata Uang',
  id: 'currency-conv-id',
  description: 'Konversi mata uang sederhana (USD ke IDR).',
  longDescription: `Halo, para pejuang devisa dan pelaku usaha kreatif. Di era globalisasi ini, banyak dari kita yang bekerja secara remote atau berbisnis dengan mitra luar negeri. Fluktuasi nilai tukar mata uang seringkali menjadi tantangan tersendiri dalam menentukan harga jasa atau menghitung keuntungan bersih. Kalkulator Kurs Mata Uang ini kami buat untuk membantumu melakukan konversi cepat dari USD ke IDR, memberikan gambaran nilai rupiah dari hasil jerih payahmu di pasar internasional secara praktis dan efisien.

Alat ini sangat mudah digunakan. Masukkan jumlah dalam USD dan kurs saat ini (kami menyediakan angka default sebagai patokan, namun kamu bisa mengubahnya sesuai kurs bank yang kamu gunakan). Sistem akan langsung menampilkan nilai totalnya dalam Rupiah. Ini sangat membantu bagi freelancer, pemilik toko online, atau siapa saja yang sering bertransaksi menggunakan mata uang asing agar tetap memiliki kendali atas nilai uang mereka.

Tips bisnis dari kami: selalu perhatikan tren kurs saat akan melakukan penarikan dana (withdraw) atau pembayaran besar. Selisih kurs yang kecil bisa berdampak besar jika nominalnya banyak. Jangan lupa untuk memperhitungkan biaya administrasi bank atau platform pembayaran yang seringkali tersembunyi. Mengelola mata uang asing dengan cerdas adalah bagian dari profesionalisme kerjamu yang akan membawa bisnismu melangkah lebih jauh ke kancah global.

Teruslah berkarya dan membawa nama baik Indonesia di mata dunia! Kami bangga melihat semangatmu menembus batas negara demi masa depan yang lebih cerah. Jangan biarkan kerumitan hitungan kurs menghambat produktivitasmu. Biarkan kami yang mengurus angka-angkanya, sementara kamu fokus memberikan karya terbaikmu. Kami di Kalkulator Warga selalu siap mendukung setiap langkahmu menuju kesuksesan internasional.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: uWrap, input: uInput } = createInput('Jumlah USD', 'usd', 'number');
    const { wrapper: rWrap, input: rInput } = createInput('Kurs (1 USD = Rp)', 'rate', 'number', '16000');
    
    const calcBtn = createButton('Konversi', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(uWrap);
    container.appendChild(rWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const usd = parseValue(uInput.value);
      const rate = parseValue(rInput.value) || 16000;
      if (usd >= 0) {
        const idr = usd * rate;
        resDisplay.textContent = `Rp ${idr.toLocaleString('id-ID')}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      uInput.value = ''; rInput.value = '16000';
      resWrap.classList.add('hidden');
    };
  }
};
