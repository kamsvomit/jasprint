import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency, parseValue } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Zakat Mal',
  id: 'zakat-mal',
  description: 'Hitung kewajiban zakat mal (2.5%) dari total harta Anda.',
  longDescription: `Halo, saudara-saudaraku yang dermawan. Di balik setiap rezeki yang kita terima melalui kerja keras dan peluh keringat, ada hak orang lain yang dititipkan oleh Sang Pencipta. Zakat bukan sekadar kewajiban agama, melainkan cara kita mensyukuri nikmat dan membersihkan harta agar lebih berkah bagi keluarga. Kalkulator Zakat Mal ini kami hadirkan untuk memudahkanmu menghitung kewajiban suci ini dengan cepat dan akurat, sehingga kamu bisa menunaikannya dengan hati yang lapang dan penuh ketenangan.

Cara kerjainya mengikuti kaidah fikih zakat yang umum. Masukkan total harta yang kamu miliki (tabungan, emas, investasi, dll) dan harga emas saat ini untuk menentukan nishab (batas minimum wajib zakat). Jika hartamu sudah mencapai nishab dan telah tersimpan selama satu tahun (haul), maka wajib dikeluarkan zakatnya sebesar 2,5%. Alat ini akan memberitahumu apakah kamu sudah wajib zakat atau belum, serta berapa nominal yang harus dikeluarkan.

Tips spiritual dari kami: jangan pernah takut hartamu berkurang karena zakat. Sebaliknya, zakat adalah benih yang akan menumbuhkan keberkahan dan melapangkan jalan rezekimu di masa depan. Menunaikan zakat juga memberikan rasa bahagia karena kita bisa membantu saudara-saudara kita yang sedang kesulitan. Jadikan momen berzakat sebagai pengingat bahwa rezeki yang kita miliki adalah amanah yang harus dikelola dengan penuh tanggung jawab dan kasih sayang.

Semoga hartamu selalu berkah dan keluargamu selalu dalam lindungan-Nya. Terima kasih sudah menjadi tangan di atas yang membantu sesama. Kerja kerasmu mencari nafkah kini menjadi jalan kebaikan bagi banyak orang. Jangan biarkan keraguan menghalangi niat baikmu; gunakan alat ini untuk memastikan hitunganmu tepat. Kami di Kalkulator Warga merasa sangat bersyukur bisa membantumu menjalankan kewajiban mulia ini dengan lebih mudah.`,
  category: 'Keuangan',
  render(container) {
    const { wrapper: hWrap, input: hInput } = createInput('Total Harta (Rp)', 'harta', 'number', 'Contoh: 100000000');
    const { wrapper: nWrap, input: nInput } = createInput('Harga Emas Saat Ini (per gram)', 'emas', 'number', 'Contoh: 1000000');
    
    const calcBtn = createButton('Hitung Zakat', 'btn-3d w-full mb-4');
    const resetBtn = createButton('Reset', 'btn-3d-secondary w-full');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(hWrap);
    container.appendChild(nWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const harta = parseValue(hInput.value);
      const emas = parseValue(nInput.value);
      const nishab = 85 * emas;
      
      if (harta >= nishab) {
        const zakat = harta * 0.025;
        resDisplay.innerHTML = `
          <div>${formatCurrency(zakat)}</div>
          <div class="text-sm text-green-600 mt-1">Wajib Zakat (Harta mencapai nishab)</div>
        `;
      } else {
        resDisplay.innerHTML = `
          <div class="text-lg text-gray-500">Belum Wajib Zakat</div>
          <div class="text-sm text-gray-400 mt-1">Harta di bawah nishab (${formatCurrency(nishab)})</div>
        `;
      }
      resWrap.classList.remove('hidden');
    };

    resetBtn.onclick = () => {
      hInput.value = ''; nInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
