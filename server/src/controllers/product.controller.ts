import { Request, Response } from "express";

import Product from "../models/Product.model";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product =
      await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products =
      await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSingleProduct =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const product =
        await Product.findById(req.params.id);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });

        return;
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };