import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import ProductCard from '../../components/ProductCard/ProductCard';
import axios from 'axios';
import { API_ENDPOINTS } from '../../services/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(500);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINTS}/api/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter Logic Function (Apply Filter button dabane par ya automatic chale ga)
  const handleApplyFilters = () => {
    let result = products;

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 2. Price Filter
    result = result.filter(p => p.price <= priceRange);

    // 3. Size Filter (Agar user ne sizes select kiye hain)
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes?.some(size => selectedSizes.includes(size)));
    }

    setFilteredProducts(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar ko states pass ki gayi hain */}
        <FilterSidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          onApplyFilters={handleApplyFilters}
        />

        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{selectedCategory} Products</h1>
            <span className="text-gray-500">Showing {filteredProducts.length} Products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}