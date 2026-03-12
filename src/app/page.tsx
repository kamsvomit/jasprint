import React from 'react';
import { getAllProducts } from '../lib/products';
import { getRecentPosts } from '../lib/blog';
import ClientPage from './ClientPage';

export default async function Page() {
  const [products, recentPosts] = await Promise.all([
    getAllProducts(),
    getRecentPosts(3),
  ]);

  return (
    <ClientPage
      initialProducts={products}
      recentPosts={recentPosts}
    />
  );
}