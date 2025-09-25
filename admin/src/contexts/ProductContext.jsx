import { createContext, useState, useEffect, useCallback } from "react";
import {
  getProducts,
  deleteProductById,
  updateProductById,
  getProductById,
  createProduct,
} from "../services/productService";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // State toàn cục
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách sản phẩm
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy 1 sản phẩm theo ID
  const fetchProductById = useCallback(async (id) => {
    try {
      return await getProductById(id);
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  }, []);

  // Cập nhật sản phẩm
  const updateProduct = useCallback(async (id, productData) => {
    try {
      const updated = await updateProductById(id, productData);
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }, []);

  // Thêm sản phẩm
  const addProduct = useCallback(async (newProduct) => {
    try {
      const created = await createProduct(newProduct);
      setProducts((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }, []);

  // Xóa sản phẩm
  const removeProduct = useCallback(async (id) => {
    try {
      await deleteProductById(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }, []);

  // Fetch lần đầu khi component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const listValue = {
    products,
    setProducts,
    loading,
    setLoading,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={listValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
