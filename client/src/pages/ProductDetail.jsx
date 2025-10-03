import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { Star, Minus, Plus } from "lucide-react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import ModalQuestion from "../components/common/ModalQuestion";
import ProductRelated from "../components/common/ProductRelated";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { fetchProductById, getCategoryColor } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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

  const handleAddToCart = async () => {
    if (!token || !user) {
      setShowModal(true);
      return;
    }

    try {
      await addToCart(product._id, quantity);

      toast.success("Success to add product");
    } catch (error) {
      console.error("Error add to cart:", error);
      toast.error("Error to add product");
    }
  };

  return (
    <div className=" mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-10">
        <div className="flex justify-center items-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[500px] object-contain transform transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="text-gray-500">No Image</div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 transition-colors duration-300 hover:text-blue-600 cursor-default">
            {product.title}
          </h1>

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

          <p className="text-gray-600 mb-4 leading-relaxed cursor-default">
            {product.description}
          </p>

          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow-sm ${getCategoryColor(
                product.category
              )}`}
            >
              {product.category}
            </span>
          </div>

          <p className="text-4xl font-semibold text-green-600 mb-4 transition-colors duration-300 hover:text-green-700 cursor-default">
            ${product.price}
          </p>

          <div className="flex items-center mb-4">
            <button
              onClick={handleDecrease}
              className="px-3 py-2 bg-red-200 rounded-l hover:bg-red-300 active:scale-95"
            >
              <Minus size={18} />
            </button>
            <div className="px-4 py-2 bg-gray-100 text-center select-none">
              {quantity}
            </div>
            <button
              onClick={handleIncrease}
              className="px-3 py-2 bg-green-200 rounded-r hover:bg-green-300 active:scale-95"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-8 py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showModal && (
        <ModalQuestion
          question={"You need login to add product"}
          onYes={() => {
            setShowModal(false);
            navigate("/auth");
          }}
          onNo={() => setShowModal(false)}
        />
      )}

      <ProductRelated />
    </div>
  );
};

export default ProductDetail;
