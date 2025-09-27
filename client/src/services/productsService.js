import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/products/list");
  return res.data.products;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/single/${id}`);
  return res.data.product;
};
