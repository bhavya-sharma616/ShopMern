import express from "express";
import {updateProfile}  from "../controllers/user.controller";

import protect  from "../middleware/auth.middleware";

const router = express.Router();

router.put("/profile", protect, updateProfile);
export default router;