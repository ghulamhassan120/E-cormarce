import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
import { API_ENDPOINTS } from '../../services/api';

export default function NewArrivalsSection({Title}) {
   const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
    async function foo() {
      const response = await axios.get(API_ENDPOINTS.products);
      setAllProducts(response.data);
    }
    foo();
  }, []);
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleProducts = allProducts.slice(0, visibleCount);

  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 4, allProducts.length));
  };

  return (
    <section className="py-7 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-black text-center text-black tracking-tighter mb-12 sm:mb-16"
        >
          {Title}
        </motion.h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {visibleProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              delay={(index % 4) * 0.15} 
            />
          ))}
        </div>

        {/* View All Button */}
        {visibleCount < allProducts.length && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <button 
              onClick={loadMoreProducts}
              className="w-full sm:w-auto px-14 py-4 border border-gray-200 rounded-full text-black font-medium text-sm hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All ({allProducts.length - visibleCount} more)
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}