import {useEffect,useState} from "react";

import { toast } from "react-hot-toast";
import { useNavigate, useParams,} from "react-router-dom";

import API from "../api/axios";

const EditProductPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    });

      useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(
          `/admin/products/${id}`
        );

        const product =
          res.data.product;

        setFormData({
          title: product.title,
          description:
            product.description,
          price: String(
            product.price
          ),
          image: product.image,
          category:
            product.category,
          stock: String(
            product.stock
          ),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

    const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.put(
        `admin/products/${id}`,
        {
          ...formData,
          price: Number(
            formData.price
          ),
          stock: Number(
            formData.stock
          ),
        }
      );

      toast.success("Product updated");

      navigate(
        "/admin/products"
      );
    } catch (error) {
      console.error(error);

      toast.error("Update failed");
    }
  };

    return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl
md:text-3xl
font-semibold
tracking-tight
text-slate-900 mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="border p-3"
        />

        <button className="bg-black text-white p-3">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;