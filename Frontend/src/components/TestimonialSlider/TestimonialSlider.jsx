import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import TestimonialCard from '../TestimonialCard/TestimonialCard';

export default function TestimonialSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      review: '"I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations."',
    },
    {
      id: 2,
      name: 'Alex K.',
      rating: 5,
      review: '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
    },
    {
      id: 3,
      name: 'James L.',
      rating: 5,
      review: '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."',
    },
    {
      id: 4,
      name: 'Moose W.',
      rating: 5,
      review: '"Super fast delivery and incredible customer service! The fabric quality is top-notch. Highly recommend Shop.co to anyone looking for stylish outfits."',
    },
  ];

  return (
    <section className="py-16 sm:py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Navigation Arrows */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tighter uppercase"
          >
            OUR HAPPY CUSTOMERS
          </motion.h2>

          {/* Custom Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button 
              ref={prevRef}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-black"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              ref={nextRef}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-black"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Area */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 3.5, spaceBetween: 24 },
          }}
          className="pb-6"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}