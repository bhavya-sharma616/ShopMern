import { useState } from "react";

import { useAppDispatch } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );

      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token,
        })
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <button className="bg-black text-white px-4 py-2 rounded 
hover:bg-gray-800 
hover:scale-105 
active:scale-95 
transition 
duration-200">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;