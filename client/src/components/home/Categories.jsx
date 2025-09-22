import React, { useContext } from "react";
import Title from "../common/Title";
import { CategoriesContext } from "../../contexts/CategoryContext";
import { Link } from "react-router-dom";

const Categories = () => {
    const { categories } = useContext(CategoriesContext);
    return (
        <div className="py-8 px-4">
            <Title text1="ALL" text2="CATEGORIES" />

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((item, index) => (
                    <Link
                        key={index}
                        to={`/categories/${item}`}
                        className="block px-4 py-2 text-center text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white shadow transition"
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
