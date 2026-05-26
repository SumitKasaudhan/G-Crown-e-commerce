import DatabaseConnection from "./configs/db.config.js";
import dotenv from "dotenv";
import app from "./app.js";
import orderRoutes from "./routers/order/order.routes.js";
import reviewRoutes from "./routers/order/review.routes.js";
import addressRoutes from "./routers/order/address.routes.js";
import paymentRoutes from "./routers/order/payment.routes.js";
import adminOrderRoutes from "./routers/order/adminOrderRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use("/api/orders", orderRoutes);  
app.use("/api/reviews", reviewRoutes);
app.use("/api/addresses", addressRoutes);
 app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminOrderRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

DatabaseConnection();

const PORT = process.env.PORT||3000;

app.listen(PORT, () => console.log(`Server Run on PORT: ${PORT}`));