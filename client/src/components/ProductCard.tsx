import { Link } from "react-router-dom";

import type { Product } from "../types/product.types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="
  border rounded-xl overflow-hidden bg-white
  hover:shadow-2xl
  hover:-translate-y-2
  transition duration-300
"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
  <h2 className="text-xl font-bold">
    {product.title}
  </h2>

  <p className="text-gray-500 mt-1">
    {product.category}
  </p>

  <p className="mt-2">
    {product.stock > 0
      ? "In Stock"
      : "Out of Stock"}
  </p>

  <p className="font-bold text-2xl mt-3">
    &#x20B9;{product.price}
  </p>
</div>
    </Link>
  );
};

export default ProductCard;