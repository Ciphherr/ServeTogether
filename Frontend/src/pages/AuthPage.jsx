import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios.js";

const AuthPage = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

console.log(import.meta.env.VITE_BASE_URL)

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const url = `/api/auth/${
      isLogin ? "login" : "register"
    }`;

    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

    const res = await api.post(url, payload);

    login(res.data.user);
    // Redirect after successful login/register
    navigate("/opportunities");
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


    return (
    <div className="min-h-screen flex flex-col gap-30 md:flex-row md:gap-0">
      {/* Left Gradient Section (Desktop only) */}
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-emerald-950 via-green-900 to-sky-900 items-center justify-center px-12">
        <h1 className="text-7xl font-bold text-center text-white tracking-tight">
           <p className="text-white opacity-60 pb-5 text-5xl"> Let's</p> 
          <span className="text-emerald-400">Serve</span>
          <span className="text-sky-400">Together</span>
        </h1>
      </div>

      <div className="w-full flex items-center justify-center py-12 md:hidden">
        <h1 className="text-3xl font-bold text-center text-white tracking-tight">
          <span className="text-emerald-400">Serve</span>
          <span className="text-sky-400">Together</span>
        </h1>
      </div>

      {/* Right Auth Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center text-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
        >
          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Create your account"}
            </h2>
            <p className="text-gray-500">
              {isLogin
                ? "Login to continue making an impact."
                : "Join us and start volunteering today."}
            </p>
          </div>

          {/* Name (Register only) */}
          {!isLogin && (
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              onChange={handleChange}
              className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>

          {/* Toggle */}
          <p className="text-sm text-center text-gray-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
