import fs from 'fs';
import path from 'path';
import { Product } from '../types';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  filename: string;
}

export async function getAllProducts(): Promise<ProductData[]> {
  const productsDir = path.join(process.cwd(), 'src/products');
  const files = fs.readdirSync(productsDir).filter(file => file.endsWith('.ts'));
  
  const products: ProductData[] = [];
  
  for (const file of files) {
    try {
      const module = await import(`../products/${file.replace('.ts', '')}`);
      const prod = module.default || module[Object.keys(module)[0]];
      if (prod && prod.id && prod.name) {
        products.push({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          longDescription: prod.longDescription,
          category: prod.category,
          filename: file.replace('.ts', '')
        });
      }
    } catch (e) {
      console.error(`Failed to load product ${file}:`, e);
    }
  }
  
  return products;
}
