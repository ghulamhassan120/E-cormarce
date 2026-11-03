import React, { useRef, useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCheck,
  CircleUser,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../../pages/Login/Login";
import SignupModal from "../../pages/Signup/Signup"; // Corrected import reference
import axios from "axios";
import { toast } from "sonner";
const MotionLink = motion(Link);
export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const dropdownRef = useRef(null);

  const storedUser = localStorage.getItem("userInfo");
  const userInfo =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  const userId = userInfo?.user?.id || userInfo?.userId;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
const fetchCartCount = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(
          `${API_ENDPOINTS}/api/cart/${userId}`,
        );
        if (response.data && response.data.items) {
          // Saare items ki quantity ko sum (plus) kar lein
          const totalQuantity = response.data.items.reduce(
            (acc, item) => acc + item.quantity,
            0,
          );
          setCartCount(totalQuantity);
        }
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };
  useEffect(() => {
    

    fetchCartCount();
  }, [userId]);
  useEffect(() => {
    fetchCartCount(); 

    window.addEventListener('cartUpdated', fetchCartCount);

    return () => {
      window.removeEventListener('cartUpdated', fetchCartCount);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsDropdownOpen(false);
    toast.success("Logged out successfully!");
    // window.location.reload();
  };

  const handleUserClick = () => {
    if (userInfo) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsLoginOpen(true);
    }
  };

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
            onClick={()=>navigate("/")}
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
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isShopDropdownOpen ? "rotate-180" : ""}`}
              />
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
                  <Link
                    to="/shop/mens"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Men's Clothes
                  </Link>
                  <Link
                    to="/shop/womens"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Women's Clothes
                  </Link>
                  <Link
                    to="/shop/kids"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Kids Clothes
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <MotionLink
            whileHover={{ y: -2 }}
            to="/on-sale"
            className="hover:text-gray-600"
          >
            On Sale
          </MotionLink>
          <MotionLink
            whileHover={{ y: -2 }}
            to="/new-arrivals"
            className="hover:text-gray-600"
          >
            New Arrivals
          </MotionLink>
          <MotionLink
            whileHover={{ y: -2 }}
            to="/brands"
            className="hover:text-gray-600"
          >
            Brands
          </MotionLink>
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
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-full relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-6 text-black" />
            <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </motion.div>

          {/* User Icon & Profile Dropdown / Login Trigger */}
          <div className="relative" ref={dropdownRef}>
            {userInfo ? (
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={handleUserClick}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer flex items-center justify-center"
              >
                <CircleUser className="w-6 h-6 text-black" />
              </motion.div>
            ) : (
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={handleUserClick}
                className={`p-2 hover:bg-gray-100 rounded-full cursor-pointer flex items-center justify-center ${userInfo && "hidden"}`}
              >
                <User className="w-6 h-6 text-black" />
              </motion.div>
            )}

            {/* Profile Dropdown Menu (Sirf tab dikhega jab user logged in ho aur dropdown open ho) */}
            <AnimatePresence>
              {userInfo && isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden"
                >
                  {/* User ki choti si info */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {userInfo.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userInfo.user?.email || ""}
                    </p>
                  </div>

                  {/* Profile Visit Option */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Yahan navigate('/profile') lagayein agar React Router use kar rahe hain
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-gray-500" />
                    Profile Visit
                  </button>

                  {/* Logout Option */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                  <span className="text-2xl font-black tracking-tighter">
                    SHOP.CO
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                  >
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
                  <Link to="#" onClick={() => setIsOpen(false)} className="hover:text-gray-600 py-1">
                    Shop
                  </Link>
                  <Link to="/on-sale"onClick={() => setIsOpen(false)}  className="hover:text-gray-600 py-1">
                    On Sale
                  </Link>
                  <Link to="/new-arrivals" onClick={() => setIsOpen(false)} className="hover:text-gray-600 py-1">
                    New Arrivals
                  </Link>
                  <Link to="/brands"onClick={() => setIsOpen(false)}  className="hover:text-gray-600 py-1">
                    Brands
                  </Link>

                  {/* Mobile Login / Signup Buttons */}
                  {/* <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsLoginOpen(true);
                      }}
                      className="flex-1 py-2.5 rounded-full border border-black text-black text-sm font-medium cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsSignupOpen(true);
                      }}
                      className="flex-1 py-2.5 rounded-full bg-black text-white text-sm font-medium cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div> */}
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
