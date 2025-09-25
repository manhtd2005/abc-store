import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy id từ URL
  const { fetchProductById } = useContext(ProductContext);

  const [product, setProduct] = useState(null); // Lưu sản phẩm được lấy

  // Khi id thay đổi → gọi API lấy sản phẩm
  useEffect(() => {
    const getData = async () => {
      const data = await fetchProductById(productId);
      setProduct(data);
    };

    if (productId) getData();
  }, [productId, fetchProductById]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-semibold text-green-600 mb-2">
        ${product.price}
      </p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
    </div>
  );
};

export default ProductDetail;
