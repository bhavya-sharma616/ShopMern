import express from "express";

import {createProduct,getProducts} from "../controllers/product.controller";

import protect, {adminOnly} from "../middleware/auth.middleware";

import { getSingleProduct } from "../controllers/product.controller";

const router = express.Router();

router.post("/",protect,adminOnly,createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

export default router;