import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../services/api';

export default function WomensClothesPage() {
  const [womensProducts, setWomensProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWomensProducts = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS}/api/products`);
        const filtered = response.data.filter(
          item => item.category?.toLowerCase() === 'women' || item.category?.toLowerCase() === "women's clothes"
        );
        
        setWomensProducts(filtered.length > 0 ? filtered : response.data);
      } catch (err) {
        console.error("Error fetching women's products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWomensProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading Women's Collection...</div>;
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
          Women's Clothes
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Explore our stunning collection of women's fashion, elegant dresses, trendy tops, and chic casual wear.
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {womensProducts.map((product, index) => (
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
                {/* <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Women
                </span> */}
              </div>

              {/* Product Info */}
              <h2 className="font-bold text-gray-900 text-base truncate mb-1">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                ★★★★☆ <span className="text-gray-400 text-xs">(4.9)</span>
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