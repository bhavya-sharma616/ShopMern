import {useEffect,useState} from "react";

import { useParams } from "react-router-dom";

import API from "../api/axios";

import type { Product } from "../types/product.types";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(
          `/products/${id}`
        );

        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
          toast.error("Something went wrong");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }
const dispatch = useAppDispatch();
  return (
    <div className="p-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-96"
      />

      <h1 className="text-4xl font-bold mt-5">
        {product.title}
      </h1>

      <p className="mt-4">
        {product.description}
      </p>

      <p className="text-2xl font-bold mt-5">
        &#x20B9;{product.price}
      </p>

      <button
  className="
    bg-black text-white p-3 rounded
    hover:bg-gray-800
    hover:scale-105
    active:scale-95
    transition duration-200
  "
>
  Add To Cart
</button>
    </div>
  );
};

export default ProductDetailsPage;