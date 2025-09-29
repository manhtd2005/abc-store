import { createContext, useState, useCallback, useEffect } from "react";
import { getProductById, getProducts } from "../services/productsService";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // State toàn cục
  const [products, setProducts] = useState([]);

  // Lấy danh sách tất cả sản phẩm
  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(
        data.map((p) => ({
          ...p,
          id: p._id || p.id,
        }))
      );
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  }, []);

  // Lấy thông tin sản phẩm theo id
  const fetchProductById = useCallback(async (id) => {
    try {
      return await getProductById(id);
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    setProducts,
    fetchProducts,
    fetchProductById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
