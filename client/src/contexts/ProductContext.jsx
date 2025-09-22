import { createContext, useState, useEffect, Children } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API lấy sản phẩm
        axios.get("https://fakestoreapi.com/products");
    }, []);

    const value = {
        products,
        setProducts,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
