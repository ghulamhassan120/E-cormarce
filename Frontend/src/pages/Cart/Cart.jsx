import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import CartItem from '../../components/CartItem/CartItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../services/api';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const navigate=useNavigate()
  console.log(cartItems)
  // Safe JSON parse for userInfo
  const storedUser = localStorage.getItem('userInfo');
  const userInfo = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  // Get user ID safely (backend response ke mutabiq userInfo.user.id ya userInfo.userId)
  const userId = userInfo?.user?.id || userInfo?.userId;

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_ENDPOINTS}/api/cart/${userId}`);
        
        // Backend se jo cart data aa raha hai usme items array hoti hai
        if (response.data && response.data.items) {
          // Hum items ko map karke frontend friendly format bana lenge
          const formattedItems = response.data.items.map(item => ({
            id: item.productId?._id || item._id,
            productId: item.productId?._id,
            name: item.productId?.name || "Product Name",
            price: item.productId?.price || 0,
            image: item.productId?.images?.[0] || "",
            size: item.size || 'Large',
            color: item.color || 'Default',
            quantity: item.quantity || 1
          }));
          setCartItems(formattedItems);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

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
 const handleRemoveItem = async (productId, size, color) => {
  try {
    // Backend se delete karne ki request
    await axios.delete(`${API_ENDPOINTS}/api/cart/remove`, {
      data: { userId, productId, size, color }
    });

    // Frontend state se bhi foran remove kar dein taake UI update ho jaye
    setCartItems(prev => prev.filter(item => 
      !(item.productId === productId && item.size === size && item.color === color)
    ));

    window.dispatchEvent(new Event('cartUpdated'));
  } catch (err) {
    console.error("Error removing item from cart:", err);
    alert("Failed to remove item from cart.");
  }
};

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * 0.20); 
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal > 0 ? subtotal - discount + deliveryFee : 0;

  if (loading) return <div className="text-center py-20 font-medium">Loading cart...</div>;

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
                  onRemove={() => handleRemoveItem(item.productId, item.size, item.color)} 
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
            onClick={()=>navigate("/checkout")}
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