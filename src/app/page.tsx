import React from 'react';
import { getAllProducts } from '../lib/products';
import ClientPage from './ClientPage';

export default async function Page() {
  const products = await getAllProducts();
  
  return (
    <ClientPage initialProducts={products} />
  );
}
