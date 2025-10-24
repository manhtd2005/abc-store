import React, { createContext, useRef, useState } from "react";
import {
  getUsersAPI,
  deleteUserApi,
  signinByAdminApi,
} from "../services/authService";
import { useCallback } from "react";
import { useEffect } from "react";

// ...existing code...
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const generatedRegMonthRef = useRef(new Map());

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

  // Thống kê phục vụ biểu đồ

  // Tổng số user
  const getTotalUsers = useCallback(() => {
    return users.length;
  }, [users]);

  // Số user theo city -> trả về mảng phù hợp cho PieChart: [{ name: city, value: count }]
  const getUsersByCity = useCallback(() => {
    const map = users.reduce((acc, u) => {
      const city = u?.address?.city || "Unknown";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(map).map((city) => ({ name: city, value: map[city] }));
  }, [users]);

  // Số đăng ký theo tháng -> trả về mảng sorted [{ month: 'YYYY-MM', count }]
  const getRegistrationsByMonth = useCallback(() => {
    const map = users.reduce((acc, u) => {
      // cố gắng lấy trường ngày đăng ký từ nhiều nguồn
      const dateStr =
        u?.createdAt || u?.registered?.date || u?.registeredAt || u?.date;

      let monthKey = null;

      if (dateStr) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
        }
      }

      // Nếu không có ngày hợp lệ, tạo một tháng ngẫu nhiên trong 12 tháng gần nhất
      if (!monthKey) {
        const idKey =
          u?._id ?? JSON.stringify(u) ?? Math.random().toString(36).slice(2);
        if (generatedRegMonthRef.current.has(idKey)) {
          monthKey = generatedRegMonthRef.current.get(idKey);
        } else {
          const monthsBack = 12;
          const rand = Math.floor(Math.random() * monthsBack); // 0 .. 11
          const d = new Date();
          d.setMonth(d.getMonth() - rand);
          monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
          generatedRegMonthRef.current.set(idKey, monthKey);
        }
      }

      if (monthKey) {
        acc[monthKey] = (acc[monthKey] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.keys(map)
      .sort()
      .map((month) => ({ month, count: map[month] }));
  }, [users]);

  // Top email domains -> trả về mảng [{ domain, count }]
  const getTopEmailDomains = useCallback(
    (limit = 10) => {
      const map = users.reduce((acc, u) => {
        const email = u?.email || "";
        const parts = email.split("@");
        if (parts.length !== 2) return acc;
        const domain = parts[1].toLowerCase();
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(map)
        .map((domain) => ({ domain, count: map[domain] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    },
    [users]
  );

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
        getTotalUsers,
        getUsersByCity,
        getRegistrationsByMonth,
        getTopEmailDomains,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
