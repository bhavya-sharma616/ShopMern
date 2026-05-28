import {useEffect,useRef,useState} from "react";

import { useParams } from "react-router-dom";

import API from "../api/axios";

import type { Product } from "../types/product.types";
import type {User} from "../types/auth.types";
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

  const user: User | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );
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
      await API.post(`/products/${id}/reviews`,{rating,comment});
        
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

      <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Reviews
  </h2>

  <form
    onSubmit={handleReviewSubmit}
    className="flex flex-col gap-4 mb-8"
  >
    <select
      value={rating}
      onChange={(e) =>
        setRating(
          Number(e.target.value)
        )
      }
      className="
        border p-3 rounded
        focus:outline-none
      "
    >
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>

    <textarea
      value={comment}
      onChange={(e) =>
        setComment(
          e.target.value
        )
      }
      placeholder="Write review..."
      className="
        border p-3 rounded
        focus:outline-none
      "
    />

    <button
      className="
        bg-black text-white
        py-3 rounded
        hover:bg-gray-800
        transition
      "
    >
      Submit Review
    </button>
  </form>
  <div className="flex flex-col gap-5">
  {(product as any).reviews.map(
    (review: any, index: number) => (
      <div
        key={index}
        className="
          border rounded-xl p-5
          bg-white shadow-sm
        "
      >
        <h3 className="font-bold text-lg">
          {review.name}
        </h3>

        <p className="mt-1">
          Rating: ⭐
          {review.rating}
        </p>

        <p className="mt-3 text-gray-700">
          {review.comment}
        </p>
      </div>
    )
  )}
</div>
</div>



      <button
       onClick={() =>
    dispatch(addToCart({ ...product, quantity: 1 }))
  }
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
<br/><br/>


    </div>
  );
};

export default ProductDetailsPage;