import { Request, Response } from "express";

import User from "../models/user.model";


export const updateProfile =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user =
        await User.findById(
          (req as any).user._id
        );

      if (!user) {
        res.status(404).json({
          success: false,
          message:
            "User not found",
        });

        return;
      }

      user.name =
        req.body.name ||
        user.name;

      user.email =
        req.body.email ||
        user.email;

      if (req.body.password) {
        user.password =
          req.body.password;
      }

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Profile updated",
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });
    }
  };