import express from "express";
import { getProducts } from "../controller/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);


export default router;
