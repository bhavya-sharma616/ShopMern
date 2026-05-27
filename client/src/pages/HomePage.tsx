import { useEffect, useState } from "react";

import API from "../api/axios";

import ProductCard from "../components/ProductCard";

import type { Product } from "../types/product.types";

const HomePage = () => {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get(
          "/products"
        );

        setProducts(res.data.products);
      } catch (err) {
        // console.error(error);
        setError("Failed loading products")
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;