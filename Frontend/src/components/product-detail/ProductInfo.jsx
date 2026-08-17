import React from 'react';
import { Star } from 'lucide-react';

export default function ProductInfo({ product }) {
  return (
    <div>
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-3">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-sm text-gray-600 font-medium">{product.rating}/5</span>
      </div>

      {/* Price & Discount */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-3xl font-bold text-black">${product.price}</span>
        <span className="text-3xl font-bold text-gray-400 line-through">${product.originalPrice}</span>
        <span className="bg-[#FFEBEB] text-[#FF3333] text-xs font-medium px-3 py-1 rounded-full">
          -{product.discount}%
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed pb-6 border-b border-gray-200">
        {product.description}
      </p>
    </div>
  );
}