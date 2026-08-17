import React, { useState } from 'react';
import { X } from 'lucide-react';

function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white text-xs sm:text-sm py-2.5 px-4 relative flex items-center justify-center">
      {/* Centered Text */}
      <div className="text-center">
        Sign up and get 20% off your first order.{' '}
        <a href="#signup" className="underline font-medium hover:text-gray-300 transition-colors">
          Sign Up Now
        </a>
      </div>

      {/* Close Button on the Right */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 sm:right-8 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close banner"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}

export default TopBanner