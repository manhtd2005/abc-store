import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAdminContext } from "../contexts/AuthAdminContext";
import { toast } from "react-toastify";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthAdminContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra đăng nhập
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (login(username, password)) {
      setError("");
      navigate("/allProducts");
      toast.success("Login account admin success");
    } else {
      setError("Error username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500">
          Please sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 focus:ring-4 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
