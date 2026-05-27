import { Link } from "react-router-dom";

import type { Product } from "../types/product.types";

interface Props {
  product: Product;
}

const ProductCard = ({product}: Props) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="border p-4 rounded"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-52 w-full object-cover"
      />

      <h2 className="text-xl font-bold mt-3">
        {product.title}
      </h2>

      <p className="text-gray-500">
        {product.category}
      </p>

      <p className="font-bold mt-2">
        ${product.price}
      </p>
    </Link>
  );
};

export default ProductCard;