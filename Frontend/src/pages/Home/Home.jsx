import React, { useEffect, useState } from "react";
import TopBanner from "../../components/TopBanner/TopBanner";
import Navbar from "../../components/Navbar/Navbar";
import FashionHero from "../../components/FashionHero/FashionHero";
import BrandsBar from "../../components/BrandsBar/BrandsBar";
import NewArrivalsSection from "../../components/NewArrivalsSection/NewArrivalsSection";
import DressStyleSection from "../../components/DressStyleSection/DressStyleSection";
import TestimonialSlider from "../../components/TestimonialSlider/TestimonialSlider";
import NewsletterBox from "../../components/NewsletterBox/NewsletterBox";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const Home = () => {

  return (
    <>
      <FashionHero />
      <BrandsBar />
      <NewArrivalsSection Title="NEW ARRIVALS" />
      <NewArrivalsSection Title="TOP SELLING" />
      <DressStyleSection />
      <TestimonialSlider />
    
    </>
  );
};

export default Home;
