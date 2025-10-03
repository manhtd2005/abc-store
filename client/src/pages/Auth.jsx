import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ModalSuccess from "../components/common/ModalSuccess";
import { toast } from "react-toastify";
const Auth = () => {
  const { loginUser, signinUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({}); // lưu lỗi

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const email = emailRef.current?.value.trim();

    // kiểm tra lỗi trước
    let newErrors = {};
    if (!username) newErrors.username = "Please enter username";
    if (!password) newErrors.password = "Please enter password";
    if (!isLogin && !email) newErrors.email = "Please enter email";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (isLogin) {
      // Đăng nhập
      const res = await loginUser({ username, password });
      if (res?.success) {
        navigate("/");
        toast.success("Login success");
      } else {
        // hiển thị lỗi tổng quát
        setErrors({ form: res?.message || "Error login" });
      }
    } else {
      // Đăng ký
      const res = await signinUser({ username, email, password });
      if (res?.success) {
        setShowSuccessModal(true);
      } else {
        setErrors({ form: res?.message || "Eror signin" });
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
          {/* ---------------------Email------------------ */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          )}

          {/* ---------------------Username------------------------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Enter your username"
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* -------------------------Password------------------------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* ----------------------Error message--------------------------- */}
          {errors.form && (
            <p className="text-red-500 text-center mb-2">{errors.form}</p>
          )}

          {/* -------------------------------Action------------------------------- */}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
            className="p-1 hover:underline text-blue-500 cursor-pointer text-sm float-right"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>

          {/* -------------------------------- Button Submit------------------------------- */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300 font-semibold"
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>
      </div>

      {/* -------------------------Modal Success-------------------------- */}
      {showSuccessModal && (
        <ModalSuccess
          message="Signin success! Please OK to login."
          onClose={() => {
            setIsLogin(true);
            setShowSuccessModal(false);
            navigate("/auth");
          }}
          url="/auth"
        />
      )}
    </div>
  );
};

export default Auth;
