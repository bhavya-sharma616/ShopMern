import { Link } from "react-router-dom";

import type { Product } from "../types/product.types";

interface Props {
  product: Product;
}

const ProductCard = ({
  product,
}: Props) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="
        group
        bg-white
        border border-slate-200
        rounded-xl
        overflow-hidden
        transition-colors
      "
    >
      <div
        className="
          bg-slate-100
          overflow-hidden
        "
      >
        <img
          src={product.image}
          alt={product.title}
          className="
            h-60
            w-full
            object-cover
            group-hover:opacity-95
            transition
          "
        />
      </div>

      <div className="p-4">
        <p
          className="
            text-xs
            text-slate-500
            uppercase
            tracking-wide
          "
        >
          {product.category}
        </p>
        <h2
          className="
            mt-2
            text-lg
            font-medium
            text-slate-800
            leading-snug
            line-clamp-1
          "
        >
          {product.title}
        </h2>
        <div
          className="
            flex items-center
            justify-between
            mt-4
          "
        >
          <p
            className="
              text-sm
              text-slate-600
            "
          >
            ⭐{" "}
            {(product as any)
              .averageRating?.toFixed(
                1
              ) || 0}
          </p>
          <span
            className={`
              text-xs
              px-2.5 py-1
              rounded-md
              ${
                product.stock > 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }
            `}
          >
            {product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>
        <p
          className="
            mt-5
            text-2xl
            font-semibold
            text-slate-900
          "
        >
          ₹{product.price}
        </p>


        <button
          className="
            mt-5
            w-full
            bg-slate-900
            text-white
            py-2.5
            rounded-lg
            text-sm
            font-medium
            hover:bg-slate-800
            transition-colors
          "
        >
          View Product
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;