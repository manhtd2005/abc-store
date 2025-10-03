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

export const getUsersAPI = async () => {
    const res = await api.get("/users/allusers")
    return res.data;
}

// Lấy thông tin 1 user theo id
export const getUserById = async (id) => {
  const res = await api.get(`/users/user/${id}`);
  return res.data;
};

// Cập nhật thông tin user
export const updateUserApi = async (id, data) => {
  const res = await api.put(`/users/update/${id}`, data);
  return res.data;
};

// Cập nhật password của user
export const changePasswordApi = async (id, data) => {
  const res = await api.put(`/users/change-password/${id}`, data);
  return res.data;
};
