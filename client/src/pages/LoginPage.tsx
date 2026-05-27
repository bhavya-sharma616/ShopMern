import { useState } from "react";

import { useAppDispatch } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import { loginSuccess } from "../features/auth/authSlice";


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
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
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

        <button className="bg-black text-white p-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;