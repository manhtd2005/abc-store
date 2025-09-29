import api from "./api";

// Đăng nhập
export const loginApi = async (credentials) => {
  const res = await api.post("/users/login", credentials);
  return res.data;
};

// Đăng ký
export const signinApi = async (userData) => {
  const res = await api.post("/users/register", userData);
  return res.data;
};

// Lấy thông tin 1 user theo id
export const getUserById = async (id) => {
  const res = await api.get(`/users/single/${id}`);
  return res.data;
};
