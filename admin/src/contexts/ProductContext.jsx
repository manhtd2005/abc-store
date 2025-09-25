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

      // Chuẩn hoá: thêm field images[]
      const normalized = data.map((p) => ({
        ...p,
        images: p.image ? [p.image] : p.images || [],
      }));

      setProducts(normalized);
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

  // ✅ Thêm sản phẩm mới (giữ ở local state, chưa gọi API fakestore)
  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: Date.now(),
        rating: { count: 1 },
        images: product.images || (product.image ? [product.image] : []), // luôn là array
      },
    ]);
  };

  const updateProduct = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
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
    addProduct, // thêm vào context
    updateProduct
  };

  return (
    <ProductContext.Provider value={listValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
