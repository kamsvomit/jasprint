import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Kalender Jawa',
  id: 'javanese-cal',
  description: 'Cek hari pasaran Jawa (Legi, Pahing, Pon, Wage, Kliwon).',
  longDescription: `Halo, Saudara-saudara sekalian yang mencintai kearifan lokal! Di tengah kesibukan dunia modern yang serba cepat, seringkali kita merindukan sentuhan tradisi yang menjadi akar identitas kita. Kalender Jawa bukan sekadar sistem penanggalan, melainkan sebuah warisan budaya yang kaya akan filosofi dan makna mendalam tentang keselarasan antara manusia dan alam semesta. Kalkulator Kalender Jawa ini kami hadirkan sebagai jembatan praktis bagimu untuk tetap terhubung dengan tradisi leluhur di era digital ini.

Alat ini dirancang khusus untuk membantumu menemukan "Pasaran" dari sebuah tanggal tertentu. Dalam budaya Jawa, siklus lima hari (Panca Wara) yang terdiri dari Legi, Pahing, Pon, Wage, dan Kliwon memiliki peran penting dalam menentukan hari baik atau sekadar mengenal karakter hari kelahiran seseorang. Kamu cukup memilih tanggal yang ingin kamu cek, dan sistem kami akan menghitung secara otomatis posisi pasaran tersebut berdasarkan algoritma kalender Jawa yang akurat.

Tips budaya dari kami: gunakan informasi pasaran ini sebagai sarana untuk lebih mengenal tradisi keluarga atau komunitasmu. Banyak acara adat, syukuran, hingga penentuan hari baik untuk memulai sesuatu yang baru masih menggunakan hitungan pasaran ini sebagai referensi. Namun, yang terpenting adalah bagaimana kita bisa mengambil nilai-nilai positif dan semangat kebersamaan dari setiap tradisi yang kita jalankan. Jadikan kearifan lokal ini sebagai pelengkap kebijaksanaanmu dalam menjalani kehidupan sehari-hari.

Teruslah bangga dengan kekayaan budaya nusantara! Kami di Kalkulator Warga merasa sangat senang bisa membantumu melestarikan pengetahuan tradisional ini melalui alat yang sederhana namun bermanfaat. Semoga setiap hari yang kamu lalui, apapun pasarannya, selalu membawa keberkahan dan kedamaian bagi dirimu dan orang-orang tercinta. Mari kita jaga bersama warisan luhur ini agar tetap hidup dan bermakna bagi generasi mendatang.`,
  category: 'Lain-lain',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Pilih Tanggal', 'date', 'date');
    
    const calcBtn = createButton('Cek Pasaran', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const pasaran = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const baseDate = new Date('1900-01-01'); // Known Legi

    calcBtn.onclick = () => {
      const target = new Date(dInput.value);
      if (!isNaN(target.getTime())) {
        const diff = Math.floor((target.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
        const pIndex = ((diff % 5) + 5) % 5;
        resDisplay.textContent = pasaran[pIndex];
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
