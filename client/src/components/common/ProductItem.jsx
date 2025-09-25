import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const ProductItem = ({ product }) => {
  return (
    <div className="group relative block p-4 w-full border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      {/* Category */}
      <p className="absolute top-4 left-4 text-xs uppercase font-semibold text-gray-400 tracking-wide z-10">
        {product.category}
      </p>

      {/* Image */}
      <div className="mt-3 w-full flex justify-center flex-shrink-0">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 sm:h-64 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="mt-4 w-full flex flex-col items-center text-center flex-1">
        {/* Title */}
        <Link to={`/product/${product.id}`} className="transition-colors duration-300">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-amber-600">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
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
                  }`}
                />
              ))}
            </div>
          )}
          <span className="text-gray-500 font-medium ml-1">
            {product.rating?.rate.toFixed(1)}
          </span>
          <span className="text-gray-400">({product.rating?.count})</span>
        </div>

        {/* Price */}
        <div className="mt-2 text-xl font-bold text-amber-600">
          ${product.price}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4 w-full justify-self-end">
        {/* View Button */}
        <Link
          to={`/product/${product.id}`}
          className="flex-1 border border-gray-300 py-2 rounded-full text-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition duration-300"
        >
          View
        </Link>
        {/* Add to Cart Button */}
        <button className="flex-1 bg-gray-900 text-white py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition duration-300">
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
