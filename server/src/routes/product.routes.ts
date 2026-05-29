import express from "express";

import {getProducts} from "../controllers/product.controller";

import protect from "../middleware/auth.middleware";

import { getSingleProduct } from "../controllers/product.controller";
import { deleteProduct } from "../controllers/product.controller";
import { addReview } from "../controllers/product.controller";


const router = express.Router();


router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.post("/:id/reviews", protect, addReview);
export default router;