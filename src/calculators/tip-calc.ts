import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, formatCurrency } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator Tip',
  id: 'tip-calc',
  description: 'Hitung tip dan total tagihan per orang.',
  longDescription: `Halo, para pecinta kuliner dan penikmat makan malam bersama teman-teman! Momen makan bersama adalah saat yang menyenangkan untuk berbagi cerita dan kebahagiaan. Namun, saat tagihan datang, suasana terkadang menjadi sedikit canggung ketika kita harus menghitung berapa tip yang pantas diberikan atau bagaimana membagi total tagihan secara adil di antara semua orang. Kalkulator Tip ini kami sediakan untuk membantumu menyelesaikan urusan pembayaran dengan cepat, sopan, dan transparan, sehingga momen kebersamaanmu tetap berkesan positif.

Cara kerja alat hitung pembagian tagihan online ini sangat praktis untuk setiap acara kumpul-kumpulmu. Kamu cukup memasukkan total jumlah tagihan, persentase tip yang ingin diberikan (misalnya 10% atau 15%), dan jumlah orang yang ikut makan bersama. Alat ini akan secara otomatis menghitung total tip, total tagihan keseluruhan, dan yang paling penting: berapa jumlah yang harus dibayar oleh setiap orang. Tidak ada lagi perdebatan atau kebingungan saat harus membayar di kasir, semua terhitung dengan adil dan terbuka.

Tips etika makan dari kami: memberikan tip adalah cara yang indah untuk menunjukkan apresiasi atas pelayanan yang baik dari staf restoran. Meskipun di beberapa tempat biaya layanan (service charge) sudah termasuk dalam tagihan, memberikan sedikit tambahan secara sukarela seringkali sangat berarti bagi para pekerja. Menghargai kerja keras orang lain adalah cerminan dari kemurahan hati dan karakter yang baik. Jadikan setiap momen makan bersama sebagai kesempatan untuk berbagi kebaikan, bukan hanya berbagi makanan.

Semoga kalkulator tip dan bagi tagihan ini mempermudah urusan sosialmu setiap kali makan di luar. Kami di Kalkulator Warga senang bisa membantu mempermudah interaksi harian warga melalui alat bantu yang praktis dan memudahkan. Jangan biarkan urusan hitung-hitungan merusak suasana ceriamu. Teruslah menjalin silaturahmi, nikmati hidangan lezat bersama orang-orang tersayang, dan kami selalu siap mendukung setiap momen kebersamaanmu melalui alat bantu yang jujur dan membantu. Selamat makan dan bersenang-senang!`,
  category: 'Lainnya',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('Jumlah Tagihan (Rp)', 'bill', 'number');
    const { wrapper: tWrap, input: tInput } = createInput('Persentase Tip (%)', 'tip', 'number', '15');
    const { wrapper: pWrap, input: pInput } = createInput('Jumlah Orang', 'people', 'number', '1');
    
    const calcBtn = createButton('Hitung');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(tWrap);
    container.appendChild(pWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bill = parseFloat(bInput.value);
      const tipPercent = parseFloat(tInput.value) || 15;
      const people = parseFloat(pInput.value) || 1;
      
      if (bill > 0 && people > 0) {
        const tipAmount = bill * (tipPercent / 100);
        const total = bill + tipAmount;
        const perPerson = total / people;
        
        resDisplay.innerHTML = `
          <div>Total: ${formatCurrency(total)}</div>
          <div class="text-sm text-gray-500 mt-1">Per Orang: ${formatCurrency(perPerson)}</div>
          <div class="text-sm text-gray-500">Tip: ${formatCurrency(tipAmount)}</div>
        `;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = ''; tInput.value = '15'; pInput.value = '1';
      resWrap.classList.add('hidden');
    };
  }
};
