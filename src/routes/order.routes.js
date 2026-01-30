import express from "express";
import {
  placeOrder,
  getOrders,
} from "../controller/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getOrders);

export default router;
