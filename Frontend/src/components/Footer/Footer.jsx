import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  const footerLinks = [
    {
      title: "COMPANY",
      links: ["About", "Features", "Works", "Career"],
    },
    {
      title: "HELP",
      links: [
        "Customer Support",
        "Delivery Details",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "FAQ",
      links: ["Account", "Manage Deliveries", "Orders", "Payments"],
    },
    {
      title: "RESOURCES",
      links: [
        "Free eBooks",
        "Development Tutorial",
        "How to - Blog",
        "Youtube Playlist",
      ],
    },
  ];

  return (
    <footer className="bg-[#F0F0F0] pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-gray-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-gray-300">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tighter">
              SHOP.CO
            </h2>
            <p className="text-sm leading-relaxed max-w-sm">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-bold text-black text-sm tracking-widest uppercase">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:text-black transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <p>Shop.co © 2000-2026. All Rights Reserved</p>

          {/* Payment Icons */}
          <div className="flex items-center space-x-2">
            <span className="bg-white px-2.5 py-1 rounded shadow-xs font-bold text-blue-700 tracking-tighter text-xs">
              VISA
            </span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs font-bold text-red-600 tracking-tighter text-xs">
              mastercard
            </span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs font-bold text-blue-500 tracking-tighter text-xs">
              PayPal
            </span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs font-bold text-black tracking-tighter text-xs">
              Pay
            </span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs font-bold text-blue-600 tracking-tighter text-xs">
              GPay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
