import { Product } from '../types';

export const brosur: Product = {
  id: 'brosur',
  name: 'Brosur',
  description: 'Cetak brosur berkualitas tinggi untuk promosi bisnis Anda.',
  longDescription: 'Brosur adalah alat pemasaran yang efektif untuk menyampaikan informasi detail tentang produk atau layanan Anda. Kami menyediakan berbagai pilihan kertas dan finishing untuk brosur Anda.',
  category: 'Promosi',
  filename: 'brosur.ts',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-4">
        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
          <p class="text-sm text-red-800 font-medium">Hubungi kami untuk penawaran harga terbaik!</p>
        </div>
        <a href="https://wa.me/628123456789" target="_blank" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
          Pesan via WhatsApp
        </a>
      </div>
    `;
  }
};
