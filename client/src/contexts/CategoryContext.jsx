import { createContext, useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    // Lấy danh sách category
    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const value = { categories, setCategories, fetchCategories };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesProvider;
