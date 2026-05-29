import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes"
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users",userRoutes)

app.get("/", (_req: Request, res: Response) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});