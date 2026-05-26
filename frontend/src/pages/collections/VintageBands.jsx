import React, { useMemo, useContext } from "react";
import CollectionPage from "../../components/collections/CollectionPage";
import { ProductContext } from "../../context/ProductContext";

const VintageBands = () => {
  const { products } = useContext(ProductContext);

  const vintageKeys = [
    "vintage",
    "antique",
    "heritage",
    "classic",
    "royal",
    "temple",
    "traditional"
  ];

  const vintageBands = useMemo(() => {
    if (!products) return [];

    return products.filter(p => {
      if (!p) return false;

      const col = p.productCollection?.toLowerCase() || "";
      const name = p.name?.toLowerCase() || "";
      const category = p.category?.toLowerCase() || "";

      return (
        vintageKeys.some(k => col.includes(k)) ||
        (
          category === "rings" &&
          vintageKeys.some(k => name.includes(k))
        )
      );
    });
  }, [products]);

  return (
    <CollectionPage
      title="Vintage Bands"
      products={vintageBands}
    />
  );
};

export default VintageBands;
