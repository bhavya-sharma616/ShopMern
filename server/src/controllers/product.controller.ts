import { Request, Response } from "express";

import Product from "../models/Product.model";
import Review from "../models/Product.model";



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

export const deleteProduct =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });

        return;
      }

      await product.deleteOne();

      res.status(200).json({
        success: true,
        message: "Product deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

export const updateProduct =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });

        return;
      }

      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  
export const addReview =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const {rating,comment} = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });

        return;
      }

      const review = {
        user: (req as any).user._id,
        name: (req as any).user.name,
        rating: Number(rating),
        comment,
      };
      const alreadyReviewed =
  product.reviews.find(
    (r: any) =>
      r.user.toString() ===
      (req as any).user._id.toString()
  );

if (alreadyReviewed) {
  res.status(400).json({
    success: false,
    message:
      "Product already reviewed",
  });

  return;
}

      product.reviews.push(review);

      product.numReviews =
        product.reviews.length;

      product.averageRating =
        product.reviews.reduce(
          (acc, item) =>
            acc + item.rating,
          0
        ) / product.reviews.length;

      await product.save();

      res.status(201).json({
        success: true,
        message: "Review added",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };