
import Order from "../../models/order/Order.js";
import pdf from "html-pdf";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get My Orders

export const getAllOrders = async (req, res) => {

  const { role } = req.user;

  if (role) {
    return res.status(401).json(new ApiError(401, "Your are not Customer"));
  }

  const orders = await Order.find({});
  res.json(orders);
};
export const getOrders = async (req, res) => {

  const { role } = req.user;

  if (role) {
    return res.status(401).json(new ApiError(401, "Your are not Customer"));
  }

  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};

export const createOrder = async (req, res) => {

  const { role } = req.user;

  if (role) {
    return res.status(401).json(new ApiError(401, "Your are not Customer"));
  }

  const displayOrderId = "GC-" + Date.now();

  const products = req.body.products.map(p => ({
    name: p.name,
    price: p.price,
    qty: p.qty,
    productImage: p.productImage   // 🔥 ही line add कर
  }));

  const newOrder = new Order({
    ...req.body,
    products,
    displayOrderId,
    userId: req.user._id,
    orderStatus: "Accepted"
  });

  await newOrder.save();
  res.json(newOrder);
};


// Update Status
export const updateOrderStatus = async (req, res) => {

  const { role } = req.user;

  if (!role) {
    return res.status(401).json(new ApiError(401, "No Auth"));
  }

  await Order.findByIdAndUpdate(req.params.id, {
    orderStatus: req.body.status,
    statusText: req.body.statusText
  });
  res.json({ message: "Order Status Updated" });
};

// Generate Invoice
export const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found");

    const templatePath = path.join(__dirname, "../../templates/invoice.html");
    let html = fs.readFileSync(templatePath, "utf8");

    const shippingName = order.address
      ? order.address.fullName
      : "Customer";

    const shippingAddress = order.address
      ? `${order.address.addressLine}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}, Ph: ${order.address.mobile}`
      : "Not Available";


    let rows = "";
    order.products.forEach((p) => {
      rows += `
        <tr>
          <td>${p.name}</td>
          <td>${p.qty}</td>
          <td>₹${p.price}</td>
          <td>₹${p.qty * p.price}</td>
        </tr>
      `;
    });

    html = html
      .replace("{{invoiceNo}}", order.invoiceNo || "INV-GC-" + Date.now())
      .replace("{{orderId}}", order.displayOrderId)

      .replace("{{invoiceDate}}", new Date(order.date).toDateString())

      // Company Billing (fixed)
      .replace("{{billingName}}", "GC Jewellery Pvt Ltd")
      .replace("{{billingAddress}}", "FC Road, Pune, Maharashtra - 411004")

      // Customer Shipping (safe)
      .replace("{{shippingName}}", shippingName)
      .replace("{{shippingAddress}}", shippingAddress)

      .replace("{{productRows}}", rows)
      .replace("{{grandTotal}}", order.total);



    pdf.create(html).toStream((err, stream) => {
      if (err) {
        console.log("PDF ERROR =>", err);
        return res.status(500).send("PDF generation failed");
      }
      res.setHeader("Content-Type", "application/pdf");
      stream.pipe(res);
    });

  } catch (err) {
    console.log("INVOICE ERROR => ", err);
    res.status(500).send("Error generating invoice");
  }
};


// export const saveOrder = async (req, res) => {
//   try {
//     const order = new Order(req.body); // mongoose model
//     await order.save();
//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
export const saveOrder = async (req, res) => {
  try {
    const displayOrderId = "GC-" + Date.now();

    const products = req.body.products.map(p => ({
      name: p.name,
      price: p.price,
      qty: p.qty,
      productImage: p.productImage   // 🔥 THIS LINE IS MAIN
    }));

    const order = new Order({
      ...req.body,
      products: products,
      displayOrderId,
      userId: req.user._id,
      orderStatus: "Accepted"
    });

    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





export const cancelOrder = async (req, res) => {
  try {

    const { role } = req.user;

    if (role) {
      return res.status(401).json(new ApiError(401, "Your are not Customer"));
    }

    await Order.findByIdAndUpdate(req.params.id, {
      orderStatus: "Cancelled",   // ✅ योग्य field
      statusText: "Your order has been cancelled by user"
    });

    res.json({ success: true, message: "Order Cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
