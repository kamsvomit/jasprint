import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Weton',
  id: 'weton-calc',
  description: 'Hitung weton kelahiran Anda (Hari + Pasaran).',
  longDescription: `Halo, Saudara-saudara sekalian. Di tengah gempuran teknologi modern, kita seringkali rindu akan akar budaya dan tradisi warisan leluhur. Weton bukan sekadar hitungan hari, melainkan bagian dari identitas dan kearifan lokal masyarakat Jawa yang masih relevan hingga kini. Kalkulator Weton ini hadir untuk membantumu menemukan kembali "hari lahir" tradisionalmu dengan cara yang praktis, menghubungkan masa lalu dengan masa kini dalam satu klik sederhana.

Cara kerjanya sangat simpel: kamu hanya perlu memasukkan tanggal lahirmu pada kolom yang tersedia. Sistem kami akan menghitung posisi hari (Senin-Minggu) dan pasaran (Legi, Pahing, Pon, Wage, Kliwon) berdasarkan kalender Jawa. Secara teknis, kami menggunakan algoritma perhitungan selisih hari dari tanggal dasar untuk menentukan siklus panca wara (5 hari) dan sapta wara (7 hari) yang tepat untuk hari kelahiranmu.

Mengenal weton bisa menjadi sarana untuk lebih memahami diri sendiri atau sekadar melestarikan tradisi saat ingin mengadakan acara keluarga seperti pernikahan atau syukuran. Namun, ingatlah bahwa weton adalah panduan budaya, bukan penentu mutlak nasibmu. Gunakan informasi ini sebagai pengingat akan nilai-nilai luhur dan doa-doa baik yang menyertai kelahiranmu ke dunia ini. Jadikan kearifan lokal ini sebagai penyemangat untuk menjalani hidup dengan lebih bijaksana.

Teruslah melangkah dengan penuh percaya diri. Tradisi adalah akar yang menguatkan, sementara kerja keras adalah sayap yang menerbangkanmu menuju impian. Apapun wetonmu, kamu memiliki potensi luar biasa untuk menciptakan kebahagiaan bagi dirimu dan orang-orang di sekitarmu. Kami di Kalkulator Warga merasa terhormat bisa menjadi jembatan kecil bagimu untuk tetap terhubung dengan warisan budaya nusantara yang indah ini.`,
  category: 'Lain-lain',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Tanggal Lahir', 'dob', 'date');
    
    const calcBtn = createButton('Cek Weton', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const pasaran = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const baseDate = new Date('1900-01-01');

    calcBtn.onclick = () => {
      const target = new Date(dInput.value);
      if (!isNaN(target.getTime())) {
        const day = days[target.getDay()];
        const diff = Math.floor((target.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
        const pIndex = ((diff % 5) + 5) % 5;
        resDisplay.textContent = `${day} ${pasaran[pIndex]}`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
