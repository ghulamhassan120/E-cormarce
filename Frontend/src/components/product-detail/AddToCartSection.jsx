import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

export default function AddToCartSection({ onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="pt-6 flex items-center gap-4">
      {/* Counter */}
      <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3.5 space-x-4">
        <button onClick={handleDecrement} className="text-black hover:text-gray-600 cursor-pointer">
          <Minus className="w-5 h-5" />
        </button>
        <span className="font-bold text-black w-4 text-center">{quantity}</span>
        <button onClick={handleIncrement} className="text-black hover:text-gray-600 cursor-pointer">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <motion.button 
        whileTap={{ scale: 0.97 }}
        onClick={() => onAddToCart(quantity)}
        className="flex-1 bg-black text-white font-medium py-4 rounded-full hover:bg-gray-900 transition-colors text-center shadow-md cursor-pointer"
      >
        Add to Cart
      </motion.button>
    </div>
  );
}