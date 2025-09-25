import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import ProductItemView from "../components/ProductItemView";

const AllProducts = () => {
  const { products, loading, removeProduct } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p className="ml-3 text-gray-600">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📦 Product List</h2>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-sm text-gray-700">
              <th className="px-5 py-3 border-b">Image</th>
              <th className="px-5 py-3 border-b">Product Name</th>
              <th className="px-5 py-3 border-b">Category</th>
              <th className="px-5 py-3 border-b text-right">Price</th>
              <th className="px-5 py-3 border-b text-center">Quantity</th>
              <th className="px-5 py-3 border-b text-center">Operate</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-800">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  {/* Image */}
                  <td className="px-5 py-4 border-b">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Product Name */}
                  <td className="px-5 py-4 border-b">
                    <div className="max-w-[360px] font-medium break-words">
                      {product.title}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 border-b">
                    <span className="px-3 py-1 rounded-full whitespace-nowrap bg-blue-100 text-blue-700 text-xs font-semibold">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 border-b text-right">
                    <span className="font-semibold text-green-600">
                      ${product.price}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-5 py-4 border-b text-center">
                    <span className="px-2 py-1 text-sm rounded bg-gray-100 text-gray-700">
                      {product.rating?.count}
                    </span>
                  </td>

                  {/* Operate */}
                  <td className="px-5 py-4 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="px-3 py-1.5 text-sm bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-lg shadow transition"
                        onClick={() => handleView(product)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="px-3 py-1.5 text-sm bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-lg shadow transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-8">
                  🚫 Không có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Gọi modal */}
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default AllProducts;
