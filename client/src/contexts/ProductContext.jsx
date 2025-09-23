import { createContext, useState, useCallback, useEffect } from "react";
import { getProducts } from "../services/productsService";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // Lấy danh sách tất cả sản phẩm
    const fetchProducts = useCallback(async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Lấy thông tin sản phẩm theo id
    const fetchProductById = useCallback(async () => {}, []);

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
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
