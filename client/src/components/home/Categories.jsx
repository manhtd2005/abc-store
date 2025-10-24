import React, { useContext } from "react";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import { Tv, Gem, Shirt, ShoppingBag } from "lucide-react";
import { ProductContext } from "../../contexts/ProductContext";

const Categories = () => {
  const { setFilterProducts } = useContext(ProductContext);

  const categoryList = [
    { name: "electronics", icon: <Tv size={32} color="brown" /> },
    { name: "jewelery", icon: <Gem size={32} color="red" /> },
    { name: "men's clothing", icon: <Shirt size={32} color="blue" /> },
    { name: "women's clothing", icon: <ShoppingBag size={32} color="pink" /> },
  ];

  const handleCategoryClick = (category) => {
    // set category filter and clear other filters, so Collection page shows selected category
    setFilterProducts({
      category: [category],
      price: "",
      rating: "",
      sort: "",
      search: "",
    });
  };

  return (
    <div className="py-10 px-4 bg-gray-50">
      <Title text1="ALL" text2="CATEGORIES" />

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categoryList.map((cat, index) => (
          <Link
            key={index}
            to={`/collection`}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-1 transition duration-300"
          >
            <div className="text-blue-600">{cat.icon}</div>
            <p className="text-gray-700 font-medium capitalize">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
