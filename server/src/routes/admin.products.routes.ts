import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} from "../controllers/product.controller";

import protect, { adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

// ADMIN ONLY CRUD

router.post("/", protect, adminOnly, createProduct);

router.get("/", protect, adminOnly, getProducts);

router.get("/:id", protect, adminOnly, getSingleProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;