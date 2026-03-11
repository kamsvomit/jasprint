import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Estimasi Iuran BPJS Kesehatan',
  id: 'bpjs-kes',
  description: 'Hitung estimasi iuran BPJS Kesehatan untuk Pekerja Penerima Upah (PPU).',
  longDescription: `Halo, rekan-rekan pekerja. Kesehatan adalah harta yang paling tak ternilai, namun seringkali kita baru menyadarinya saat tubuh mulai terasa lelah. Program BPJS Kesehatan hadir sebagai jaring pengaman agar kita tidak perlu khawatir akan biaya medis yang selangit saat jatuh sakit. Kalkulator Iuran BPJS Kesehatan ini kami buat untuk membantumu menghitung berapa tepatnya kontribusi yang dipotong dari gajimu setiap bulan, memastikan kamu dan keluargamu tetap terlindungi tanpa ada kebingungan soal angka.

Cara pakainya sangat spesifik untuk Pekerja Penerima Upah (PPU). Masukkan total gaji pokok dan tunjangan tetapmu. Alat ini akan menghitung iuran berdasarkan aturan yang berlaku, di mana biasanya 1% dipotong dari gajimu dan 4% dibayarkan oleh perusahaan. Kami juga menyertakan batas atas dan bawah sesuai ketentuan pemerintah agar hasilnya lebih akurat. Dengan mengetahui angka ini, kamu bisa melihat nilai proteksi kesehatan yang kamu dapatkan setiap bulannya.

Tips dari kami: pastikan data kepesertaan BPJS-mu selalu aktif dan anggota keluargamu sudah terdaftar dengan benar. Jangan menunggu sakit untuk mengecek status kepesertaan. Manfaatkan fasilitas kesehatan tingkat pertama (Puskesmas atau Klinik) untuk pemeriksaan rutin sebagai langkah pencegahan. Ingat, mencegah selalu lebih baik dan lebih murah daripada mengobati. Tubuhmu adalah mesin utama untuk mencari nafkah, jadi rawatlah ia dengan sebaik-baiknya.

Tetaplah sehat dan semangat dalam bekerja! Kamu adalah pelindung bagi keluargamu, dan BPJS Kesehatan adalah pelindung bagimu. Jangan anggap iuran ini sebagai beban, melainkan sebagai investasi untuk ketenangan pikiranmu. Kami di Kalkulator Warga selalu siap membantumu memahami setiap detail potongan keuanganmu agar hidupmu terasa lebih teratur. Sehat selalu untukmu dan seluruh keluarga di rumah!`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: gWrap, input: gInput } = createInput('Gaji Pokok + Tunjangan Tetap', 'salary', 'number', 'Contoh: 5.000.000');
    
    const calcBtn = createButton('Hitung Iuran', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(gWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const salary = parseValue(gInput.value);
      if (salary > 0) {
        // PPU: 5% total (4% pemberi kerja, 1% pekerja)
        // Batas bawah UMK, batas atas 12jt
        const cappedSalary = Math.min(Math.max(salary, 0), 12000000);
        const pekerja = cappedSalary * 0.01;
        const perusahaan = cappedSalary * 0.04;
        resDisplay.innerHTML = `
          <div>${formatCurrency(pekerja)} <span class="text-xs text-gray-500">(Potong Gaji)</span></div>
          <div class="text-sm text-gray-500 mt-1">Total: ${formatCurrency(pekerja + perusahaan)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      gInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
