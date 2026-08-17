import React from 'react';

export default function Breadcrumb() {
  return (
    <nav className="text-sm text-gray-500 mb-8 flex items-center space-x-2">
      <a href="/" className="hover:text-black">Home</a>
      <span>/</span>
      <a href="/shop" className="hover:text-black">Shop</a>
      <span>/</span>
      <a href="/shop/men" className="hover:text-black">Men</a>
      <span>/</span>
      <span className="text-black font-medium">T-shirts</span>
    </nav>
  );
}