import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface Product
  extends Document {
  title: string;

  description: string;

  price: number;

  image: string;

  category: string;

  stock: number;
  reviews: Review[];
  numReviews?: number;
  averageRating?: number;
}

export interface Review {
  user: string;

  name: string;

  rating: number;

  comment: string;
}

const productSchema =
  new Schema<Product>(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      stock: {
        type: Number,
        required: true,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },

          name: {
            type: String,
            required: true,
          },

          rating: {
            type: Number,
            required: true,
          },

          comment: {
            type: String,
            required: true,
          },
        },
      ],
      numReviews: {
        type: Number,
        default: 0,
      },

      averageRating: {
        type: Number,
        default: 0,
      },
    },

    {
      timestamps: true,
    }
  );

const Product = mongoose.model<Product>(
  "Product",
  productSchema
);

export default Product;