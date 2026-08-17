import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function NewsletterBox() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-black rounded-[30px] py-9 px-6 sm:px-12 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl"
      >
        {/* Heading Text */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter max-w-xl text-center lg:text-left leading-tight">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>

        {/* Input & Subscribe Form */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-col items-center gap-3.5">
          <div className="w-full sm:w-[350px] bg-white rounded-full flex items-center  px-4 py-3 shadow-sm">
            <Mail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-transparent border-none outline-none text-sm w-full text-black placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-[350px] bg-white text-black font-medium text-sm px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer shadow-sm whitespace-nowrap"
          >
            Subscribe to Newsletter
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}