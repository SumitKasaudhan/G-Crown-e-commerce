import React, { useState, useEffect } from "react";
import { axiosGetService } from "../../services/axios";
import CollectionPage from "../../components/collections/CollectionPage";
import toast, { Toaster } from "react-hot-toast";

const EarringsListing = () => {
  const [earringsList, setEarringsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarrings = async () => {
      try {
        setLoading(true);
        const apiResponse = await axiosGetService("/customer/product/all");

        if (!apiResponse.ok) {
          toast.error("Failed to load earrings. Please try again later.");
          return;
        }

        const productList = apiResponse.data.data || [];

        // Efficient filtering for Earrings
        // Handles common variations: earing, earings, earring, earrings
        const filteredEarrings = productList.filter((item) => {
          const cat = item.category?.toLowerCase();
          return ["earring", "earrings", "earing", "earings"].includes(cat);
        });

        setEarringsList(filteredEarrings);
      } catch (error) {
        console.error("Failed to load earrings", error);
        toast.error("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarrings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9E9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1C3A2C] border-t-[#CBA135] rounded-full animate-spin"></div>
          <p className="font-serif text-[#1C3A2C] tracking-widest animate-pulse uppercase">
            Loading Earrings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <CollectionPage 
        title="Earrings Collection" 
        products={earringsList} 
      />
    </>
  );
};

export default EarringsListing;