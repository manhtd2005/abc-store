import api from "./api";

export const placeOrderCOD = async ({ userId, items, contact = {}, total }) => {
  const res = await api.post("/order/cod", { userId, items, contact, total });
  return res.data;
};

export const placeOrderMBBank = async ({
  userId,
  items,
  contact = {},
  total,
}) => {
  const res = await api.post("/order/mbbank", {
    userId,
    items,
    contact,
    total,
  });
  return res.data;
};

export const placeOrderTechcombank = async ({
  userId,
  items,
  contact = {},
  total,
}) => {
  const res = await api.post("/order/techcombank", {
    userId,
    items,
    contact,
    total,
  });
  return res.data;
};

// Admin: lấy tất cả đơn hàng
export const getAllOrders = async () => {
  const res = await api.get("/order/allOrders");
  return res.data;
};

// Lấy đơn hàng của 1 user (bắt buộc truyền userId vì route backend hiện tại là /userOrders/:userId)
export const getUserOrders = async (userId) => {
  if (!userId) throw new Error("userId is required");
  const res = await api.get(`/order/userOrders/${userId}`);
  return res.data;
};
