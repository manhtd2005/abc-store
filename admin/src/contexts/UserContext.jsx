import React, { createContext, useState, useEffect } from "react";
import {
  loginApi,
  signinApi,
  getUserById,
  getUsersAPI,
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  //Lấy thông tin tất cả users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsersAPI();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        loading,
        token,
        user,
        loginUser,
        signinUser,
        fetchUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
