import api from "./api";

// Đăng ký user dưới quyền admin
export const signinByAdminApi = async (userData) => {
  const res = await api.post("/users/registeruseradmin", userData);
  return res.data;
};

// Lấy thông tin tất cả user
export const getUsersAPI = async () => {
  const res = await api.get("/users/allusers");
  return res.data;
};

// Lấy thông tin 1 user theo id
export const getUserById = async (id) => {
  const res = await api.get(`/users/user/${id}`);
  return res.data;
};

// Xóa user
export const deleteUserApi = async (id) => {
  const res = await api.delete(`/users/remove/${id}`);
  return res.data;
};
