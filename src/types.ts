export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  filename: string;
  render: (container: HTMLElement) => void;
}

export type Category =
  | 'Promosi'
  | 'Identitas'
  | 'Kebutuhan Kantor'
  | 'Event & Acara'
  | 'Luar Ruang'
  | 'Lain-lain';