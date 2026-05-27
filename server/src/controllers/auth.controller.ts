import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../types/auth.types";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists"
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
}

export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        status: false,
        message: "Invalid Credentials"
      })
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        status: false,
        message: "Incorrect password!"
      })
      return;
    }
    const token = generateToken(user._id.toString());
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
    console.log(token)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export const getProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};