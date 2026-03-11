import { Product } from '../types';

export const kartuNama: Product = {
  id: 'kartu-nama',
  name: 'Kartu Nama',
  description: 'Cetak kartu nama profesional untuk identitas bisnis Anda.',
  longDescription: 'Kartu nama adalah kesan pertama yang penting. Kami menawarkan berbagai pilihan kertas premium dan finishing eksklusif.',
  category: 'Identitas',
  filename: 'kartu-nama.ts',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-4">
        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
          <p class="text-sm text-red-800 font-medium">Kartu nama profesional untuk identitas bisnis Anda!</p>
        </div>
        <a href="https://wa.me/628123456789" target="_blank" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
          Pesan via WhatsApp
        </a>
      </div>
    `;
  }
};
