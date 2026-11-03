import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function OnSalePage() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se sale wale products fetch karne ka function (Ya aap filter bhi laga sakte hain)
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        // Misal ke taur par saare products fetch karke jinki discount > 0 ho
        const response = await axios.get('http://localhost:5000/api/products');
        // Agar aapke paas discount field hai to filter kar lein, warna saare dikha dein
        setSaleProducts(response.data);
      } catch (err) {
        console.error("Error fetching sale products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading On Sale items...</div>;
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
          On Sale
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Discover our exclusive discounted items at unbeatable prices. Grab them before they sell out!
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {saleProducts.map((product, index) => (
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
                {/* Discount Badge */}
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  -20%
                </span>
              </div>

              {/* Product Info */}
              <h2 className="font-bold text-gray-900 text-base truncate mb-1">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400 text-xs mb-2">
                ★★★★☆ <span className="text-gray-400 text-xs">(4.5)</span>
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-black">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${Math.round(product.price * 1.25)}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}