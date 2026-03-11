import { Product } from '../types';

export const nota: Product = {
  id: 'nota',
  name: 'Nota / Faktur',
  description: 'Cetak nota atau faktur untuk pencatatan transaksi Anda.',
  longDescription: 'Kami menyediakan cetak nota dengan kertas NCR (tanpa karbon) dalam berbagai ukuran dan rangkap.',
  category: 'Administrasi',
  filename: 'nota.ts',
  render: (container: HTMLElement) => {
    container.innerHTML = `
      <div class="flex flex-col gap-4">
        <div class="bg-red-50 p-4 rounded-xl border border-red-100">
          <p class="text-sm text-red-800 font-medium">Nota NCR berkualitas untuk transaksi bisnis Anda!</p>
        </div>
        <a href="https://wa.me/628123456789" target="_blank" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
          Pesan via WhatsApp
        </a>
      </div>
    `;
  }
};
