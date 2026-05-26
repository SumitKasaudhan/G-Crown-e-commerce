import React from "react";
import CollectionPage from "../../components/collections/CollectionPage";
import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Collections = () => {
const { products } = useContext(ProductContext);


  return <CollectionPage title="Collections" products={products || []} />;
};

export default Collections;