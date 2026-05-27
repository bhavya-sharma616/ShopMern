import {useEffect,useState} from "react";

import { useParams } from "react-router-dom";

import API from "../api/axios";

import type { Product } from "../types/product.types";

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
        ${product.price}
      </p>

      <button 
        onClick={()=>dispatch(
          addToCart({
            ...product,
            quantity:1
          })
        )} className="bg-black text-white px-5 py-3 mt-5"
      > Add To Cart
      </button>
    </div>
  );
};

export default ProductDetailsPage;