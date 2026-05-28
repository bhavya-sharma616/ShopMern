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
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

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
  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];
  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
        selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold">
    Shopmern
  </h1>

  <p className="text-gray-500 mt-2">
    Discover premium products at the best prices
  </p>
  <br></br>

      <div className="flex gap-3 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`
  px-4 py-2 border rounded
  transition duration-200
  hover:scale-105
  active:scale-95
  ${
    selectedCategory === category
      ? "bg-black text-white"
      : "bg-white"
  }
`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mb-8">
  
</div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 w-full mb-6"
      />
      
      <p className="mb-4">
        {filteredProducts.length === 0 && search
          ? "No products match your search"
          : filteredProducts.length === 0
          ? "No products found in this category"
          : `Showing ${filteredProducts.length} products`
        } 
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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