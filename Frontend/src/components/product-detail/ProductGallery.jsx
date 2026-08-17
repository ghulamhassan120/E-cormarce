import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-4 justify-between sm:justify-start">
        {images.map((img, index) => (
          <button 
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`w-24 h-28 sm:w-32 sm:h-36 rounded-2xl bg-[#F0EEED] p-2 overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === img ? 'border-black' : 'border-transparent'}`}
          >
            <img src={img} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
          </button>
        ))}
      </div>

      {/* Main Big Image */}
      <motion.div 
        key={selectedImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 bg-[#F0EEED] rounded-3xl p-6 flex items-center justify-center min-h-[380px] sm:min-h-[500px]"
      >
        <img src={selectedImage} alt="Main Product" className="w-full h-full object-contain mix-blend-multiply max-h-[450px]" />
      </motion.div>
    </div>
  );
}