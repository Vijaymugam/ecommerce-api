import express from "express";
import { getProducts,getProductById } from "../controller/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.get("/:id", getProductById);


export default router;
