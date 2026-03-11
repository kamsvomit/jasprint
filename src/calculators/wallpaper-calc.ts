import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Wallpaper',
  id: 'wallpaper-calc',
  description: 'Estimasi berapa banyak gulungan wallpaper yang Anda butuhkan.',
  longDescription: `Halo, para pecinta dekorasi interior dan pemilik rumah yang ingin memberikan sentuhan baru pada dinding huniannya! Menggunakan wallpaper adalah cara yang instan dan menawan untuk mengubah suasana ruangan tanpa harus melakukan pengecatan ulang yang merepotkan. Namun, pertanyaan yang paling sering muncul adalah: "Berapa gulung wallpaper yang harus saya beli?" Membeli terlalu sedikit akan menghambat pengerjaan, sementara membeli terlalu banyak adalah pemborosan. Kalkulator Wallpaper ini hadir untuk membantumu menghitung estimasi kebutuhan material dengan lebih tepat dan mudah.

Cara kerja alat hitung kebutuhan wallpaper online ini sangat membantu dalam perencanaan dekorasimu. Kamu cukup memasukkan lebar dan tinggi dinding yang ingin dipasangi wallpaper, serta ukuran lebar dan panjang dari satu gulungan wallpaper yang kamu pilih (biasanya standar lebar adalah 0,53m dan panjang 10m). Alat ini akan menghitung estimasi jumlah gulungan yang kamu butuhkan, lengkap dengan tambahan 10% untuk cadangan sisa potongan atau penyesuaian motif (pattern matching). Dengan angka ini, kamu bisa berbelanja dengan lebih percaya diri dan memastikan proyek dekorasimu berjalan lancar.

Tips pemasangan wallpaper dari kami: jika wallpaper pilihanmu memiliki motif yang besar atau rumit, kamu mungkin butuh tambahan cadangan yang lebih banyak (sekitar 15-20%) untuk memastikan motifnya bisa menyambung dengan sempurna antar lembaran. Pastikan juga permukaan dindingmu sudah bersih, rata, dan kering sebelum mulai menempelkan wallpaper agar hasilnya awet dan tidak bergelembung. Dekorasi rumah adalah ekspresi kepribadianmu, jadi lakukanlah dengan penuh kegembiraan dan perencanaan yang matang.

Semoga kalkulator kebutuhan wallpaper ini mempermudah langkahmu dalam mempercantik setiap sudut ruangan. Kami di Kalkulator Warga senang bisa membantu setiap keluarga Indonesia dalam mewujudkan rumah impian mereka dengan lebih mudah. Jangan biarkan urusan teknis menghambat kreativitasmu dalam menata rumah. Teruslah berkreasi, ciptakan suasana rumah yang nyaman dan indah, dan kami selalu siap mendukung setiap detail dekorasimu melalui alat hitung yang praktis ini. Selamat mendekorasi!`,
  category: 'Rumah',
  render(container) {
    const { wrapper: wWrap, input: wInput } = createInput('Lebar Dinding (m)', 'width', 'number');
    const { wrapper: hWrap, input: hInput } = createInput('Tinggi Dinding (m)', 'height', 'number');
    const { wrapper: rwWrap, input: rwInput } = createInput('Lebar Gulungan (m)', 'rwidth', 'number', '0.53');
    const { wrapper: rlWrap, input: rlInput } = createInput('Panjang Gulungan (m)', 'rlength', 'number', '10');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(wWrap);
    container.appendChild(hWrap);
    container.appendChild(rwWrap);
    container.appendChild(rlWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const w = parseFloat(wInput.value);
      const h = parseFloat(hInput.value);
      const rw = parseFloat(rwInput.value) || 0.53;
      const rl = parseFloat(rlInput.value) || 10;
      
      if (w > 0 && h > 0) {
        const wallArea = w * h;
        const rollArea = rw * rl;
        const rolls = wallArea / rollArea;
        resDisplay.textContent = `${Math.ceil(rolls * 1.1)} Gulungan (termasuk 10% sisa)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      wInput.value = ''; hInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
