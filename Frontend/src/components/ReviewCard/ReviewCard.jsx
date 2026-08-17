import React from 'react';
import { Star, CheckCircle2, MoreHorizontal } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div>
        {/* Top Bar: Stars and 3-Dots Menu */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <button className="text-gray-400 hover:text-black cursor-pointer">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Name with Verified Badge */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-bold text-lg sm:text-xl text-black">
            {review.name}
          </span>
          <CheckCircle2 className="w-5 h-5 text-[#01AB31] fill-[#01AB31] text-white" />
        </div>

        {/* Review Text */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
          {review.comment}
        </p>
      </div>

      {/* Posted Date */}
      <span className="text-gray-500 text-xs sm:text-sm font-medium">
        Posted on {review.date}
      </span>
    </div>
  );
}