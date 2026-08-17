import React from 'react';
import { ChevronDown } from 'lucide-react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Shop() {
  const products = [
    { id: 1, name: 'Gradient Graphic T-shirt', image: 'gradient_tshirt.png', rating: 3.5, price: 145 },
    { id: 2, name: 'Polo with Tipping Details', image: 'polo_tipping.png', rating: 4.5, price: 180 },
    { id: 3, name: 'Black Striped T-shirt', image: 'black_striped.png', rating: 4.0, price: 120, originalPrice: 150, discount: 30 },
    { id: 4, name: 'Skinny Fit Jeans', image: 'skinny_jeans.png', rating: 3.5, price: 240, originalPrice: 260, discount: 20 },
    { id: 5, name: 'Checkered Shirt', image: 'checkered_shirt.png', rating: 4.5, price: 180 },
    { id: 6, name: 'Sleeve Striped T-shirt', image: 'sleeve_striped.png', rating: 4.5, price: 130, originalPrice: 160, discount: 30 },
    { id: 7, name: 'Vertical Striped Shirt', image: 'vertical_striped.png', rating: 5.0, price: 212, originalPrice: 232, discount: 20 },
    { id: 8, name: 'Courage Graphic T-shirt', image: 'courage_tshirt.png', rating: 4.0, price: 145 },
    { id: 9, name: 'Loose Fit Bermuda Shorts', image: 'bermuda_shorts.png', rating: 3.0, price: 80 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
        <a href="/" className="hover:text-black">Home</a>
        <span>/</span>
        <span className="text-black font-medium">Casual</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        <FilterSidebar />

        <div className="flex-1 w-full">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Casual</h1>
            
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-sm">
              <span className="text-gray-500">Showing 1-10 of 100 Products</span>
              <div className="flex items-center space-x-1 text-black font-medium cursor-pointer">
                <span>Sort by: <strong className="font-bold">Most Popular</strong></span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer">
              <span>Previous</span>
            </button>
            
            <div className="hidden sm:flex items-center space-x-2 text-sm font-medium">
              <button className="w-9 h-9 rounded-lg bg-[#F0F0F0] text-black font-bold">1</button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600">2</button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600">3</button>
              <span className="text-gray-400 px-1">...</span>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600">8</button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600">9</button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600">10</button>
            </div>

            <button className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer">
              <span>Next</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}