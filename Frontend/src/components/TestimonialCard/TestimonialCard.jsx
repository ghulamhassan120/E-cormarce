import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export default function TestimonialCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-[24px] p-6 sm:p-8 h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
      <div>
        {/* Rating Stars */}
        <div className="flex items-center space-x-1 text-yellow-400 mb-3 sm:mb-4">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>

        {/* Customer Name with Verified Badge */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="font-bold text-lg sm:text-xl text-black">
            {item.name}
          </span>
          <CheckCircle2 className="w-5 h-5 text-[#01AB31] fill-[#01AB31] text-white" />
        </div>

        {/* Review Text */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {item.review}
        </p>
      </div>
    </div>
  );
}