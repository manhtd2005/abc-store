import React, { createContext, useState, useEffect } from "react";
import {
  loginApi,
  signinApi,
  getUserById,
  updateUserApi,
  changePasswordApi,
} from "../services/authService";
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

  // Đăng nhập
  const loginUser = async ({ username, password }) => {
    try {
      const res = await loginApi({ username, password });
      if (res && res.success) {
        setToken(res.token);
        const decoded = jwtDecode(res.token);
        const userId = decoded.id; // bạn đã sign {id} trong token
        const u = await getUserById(userId);
        setUser(u.user);
        return { success: true, message: "Đăng nhập thành công" };
      }
      return { success: false, message: res.message || "Đăng nhập thất bại" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Có lỗi khi đăng nhập" };
    }
  };

  // Đăng ký
  const signinUser = async ({ username, email, password }) => {
    try {
      const res = await signinApi({ username, email, password });
      if (res && res.success) {
        return { success: true, message: "Đăng ký thành công" };
      }
      return { success: false, message: res.message || "Đăng ký thất bại" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Có lỗi khi đăng ký" };
    }
  };

  // Lấy lại thông tin user theo id
  const fetchUserById = async (id) => {
    try {
      const res = await getUserById(id);
      if (res.success) setUser(res.user);
      return res;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Có lỗi khi lấy user" };
    }
  };

  // Cập nhật thông tin user
  const updateUser = async (id, data) => {
    try {
      const res = await updateUserApi(id, data);
      if (res.success) setUser(res.user);
      return res;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Có lỗi khi cập nhật user" };
    }
  };

  // Đổi mật khẩu
  const changePassword = async (id, data) => {
    try {
      const res = await changePasswordApi(id, data);
      return res;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Có lỗi khi đổi mật khẩu" };
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
      value={{
        token,
        user,
        loginUser,
        signinUser,
        fetchUserById,
        updateUser,
        changePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
