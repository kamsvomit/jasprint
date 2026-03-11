import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const hpp: Calculator = {
  id: 'hpp',
  name: 'Harga Pokok Produksi (HPP)',
  description: 'Hitung total biaya modal untuk satu unit produk.',
  longDescription: `Halo, para pejuang UMKM dan pengusaha mandiri! Kami tahu bahwa di balik setiap produk yang kamu jual, ada kerja keras, waktu, dan modal yang tidak sedikit. Menentukan harga jual seringkali menjadi tantangan tersendiri; jika terlalu mahal takut tidak laku, jika terlalu murah takut merugi. Kalkulator Harga Pokok Produksi (HPP) ini hadir sebagai mitra bisnismu untuk memastikan kamu tahu persis berapa modal yang kamu keluarkan untuk setiap unit produk yang kamu hasilkan.

Cara menggunakan alat ini sangat sistematis. Kamu perlu memasukkan tiga komponen utama: biaya bahan baku, biaya tenaga kerja langsung, dan biaya overhead (seperti listrik, air, atau kemasan). Masukkan juga jumlah total unit yang diproduksi dalam satu siklus. Alat ini akan menjumlahkan seluruh biaya tersebut dan membaginya dengan jumlah unit, sehingga kamu mendapatkan angka HPP per unit yang akurat. Dengan mengetahui HPP, kamu bisa menentukan margin keuntungan dengan lebih percaya diri dan terukur.

Tips bisnis dari kami: jangan pernah melupakan biaya-biaya kecil dalam perhitungan overhead. Seringkali, biaya seperti lakban, plastik packing, atau bensin untuk pengantaran luput dari hitungan, padahal jika diakumulasikan bisa menggerus keuntunganmu. Selain itu, hargailah tenaga kerjamu sendiri; masukkan upah yang layak untuk dirimu sendiri ke dalam komponen biaya tenaga kerja. Bisnis yang sehat adalah bisnis yang mampu menghargai setiap sumber daya yang terlibat di dalamnya.

Teruslah berinovasi dan kembangkan usahamu! Kami bangga bisa menjadi bagian dari perjalanan bisnismu melalui alat bantu yang sederhana ini. Jangan biarkan kerumitan angka menghambat kreativitasmu dalam berkarya. Gunakan kalkulator ini secara rutin setiap kali ada perubahan harga bahan baku agar bisnismu tetap kompetitif dan menguntungkan. Kami di Kalkulator Warga selalu siap mendukung pertumbuhan ekonomi lokal melalui pemberdayaan para pengusaha seperti kamu.`,
  category: 'Bisnis & Jualan',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Biaya Bahan Baku', 'raw-mat', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Biaya Tenaga Kerja', 'labor', 'number');
    const { wrapper: oWrap, input: oInput } = createInput('Biaya Overhead', 'overhead', 'number');
    const { wrapper: qWrap, input: qInput } = createInput('Jumlah Produksi (Unit)', 'qty', 'number', '1');
    
    const calcBtn = createButton('Hitung HPP');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(tWrap);
    container.appendChild(oWrap);
    container.appendChild(qWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const raw = parseValue(bInput.value) || 0;
      const labor = parseValue(tInput.value) || 0;
      const overhead = parseValue(oInput.value) || 0;
      const qty = parseValue(qInput.value) || 1;
      
      const total = raw + labor + overhead;
      const perUnit = total / qty;
      
      resDisplay.innerHTML = `
        <div>${formatCurrency(perUnit)} <span class="text-sm font-normal text-slate-500">/ unit</span></div>
        <div class="text-sm font-medium text-slate-500 mt-1">Total Biaya: ${formatCurrency(total)}</div>
      `;
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      bInput.value = ''; tInput.value = ''; oInput.value = ''; qInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default hpp;
