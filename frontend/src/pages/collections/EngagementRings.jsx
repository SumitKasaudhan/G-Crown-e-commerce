import React, { useMemo, useContext } from "react";
import CollectionPage from "../../components/collections/CollectionPage";
import { ProductContext } from "../../context/ProductContext";

const EngagementRings = () => {
  const { products } = useContext(ProductContext);

  const engagementKeys = [
    "solitaire",
    "halo",
    "royal",
    "crown",
    "emerald",
    "sapphire",
    "princess",
    "oval",
    "pear",
    "round",
    "proposal",
    "engagement"
  ];

  const engagementRings = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      if (!product) return false;

      const category = product.category?.toLowerCase() || "";
      const collection = product.productCollection?.toLowerCase() || "";
      const name = product.name?.toLowerCase() || "";

      const gemstone = product.attributes?.gemstone?.toLowerCase() || "";
      const material = product.attributes?.material?.toLowerCase() || "";
      const purity = (product.attributes?.purity || [])
        .join(",")
        .toLowerCase();

      // Backend collection match
      if (collection.includes("engagement") || collection.includes("solitaire")) {
        return true;
      }

      // Only rings for engagement category
      if (category !== "rings") return false;

      const hasGemstone =
        gemstone.includes("diamond") ||
        gemstone.includes("emerald") ||
        gemstone.includes("sapphire") ||
        gemstone.includes("ruby");

      const hasMaterial =
        material.includes("platinum") ||
        material.includes("white gold") ||
        material.includes("diamond") ||
        material.includes("rose gold");

      const hasKeyword = engagementKeys.some(k =>
        name.includes(k)
      );

      return hasGemstone || hasMaterial || hasKeyword;
    });
  }, [products]);

  return (
    <CollectionPage
      title="Engagement Rings"
      products={engagementRings}
    />
  );
};

export default EngagementRings;
