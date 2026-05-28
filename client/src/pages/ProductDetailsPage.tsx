import { useEffect, useRef, useState } from "react";

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
  const fnRef = useRef<() => Promise<void> | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);

        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    };
    fnRef.current = fetchProduct; // store function


    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }
  const handleReviewSubmit =
    async (e: React.FormEvent) => {

      e.preventDefault();

      try {
        await API.post(`/products/${id}/reviews`, { rating, comment });

        toast.success("Review added");

        setComment("");
        setRating(5);
        fnRef.current?.(); // refresh product details


      } catch (error) {
        toast.error(
          "Failed to add review"
        );
      }
    };


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

      <div className="mt-14">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">
        Reviews
      </h2>

      <p className="text-slate-500 mt-1">
        See what customers are saying
      </p>
    </div>

    <div className="text-sm text-slate-500">
      {(product as any).reviews.length} reviews
    </div>
  </div>

  <form
    onSubmit={handleReviewSubmit}
    className="bg-white border border-slate-200 rounded-xl p-5 mb-8 space-y-4"
  >
    <div>
      <label className="block text-sm text-slate-600 mb-2">
        Rating
      </label>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-lg focus:outline-none focus:border-slate-400 transition-colors"
      >
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
    </div>

    <div>
      <label className="block text-sm text-slate-600 mb-2">
        Comment
      </label>

      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Write your review"
        rows={4}
        className="w-full border border-slate-200 bg-slate-50 px-4 py-3 rounded-lg resize-none focus:outline-none focus:border-slate-400 transition-colors"
      />
    </div>

    <button
      className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
    >
      Submit Review
    </button>
  </form>

  <div className="space-y-4">
    {(product as any).reviews.length === 0 ? (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
        No reviews yet
      </div>
    ) : (
      (product as any).reviews.map(
        (review: any, index: number) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-xl p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium">
                  {review.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-slate-900 font-medium">
                    {review.name}
                  </h3>

                  <p className="text-sm text-amber-500 mt-1">
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-slate-600 leading-relaxed">
              {review.comment}
            </p>
          </div>
        )
      )
    )}
  </div>
</div>
      <button
        onClick={() =>
          dispatch(addToCart({ ...product, quantity: 1 }))
        }
        className="
          bg-black text-white p-3 rounded-lg
          hover:bg-slate-800
           hover:scale-105
           active:scale-95
           transition duration-200
          "
      >
        Add To Cart
      </button>
      <br /><br />
    </div>
  );
};

export default ProductDetailsPage;