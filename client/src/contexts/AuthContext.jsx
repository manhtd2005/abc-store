import React, { createContext, useState } from "react";
import { loginApi, signinApi } from "./authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  // State lưu token và thông tin user
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Đăng nhập
  const loginUser = async (credentials) => {
    try {
      // credentials = { email, password }
      const res = await loginApi(credentials);
      if (res.success) {
        setToken(res.token);
        // nếu backend trả thêm thông tin user thì setUser(res.user)
        // còn không thì tự decode token hoặc fetch user info
      } else {
        console.error(res.message);
      }
      return res; // trả ra để component xử lý tiếp (thông báo lỗi,…)
    } catch (error) {
      console.log("Error login user:", error);
    }
  };

  // Đăng ký
  const signinUser = async (userData) => {
    try {
      // userData = { username, email, password }
      const res = await signinApi(userData);
      if (res.success) {
        setToken(res.token);
        // setUser(res.user) nếu backend trả về
      } else {
        console.error(res.message);
      }
      return res;
    } catch (error) {
      console.log("Error signin user:", error);
    }
  };

  // Đăng xuất
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    loginUser,
    signinUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
