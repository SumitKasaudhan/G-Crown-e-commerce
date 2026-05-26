import { createContext, useState, useEffect } from "react";
import { axiosGetService } from "../services/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(null); 

  useEffect(() => {
    if (products !== null) return;

    (async () => {
      const res = await axiosGetService("/customer/product/all");

      if (res.ok && Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      } else {
        setProducts([]); // fallback
      }
    })();
  }, [products]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
