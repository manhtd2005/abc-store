import api from "./api";

export const getCategories = async () => {
    const res = await api.get("products/categories");
    return res.data;
};

export const getCategoriesByCategory = async (category) => {
    const res = await api.get(`products/category/${category}`);
    return res.data;
};
