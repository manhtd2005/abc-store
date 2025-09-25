import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ProductDetailRight = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = () => {
        // Logic to add the product to cart will be here
        alert(`Added ${quantity} of ${product.title} to cart!`);
    };

    return (
        <div className="lg:w-1/2 p-4 flex flex-col justify-between">
            <div>
                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
                    {product.title}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-sm mb-4">
                    {product.rating?.rate > 0 && (
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className={`
                                        ${i < Math.round(product.rating.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                    `}
                                />
                            ))}
                        </div>
                    )}
                    <span className="text-gray-500 font-medium ml-1">
                        {product.rating?.rate.toFixed(1)}
                    </span>
                    <span className="text-gray-400">
                        ({product.rating?.count})
                    </span>
                </div>

                {/* Price */}
                <div className="text-4xl font-extrabold text-amber-600 mb-6">
                    ${product.price}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                </p>
            </div>
            
            {/* Quantity and Add to Cart Button */}
            <div className="mt-8">
                <div className="flex items-center space-x-4 mb-6">
                    <span className="text-lg font-semibold text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                        <button
                            onClick={handleDecrement}
                            className="bg-gray-200 text-gray-700 w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-300 transition duration-300"
                        >
                            -
                        </button>
                        <span className="w-12 text-center text-lg font-semibold text-gray-900">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrement}
                            className="bg-gray-200 text-gray-700 w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-300 transition duration-300"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 text-white py-3 rounded-full text-lg font-medium hover:bg-gray-700 transition duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetailRight;