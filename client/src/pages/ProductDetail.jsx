import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products"; // Import shared products data

/**
 * ProductDetail.jsx
 * - Displays product details based on productId from URL
 * - Uses Tailwind CSS for styling
 * - Links back to /collection
 */

const ProductDetail = () => {
  const { productId } = useParams(); // Use productId to match App.jsx route
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Product Not Found</h2>
          <Link
            to="/collection"
            className="mt-4 inline-block bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {product.name}: {product.price}
            </h2>
            <p className="text-lg text-gray-600 mt-2">{product.category}</p>
            <p className="text-lg text-gray-600 mt-2">{product.rating} ★</p>
            <div className="mt-6 flex gap-4">
              <Link
                to="/collection"
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Back to Collection
              </Link>
              <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;