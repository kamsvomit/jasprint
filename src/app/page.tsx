import React from 'react';
import { getAllProducts } from '../lib/products';
import { getAllPosts } from '../lib/blog';
import ClientPage from './ClientPage';

export default async function Page() {
  const [products, allPosts] = await Promise.all([
    getAllProducts(),
    getAllPosts(),
  ]);

  return (
    <ClientPage
      initialProducts={products}
      recentPosts={allPosts}
    />
  );
}