import React, { useState } from 'react';
import { SlidersHorizontal, ChevronRight, ChevronUp } from 'lucide-react';

export default function FilterSidebar() {
  const [selectedColor, setSelectedColor] = useState('#2563EB'); // Default blue with check
  const [selectedSizes, setSelectedSizes] = useState(['Large']);
  const [priceRange, setPriceRange] = useState(200);

  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  const colorsList = ['#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5', '#2563EB', '#7F00FF', '#FF007F', '#FFFFFF', '#000000'];
  const sizesList = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <aside className="bg-white border border-gray-200 rounded-[24px] p-6 w-full lg:w-[295px] flex-shrink-0 shadow-xs">
      
      {/* Header: Filters & Icon */}
      <div className="flex items-center justify-between pb-5 border-b border-gray-200 mb-6">
        <h3 className="font-bold text-xl text-black">Filters</h3>
        <button className="text-gray-400 hover:text-black cursor-pointer">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-4 pb-6 border-b border-gray-200 text-gray-600 text-sm font-medium">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center justify-between cursor-pointer hover:text-black transition-colors">
            <span>{cat}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Price Slider Section */}
      <div className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between font-bold text-black mb-4">
          <span>Price</span>
          <ChevronUp className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
        <input 
          type="range" 
          min="50" 
          max="500" 
          value={priceRange} 
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 font-semibold mt-2">
          <span>$50</span>
          <span>${priceRange}</span>
        </div>
      </div>

      {/* Colors Section */}
      <div className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between font-bold text-black mb-4">
          <span>Colors</span>
          <ChevronUp className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {colorsList.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={`w-9 h-9 rounded-full flex items-center justify-center border border-gray-300 transition-transform cursor-pointer ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black scale-110' : ''}`}
            >
              {selectedColor === color && (
                <span className={`text-xs ${color === '#FFFFFF' ? 'text-black' : 'text-white'}`}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Section */}
      <div className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between font-bold text-black mb-4">
          <span>Size</span>
          <ChevronUp className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
        <div className="flex flex-wrap gap-2">
          {sizesList.map((size, index) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={index}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  isSelected ? 'bg-black text-white' : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dress Style Section */}
      <div className="py-6 border-b border-gray-200 space-y-4 text-gray-600 text-sm font-medium">
        <div className="flex items-center justify-between font-bold text-black">
          <span>Dress Style</span>
          <ChevronUp className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
        {dressStyles.map((style, index) => (
          <div key={index} className="flex items-center justify-between cursor-pointer hover:text-black transition-colors">
            <span>{style}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Apply Filter Button */}
      <div className="pt-6">
        <button className="w-full bg-black text-white font-medium py-3.5 rounded-full hover:bg-gray-900 transition-colors text-center shadow-sm cursor-pointer">
          Apply Filter
        </button>
      </div>

    </aside>
  );
}