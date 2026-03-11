import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Beton',
  id: 'concrete-calc',
  description: 'Hitung volume beton yang dibutuhkan untuk sebuah lantai/slab.',
  longDescription: `Halo, kamu yang lagi dalam proses renovasi rumah, membangun rumah baru, atau mengerjakan proyek konstruksi apapun yang butuh pengecoran beton. Kami tahu betapa stresnya fase perencanaan ini—salah estimasi material bisa berarti kamu kekurangan beton di tengah pengerjaan (dan ini mimpi buruk di dunia konstruksi), atau malah kebanyakan beli dan uang terbuang sia-sia. Kalkulator Volume Beton ini hadir sebagai teman perencanaan konstruksimu yang andal, untuk memastikan kamu pesan material yang tepat dari awal.

Cara menggunakannya sangat praktis. Masukkan panjang dan lebar area yang akan dicor dalam meter, serta ketebalan yang diinginkan dalam sentimeter. Kalkulator ini akan langsung menghitung volume beton yang dibutuhkan dalam meter kubik (m³). Misalnya, untuk lantai seluas 5m × 4m dengan ketebalan 10 cm, kamu butuh 5 × 4 × 0,1 = 2 m³ beton. Volume inilah yang menjadi dasar untuk menghitung kebutuhan material: semen, pasir, kerikil, dan air—atau kalau kamu memakai beton ready mix, ini adalah angka yang kamu sampaikan ke supplier.

Beberapa tips penting dari dunia konstruksi yang perlu kamu ingat: pertama, selalu tambahkan margin 10–15% dari hasil kalkulasi untuk mengantisipasi kehilangan material, tumpahan, dan ketidakrataan permukaan. Kedua, untuk mutu beton standar rumah tinggal (K-225 atau K-250), perbandingan campuran yang umum adalah 1 semen : 2 pasir : 3 kerikil ditambah air secukupnya. Ketiga, perhatikan waktu setting—beton mulai mengeras setelah sekitar 30 menit dan mencapai kekuatan penuh setelah 28 hari, jadi pastikan pengerjaan dilakukan dengan efisien. Keempat, cuaca panas atau angin kencang bisa mempercepat penguapan air dan melemahkan beton—pertimbangkan pengerjaan di pagi hari.

Membangun rumah atau merenovasi adalah investasi jangka panjang yang nilainya sangat berarti. Setiap detail perencanaan yang kamu lakukan dengan cermat adalah bentuk penghormatan terhadap kerja kerasmu mengumpulkan uang untuk proyek ini. Kami di Kalkulator Warga bangga bisa menemani proses perencanaan konstruksimu. Mulai dari kalkulator beton hingga berbagai alat perhitungan rumah lainnya—semuanya ada di sini, gratis, dan siap membantu. Semoga proyek bangunanmu berjalan lancar dan hasilnya memuaskan!`,
  category: 'Rumah',
  render(container) {
    const { wrapper: lWrap, input: lInput } = createInput('Panjang (m)', 'length', 'number');
    const { wrapper: wWrap, input: wInput } = createInput('Lebar (m)', 'width', 'number');
    const { wrapper: dWrap, input: dInput } = createInput('Ketebalan (cm)', 'thick', 'number', '10');
    
    const calcBtn = createButton('Hitung Volume');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(lWrap);
    container.appendChild(wWrap);
    container.appendChild(dWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const l = parseFloat(lInput.value);
      const w = parseFloat(wInput.value);
      const d = parseFloat(dInput.value) / 100;
      
      if (l > 0 && w > 0 && d > 0) {
        const volume = l * w * d;
        resDisplay.textContent = `${volume.toFixed(2)} Meter Kubik (m³)`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      lInput.value = ''; wInput.value = ''; dInput.value = '10';
      resWrap.classList.add('hidden');
    };
  }
};