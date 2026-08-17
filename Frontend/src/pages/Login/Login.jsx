import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../services/api';
import axios from 'axios';

export default function LoginModal({ isOpen, onClose ,onSwitchToSignup}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.login, formData);

      setLoading(false);
      alert('Logged in successfully!');
      
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      
      setFormData({ email: '', password: '' });
      onClose();
      
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      
      const errorMessage = error.response?.data?.message || 'Invalid credentials or server error!';
      alert(errorMessage);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          
          {/* Backdrop Overlay with Fade Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Box with Pop-up Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white border border-gray-200 rounded-[30px] p-8 sm:p-10 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-black tracking-tight uppercase">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Log in to access your SHOP.CO account.
              </p>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider">Email Address</label>
                <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3.5 focus-within:ring-2 focus-within:ring-black transition-all">
                  <Mail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Enter your email address" 
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent border-none outline-none text-sm w-full text-black placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-black uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Forgot?</a>
                </div>
                <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-3.5 focus-within:ring-2 focus-within:ring-black transition-all">
                  <Lock className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    required
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-transparent border-none outline-none text-sm w-full text-black placeholder:text-gray-400"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-black transition-colors cursor-pointer ml-2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-black text-white font-medium py-4 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md mt-2"
              >
                <span>Log In</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

            </form>

            {/* Footer Redirect to Signup */}
            <div className="text-center mt-6 text-sm text-gray-500">
              Don't have an account?{' '}
             <button 
                type="button"
                onClick={onSwitchToSignup} 
                className="text-black font-bold hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}