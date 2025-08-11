import React, { useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginImg from "../../assets/loginImg.png";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = UseAuth();
  const [formData, setFormData] = useState({
    name: "",
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
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    await signup(formData);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create Your Account</h2>
          <form onSubmit={submitHandler} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                autoComplete="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
              />
            </div>
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
                autoComplete="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors cursor-pointer">
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-gray-800 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
          <img src={loginImg} alt="Login illustration" className="object-cover h-full w-full" style={{ maxHeight: "500px", maxWidth: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
