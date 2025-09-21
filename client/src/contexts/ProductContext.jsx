import { createContext, useState, useEffect, Children } from "react";
import axios from 'axios'
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API lấy sản phẩm
   axios.get("https://fakestoreapi.com/products")
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
