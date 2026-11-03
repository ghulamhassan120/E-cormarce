import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MensClothesPage() {
  const [mensProducts, setMensProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se products fetch karke Men category ke mutabiq filter karne ka function
  useEffect(() => {
    const fetchMensProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        // Agar backend mein category field 'Men' ya 'mens' hai toh filter kar lein
        const filtered = response.data.filter(
          item => item.category?.toLowerCase() === 'men' || item.category?.toLowerCase() === "men's clothes"
        );
        
        // Agar filter ke baad empty ho (testing ke liye), toh saare products dikha dein taake UI khali na lage
        setMensProducts(filtered.length > 0 ? filtered : response.data);
      } catch (err) {
        console.error("Error fetching men's products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMensProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading Men's Collection...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
      
      {/* Header Section with Motion */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 border-b border-gray-200 pb-6"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
          Men's Clothes
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Upgrade your wardrobe with our latest collection of premium menswear, stylish shirts, and casual outfits.
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mensProducts.map((product, index) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <Link to={`/product/${product._id}`}>
              {/* Product Image Container */}
              <div className="w-full h-64 bg-[#F0F0F0] rounded-xl overflow-hidden relative mb-4 flex items-center justify-center">
                <img 
                  src={product.image || product.images?.[0] || "https://via.placeholder.com/300"} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Men
                </span>
              </div>

              {/* Product Info */}
              <h2 className="font-bold text-gray-900 text-base truncate mb-1">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                ★★★★☆ <span className="text-gray-400 text-xs">(4.7)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-black">
                  ${product.price}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}