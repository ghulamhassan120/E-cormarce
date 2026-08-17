import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import CartItem from '../../components/CartItem/CartItem';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Gradient Graphic T-shirt', image: 'gradient_tshirt.png', size: 'Large', color: 'White', price: 145, quantity: 1 },
    { id: 2, name: 'Checkered Shirt', image: 'checkered_shirt.png', size: 'Medium', color: 'Red', price: 180, quantity: 1 },
    { id: 3, name: 'Skinny Fit Jeans', image: 'skinny_jeans.png', size: 'Large', color: 'Blue', price: 240, quantity: 1 },
  ]);

  const [promoCode, setPromoCode] = useState('');

  const handleUpdateQty = (id, type) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Remove Item Handler
  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * 0.20); 
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal > 0 ? subtotal - discount + deliveryFee : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
        <a href="/" className="hover:text-black">Home</a>
        <span>/</span>
        <span className="text-black font-medium">Cart</span>
      </nav>

      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-8"
      >
        YOUR CART
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Cart Items Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-white border border-gray-200 rounded-[30px] p-6 sm:p-8 shadow-xs"
        >
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onUpdateQty={handleUpdateQty} 
                  onRemove={handleRemoveItem} 
                />
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Right Side: Order Summary Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 bg-white border border-gray-200 rounded-[30px] p-6 sm:p-8 shadow-xs space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-black">Order Summary</h2>
          
          <div className="space-y-4 text-sm sm:text-base text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-black">${subtotal}</span>
            </div>
            <div className="flex justify-between text-[#FF3333]">
              <span>Discount (-20%)</span>
              <span className="font-bold">-${discount}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span>Delivery Fee</span>
              <span className="font-bold text-black">${deliveryFee}</span>
            </div>
            <div className="flex justify-between text-lg sm:text-xl font-bold text-black pt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Promo Code Input & Button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#F0F0F0] rounded-full flex items-center px-4 py-3">
              <Tag className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Add promo code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-black placeholder:text-gray-400"
              />
            </div>
            <button className="bg-black text-white font-medium text-sm px-6 py-3.5 rounded-full hover:bg-gray-900 transition-colors cursor-pointer">
              Apply
            </button>
          </div>

          {/* Checkout Button */}
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white font-medium py-4 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
          >
            <span>Go to Checkout</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

        </motion.div>

      </div>
    </div>
  );
}