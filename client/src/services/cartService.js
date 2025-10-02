import api from "./api";

//  Lấy giỏ hàng của user hiện tại (lấy từ token)
export const getCartApi = async () => {
  const res = await api.get("/cart/get");
  return res.data;
};

//  Thêm sản phẩm vào giỏ hàng
export const addToCartApi = async (productId, quantity = 1) => {
  const res = await api.post("/cart/add", { productId, quantity });
  return res.data;
};

//  Cập nhật số lượng sản phẩm trong giỏ
export const updateCartApi = async (productId, quantity) => {
  const res = await api.post(`/cart/update/${productId}`, { quantity });
  return res.data;
};

//  Xoá sản phẩm khỏi giỏ
export const removeFromCartApi = async (productId) => {
  const res = await api.delete(`/cart/delete/${productId}`);
  return res.data;
};
