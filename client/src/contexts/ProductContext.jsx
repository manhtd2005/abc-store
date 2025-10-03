import { createContext, useState, useCallback, useEffect } from "react";
import { getProductById, getProducts } from "../services/productsService";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // State toàn cục
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState({});

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

  // Find product by name
  const searchProducts = (keyword) => {
    if (!keyword.trim()) return products;
    return products.filter((p) =>
      p.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Set color for categories
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "men's clothing":
        return "bg-blue-100 text-blue-800";
      case "women's clothing":
        return "bg-pink-100 text-pink-800";
      case "jewelery":
        return "bg-yellow-100 text-yellow-800";
      case "electronics":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    setProducts,
    fetchProducts,
    fetchProductById,
    searchProducts,
    getCategoryColor,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
