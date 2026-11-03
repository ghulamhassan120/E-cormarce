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
import { useParams } from "react-router-dom";
import { toast } from "sonner";
export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProducts] = useState(null);
  console.log(product);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("Large");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("API URL:", API_ENDPOINTS.products);

        const response = await axios.get(`${API_ENDPOINTS.products}/${id}`);

        console.log("API response:", response.data);

        // Agar API array return karti hai:
        const data = response.data;
        const firstProduct = Array.isArray(data)
          ? data[0]
          : (data.product ?? data);

        if (!firstProduct) {
          console.error("API se product nahi mila");
          return;
        }

        setProducts(firstProduct);
      } catch (error) {
        console.error(
          "API fetch error:",
          error.response?.data || error.message,
        );
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }

    console.log("Product state updated:", product);
  }, [product]);

  console.log("Current product:", product);
  if (!product) {
    return <p>Loading product...</p>;
  }
  const handleAddToCart =async (quantity) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
    toast.warning('Please login first to add items to cart!');
    return;
  }
    try {
    const response = await axios.post(`${API_ENDPOINTS.cart}/add`, {
      userId: userInfo.userId, 
      productId: product._id,
      quantity: quantity,
      size: selectedSize, 
      color: selectedColor 
    });

    toast.success('Product added to cart successfully!');
    window.dispatchEvent(new Event('cartUpdated'));
    console.log(response.data);
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Failed to add product to cart.');
  }
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
