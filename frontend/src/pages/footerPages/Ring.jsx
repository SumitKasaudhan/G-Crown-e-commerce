import React, { useState, useEffect } from "react";
import { axiosGetService } from "../../services/axios";
import CollectionPage from "../../components/collections/CollectionPage"; // Adjust path as needed
import toast, { Toaster } from "react-hot-toast";

const RingsListing = () => {
  const [ringsList, setRingsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRings = async () => {
      try {
        setLoading(true);
        const apiResponse = await axiosGetService("/customer/product/all");

        if (!apiResponse.ok) {
          toast.error("Failed to load products. Please try again later.");
          return;
        }

        const productList = apiResponse.data.data || [];

        // Efficient filtering for Rings
        const filteredRings = productList.filter((item) => {
          const cat = item.category?.toLowerCase();
          return ["ring", "rings"].includes(cat);
        });

        setRingsList(filteredRings);
      } catch (error) {
        console.error("Failed to load products", error);
        toast.error("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchRings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9E9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1C3A2C] border-t-[#CBA135] rounded-full animate-spin"></div>
          <p className="font-serif text-[#1C3A2C] tracking-widest animate-pulse">
            LOADING RINGS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <CollectionPage 
        title="Rings Collection" 
        products={ringsList} 
      />
    </>
  );
};

export default RingsListing;