import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import customerAuthRoutes from "./routers/customer/auth.route.js";
import customerProductRoutes from "./routers/customer/product.route.js";
import wishListRoutes from "./routers/customer/wishlist.route.js";
import customerStoreRoutes from "./routers/customer/store.route.js";
import cartRoutes from "./routers/customer/cart.route.js";
import subscribeRoutes from "./routers/customer/subcribe&coupon.route.js";

import adminAuthRoutes from "./routers/admin/auth.route.js";
import adminProductRoutes from "./routers/admin/product.route.js";
import adminStoreRoutes from "./routers/admin/store.route.js";
import adminPromationRoutes from "./routers/admin/promation.route.js";

import userOrderRoutes from "./routers/order/userOrder.route.js";
import orderRoutes from "./routers/order/order.routes.js";
import adminOrderRoutes from "./routers/order/adminOrderRoutes.js";
import commonSearchRoutes from "./routers/common/search.route.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://g-crown-zeta.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser());

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "100mb" }));

app.use("/gcrown/api/v1/customer/auth", customerAuthRoutes);
app.use("/gcrown/api/v1/customer/product", customerProductRoutes);
app.use("/gcrown/api/v1/customer/wishlist", wishListRoutes);
app.use("/gcrown/api/v1/customer/store", customerStoreRoutes);
app.use("/gcrown/api/v1/customer/cart", cartRoutes);
app.use("/gcrown/api/v1/customer/subscribe&coupon", subscribeRoutes);

app.use("/gcrown/api/v1/admin/auth", adminAuthRoutes);
app.use("/gcrown/api/v1/admin/product", adminProductRoutes);
app.use("/gcrown/api/v1/admin/store", adminStoreRoutes);
app.use("/gcrown/api/v1/admin/order", adminOrderRoutes);
app.use("/gcrown/api/v1/admin/prom", adminPromationRoutes);

app.use("/gcrown/api/v1/customer/order", orderRoutes);

app.use("/gcrown/api/v1/common", commonSearchRoutes);

export default app;
