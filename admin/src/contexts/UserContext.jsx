import React, { createContext, useState } from "react";
import {
  getUsersAPI,
  deleteUserApi,
  signinByAdminApi,
} from "../services/authService";
import { useCallback } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Đăng ký dưới quyền admin
  const signinUser = async ({
    email,
    username,
    password,
    name: { firstname, lastname },
    phone,
    address: { city, street, number, zipcode },
  }) => {
    try {
      const res = await signinByAdminApi({
        email,
        username,
        password,
        name: { firstname, lastname },
        phone,
        address: { city, street, number, zipcode },
      });
      if (res && res.success) {
        // Thêm user mới vào state ngay lập tức
        const newUser = {
          _id: res.user._id,
          username: res.user.username,
          email: res.user.email,
          name: { firstname, lastname },
          phone,
          address: { city, street, number, zipcode },
        };

        setUsers((prev) => [...prev, newUser]);
        return { success: true, message: "Register success" };
      }
      return { success: false, message: res.message || "Register false" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error Register" };
    }
  };

  // Lấy thông tin tất cả users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsersAPI();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Xoá user
  const removeUser = useCallback(async (id) => {
    try {
      await deleteUserApi(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        signinUser,
        fetchUsers,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
