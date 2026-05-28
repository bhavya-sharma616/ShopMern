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
  <div className="bg-slate-50 min-h-screen">

    <section
      className="
        relative overflow-hidden
        min-h-[90vh]
        bg-gradient-to-br
        from-slate-950
        via-black
        to-slate-900
        text-white
        flex items-center
      "
    >
      <div
        className="
          absolute
          w-[500px] h-[500px]
          bg-white/10
          blur-3xl
          rounded-full
          top-[-100px]
          right-[-100px]
        "
      />
      <div
        className="
          max-w-7xl mx-auto
          px-6
          grid
           md:grid-cols-2
          gap-16
          items-center
          relative z-10
        "
      >
        <div>
          <p
            className="
              uppercase
              tracking-[0.4em]
              text-sm
              text-slate-300
              mb-5
            "
          >
            Shop Online
          </p>
          <h1
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-semibold
              leading-tight
              tracking-tight
            "
          >
           Explore<br />Latest<br />Products
          </h1>
          <p
            className="
              mt-8
              text-lg
              text-slate-300
              max-w-xl
              leading-relaxed
            "
          >
            Shop quality products with a clean and simple ecommerce experience.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => {
                document
                  .getElementById(
                    "products-section"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="
                 px-7 py-3.5
  rounded-lg
  bg-white
  text-slate-900
  font-medium
  hover:bg-slate-100
  transition"
            >
              Shop Now
            </button>
            <button
              className="
                
  px-7 py-3.5
  rounded-lg
  border border-white/20
  text-white
  font-medium
  hover:bg-white/10
  transition

              "
            >
              Explore More
            </button>
          </div>
        </div>
        <div
          className="
            hidden md:flex
            justify-center
            items-center
          "
        >
          <img
            src="https://imgs.search.brave.com/1GTBOFT7SXonkxI3CbTvEOJAQHcqMFRCb5q6Tv6ZTUY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/NTA5NTE2L3Bob3Rv/L3Nob3BwaW5nLWJh/Z3Mtdy1jbGlwcGlu/Zy1wYXRoLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz02UXdS/ZWZvZUowQUdiWE9S/bmxDSzhNTHgyY1dq/dWM5VDMzOENyRHdf/VTFzPQ"
            alt="Hero"
            className="
              w-[500px]
              rounded-xl
              shadow-2xl
              hover:scale-105
              transition duration-500
            "
          />
        </div>
      </div>
    </section>

    <section
      className="
        max-w-7xl mx-auto
        px-6 py-20
      "
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        "
      >
        {[
          "Latest Products",
          "Fast Delivery",
          "Secure Payments",
          "24/7 Support",
        ].map((item) => (
          <div
            key={item}
            className="
              bg-white
              rounded-xl
              p-8
              shadow-md
              hover:shadow-xl
              hover:-translate-y-2
              transition duration-300
            "
          >
            <h3
              className="
                text-lg
                font-semibold
               text-slate-800
                leading-snug
                mb-3
              "
            >
              {item}
            </h3>
          </div>
        ))}
      </div>
    </section>

    <section
      id="products-section"
      className="
        max-w-7xl mx-auto
        px-6 py-20
      "
    >
      <div
        className="
          flex flex-col lg:flex-row
          justify-between
          gap-6
          mb-10
        "
      >
        <div>
          <h2
            className="
              text-3xl
              font-semibold
              tracking-tight
              text-slate-900
              tracking-tight
            "
          >
            Featured Products

          </h2>

          <p
            className="
              text-slate-500
              mt-3
            "
          >
            Explore our latest collection
          </p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full lg:w-[350px]
            px-5 py-4
            rounded-2xl
            border border-slate-200
            bg-white
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-black
          "
        />
      </div>

      <div
        className="
          flex flex-wrap
          gap-4
          mb-12
        "
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category
              )
            }
            className={`
              px-5 py-3
              rounded-lg
              font-medium
              transition duration-300
              hover:scale-105
              active:scale-95
              ${
                selectedCategory ===
                category
                  ? "bg-black text-white shadow-xl"
                  : "bg-white text-slate-700 border border-slate-200"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
        "
      >
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          )
        )}
      </div>
    </section>
  </div>
);
};

export default HomePage;