import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';

export default function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-gray-200 last:border-none last:pb-0 last:mb-0 gap-4"
    >
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EEED] rounded-2xl p-2 flex-shrink-0 flex items-center justify-center">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-base sm:text-lg text-black">{item.name}</h3>
            {/* Delete Button */}
            <button 
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer sm:hidden"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Size: <span className="text-black font-medium">{item.size}</span></p>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Color: <span className="text-black font-medium">{item.color}</span></p>
          <span className="font-bold text-lg sm:text-xl text-black block mt-2">${item.price}</span>
        </div>
      </div>

      {/* Quantity Controls & Delete Icon (Desktop) */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onUpdateQty(item.id, 'dec')}
            className="w-8 h-8 rounded-full bg-[#F0F0F0] flex items-center justify-center text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-black w-4 text-center">{item.quantity}</span>
          <button 
            onClick={() => onUpdateQty(item.id, 'inc')}
            className="w-8 h-8 rounded-full bg-[#F0F0F0] flex items-center justify-center text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={() => onRemove(item.id)}
          className="hidden sm:flex text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}