import { Product } from '../types';

export const undangan: Product = {
  id: 'undangan',
  name: 'Undangan',
  description: 'Cetak undangan pernikahan atau acara spesial Anda.',
  longDescription: 'Kami menawarkan berbagai desain undangan yang elegan dan personal untuk momen berharga Anda.',
  category: 'Acara',
  filename: 'undangan.ts',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-4">
        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
          <p class="text-sm text-red-800 font-medium">Undangan elegan untuk momen spesial Anda!</p>
        </div>
        <a href="https://wa.me/628123456789" target="_blank" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
          Pesan via WhatsApp
        </a>
      </div>
    `;
  }
};
