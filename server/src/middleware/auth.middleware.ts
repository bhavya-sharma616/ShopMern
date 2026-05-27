import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AuthRequest } from "../types/auth.types";

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  res.status(401).json({
    success: false,
    message: "Not authorized",
  });

  return;
}

const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });

      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });

      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
};

export default protect;