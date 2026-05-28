import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      const res = await API.post(
        "/auth/register",
        formData
      );

      console.log(res.data);
    } catch (error) {
      console.error(error);
        toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3"
        />

      
        

        <button className="bg-black text-white px-4 py-2 rounded 
hover:bg-gray-800 
hover:scale-105 
active:scale-95 
transition 
duration-200">
          Register
        </button>
        
      </form>
    </div>
  );
};

export default RegisterPage;