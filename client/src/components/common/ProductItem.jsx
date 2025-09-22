import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const ProductItem = ({ product }) => {
    return (
        <Link
            to={`/product/${product.id}`}
            className="group p-4 w-full border rounded-2xl flex flex-col bg-white shadow-md hover:shadow-xl transition duration-300"
        >
            {/* Category */}
            <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide">
                {product.category}
            </p>

            {/* Image */}
            <div className="mt-3 w-full flex justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-[90%] aspect-[4/3] object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Info */}
            <div className="mt-4 w-full flex flex-col gap-3">
                {/* Title */}
                <h3 className="text-base font-bold text-gray-800 line-clamp-2 group-hover:text-amber-600 transition">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                    />
                    <span>{product.rating?.rate}</span>
                    <span className="text-gray-400">
                        ({product.rating?.count})
                    </span>
                </div>

                {/* Price */}
                <div className="text-lg font-bold text-amber-600">
                    ${product.price}
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
