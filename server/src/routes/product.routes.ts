import express from "express";

import {createProduct,getProducts, updateProduct} from "../controllers/product.controller";

import protect, {adminOnly} from "../middleware/auth.middleware";

import { getSingleProduct } from "../controllers/product.controller";
import { deleteProduct } from "../controllers/product.controller";


const router = express.Router();

router.post("/",protect,adminOnly,createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.delete("/:id",protect, adminOnly, deleteProduct)

router.put("/:id",protect, adminOnly, updateProduct)
export default router;