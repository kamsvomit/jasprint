import { Product } from '../types';

export const spanduk: Product = {
  id: 'spanduk',
  name: 'Spanduk',
  description: 'Cetak spanduk atau banner untuk kebutuhan promosi luar ruangan.',
  longDescription: 'Spanduk kami tahan cuaca dan memiliki warna yang tajam. Cocok untuk acara, promosi toko, atau papan informasi.',
  category: 'Outdoor',
  filename: 'spanduk.ts',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-4">
        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
          <p class="text-sm text-red-800 font-medium">Spanduk tahan lama dengan warna tajam!</p>
        </div>
        <a href="https://wa.me/628123456789" target="_blank" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
          Pesan via WhatsApp
        </a>
      </div>
    `;
  }
};
