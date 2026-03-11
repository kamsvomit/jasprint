export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  filename: string;
  render: (container: HTMLElement) => void;
}

export interface Calculator {
  name: string;
  id: string;
  description: string;
  longDescription?: string;
  category: string;
  icon?: string;
  render: (container: HTMLElement) => void;
}

export type Category = 
  | 'Keuangan' 
  | 'Bisnis' 
  | 'Kesehatan' 
  | 'Kehidupan Sehari-hari' 
  | 'Belanja' 
  | 'Produktivitas' 
  | 'Utilitas' 
  | 'Matematika' 
  | 'Konversi' 
  | 'Kebugaran' 
  | 'Rumah' 
  | 'Lain-lain';
