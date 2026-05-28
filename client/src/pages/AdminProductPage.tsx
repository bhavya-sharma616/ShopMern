import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

import type { Product } from "../types/product.types";
import toast from "react-hot-toast";

const AdminProductsPage = () => {
  const [products, setProducts] =
    useState<Product[]>([]);
  const fetchProducts = async () => {
    try {
      const res = await API.get(
        "/products"
      );

      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (
    id: string
  ) => {
    try {
      await API.delete(
        `/products/${id}`
      );

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product._id !== id
        )
      );

      alert("Product deleted");
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Manage Products
      </h1>

      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">
                {product.title}
              </h2>

              <p>
                ${product.price}
              </p>
            </div>
            <Link
              to={`/admin/products/${product._id}`}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Edit
            </Link>
            <button
  onClick={() =>
    handleDelete(product._id)
  }
  className="
    bg-red-500 text-white
    px-4 py-2 rounded
    hover:bg-red-600
    hover:scale-105
    active:scale-95
    transition duration-200
  "
>
  Delete
</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminProductsPage;