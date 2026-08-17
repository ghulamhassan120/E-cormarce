import React from 'react';

export default function SizeSelector({ sizes, selectedSize, setSelectedSize }) {
  return (
    <div className="py-6 border-b border-gray-200">
      <span className="text-sm text-gray-500 block mb-3">Choose Size</span>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSize(size)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer ${selectedSize === size ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}