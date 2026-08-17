import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ReviewCard from '../ReviewCard/ReviewCard';

export default function ProductReviews() {
  const [activeTab, setActiveTab] = useState('reviews');

  const reviewsList = [
    {
      id: 1,
      name: 'Samantha D.',
      rating: 5,
      comment: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
      date: 'August 14, 2023'
    },
    {
      id: 2,
      name: 'Alex M.',
      rating: 5,
      comment: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
      date: 'August 15, 2023'
    },
    {
      id: 3,
      name: 'Ethan R.',
      rating: 4,
      comment: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
      date: 'August 16, 2023'
    },
    {
      id: 4,
      name: 'Olivia P.',
      rating: 5,
      comment: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."',
      date: 'August 17, 2023'
    },
    {
      id: 5,
      name: 'Liam K.',
      rating: 5,
      comment: '"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."',
      date: 'August 18, 2023'
    },
    {
      id: 6,
      name: 'Ava H.',
      rating: 5,
      comment: '"I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."',
      date: 'August 19, 2023'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Top Tabs Header */}
      <div className="flex border-b border-gray-200 mb-10 text-gray-500 font-medium text-base sm:text-lg">
        <button 
          onClick={() => setActiveTab('details')}
          className={`pb-4 px-6 sm:px-12 transition-colors cursor-pointer ${activeTab === 'details' ? 'text-black border-b-2 border-black font-semibold' : 'hover:text-black'}`}
        >
          Product Details
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 px-6 sm:px-12 transition-colors cursor-pointer ${activeTab === 'reviews' ? 'text-black border-b-2 border-black font-semibold' : 'hover:text-black'}`}
        >
          Rating & Reviews <span className="text-xs sm:text-sm">(451)</span>
        </button>
        <button 
          onClick={() => setActiveTab('faqs')}
          className={`pb-4 px-6 sm:px-12 transition-colors cursor-pointer ${activeTab === 'faqs' ? 'text-black border-b-2 border-black font-semibold' : 'hover:text-black'}`}
        >
          FAQs
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-black flex items-center space-x-2">
          <span>All Reviews</span>
          <span className="text-gray-400 text-lg sm:text-xl font-normal">(451)</span>
        </h3>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          {/* Filter Icon Button */}
          <button className="p-3 bg-[#F0F0F0] rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-black">
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Latest Dropdown */}
          <div className="flex items-center bg-[#F0F0F0] px-4 py-2.5 rounded-full space-x-2 cursor-pointer text-sm font-medium text-black">
            <span>Latest</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Write a Review Button */}
          <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors cursor-pointer shadow-sm">
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {reviewsList.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More Reviews Button */}
      <div className="flex justify-center">
        <button className="border border-gray-300 px-8 py-3.5 rounded-full text-sm font-medium text-black hover:bg-black hover:text-white transition-all cursor-pointer">
          Load More Reviews
        </button>
      </div>

    </section>
  );
}