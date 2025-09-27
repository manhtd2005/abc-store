import api from "./api";

// Route đăng nhập
export const loginApi = async (credentials) => {
  const res = await api.post("/users/login", credentials);
  return res.data;
};

// Route đăng ký
export const signinApi = async (userData) => {
  const res = await api.post("/users/register", userData);
  return res.data;
};

// Lấy tất cả user
export const getAllUsers = async () => {};
// Lấy thông tin 1 user
export const getUserById = async () => {};
