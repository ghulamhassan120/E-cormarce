import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../../services/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    if (!userInfo.userId) {
      alert('Please login first to place an order!');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(`${API_ENDPOINTS}/api/orders/create`, {
        userId: userInfo.userId,
        shippingAddress: formData,
        paymentMethod: formData.paymentMethod,
      });

      toast.success('Order placed successfully!');

      
      navigate('/');
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      console.error('Error placing order:', err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-black flex flex-col items-center">
      
      {/* Page Header Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
          Checkout
        </h1>
        <p className="text-gray-500 text-sm mt-1">Complete your shipping and payment details below.</p>
      </motion.div>

      {/* Main Form Container with Framer Motion Entrance */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-100"
      >
        <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">
          Billing & Shipping Details
        </h2>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Full Name
              </label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
                placeholder="John Doe"
                className="w-full bg-[#F0F0F0] border border-transparent focus:border-black rounded-xl p-4 text-sm outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="john@example.com"
                className="w-full bg-[#F0F0F0] border border-transparent focus:border-black rounded-xl p-4 text-sm outline-none transition-all" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Phone Number
              </label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                placeholder="+1 234 567 890"
                className="w-full bg-[#F0F0F0] border border-transparent focus:border-black rounded-xl p-4 text-sm outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                City
              </label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                required 
                placeholder="New York"
                className="w-full bg-[#F0F0F0] border border-transparent focus:border-black rounded-xl p-4 text-sm outline-none transition-all" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Street Address
            </label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              placeholder="123 Main Street, Apt 4B"
              className="w-full bg-[#F0F0F0] border border-transparent focus:border-black rounded-xl p-4 text-sm outline-none transition-all" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Postal Code
              </label>
              <input 
                type="text" 
                name="postalCode" 
                value={formData.postalCode} 
                onChange={handleChange} 
                placeholder="10001"
                className="w-full bg-[#F0F0F0] border border-transparent focus:border-black rounded-xl p-4 text-sm outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Payment Method
              </label>
              <select 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange}
                className="w-full bg-[#F0F0F0] border border-transparent focus:border-black rounded-xl p-4 text-sm outline-none transition-all cursor-pointer"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit Card">Credit/Debit Card</option>
              </select>
            </div>
          </div>

          {/* Animated Button */}
          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white font-medium py-4 rounded-full hover:bg-gray-900 transition-colors cursor-pointer text-center shadow-lg text-sm uppercase tracking-wider"
            >
              {loading ? 'Processing Order...' : 'Place Order →'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}