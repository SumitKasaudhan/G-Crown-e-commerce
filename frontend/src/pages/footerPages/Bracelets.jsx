import React, { useState, useEffect } from "react";
import { axiosGetService } from "../../services/axios";
import CollectionPage from "../../components/collections/CollectionPage";
import toast, { Toaster } from "react-hot-toast";

const BraceletsListing = () => {
  const [braceletsList, setBraceletsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBracelets = async () => {
      try {
        setLoading(true);
        const apiResponse = await axiosGetService("/customer/product/all");

        if (!apiResponse.ok) {
          toast.error("Failed to load bracelets. Please try again later.");
          return;
        }

        const productList = apiResponse.data.data || [];

        // Efficient filtering for Bracelets
        // We handle both singular and plural forms for data safety
        const filteredBracelets = productList.filter((item) => {
          const cat = item.category?.toLowerCase();
          return ["bracelet", "bracelets"].includes(cat);
        });

        setBraceletsList(filteredBracelets);
      } catch (error) {
        console.error("Failed to load bracelets:", error);
        toast.error("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchBracelets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9E9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Animated loader using brand colors: Deep Green and Gold */}
          <div className="w-12 h-12 border-4 border-[#1C3A2C] border-t-[#CBA135] rounded-full animate-spin"></div>
          <p className="font-serif text-[#1C3A2C] tracking-widest animate-pulse uppercase">
            Loading Bracelets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <CollectionPage 
        title="Bracelets Collection" 
        products={braceletsList} 
      />
    </>
  );
};

export default BraceletsListing;