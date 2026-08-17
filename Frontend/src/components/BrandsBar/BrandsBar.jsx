import React from 'react';
import { motion } from 'framer-motion'; 
import { motion as motionFramer } from 'framer-motion';

export default function BrandsBar() {
  const brands = [
    { name: 'VERSACE', font: 'font-serif tracking-widest text-2xl sm:text-3xl md:text-4xl' },
    { name: 'ZARA', font: 'font-bold tracking-tighter text-2xl sm:text-3xl md:text-4xl' },
    { name: 'GUCCI', font: 'font-serif tracking-widest text-2xl sm:text-3xl md:text-4xl' },
    { name: 'PRADA', font: 'font-black tracking-widest text-2xl sm:text-3xl md:text-4xl' },
    { name: 'Calvin Klein', font: 'font-sans font-light tracking-wide text-2xl sm:text-3xl md:text-4xl' },
  ];

  return (
    <section className="bg-black py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 sm:gap-8 md:gap-12">
        {brands.map((brand, index) => (
          <motionFramer
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.1, color: '#9CA3AF' }}
            className={`text-white cursor-pointer transition-colors duration-300 ${brand.font}`}
          >
            {brand.name}
          </motionFramer>
        ))}
      </div>
    </section>
  );
}