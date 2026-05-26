import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosGetService, axiosPutService, axiosPostService } from "../services/axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const apiResponse = await axiosGetService("/customer/cart/all");
      if (!apiResponse.ok) {
        console.log(apiResponse.data.message || "Please Login")
        return
      }
      else {
        setCartItems(apiResponse.data?.data?.cart || []);
      }
    } catch (error) {
      console.error("Cart fetch failed:", error);
    }
  };

  const addToCart = async (product, quantity = 1, purity = null) => {
    try {
      // if(purity)

      const apiResponse = await axiosPostService("/customer/cart/add", {
        productId: product._id,
        quantity,
        purity
      });

      if (!apiResponse.ok) {
        alert(apiResponse.data.message || "Please Login")
        return
      }
      else {
        await fetchCart();
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const removeFromCart = async (productId, purity) => {
    try {
      await axiosPutService("/customer/cart/remove", { productId, purity });
      await fetchCart();
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  const updateQuantity = async (productId, purity, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId, purity);
    }
    try {
      await axiosPutService("/customer/cart/updateQuantity", {
        productId,
        purity,
        quantity,
      });
      await fetchCart();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosPutService("/customer/cart/clear");
      setCartItems([]);
    } catch (error) {
      console.error("Clear failed:", error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const variant = item.product.variants?.find(v => v.purity === item.purity);
      const price = Number(variant?.sale || item.product.price?.sale || 0);
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
