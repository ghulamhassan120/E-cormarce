import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoginModal from '../../pages/Login/Login';
import Signup from '../../pages/Signup/Signup';
import SignupModal from '../../pages/Signup/Signup';



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  
  // Modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Switch handlers
  const handleOpenLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const handleOpenSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Mobile Menu Button & Logo */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-black tracking-tighter cursor-pointer"
          >
            SHOP.CO
          </motion.div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {/* Shop Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
              className="flex items-center space-x-1 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              <span>Shop</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isShopDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50"
                >
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men's Clothes</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women's Clothes</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kids Clothes</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-gray-600">On Sale</motion.a>
          <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-gray-600">New Arrivals</motion.a>
          <motion.a whileHover={{ y: -2 }} href="#" className="hover:text-gray-600">Brands</motion.a>
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center bg-[#F0F0F0] rounded-full px-4 py-2.5 w-96">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>

        {/* Icons (Cart & User) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <motion.div whileTap={{ scale: 0.9 }} className="p-2 hover:bg-gray-100 rounded-full relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-black" />
            <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
          </motion.div>
          
          {/* User Icon to trigger Login Modal */}
          <motion.div 
            whileTap={{ scale: 0.9 }} 
            onClick={() => setIsLoginOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <User className="w-6 h-6 text-black" />
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white z-50 shadow-2xl p-6 md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <span className="text-2xl font-black tracking-tighter">SHOP.CO</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="my-6 flex items-center bg-[#F0F0F0] rounded-full px-4 py-2.5">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search for products..." 
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                </div>

                <div className="flex flex-col space-y-4 text-lg font-medium">
                  <a href="#" className="hover:text-gray-600 py-1">Shop</a>
                  <a href="#" className="hover:text-gray-600 py-1">On Sale</a>
                  <a href="#" className="hover:text-gray-600 py-1">New Arrivals</a>
                  <a href="#" className="hover:text-gray-600 py-1">Brands</a>
                  
                  {/* Mobile Login / Signup Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <button 
                      onClick={() => { setIsOpen(false); setIsLoginOpen(true); }}
                      className="flex-1 py-2.5 rounded-full border border-black text-black text-sm font-medium"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => { setIsOpen(false); setIsSignupOpen(true); }}
                      className="flex-1 py-2.5 rounded-full bg-black text-white text-sm font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center pb-4">
                © 2026 SHOP.CO. All rights reserved.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Render Login & Signup Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToSignup={handleOpenSignup}
      />

      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onSwitchToLogin={handleOpenLogin}
      />
    </header>
  );
}