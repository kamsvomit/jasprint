import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Konversi Satuan Masak',
  id: 'cook-convert',
  description: 'Konversi antara satuan masak umum (Sdt, Sdm, Cup).',
  longDescription: `Halo, para pecinta masak-memasak yang sering berkutat dengan resep dari berbagai sumber! Entah kamu lagi mengikuti resep dari buku masak impor, menonton tutorial memasak di YouTube, atau mencoba resep yang viral di media sosial—pasti pernah ketemu situasi di mana resepnya pakai "cup" tapi kamu cuma punya sendok makan biasa di dapur. Atau resepnya bilang "2 sdm" tapi timbangan digitalmu lagi error. Jangan biarkan kebingungan satuan merusak mood masakmu! Kalkulator Konversi Satuan Masak ini hadir khusus buat kamu.

Cara penggunaannya sangat intuitif. Masukkan jumlah yang ingin dikonversi, pilih satuan asal (Sendok Teh, Sendok Makan, atau Cup), lalu pilih satuan tujuan, dan klik Konversi. Sebagai referensi cepat yang perlu kamu hafal: 1 Cup = 16 Sendok Makan (Sdm) = 48 Sendok Teh (Sdt). Jadi 1 Sdm = 3 Sdt. Konversi cup ke ml juga berguna diketahui—1 Cup (standar US) setara dengan sekitar 236,6 ml. Angka-angka ini adalah standar yang digunakan dalam dunia kuliner internasional, dan kalkulator konversi bahan masak ini menggunakan nilai yang sama persis.

Tahukah kamu bahwa akurasi takaran sangat penting dalam memasak, terutama untuk produk baking seperti kue, roti, dan pastri? Kesalahan takaran sekecil 1 sendok teh baking soda saja bisa membuat kue kamu gagal mengembang atau rasanya pahit. Berbeda dengan masakan sehari-hari yang lebih fleksibel, baking adalah ilmu pasti yang butuh presisi. Itulah kenapa banyak baker profesional menggunakan timbangan gram, tapi untuk dapur rumahan dengan peralatan standar, konversi satuan masak ini sudah lebih dari cukup untuk menghasilkan masakan yang konsisten dan lezat.

Semoga dengan adanya alat konversi satuan masak online ini, aktivitas memasak favoritmu jadi semakin menyenangkan dan bebas stres! Tidak perlu lagi bongkar-bongkar Google hanya untuk tahu berapa sendok makan dalam satu cup. Kami di Kalkulator Warga senang bisa hadir di dapur virtualmu. Selamat bereksperimen dengan berbagai resep baru, dan jangan lupa—masakan terlezat selalu dibuat dengan hati yang bahagia dan takaran yang tepat!`,
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: vWrap, input: vInput } = createInput('Nilai', 'val', 'number');
    const fromSelect = document.createElement('select');
    fromSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-2';
    [{id: 'Tsp', name: 'Sdt (Sendok Teh)'}, {id: 'Tbsp', name: 'Sdm (Sendok Makan)'}, {id: 'Cup', name: 'Cup'}].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id; opt.textContent = u.name;
      fromSelect.appendChild(opt);
    });
    
    const toSelect = document.createElement('select');
    toSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md mb-4';
    [{id: 'Tsp', name: 'Sdt (Sendok Teh)'}, {id: 'Tbsp', name: 'Sdm (Sendok Makan)'}, {id: 'Cup', name: 'Cup'}].forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id; opt.textContent = u.name;
      toSelect.appendChild(opt);
    });

    const calcBtn = createButton('Konversi');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(vWrap);
    container.appendChild(fromSelect);
    container.appendChild(toSelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    const factors: any = { 'Tsp': 1, 'Tbsp': 3, 'Cup': 48 };

    calcBtn.onclick = () => {
      const val = parseFloat(vInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;
      if (!isNaN(val)) {
        const res = (val * factors[from]) / factors[to];
        const unitName = to === 'Tsp' ? 'Sdt' : (to === 'Tbsp' ? 'Sdm' : 'Cup');
        showResult(`${res.toFixed(2)} ${unitName}`);
      } else {
        showError('Harap masukkan angka yang valid.');
      }
    };

    resetBtn.onclick = () => {
      vInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};