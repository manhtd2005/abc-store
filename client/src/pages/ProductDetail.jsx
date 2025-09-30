// src/pages/ProductDetail.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { Star } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams();
  const { fetchProductById, getCategoryColor } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    if (productId) getData();
  }, [productId, fetchProductById]);

  if (!product) return <div className="text-center p-6">Loading...</div>;

  const stars = Math.round(product.rating?.rate || 0);

  return (
    <div className="max-w-5xl mx-auto  p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* ----------------------------- Image------------------------ */}
        <div className="flex justify-center items-center">
          {product.image ? (
            <img
              src={product.image}
              className="max-h-[500px] object-contain transform transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="text-gray-500">No Image</div>
          )}
        </div>

        <div>
          {/* -------------------------Title-------------------------------- */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600 cursor-default">
            {product.title}
          </h1>

          {/* ------------------------------Rating------------------------------------ */}
          <div className="flex items-center mb-3 cursor-default">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={22}
                className={`mr-1 transition-transform duration-200 ${
                  index < stars
                    ? "fill-yellow-400 text-yellow-400 hover:scale-125"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>

          {/* --------------------------------Description--------------------------------- */}
          <p className="text-gray-600 mb-4 leading-relaxed cursor-default">
            {product.description}
          </p>

          {/* -------------------------------Category------------------------------- */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getCategoryColor(
                product.category
              )}`}
            >
              {product.category}
            </span>
          </div>

          {/* -------------------------------- Price ------------------------------------ */}
          <p className="text-2xl font-semibold text-green-600 mb-4 transition-colors duration-300 hover:text-green-700 cursor-default">
            ${product.price}
          </p>

          {/* --------------------------------- Button add to cart ----------------------------- */}
          <button className="px-8 py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
