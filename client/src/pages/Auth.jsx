import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const { loginUser, signinUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current.value;

    if (isLogin) {
      const res = await loginUser({ username, password });
      if (res?.success) {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error(res?.message);
      }
    } else {
      const res = await signinUser({ username, email, password });
      if (res?.success) {
        toast.success("Đăng ký thành công!");
        setIsLogin(true);
        passwordRef.current.value = "";
      } else {
        toast.error(res?.message);
      }
    }
  };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {isLogin ? "Login to your account" : "Sign up to get started"}
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter your username"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="hover:underline text-blue-500"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300 font-semibold"
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
