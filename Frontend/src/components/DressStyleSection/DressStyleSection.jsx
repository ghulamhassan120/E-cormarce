import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../../../assests/BROWSE BY DRESS STYLE/5.png'
import image2 from '../../../assests/BROWSE BY DRESS STYLE/6.png'
import image3 from '../../../assests/BROWSE BY DRESS STYLE/7.png'
import image4 from '../../../assests/BROWSE BY DRESS STYLE/8.png'
export default function DressStyleSection() {
  const styles = [
    {
      id: 1,
      image: image1,
      className: 'md:col-span-1 h-[280px] sm:h-[320px]',
    },
    {
      id: 2,
      title: 'Formal',
      image: image2,
      className: 'md:col-span-2 h-[280px] sm:h-[320px]', 
    },
    {
      id: 3,
      image: image3,
      className: 'md:col-span-2 h-[280px] sm:h-[320px]', 
    },
    {
      id: 4,
      title: 'Gym',
      image: image4,
      className: 'md:col-span-1 h-[280px] sm:h-[320px]', 
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto bg-[#F0F0F0] rounded-[40px] py-12 px-6 sm:px-12 md:px-16 shadow-sm">
        
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-black tracking-tighter mb-10 sm:mb-14"
        >
          BROWSE BY DRESS STYLE
        </motion.h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {styles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={`relative rounded-3xl overflow-hidden bg-white shadow-sm cursor-pointer group ${style.className}`}
            >
              <h3 className="absolute top-6 left-6 sm:top-8 sm:left-8 text-2xl sm:text-3xl font-bold text-black z-10">
                {style.title}
              </h3>

              <img 
                src={style.image} 
                alt={style.title} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}