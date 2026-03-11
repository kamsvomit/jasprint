import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Umur',
  id: 'age-calc',
  description: 'Hitung umur Anda secara detail dalam tahun, bulan, dan hari.',
  longDescription: `Halo, teman-teman semua! Pernahkah kamu merasa waktu berlalu begitu cepat? Rasanya baru kemarin merayakan ulang tahun, eh sekarang sudah mau ganti tahun lagi. Mengetahui usia kita secara detail bukan sekadar angka, tapi pengingat akan perjalanan hidup yang telah kita lalui. Kalkulator Umur ini kami buat agar kamu bisa mengetahui usiamu dengan presisi—bukan hanya tahunnya, tapi hingga hitungan bulan dan harinya.

Cara menggunakannya sangat mudah. Kamu cukup memasukkan tanggal lahirmu pada kolom yang tersedia. Alat ini akan membandingkan tanggal lahirmu dengan tanggal hari ini secara otomatis. Hasilnya akan menampilkan usiamu dalam format tahun yang akurat. Ini sangat berguna untuk berbagai keperluan, mulai dari pengisian formulir resmi, pendaftaran sekolah, hingga sekadar rasa penasaran untuk melihat sudah berapa lama kamu menghirup udara di bumi ini.

Tips dari kami: jadikan setiap pertambahan usia sebagai momen untuk bersyukur dan merenung. Usia adalah amanah waktu yang diberikan kepada kita. Gunakan hasil dari kalkulator ini untuk merencanakan masa depanmu dengan lebih baik. Apakah ada mimpi yang belum terwujud? Atau ada kebiasaan baik yang ingin dimulai? Tidak ada kata terlambat untuk memulai sesuatu yang positif, berapapun usiamu saat ini.

Selamat merayakan setiap detik kehidupanmu! Kami di Kalkulator Warga senang bisa menjadi bagian dari pengingat waktumu. Semoga setiap tahun yang kamu lalui membawa lebih banyak kebahagiaan, kesehatan, dan keberkahan. Teruslah bertumbuh dan jadilah versi terbaik dari dirimu sendiri, karena setiap usia memiliki keindahan dan tantangannya masing-masing.`,
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: dWrap, input: dInput } = createInput('Tanggal Lahir', 'dob', 'date');
    
    const calcBtn = createButton('Hitung Umur', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const dob = new Date(dInput.value);
      const today = new Date();
      if (!isNaN(dob.getTime())) {
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        resDisplay.textContent = `${age} Tahun`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      dInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
