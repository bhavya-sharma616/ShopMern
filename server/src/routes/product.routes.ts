import express from "express";

import {getProducts} from "../controllers/product.controller";

import {
  createProduct,
  updateProduct
} from "../controllers/product.controller";

import protect, { adminOnly } from "../middleware/auth.middleware";

import { getSingleProduct } from "../controllers/product.controller";
import { deleteProduct } from "../controllers/product.controller";
import { addReview } from "../controllers/product.controller";


const router = express.Router();


router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.post("/:id/reviews", protect, addReview);


// ADMIN ONLY CRUD

router.post("/", protect, adminOnly, createProduct);

router.get("/", protect, adminOnly, getProducts);

router.get("/:id", protect, adminOnly, getSingleProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;