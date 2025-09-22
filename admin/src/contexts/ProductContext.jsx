import { createContext, useState, useEffect } from "react";
import { getProducts, deleteProductById } from "../services/productService";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

// Provider
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm
  const removeProduct = async (id) => {
    try {
      await deleteProductById(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Fetch lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  const listValue = {
    products,
    setProducts,
    loading,
    setLoading,
    fetchProducts,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={listValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
