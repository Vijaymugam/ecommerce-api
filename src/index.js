import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import orderRoutes from "./routes/order.routes.js";


dotenv.config();

const app = express(); // ✅ app is defined here

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
