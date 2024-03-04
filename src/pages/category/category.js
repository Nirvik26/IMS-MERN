import React, { useState } from 'react';
import ProductList from '../../components/product/productList/ProductList';

const Category = ({ products, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div>
      <h2>Select Category</h2>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <ProductList products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default Category;
