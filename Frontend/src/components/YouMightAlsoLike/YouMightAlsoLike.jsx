import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ProductCard/ProductCard';

export default function YouMightAlsoLike() {
  const relatedProducts = [
    {
      id: 1,
      name: 'Polo with Contrast Trims',
      image: 'polo_contrast.png', 
      rating: 4.0,
      price: 212,
      originalPrice: 242,
      discount: 20,
    },
    {
      id: 2,
      name: 'Gradient Graphic T-shirt',
      image: 'gradient_tshirt.png',
      rating: 3.5,
      price: 145,
      originalPrice: null,
      discount: null,
    },
    {
      id: 3,
      name: 'Polo with Tipping Details',
      image: 'polo_tipping.png',
      rating: 4.5,
      price: 180,
      originalPrice: null,
      discount: null,
    },
    {
      id: 4,
      name: 'Black Striped T-shirt',
      image: 'black_striped.png',
      rating: 5.0,
      price: 120,
      originalPrice: 150,
      discount: 30,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-black text-center tracking-tighter uppercase mb-12"
        >
          YOU MIGHT ALSO LIKE
        </motion.h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}