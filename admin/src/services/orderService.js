import api from "./api";

// Admin: lấy tất cả đơn hàng
export const getAllOrders = async () => {
  const res = await api.get("/order/allOrders");
  return res.data;
};
