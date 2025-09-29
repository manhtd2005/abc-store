import React, { createContext, useState, useEffect } from "react";
import { loginApi, signinApi, getUserById } from "../services/authService";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // Lưu token vào localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Lưu user vào localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Đăng nhập (chỉ username + password)
  const loginUser = async ({ username, password }) => {
    try {
      const res = await loginApi({ username, password });
      if (res && res.success) {
        setToken(res.token);
        const decoded = jwtDecode(res.token);
        const userId = decoded._id || decoded.id;
        const u = await getUserById(userId);
        setUser(u.user);
        return {
          success: true,
          message: res.message || "Đăng nhập thành công",
        };
      }
      return { success: false, message: res.message || "Đăng nhập thất bại" };
    } catch (error) {
      console.error("Error login user:", error);
      return { success: false, message: "Có lỗi xảy ra khi đăng nhập" };
    }
  };

  // Đăng ký (username + email + password)
  const signinUser = async ({ username, email, password }) => {
    try {
      const res = await signinApi({ username, email, password });
      // giả sử API của bạn trả về { success: true, token: "...", message: "..."}
      if (res && res.success) {
        setToken(res.token);
        const decoded = jwtDecode(res.token);
        const userId = decoded._id || decoded.id;
        const u = await getUserById(userId);
        setUser(u.user);
        return { success: true, message: res.message || "Đăng ký thành công" };
      }
      // quan trọng: return object khi thất bại
      return { success: false, message: res.message || "Đăng ký thất bại" };
    } catch (error) {
      console.error("Error signin user:", error);
      return { success: false, message: "Có lỗi xảy ra khi đăng ký" };
    }
  };

  // Lấy thông tin 1 user theo _id
  const fetchUserById = async (id) => {
    try {
      const res = await getUserById(id);
      if (res.success) {
        setUser(res.user);
      } else {
        console.error(res.message);
      }
      return res;
    } catch (error) {
      console.log("Error fetch user by id:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi lấy thông tin user",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginUser, signinUser, logout, fetchUserById }}
    >
      {children}
    </AuthContext.Provider>
  );
};
