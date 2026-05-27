import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IProduct
  extends Document {
  title: string;

  description: string;

  price: number;

  image: string;

  category: string;

  stock: number;
}

const productSchema =
  new Schema<IProduct>(
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
    },

    {
      timestamps: true,
    }
  );

const Product = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;