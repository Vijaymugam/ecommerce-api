import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controller/wishlist.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/:productId", authMiddleware, removeFromWishlist);

export default router;
