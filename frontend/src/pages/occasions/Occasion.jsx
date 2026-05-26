import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "../../components/filterSection";
import ProductCard from "../../components/products/ProductCard";

import shippingIcon from "../../assets/NewArrivalAssets/logos/la_shipping-fast.png";
import paymentIcon from "../../assets/NewArrivalAssets/logos/fluent_payment-32-regular.png";
import supportIcon from "../../assets/NewArrivalAssets/logos/streamline-plump_customer-support-7.png";

import bannerImage from '../../assets/occassions/bannerImg.jpg'
import { axiosGetService } from "../../services/axios";

export const Collections = () => {

  const MIN_LIMIT = 2500;
  const MAX_LIMIT = 600000;

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([MIN_LIMIT, MAX_LIMIT]);
  const [sortBy, setSortBy] = useState("default");
  const [allProducts, setAllProducts] = useState([]);

  // Fetch backend products
  const fetchProducts = async () => {
    try {
      const apiResponse = await axiosGetService("/customer/product/all");
      if (!apiResponse.ok) {
        alert(apiResponse.data.message || "Failed to fetch");
        return;
      }
      setAllProducts(apiResponse.data.data || []);
    } catch (error) {
      console.log("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleCategory = useCallback((cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(i => i !== cat) : [...prev, cat]);
  }, []);

  const toggleMaterial = useCallback((mat) => {
    setSelectedMaterials(prev => prev.includes(mat) ? prev.filter(i => i !== mat) : [...prev, mat]);
  }, []);

  const toggleColor = useCallback((col) => {
    setSelectedColors(prev => prev.includes(col) ? prev.filter(i => i !== col) : [...prev, col]);
  }, []);

  const handleMinPriceChange = (e) => {
    const val = Math.min(Number(e.target.value), priceRange[1] - 1000);
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const val = Math.max(Number(e.target.value), priceRange[0] + 1000);
    setPriceRange([priceRange[0], val]);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setPriceRange([MIN_LIMIT, MAX_LIMIT]);
    setSortBy("default");
  };

  // Backend-aware Filtering Logic
  const filteredProducts = useMemo(() => {

    let result = allProducts.filter(product => {
      const salePrice = product?.price?.sale ?? product?.price?.mrp ?? 0;

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.attributes?.material);

      const colorMatch =
        selectedColors.length === 0 ||
        selectedColors.includes(product.attributes?.color);

      const priceMatch =
        salePrice >= priceRange[0] && salePrice <= priceRange[1];

      return categoryMatch && materialMatch && colorMatch && priceMatch;
    });

    if (sortBy === "lowToHigh")
      result.sort((a, b) => (a.price.sale ?? a.price.mrp) - (b.price.sale ?? b.price.mrp));

    if (sortBy === "highToLow")
      result.sort((a, b) => (b.price.sale ?? b.price.mrp) - (a.price.sale ?? a.price.mrp));

    return result;

  }, [allProducts, selectedCategories, selectedMaterials, selectedColors, priceRange, sortBy]);

  // ProductCollection sections
  const dailyWear = filteredProducts.filter(p => (p.productCollection === "Daily" || p.productCollection === "daily"));
  const bridalWear = filteredProducts.filter(p => (p.productCollection === "Bridal" || p.productCollection === "bridal"));
  const festiveWear = filteredProducts.filter(p => (p.productCollection === "Festive" || p.productCollection === "festive"));

  return (
    <div className="bg-[#FFF9E9] min-h-screen font-sans text-[#2D2D2D]">

      <section className="w-full relative overflow-hidden">
        <div className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
          <img src={bannerImage} alt="New Arrivals" className="w-full h-full object-cover" loading="eager" />
        </div>
      </section>

      {/* Header */}
      <header className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-10 pb-4 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-serif text-[#B39055] tracking-wide uppercase flex items-center gap-3">
          Collections
          <span className="text-[#1C3A2C] text-2xl hidden sm:inline">|</span>
          <span className="text-gray-500 text-sm font-sans lowercase"> {filteredProducts.length} Designs found</span>
        </h1>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-8">

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full lg:w-auto">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold font-cormorant text-[#1C3A2C]">Filter Options</h2>
              <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1C3A2C] text-white rounded-md font-montserrat text-[13px] active:scale-95 transition-all">
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>
            <p className="hidden sm:block text-[16px] text-[#1C3A2C]">
              Showing 1-{filteredProducts.length} of {allProducts.length} results
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[14px] lg:text-[18px] font-cormorant text-[#1C3A2C] whitespace-nowrap">Sort by:</span>
            <div className="relative flex-1 sm:flex-initial">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full sm:w-[200px] lg:w-[240px] h-[40px] lg:h-[48px] bg-[#E9E1C6] border border-[#1C3A2C] rounded px-3 text-sm outline-none cursor-pointer appearance-none">
                <option value="default">Default Sorting</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* SECTION RENDER */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          <FilterSidebar
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
            categories={['Bracelets', 'Rings', 'Earrings', 'Necklaces']}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            materials={['Gold', 'Platinum', 'Rose Gold', 'Diamond Jewelry', 'Pearl']}
            selectedMaterials={selectedMaterials}
            onToggleMaterial={toggleMaterial}
            colors={['Grey', 'Green', 'Orange', 'Blue', 'White']}
            selectedColors={selectedColors}
            onToggleColor={toggleColor}
            priceRange={priceRange}
            onPriceChange={{ onMinChange: handleMinPriceChange, onMaxChange: handleMaxPriceChange }}
            minPrice={MIN_LIMIT}
            maxPrice={MAX_LIMIT}
            priceStep={1000}
          />

          <section className="flex-1 min-w-0">

            {/* DAILY WEAR */}
            <h1 className="text-3xl text-[#C58B0E] font-cormorant flex justify-between px-2 my-5">Daily Wear</h1>
            {dailyWear.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {dailyWear.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : <></>}

            {/* BRIDAL */}
            <h1 className="text-3xl text-[#C58B0E] font-cormorant flex justify-between px-2 my-5 mt-10">Bridal Wear</h1>
            {bridalWear.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {bridalWear.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : <></>}

            {/* FESTIVE */}
            <h1 className="text-3xl text-[#C58B0E] font-cormorant flex justify-between px-2 my-5 mt-10">Festive Wear</h1>
            {festiveWear.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {festiveWear.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : <></>}

          </section>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-[#FFF9E9] px-4 sm:px-6 lg:px-12 xl:px-16 py-10 lg:py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <FeatureCard icon={shippingIcon} title="Free Shipping" description="Free Shipping for Order above ₹ 2,000" />
          <FeatureCard icon={paymentIcon} title="Flexible Payment" description="Multiple Secure payment Options" />
          <FeatureCard icon={supportIcon} title="24x7 Support" description="We Support online all days" />
        </div>
      </section>
    </div>
  );
};

export const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 sm:gap-5 bg-white rounded-xl px-4 py-4 sm:px-6 sm:py-5 shadow-sm hover:shadow-md transition-all">
    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#1C3A2C] shrink-0">
      <img src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" loading="lazy" />
    </div>
    <div className="flex flex-col">
      <h4 className="text-[16px] sm:text-[18px] font-serif text-[#1C3A2C] leading-tight">{title}</h4>
      <p className="text-[12px] sm:text-[14px] font-sans text-[#1C3A2C]/80 leading-snug">{description}</p>
    </div>
  </div>
);

export default Collections;
