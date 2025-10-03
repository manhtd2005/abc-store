import { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { NotificationContext } from "../contexts/NotificationContext";
import ProductItemView from "../components/ProductItemView";
import DeleteModel from "../components/DeleteModel";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { products, loading, removeProduct, updateProduct } =
    useContext(ProductContext);

  const { addNotification } = useContext(NotificationContext);

  const [selectedProduct, setSelectedProduct] = useState(null); // xem chi tiết
  const [deleteTarget, setDeleteTarget] = useState(null); // lưu sản phẩm muốn xóa

  // Xem sản phẩm khi bật view
  const handleView = (product) => setSelectedProduct(product);

  // Lưu thông tin sản phẩm
  const handleSaveProduct = (updatedProduct) => {
    if (updatedProduct?._id) {
      updateProduct(updatedProduct._id, updatedProduct);
      setSelectedProduct(null);
      toast.success("Product updated successfully");
      addNotification(`Product "${updatedProduct.title}" had update.`);
    }
  };

  // Đóng modal
  const handleCloseModal = () => setSelectedProduct(null);

  // Đồng ý xóa sản phẩm
  const handleConfirmDelete = () => {
    if (deleteTarget?._id) {
      removeProduct(deleteTarget._id);
      setDeleteTarget(null);
      toast.success("Product removed successfully");
      addNotification(`Sản phẩm "${deleteTarget.title}" đã bị xoá.`);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        <p className="ml-3 text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📦 Product List</h2>
      </div>

      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-left text-sm text-gray-700">
              <th className="px-5 py-3 border-b">Image</th>
              <th className="px-5 py-3 border-b">Product Name</th>
              <th className="px-5 py-3 border-b">Category</th>
              <th className="px-5 py-3 border-b text-right">Price</th>
              <th className="px-5 py-3 border-b text-center">Operate</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-800">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  {/* ------------------------- Image ---------------------------------------*/}
                  <td className="px-5 py-4 border-b">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={product.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* -----------------------Product Name --------------------------------*/}
                  <td className="px-5 py-4 border-b max-w-[360px] font-medium break-words">
                    {product.title}
                  </td>

                  {/*------------------------ Category ----------------------------------*/}
                  <td className="px-5 py-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold ${
                        product.category === "men's clothing"
                          ? "bg-green-100 text-green-700"
                          : product.category === "jewelery"
                          ? "bg-yellow-100 text-yellow-700"
                          : product.category === "electronics"
                          ? "bg-purple-100 text-purple-700"
                          : product.category === "women's clothing"
                          ? "bg-pink-100 text-pink-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/*------------------------- Price ---------------------------------*/}
                  <td className="px-5 py-4 border-b text-right">
                    <span className="font-semibold text-green-600">
                      {product.price} VND
                    </span>
                  </td>

                  {/*----------------------- Operate ------------------------------------*/}
                  <td className="px-5 py-4 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleView(product)}
                        className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(product)}
                        className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
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
                  🚫 No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*---------------------- Modal View Product -------------------------*/}
      {selectedProduct && (
        <ProductItemView
          product={selectedProduct}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
        />
      )}

      {/*-------------------- Modal Delete -------------------------------*/}
      {deleteTarget && (
        <DeleteModel
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AllProducts;
