import { Product } from '../types';

export const sticker: Product = {
  id: 'sticker',
  name: 'Sticker',
  description: 'Cetak sticker label atau dekorasi dengan berbagai bentuk.',
  longDescription: 'Sticker kami tersedia dalam berbagai bahan seperti vinyl atau kromo, dengan pilihan laminasi glossy atau matte.',
  category: 'Label',
  filename: 'sticker.ts',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-4">
        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
          <p class="text-sm text-red-800 font-medium">Sticker label berkualitas untuk produk Anda!</p>
        </div>
        <a href="https://wa.me/628123456789" target="_blank" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
          Pesan via WhatsApp
        </a>
      </div>
    `;
  }
};
