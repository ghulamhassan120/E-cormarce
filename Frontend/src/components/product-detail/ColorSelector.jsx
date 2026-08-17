import React from 'react';

export default function ColorSelector({ colors, selectedColor, setSelectedColor }) {
  return (
    <div className="py-6 border-b border-gray-200">
      <span className="text-sm text-gray-500 block mb-3">Select Colors</span>
      <div className="flex items-center space-x-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform cursor-pointer ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black scale-110' : ''}`}
          >
            {selectedColor === color && <span className="text-white text-xs">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}