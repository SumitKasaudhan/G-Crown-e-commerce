
import React, { useEffect, useState } from "react";
import axios from "axios";
import Earing from "../../../assets/NewArrivalAssets/earrings-1.png";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showReview, setShowReview] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const navigate = useNavigate();

  const openInvoice = (orderId) => {
    window.open(`http://localhost:3000/api/orders/${orderId}/invoice`, "_blank");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/gcrown/api/v1/customer/order", { withCredentials: true });
        setOrderList(res.data);
      } catch (err) {
        console.log("MyOrders Fetch Error:", err);
      }
    };

    fetchOrders(); // first time load

    const timer = setInterval(() => {
      fetchOrders();   // दर 3 सेकंदाला server कडून latest status घेईल
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  

  const submitReview = async () => {

    try {
      await axios.post(
              `http://localhost:3000/gcrown/api/v1/customer/product/review?productId=${selectedOrderId}`,
              {
                rating,
                title:"",
                comment,
              },
              { withCredentials: true }
            );

      alert("Review added Successfully");
      setShowReview(false);
      setRating(0);
      setComment("");
    }
    catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Review failed");
    }
  };


  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    await axios.put(`http://localhost:3000/api/orders/cancel/${id}`);

    alert("Your order has been cancelled");

    setOrderList(prev =>
      prev.map(o =>
        o._id === id
          ? { ...o, orderStatus: "Cancelled", statusText: "Your order has been cancelled by you" }
          : o
      )
    );

  };


  const filteredOrders = filter === "All"
    ? orderList
    : orderList.filter(o => o.orderStatus === filter);




  return (
    <div className="font-serif max-w-5xl animate-fadeIn px-2 sm:px-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-medium text-[#1B3022]">
          Orders ({orderList.length})
        </h2>
        <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
          <select onChange={(e) => setFilter(e.target.value)} className="border px-3 py-1">
            <option value="All">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>
      </div>

      {filteredOrders.map((order) => (
        <div key={order._id} className="bg-white border mb-6 shadow-sm">

          {/* Order Header */}
          <div className="bg-[#1B3022] text-white p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs opacity-60">Order ID</p>
              <p>{order.displayOrderId}</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Total</p>
              <p>{order.total}</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Payment</p>
              <p>{order.method}</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Date</p>
              <p>{new Date(order.date).toLocaleDateString()}</p>

            </div>
          </div>

          {/* Products */}
          <div className="p-4">
            {order.products.map((item, i) => {

              return (
                <div key={i} className="flex gap-4 border-b py-3">
                  <img
                    src={
                      item.productImage && item.productImage[0]
                        ? item.productImage[0]
                        : Earing
                    }
                    alt={item.name}
                    className="w-14 h-14 object-cover"
                  />

                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.detail}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
              );
            })}


          </div>

          {/* Status & Actions */}
          <div className="p-4 flex justify-between items-center bg-gray-50">
            <div>
              <span className={`px-3 py-1 text-xs border ${order.orderStatus
                ? "bg-orange-100 text-orange-600"
                : "bg-green-100 text-green-600"
                }`}>
                {order.orderStatus}

              </span>
              <p className="text-sm italic text-gray-500 mt-1">
                {order.statusText
                  ? order.statusText
                  : order.orderStatus === "Confirmed"
                    ? "Your order is placed"
                    : order.orderStatus === "Cancelled"
                      ? "Your order has been cancelled by you"
                      : order.orderStatus === "Shipped"
                        ? "Your order is on the way"
                        : order.orderStatus === "Delivered"
                          ? "Your order has been delivered"
                          : ""}
              </p>

            </div>

            <div className="flex gap-2">
              {order.orderStatus === "Confirmed" ? (

                <>
                  <button
                    onClick={() => navigate(`/track-order/${order.displayOrderId}`)}
                    className="bg-[#1B3022] text-white px-4 py-2 text-sm"
                  >
                    Track Order
                  </button>

                  <button
                    onClick={() => openInvoice(order._id)}
                    className="border px-4 py-2 text-sm"
                  >
                    Invoice
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReview(true);
                      setSelectedOrderId(order.products[0].productId);
                    }}
                    className="bg-[#1B3022] text-white px-4 py-2 text-sm"
                  >
                    Add Review
                  </button>

                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="text-red-500 text-sm"
                  >
                    Cancel
                  </button>

                </>
              ) : (
                <>


                  <button
                    type="button"
                    onClick={() => {
                      setShowReview(true);
                      setSelectedOrderId(order._id);   // 🔴 हा line missing होता

                    }}
                    className="bg-[#1B3022] text-white px-4 py-2 text-sm"
                  >
                    Add Review
                  </button>

                  {showReview && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white w-[400px] p-6 rounded-lg relative">

                        <button
                          onClick={() => setShowReview(false)}
                          className="absolute top-2 right-2 text-xl"
                        >
                          ✖
                        </button>

                        <h2 className="text-lg font-bold mb-3">Add Review</h2>

                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          placeholder="Rating (1-5)"
                          className="border w-full p-2 mb-2"
                        />

                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}  // 🔴 हे महत्त्वाचं
                          placeholder="Write your review..."
                          className="border w-full p-2 mb-3"
                        ></textarea>

                        <button
                          onClick={submitReview}
                          className="bg-[#1B3022] text-white px-4 py-2 w-full"
                        >
                          Submit Review
                        </button>

                      </div>

                    </div>
                  )}
                  <button
                    onClick={() => navigate(`/track-order/${encodeURIComponent(order.displayOrderId)}`)}
                    className="bg-[#1B3022] text-white px-4 py-2 text-sm"
                  >
                    Track Order
                  </button>

                  <button
                    onClick={() => openInvoice(order._id)}
                    className="border px-4 py-2 text-sm"
                  >
                    Invoice
                  </button>
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="text-red-500 text-sm"
                  >
                    Cancel
                  </button>


                </>
              )}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default MyOrders; 