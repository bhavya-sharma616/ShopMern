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
        "/admin/products"
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
        `/admin/products/${id}`
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
  <div className="min-h-screen bg-slate-50 px-4 py-10">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <p className="uppercase tracking-wide text-xs text-slate-500 mb-2">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Manage Products
          </h1>

          <p className="mt-2 text-slate-500">
            Edit and organize your products.
          </p>
        </div>

        <Link
          to="/admin"
          className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <h2 className="text-2xl font-medium text-slate-900">
            No Products Found
          </h2>

          <p className="text-slate-500 mt-2">
            Start by adding your first product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                      {product.category}
                    </p>

                    <h2 className="text-xl font-medium text-slate-900">
                      {product.title}
                    </h2>

                    <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-md whitespace-nowrap ${
                      product.stock > 0
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-2xl font-semibold text-slate-900">
                    ₹{product.price}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/admin/products/${product._id}`}
                    className="flex-1 bg-slate-900 text-white text-center py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="flex-1 bg-red-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
};
export default AdminProductsPage;