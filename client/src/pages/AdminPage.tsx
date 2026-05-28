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
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin Product Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="border p-3"
        />

        <button className="bg-black text-white p-3">
          Create Product
        </button>
      </form>
    </div>
  );
};


export default AdminPage;


