import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/auth.controller";
import protect from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/profile", protect, getProfile);
router.get("/admin", protect, adminOnly, (_req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
}
);

export default router;