import fs from 'fs';
import path from 'path';
import { Calculator } from '../types';

export interface CalculatorData {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  filename: string;
}

export async function getAllCalculators(): Promise<CalculatorData[]> {
  const calculatorsDir = path.join(process.cwd(), 'src/calculators');
  const files = fs.readdirSync(calculatorsDir).filter(file => file.endsWith('.ts'));
  
  const calculators: CalculatorData[] = [];
  
  for (const file of files) {
    try {
      // We can't easily import the module on the server to get the data if we want to avoid the function passing issue,
      // but we can read the file content or just assume the structure.
      // Actually, we can import it, extract the data, and return only the serializable parts.
      const module = await import(`../calculators/${file.replace('.ts', '')}`);
      const calc = module.default || module[Object.keys(module)[0]];
      if (calc && calc.id && calc.name) {
        calculators.push({
          id: calc.id,
          name: calc.name,
          description: calc.description,
          longDescription: calc.longDescription,
          category: calc.category,
          filename: file.replace('.ts', '')
        });
      }
    } catch (e) {
      console.error(`Failed to load calculator ${file}:`, e);
    }
  }
  
  return calculators;
}
