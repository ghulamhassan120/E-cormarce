import React, { useState } from "react";
import Breadcrumb from "../../components/product-detail/Breadcrumb";
import ProductGallery from "../../components/product-detail/ProductGallery";
import ProductInfo from "../../components/product-detail/ProductInfo";
import ColorSelector from "../../components/product-detail/ColorSelector";
import SizeSelector from "../../components/product-detail/SizeSelector";
import AddToCartSection from "../../components/product-detail/AddToCartSection";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import YouMightAlsoLike from "../../components/YouMightAlsoLike/YouMightAlsoLike";
import { useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../services/api.js";

export default function ProductDetailsPage() {
  const [product, setproduct] = useState([]);
  console.log(product);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("Large");

  useEffect(() => {
    async function foo() {
      const response = await axios.get(API_ENDPOINTS.products);
      setproduct(response.data);
    }
    foo();
  }, []);
  const handleAddToCart = (quantity) => {
    const cartData = {
      productId: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };
    console.log("Cart Data:", cartData);
    alert("Added to cart successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-start">
          <ProductInfo product={product} />
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <AddToCartSection onAddToCart={handleAddToCart} />
        </div>
      </div>
      <ProductReviews />
      <YouMightAlsoLike />
    </div>
  );
}
