
import Order from "../../models/order/Order.js";
import { ApiError } from "../../utils/api-error.js";

export const getAllOrders = async (req, res) => {
  try {

    

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;
  

    let updateData = {
      orderStatus: status,
      statusText: `Your order is ${status}`
    };

    await Order.findByIdAndUpdate(req.params.id, updateData);

    // 🔴 Updated order परत पाठव
    const updatedOrder = await Order.findById(req.params.id);
    res.json(updatedOrder);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
