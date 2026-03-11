import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Cek Kekuatan Kata Sandi',
  id: 'password-strength',
  description: 'Periksa seberapa kuat kata sandi Anda.',
  longDescription: `Halo, para pengguna internet yang cerdas dan peduli keamanan digital! Di era yang serba online ini, keamanan akun-akun pribadi kita menjadi hal yang sangat krusial. Kata sandi atau password adalah pintu gerbang utama yang melindungi data pribadi, informasi keuangan, dan identitas digital kita dari tangan-tangan yang tidak bertanggung jawab. Kalkulator Kekuatan Kata Sandi ini kami sediakan untuk membantumu mengevaluasi seberapa tangguh "pintu gerbang" digitalmu dalam menghadapi ancaman peretasan.

Cara kerja alat cek keamanan password online ini sangat membantu dalam meningkatkan kesadaran keamananmu. Kamu cukup memasukkan kata sandi yang ingin kamu uji (jangan khawatir, kami tidak menyimpan data apapun yang kamu masukkan), dan alat ini akan menganalisisnya berdasarkan beberapa kriteria penting seperti panjang karakter, penggunaan huruf besar dan kecil, angka, serta simbol unik. Hasilnya akan memberikan indikasi apakah kata sandimu termasuk kategori lemah, cukup, atau sangat kuat, sehingga kamu bisa segera memperbaikinya jika diperlukan.

Tips keamanan digital dari kami: hindari menggunakan kata sandi yang mudah ditebak seperti tanggal lahir, nama hewan peliharaan, atau kata-kata umum seperti "password123". Gunakanlah kombinasi yang unik dan berbeda untuk setiap akun pentingmu. Pertimbangkan juga untuk menggunakan pengelola kata sandi (password manager) dan aktifkan autentikasi dua faktor (2FA) untuk perlindungan ekstra. Keamanan digital dimulai dari kebiasaan kecil yang disiplin dalam menjaga kerahasiaan dan kekuatan akses akunmu.

Semoga alat cek kekuatan kata sandi ini membantu meningkatkan keamanan kehidupan digitalmu. Kami di Kalkulator Warga berkomitmen untuk mendukung literasi keamanan digital bagi seluruh warga Indonesia agar terhindar dari kejahatan siber. Jangan biarkan pintu rumah digitalmu terbuka lebar bagi orang asing. Teruslah waspada, jaga privasimu dengan baik, dan kami selalu siap mendukung setiap langkah perlindungan datamu melalui alat bantu yang praktis, aman, dan memudahkan ini. Selamat berselancar di internet dengan aman!`,
  category: 'Lainnya',
  render(container) {
    const { wrapper: pWrap, input: pInput } = createInput('Kata Sandi', 'pass', 'text');
    
    const calcBtn = createButton('Cek Kekuatan');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const pass = pInput.value;
      let score = 0;
      if (pass.length >= 8) score++;
      if (/[A-Z]/.test(pass)) score++;
      if (/[a-z]/.test(pass)) score++;
      if (/[0-9]/.test(pass)) score++;
      if (/[^A-Za-z0-9]/.test(pass)) score++;
      
      const levels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
      resDisplay.textContent = levels[score - 1] || 'Sangat Lemah';
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      pInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
