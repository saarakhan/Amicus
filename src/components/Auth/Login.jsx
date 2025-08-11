import React, { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginImg from "../../assets/loginImg.png";
const Login = () => {
  const navigate = useNavigate();
  const { login } = UseAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const success = await login(formData);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
          <img src={loginImg} alt="Helping others" className="object-cover h-full w-full" style={{ maxHeight: "500px", maxWidth: "100%" }} />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h2>
          <form onSubmit={submitHandler} noValidate className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors cursor-pointer">
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-gray-800 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
