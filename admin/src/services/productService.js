import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/products/list");
  return res.data.products;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/single/${id}`);
  return res.data.product;
};

export const createProduct = async (productData) => {
  // productData = { title, price, description, category, rating, imageFile }
  const formData = new FormData();
  formData.append("title", productData.title);
  formData.append("price", productData.price);
  formData.append("description", productData.description);
  formData.append("category", productData.category);

  // Rating stringify để backend parse
  formData.append(
    "rating",
    JSON.stringify(productData.rating || { rate: 0, count: 0 })
  );

  // File ảnh
  if (productData.image) {
    formData.append("image", productData.image);
  }

  const res = await api.post("/products/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.product;
};
export const updateProductById = async (id, updateData) => {
  const res = await api.put(`/products/update/${id}`, updateData);
  return res.data.product;
};

export const deleteProductById = async (id) => {
  await api.delete(`/products/remove/${id}`);
};
