import React, { useMemo, useContext } from "react";
import CollectionPage from "../../components/collections/CollectionPage";
import { ProductContext } from "../../context/ProductContext";

const ClassicSolitaire = () => {
  const { products } = useContext(ProductContext);

  // still computing only from cached products
  const classicSolitaire = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      if (!product) return false;

      const category = product.category?.toLowerCase() || "";
      const collection = product.productCollection?.toLowerCase() || "";
      const name = product.name?.toLowerCase() || "";
      const gemstone = product.attributes?.gemstone?.toLowerCase() || "";
      const material = product.attributes?.material?.toLowerCase() || "";

      if (collection.includes("solitaire")) return true;
      if (category !== "rings") return false;

      const keywords = [
        "solitaire", "royal", "crown", "statement", "aura",
        "princess", "oval", "round", "pear", "empress", "radiant"
      ];

      const hasKeyword = keywords.some(k => name.includes(k));
      const isDiamond =
        gemstone.includes("diamond") ||
        material.includes("diamond") ||
        material.includes("white gold") ||
        material.includes("platinum");

      return name.includes("solitaire") || (isDiamond && hasKeyword);
    });
  }, [products]);

  return (
    <CollectionPage
      title="Classic Solitaire"
      products={classicSolitaire}
    />
  );
};

export default ClassicSolitaire;
