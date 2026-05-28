import { useState } from "react";
import type { ChangeEvent } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/products",
        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }
      );

      toast.success("Product Created");

      setFormData({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to create product");
    }
  };

return (
  <div className="min-h-screen bg-slate-50 px-4 py-10">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
      <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col justify-center">
        <p className="uppercase tracking-wide text-xs text-slate-400 mb-3">
          Admin Panel
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          Add New
          <br />
          Product
        </h1>

        <p className="mt-4 text-slate-300 leading-relaxed">
          Create and manage products for your store.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-2xl font-medium">
  Products
</h3>

<p className="text-sm text-slate-400 mt-1">
  Add or Update Items
</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-2xl font-medium">
              Admin
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Access
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Product Details
          </h2>

          <p className="text-slate-500 mt-2">
            Enter product information below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Product title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>

            <input
              type="text"
              name="description"
              placeholder="Product description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                placeholder="Stock quantity"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              placeholder="Paste image link"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <button
            className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  </div>
);
};


export default AdminPage;


