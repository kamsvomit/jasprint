import { Calculator } from '../types';
import { createInput, createButton, createResultDisplay, setupEnterKeyNavigation } from '../utils';

export const calculator: Calculator = {
  name: 'Pengubah Skala Resep',
  id: 'recipe-scaler',
  description: 'Ubah takaran bahan resep berdasarkan jumlah porsi yang diinginkan.',
  longDescription: `Halo, para koki rumah tangga dan pecinta kuliner yang kreatif! Pernahkah kamu menemukan resep masakan yang sangat menggoda tapi takarannya hanya untuk 2 orang, padahal kamu ingin menjamu 10 orang teman di rumah? Atau sebaliknya, resep kue yang kamu punya untuk porsi besar tapi kamu hanya ingin membuatnya untuk dinikmati sendiri? Mengubah takaran bahan secara manual satu per satu seringkali membingungkan dan berisiko salah hitung yang bisa merusak rasa masakan. Pengubah Skala Resep ini hadir sebagai asisten dapurmu untuk memastikan setiap bumbu tetap seimbang dalam porsi berapapun.

Cara kerja alat hitung porsi resep online ini sangat memudahkan persiapan memasakmu. Kamu cukup memasukkan jumlah porsi asli dari resep tersebut, jumlah porsi baru yang ingin kamu buat, dan jumlah takaran salah satu bahan yang ingin kamu ubah skalanya. Alat ini akan menghitung secara otomatis berapa takaran yang tepat untuk porsi baru tersebut. Kamu bisa mengulangi proses ini untuk setiap bahan dalam resepmu, sehingga keseimbangan rasa tetap terjaga sempurna meskipun jumlah porsinya berubah drastis.

Tips memasak dari kami: saat memperbesar skala resep dalam jumlah yang sangat banyak (misalnya dari 4 porsi menjadi 50 porsi), terkadang beberapa bumbu kuat seperti garam, merica, atau cabai tidak perlu dikalikan secara linear karena rasanya bisa menjadi terlalu dominan. Selalu lakukan tes rasa (taste test) di akhir proses memasak untuk memastikan bumbunya sudah pas. Memasak adalah perpaduan antara sains perhitungan dan seni perasaan. Dengan alat bantu yang tepat, setiap hidangan yang kamu sajikan akan selalu istimewa.

Semoga pengubah skala resep ini membuat pengalaman memasakmu menjadi lebih menyenangkan dan bebas stres. Kami di Kalkulator Warga senang bisa membantu mempermudah urusan dapur keluarga Indonesia melalui alat bantu yang praktis dan akurat. Jangan biarkan hitungan matematika menghalangi bakat memasakmu. Teruslah berkreasi di dapur, sajikan hidangan penuh cinta untuk orang-orang tersayang, dan kami selalu siap mendukung setiap langkah produktifmu melalui alat hitung yang jujur dan membantu. Selamat memasak!`,
  category: 'Kehidupan Sehari-hari',
  render(container) {
    const { wrapper: oWrap, input: oInput } = createInput('Porsi Asli', 'orig', 'number');
    const { wrapper: nWrap, input: nInput } = createInput('Porsi yang Diinginkan', 'new', 'number');
    const { wrapper: iWrap, input: iInput } = createInput('Jumlah Bahan', 'amt', 'number');
    
    const calcBtn = createButton('Ubah Skala');
    const resetBtn = createButton('Reset', 'btn-macos-secondary ml-2');
    const { wrapper: resWrap, showError, showResult } = createResultDisplay();

    container.appendChild(oWrap);
    container.appendChild(nWrap);
    container.appendChild(iWrap);
    container.appendChild(calcBtn);
    container.appendChild(resetBtn);
    container.appendChild(resWrap);

    calcBtn.onclick = () => {
      const orig = parseFloat(oInput.value);
      const desired = parseFloat(nInput.value);
      const amt = parseFloat(iInput.value);
      
      if (orig > 0 && desired > 0 && amt > 0) {
        const res = (amt / orig) * desired;
        showResult(res.toFixed(2));
      } else {
        showError('Harap masukkan angka yang valid dan lebih dari 0.');
      }
    };

    resetBtn.onclick = () => {
      oInput.value = ''; nInput.value = ''; iInput.value = '';
      resWrap.classList.add('hidden');
    };

    setupEnterKeyNavigation(container, () => calcBtn.click());
  }
};
