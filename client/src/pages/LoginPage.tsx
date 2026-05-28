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
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
      
      <div className="hidden md:flex bg-slate-900 text-white p-10 flex-col justify-center">
        <p className="uppercase tracking-wide text-xs text-slate-400 mb-3">
          Welcome Back
        </p>

        <h1 className="text-4xl font-semibold leading-tight">
          Login to
          <br />
          Your Account
        </h1>

      
      </div>

      <div className="p-8 md:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-slate-900">
            Login
          </h2>

          <p className="text-slate-500 mt-2">
            Enter your account details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <button
            className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-slate-900 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  </div>
);
};

export default LoginPage;