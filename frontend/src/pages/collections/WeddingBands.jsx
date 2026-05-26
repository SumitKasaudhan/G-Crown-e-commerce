import React, { useMemo, useContext } from "react";
import CollectionPage from "../../components/collections/CollectionPage";
import { ProductContext } from "../../context/ProductContext";

const WeddingBands = () => {
  const { products } = useContext(ProductContext);

  const weddingBands = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      if (!product) return false;

      const category = product.category?.toLowerCase() || "";
      const collection = product.productCollection?.toLowerCase() || "";
      const name = product.name?.toLowerCase() || "";

      return (
        collection.includes("wedding-bands") ||     // backend
        (
          category === "rings" &&
          (
            name.includes("band") ||
            name.includes("promise") ||
            name.includes("infinity") ||
            name.includes("knot") ||
            name.includes("blush")
          )
        )
      );
    });
  }, [products]);

  return (
    <CollectionPage
      title="Wedding Bands"
      products={weddingBands}
    />
  );
};

export default WeddingBands;
