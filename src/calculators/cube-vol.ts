import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Volume Kubus',
  id: 'cube-vol',
  description: 'Hitung volume kubus berdasarkan panjang sisi.',
  longDescription: `Halo, kamu yang lagi mengerjakan soal matematika, merencanakan kebutuhan material untuk proyek konstruksi, atau mungkin sedang menghitung kapasitas sebuah wadah berbentuk kubus. Menghitung volume kubus adalah konsep geometri tiga dimensi yang paling dasar, tapi tetap sering dibutuhkan dalam kehidupan nyata—dari urusan packing barang, menghitung kebutuhan tanah urukan, sampai merancang akuarium atau lemari. Kalkulator Volume Kubus ini hadir untuk memberikan hasil yang cepat dan akurat setiap kali kamu butuhkan.

Cara kerjanya sangat sederhana. Masukkan panjang sisi kubus, lalu klik Hitung Volume. Karena kubus memiliki semua sisi yang sama panjang, kamu hanya perlu memasukkan satu nilai saja. Rumus yang digunakan adalah V = s³, atau panjang sisi dipangkatkan tiga. Jadi jika sisi kubusnya 5 meter, maka volumenya adalah 5 × 5 × 5 = 125 m³. Satuan volume akan mengikuti satuan sisi yang kamu masukkan—jika dalam meter, hasilnya dalam meter kubik (m³); jika dalam sentimeter, hasilnya dalam sentimeter kubik (cm³). Sesederhana itu, dan perhitungannya dijamin akurat karena menggunakan komputasi presisi tinggi.

Dalam dunia nyata, perhitungan volume kubus berguna di berbagai bidang. Di bidang konstruksi dan teknik sipil, menghitung volume kubus beton, volume galian tanah berbentuk kotak, atau kapasitas tangki air berbentuk kubik. Di bidang logistik dan pengiriman, menghitung volume box pengiriman untuk menentukan biaya kargo berdasarkan volumetric weight. Di bidang pendidikan, ini adalah materi wajib pelajaran matematika SD dan SMP yang sering muncul di ulangan dan ujian. Di bidang industri, menghitung kapasitas wadah penyimpanan, container, atau ruang produksi berbentuk kubik. Kalkulator volume bangun ruang ini bisa dipakai untuk semua keperluan tersebut.

Matematika itu hadir di mana-mana, bahkan saat kamu sedang mendekorasi ruangan atau memindahkan barang. Dan kami di Kalkulator Warga ingin memastikan kamu tidak pernah kehabisan alat untuk menghadapi setiap tantangan hitung-menghitung yang datang. Bookmark halaman ini dan manfaatkan semua kalkulator lain yang tersedia—karena ketika kamu punya alat yang tepat, tidak ada masalah yang terlalu sulit untuk diselesaikan.`,
  category: 'Matematika',
  render(container) {
    const { wrapper: sWrap, input: sInput } = createInput('Panjang Sisi', 'side', 'number');
    
    const calcBtn = createButton('Hitung Volume', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(sWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const s = parseValue(sInput.value);
      if (s > 0) {
        resDisplay.textContent = `${Math.pow(s, 3).toFixed(2)} unit³`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      sInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};