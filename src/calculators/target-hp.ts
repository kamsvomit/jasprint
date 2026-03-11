import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const targetHp: Calculator = {
  id: 'target-hp',
  name: 'Target Beli HP',
  description: 'Hitung berapa lama Anda harus menabung untuk membeli HP impian.',
  longDescription: `Halo, teman-teman yang sedang mengejar impian! Kami tahu betapa asyiknya melihat-lihat review gadget terbaru di YouTube atau media sosial. Memiliki HP baru dengan kamera jernih atau performa kencang bukan sekadar gaya hidup, tapi seringkali menjadi kebutuhan untuk mendukung pekerjaan atau hobi kreatifmu. Kalkulator Target Beli HP ini kami buat agar impianmu tidak sekadar menjadi angan-angan, melainkan rencana nyata yang memiliki target waktu yang jelas dan terukur.

Cara pakainya sangat memotivasi: masukkan harga HP yang kamu incar, lalu masukkan jumlah uang yang sanggup kamu sisihkan secara konsisten setiap bulannya. Alat ini akan menghitung berapa bulan atau tahun yang kamu butuhkan untuk mencapai target tersebut. Dengan mengetahui durasi menabung, kamu bisa lebih disiplin dalam mengatur pengeluaran lain dan tetap fokus pada tujuan utamu. Tidak ada yang lebih memuaskan daripada membeli barang impian dari hasil jerih payah dan kesabaran sendiri tanpa harus berutang.

Tips menabung dari kami: cobalah untuk menabung di awal bulan segera setelah menerima gaji atau pendapatan, bukan menyisakan dari apa yang tertinggal di akhir bulan. Jika kamu merasa target waktunya terlalu lama, pertimbangkan untuk mencari penghasilan tambahan atau mencari promo diskon yang bisa menurunkan harga targetmu. Ingat, konsistensi adalah kunci. Meskipun jumlah yang ditabung terasa kecil, jika dilakukan terus-menerus, kamu akan terkejut melihat betapa cepat impianmu bisa terwujud.

Tetap semangat dan jangan menyerah pada impianmu! Setiap rupiah yang kamu simpan adalah langkah nyata menuju gadget idamanmu. Gunakan kalkulator ini sebagai pengingat visual akan kemajuanmu. Kami di Kalkulator Warga senang bisa menemani perjalananmu dalam mewujudkan keinginan dengan cara yang sehat secara finansial. Semoga HP baru tersebut nantinya bisa menjadi alat yang bermanfaat untuk meningkatkan produktivitas dan kebahagiaanmu.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Harga HP', 'price', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Tabungan per Bulan', 'save', 'number');
    
    const calcBtn = createButton('Hitung Waktu');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(tWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const price = parseValue(hInput.value);
      const save = parseValue(tInput.value);
      
      if (price > 0 && save > 0) {
        const months = Math.ceil(price / save);
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        let timeStr = `${months} Bulan`;
        if (years > 0) {
          timeStr = `${years} Tahun ${remainingMonths} Bulan`;
        }
        
        resDisplay.innerHTML = `
          <div>${timeStr}</div>
          <div class="text-sm font-medium text-slate-500 mt-1">Total: ${formatCurrency(price)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      hInput.value = ''; tInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};

export default targetHp;
