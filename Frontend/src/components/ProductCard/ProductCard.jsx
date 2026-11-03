import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StarRating = ({ rating }) => {
  // Safe check for rating
  const safeRating = typeof rating === 'number' ? rating : 4.5;
  
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(safeRating) ? "fill-current" : "text-gray-300"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-xs text-gray-600 ml-1">{safeRating.toFixed(1)}/5</span>
    </div>
  );
};

export default function ProductCard({ product, delay }) {
  // Safe ID check (agar '_id' ho ya 'id' ho)
  const productId = product?._id || product?.id;

  // Safe image check (agar images array ho aur index 1 mojood ho, warna index 0, warna empty string)
  const productImage = product?.images?.[1] || product?.images?.[0] || "";

  return (
    <Link to={`/product/${productId}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: delay || 0 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="bg-white group cursor-pointer"
      >
        {/* Product Image Area */}
        <div className="aspect-square bg-[#F0EEED] rounded-2xl relative overflow-hidden flex items-center justify-center">
          <img
            src={productImage}
            alt={product?.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product?.discount && (
            <span className="absolute top-3 right-3 bg-[#FFEBEB] text-[#FF3333] text-xs font-medium px-3 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Product Details Area */}
        <div className="px-2 pt-3">
          <h3 className="font-bold text-base sm:text-lg text-black truncate mb-1.5">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="mb-1.5">
            <StarRating rating={product?.rating} />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2.5">
            <span className="text-xl sm:text-2xl font-bold text-black">
              ${product?.price?.toFixed(2) || "0.00"}
            </span>
            {product?.originalPrice && (
              <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}