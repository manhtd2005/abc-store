import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const ProductItem = ({ product }) => {
  // Map category -> class màu
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

  return (
    <Link
      to={`/product/${product.id || product._id}`}
      className="group relative p-4 w-full border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
    >
      {/* ------------------------------Category------------------------------ */}
      <span
        className={`absolute top-4 left-4 px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
          product.category
        )}`}
      >
        {product.category}
      </span>

      {/* ------------------------------Image------------------------------ */}
      <div className="mt-6 w-full flex justify-center flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 sm:h-64 object-contain transition-transform duration-300 group-hover:scale-105 rounded-lg"
        />
      </div>

      <div className="mt-4 w-full flex flex-col items-center text-center flex-1">
        {/* ------------------------------Title------------------------------ */}
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-amber-600">
          {product.title}
        </h3>

        {/* ------------------------------Rating------------------------------ */}
        <div className="flex items-center justify-center gap-1 mt-2 text-sm">
          {product.rating?.rate > 0 && (
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.round(product.rating.rate)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  } transition-transform duration-200 hover:scale-110`}
                />
              ))}
            </div>
          )}
          <span className="text-gray-500 font-medium ml-1">
            {product.rating?.rate.toFixed(1)}
          </span>
          <span className="text-gray-400">({product.rating?.count})</span>
        </div>

        {/* ------------------------------Price------------------------------ */}
        <div className="mt-2 text-xl font-bold text-amber-600 transition-colors duration-300 group-hover:text-amber-700">
          ${product.price}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
