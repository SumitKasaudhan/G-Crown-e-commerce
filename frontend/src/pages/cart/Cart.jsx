import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { axiosPostService } from "../../services/axios";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [couponError, setCouponError] = useState("");

  const { subtotal, shipping, discountAmount, total, itemsCount } = useMemo(() => {
    const original = getCartTotal();
    let discounted = original;

    // Apply coupons sequentially
    appliedCoupons.forEach(c => {
      discounted = discounted - (discounted * (c.percent / 100));
    });

    const ship = discounted > 0 ? 12.00 : 0;

    return {
      subtotal: original,
      shipping: ship,
      discountAmount: original - discounted,
      total: discounted + ship,
      itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0)
    };
  }, [cartItems, appliedCoupons, getCartTotal]);


  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    setCouponError("");

    // Don't allow duplicate coupons
    if (appliedCoupons.find(c => c.code === code)) {
      setCouponError(`${code} already applied`);
      return;
    }

    try {
      const apiResponse = await axiosPostService("/customer/subscribe&coupon/useCoupon", { code });

      if (!apiResponse.ok) {
        setCouponError(apiResponse.data?.message || "Invalid Coupon");
        return;
      }

      const percent = apiResponse.data.data;

      setAppliedCoupons(prev => [...prev, { code, percent }]);
      setCouponInput("");

    } catch (err) {
      setCouponError(err.response?.data?.message || "Coupon Error");
    }
  };

  const handleConfirmOrder = () => {
    const invalidItem = cartItems.find(item => {
      const variant = item.product.variants.find(v => v.purity === item.purity);
      return item.quantity > (variant?.quantity || 0);
    });

    if (invalidItem) {
      alert(`Insufficient stock for Purity: ${invalidItem.purity}`);
      return;
    }

    const orderSnapshot = {
      items: cartItems.map(item => ({
        productId: item.product._id,
        name: item.product.name,
        purity: item.purity,
        price: item.product.variants.find(v => v.purity === item.purity)?.sale || 0,
        quantity: item.quantity,
        productImage: item.product.productImage?.[0],
        category: item.product.category
      })),
      subtotal,
      shipping,
      discountAmount,
      total,
      discountPercent,
      coupon: activeCoupon,
    };

    navigate("/checkout", { state: { order: orderSnapshot } });
  };


  // ---- EMPTY CART ----
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FAF7ED] min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div className="relative mb-8 flex justify-center">
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShoppingBag size={80} strokeWidth={1} className="text-[#1C3A2C]" />
            </motion.div>
          </motion.div>
          <h2 className="text-4xl font-serif text-[#1C3A2C] mb-4">Your Treasury is Empty</h2>
          <p className="text-gray-500 font-light italic mb-8">
            Discover pieces that define your elegance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/collections")}
            className="bg-[#1C3A2C] text-white px-12 py-4 tracking-widest uppercase text-sm"
          >
            Browse Collections
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#FAF7ED] min-h-screen font-serif">
      <div className="max-w-6xl mx-auto px-4 py-6">

        <nav className="text-[13px] text-gray-400 mb-12">
          <Link to="/" className="hover:underline">Home</Link> / <span className="text-gray-600">Cart</span>
        </nav>

        <h1 className="text-center text-3xl md:text-4xl text-[#1C3A2C] font-medium mb-16 tracking-tight">Your Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <div className="border border-[#E5DDCC] bg-transparent p-4 md:p-8 shadow-sm">

              <div className="hidden md:grid grid-cols-12 text-[#1C3A2C] text-lg mb-6 border-b border-[#E5DDCC] pb-4 font-medium">
                <div className="col-span-6">Products</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <AnimatePresence>
                {cartItems.map((item) => {
                  const variant = item.product.variants.find(v => v.purity === item.purity);
                  const price = Number(variant?.sale || variant?.price || 0);
                  const subtotal = price * item.quantity;

                  // 🔍 GET VARIANT STOCK
                  const maxStock = variant?.quantity || 0;

                  return (
                    <motion.div
                      key={item.product._id + item.purity}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 border-b border-[#FAF7ED] pb-6 last:border-0"
                    >
                      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                        <button
                          onClick={() => removeFromCart(item.product._id, item.purity)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>

                        <img
                          src={item.product.productImage?.[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover border border-[#E5DDCC]"
                        />

                        <div>
                          <h3 className="text-md font-semibold text-[#1C3A2C]">
                            {item.product.name}
                          </h3>
                          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                            {item.product.category}
                          </p>
                          <p className="text-[10px] text-[#1C3A2C] uppercase tracking-wider">
                            Purity: {item.purity}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-4 md:col-span-2 text-center text-[#1C3A2C]">
                        ₹{price.toLocaleString()}
                      </div>

                      <div className="col-span-4 md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-[#E5DDCC] bg-white px-2 py-1">

                          {/* DECREASE */}
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.product._id, item.purity, item.quantity - 1);
                              }
                            }}
                            className="p-1"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="px-4 text-sm font-sans">{item.quantity}</span>

                          {/* INCREASE */}
                          <button
                            onClick={() => {
                              if (item.quantity < maxStock) {
                                updateQuantity(item.product._id, item.purity, item.quantity + 1);
                              } else {
                                alert(`Only ${maxStock} pieces available for ${item.purity}`);
                              }
                            }}
                            className="p-1"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-4 md:col-span-2 text-right text-[#1C3A2C] font-bold">
                        ₹{subtotal.toLocaleString()}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

            </div>
            <div className="mt-12 flex flex-wrap justify-between items-start gap-4">
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon"
                    className="bg-white border border-[#E5DDCC] px-4 py-3 flex-grow md:w-64 outline-none focus:border-[#1C3A2C]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#1C3A2C] text-white px-8 py-3 text-xs uppercase tracking-widest font-bold"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <span className="text-red-600 text-[10px] italic">
                    {couponError}
                  </span>
                )}

                {discountPercent > 0 && (
                  <span className="text-green-700 text-[10px] font-bold uppercase tracking-widest">
                    ✓ {discountPercent}% Discount Applied
                  </span>
                )}
              </div>

              <button
                onClick={clearCart}
                className="text-[#1C3A2C] underline text-xs tracking-widest uppercase hover:text-red-700 transition-colors"
              >
                Empty Bag
              </button>
            </div>
          </div>

          {/* RIGHT SIDE ORDER SUMMARY */}
          <aside className="w-full lg:w-80">
            <div className="border border-[#E5DDCC] p-8 bg-white sticky top-10 shadow-sm">
              <h2 className="text-xl mb-8 border-b border-[#E5DDCC] pb-4 font-medium text-[#1C3A2C]">
                Order Review
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Items</span>
                  <span>{itemsCount}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>{shipping > 0 ? `₹${shipping.toLocaleString()}` : "Complimentary"}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#D4AF37] font-bold">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-[#E5DDCC] pt-6 text-xl text-[#1C3A2C] font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmOrder}
                className="w-full bg-[#1C3A2C] text-white py-5 mt-10 text-xs font-bold uppercase tracking-[0.2em] shadow-lg"
              >
                Confirm Order
              </motion.button>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
