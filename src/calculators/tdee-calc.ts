import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay } from '../utils';

export const calculator: Calculator = {
  name: 'Kalkulator TDEE',
  id: 'tdee-calc',
  description: 'Hitung Total Daily Energy Expenditure (Total Pengeluaran Energi Harian).',
  longDescription: `Halo, teman-teman pejuang hidup sehat! Pernahkah kamu merasa sudah makan sedikit tapi berat badan tidak kunjung turun, atau sebaliknya, sudah makan banyak tapi tetap merasa lemas saat beraktivitas? Kuncinya ada pada pemahaman tentang TDEE atau Total Daily Energy Expenditure. TDEE adalah jumlah total kalori yang dibakar tubuhmu dalam satu hari, dengan mempertimbangkan tingkat aktivitas fisikmu. Kalkulator TDEE online ini hadir untuk membantumu menemukan "angka ajaib" kebutuhan kalorimu agar perjalanan sehatmu lebih terukur dan tidak menebak-nebak lagi.

Cara kerja alat ini sangat cerdas namun mudah digunakan. Kamu hanya perlu memasukkan angka BMR (Basal Metabolic Rate) kamu—yaitu jumlah kalori yang dibakar tubuh saat istirahat total—kemudian pilih tingkat aktivitas harianmu, mulai dari yang jarang olahraga hingga yang sangat aktif bekerja fisik. Alat ini akan mengalikan BMR dengan faktor aktivitas tersebut untuk memberikan estimasi total kalori yang kamu butuhkan untuk mempertahankan berat badan saat ini. Mengetahui angka TDEE adalah langkah pertama yang paling krusial jika kamu ingin menurunkan berat badan (defisit kalori) atau menaikkan massa otot (surplus kalori).

Tips dari kami untuk hasil yang maksimal: jujurlah pada diri sendiri saat memilih tingkat aktivitas. Seringkali kita merasa sudah sangat aktif padahal sebagian besar waktu kita habiskan dengan duduk di depan komputer. Jika tujuanmu adalah menurunkan berat badan, cobalah untuk mengonsumsi sekitar 300-500 kalori di bawah angka TDEE-mu. Sebaliknya, jika ingin menambah berat badan secara sehat, tambahkan 300-500 kalori di atasnya. Ingat, konsistensi dalam memantau asupan kalori jauh lebih penting daripada hasil instan yang tidak berkelanjutan.

Semoga kalkulator kebutuhan kalori harian ini bisa menjadi kompas dalam perjalanan kesehatanmu. Kami di Kalkulator Warga percaya bahwa setiap orang berhak memiliki tubuh yang bugar untuk bisa terus berkarya dan membahagiakan keluarga. Jangan jadikan angka ini sebagai beban, tapi jadikan sebagai panduan untuk lebih bijak dalam memilih apa yang masuk ke tubuhmu. Tetap semangat, jaga kesehatan, dan mari kita bangun Indonesia yang lebih sehat dan produktif bersama-sama!`,
  category: 'Kebugaran',
  render(container) {
    const { wrapper: bWrap, input: bInput } = createInput('BMR (kkal)', 'bmr', 'number');
    
    const activityLabel = document.createElement('label');
    activityLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
    activityLabel.textContent = 'Tingkat Aktivitas';
    const activitySelect = document.createElement('select');
    activitySelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4';
    const levels = [
      { name: 'Sedenter (Jarang Olahraga)', val: 1.2 },
      { name: 'Aktivitas Ringan', val: 1.375 },
      { name: 'Aktivitas Sedang', val: 1.55 },
      { name: 'Sangat Aktif', val: 1.725 },
      { name: 'Ekstra Aktif', val: 1.9 }
    ];
    levels.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l.val.toString();
      opt.textContent = l.name;
      activitySelect.appendChild(opt);
    });

    const calcBtn = createButton('Hitung TDEE');
    const resetBtn = createButton('Reset', 'bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2');
    const { wrapper: resWrap, display: resDisplay } = createResultDisplay();

    container.appendChild(bWrap);
    container.appendChild(activityLabel);
    container.appendChild(activitySelect);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const bmr = parseFloat(bInput.value);
      const activity = parseFloat(activitySelect.value);
      if (bmr > 0) {
        const tdee = bmr * activity;
        resDisplay.textContent = `${Math.round(tdee)} kkal / hari`;
        resWrap.classList.remove('hidden');
      }
    };

    resetBtn.onclick = () => {
      bInput.value = '';
      resWrap.classList.add('hidden');
    };
  }
};
