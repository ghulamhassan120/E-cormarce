import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BrandsPage() {
  // Sample featured brands list (Aap ise apne backend se bhi fetch kar sakte hain)
  const brandsList = [
    { id: 1, name: 'Versace', image: 'https://via.placeholder.com/200x100?text=VERSACE', count: '120+ Products' },
    { id: 2, name: 'Zara', image: 'https://via.placeholder.com/200x100?text=ZARA', count: '250+ Products' },
    { id: 3, name: 'Gucci', image: 'https://via.placeholder.com/200x100?text=GUCCI', count: '90+ Products' },
    { id: 4, name: 'Prada', image: 'https://via.placeholder.com/200x100?text=PRADA', count: '150+ Products' },
    { id: 5, name: 'Calvin Klein', image: 'https://via.placeholder.com/200x100?text=Calvin+Klein', count: '180+ Products' },
    { id: 6, name: 'Louis Vuitton', image: 'https://via.placeholder.com/200x100?text=Louis+Vuitton', count: '75+ Products' },
  ];

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
          Our Premium Brands
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Shop directly from the world's most renowned fashion houses and designer brands.
        </p>
      </motion.div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {brandsList.map((brand, index) => (
          <motion.div 
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center"
          >
            <Link to={`/shop/brand/${brand.name.toLowerCase()}`} className="w-full">
              {/* Brand Logo / Image Container */}
              <div className="w-full h-36 bg-[#F0F0F0] rounded-xl overflow-hidden relative mb-4 flex items-center justify-center">
                <span className="text-xl font-black tracking-widest text-gray-800 uppercase group-hover:scale-105 transition-transform">
                  {brand.name}
                </span>
              </div>

              {/* Brand Info */}
              <h2 className="font-bold text-gray-900 text-lg mb-1">
                {brand.name}
              </h2>
              <p className="text-gray-400 text-xs font-medium">
                {brand.count}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}