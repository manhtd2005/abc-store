import React, { useState } from "react";
import { X } from "lucide-react";
import DeleteModel from "./DeleteModel";

const ProductItemView = ({ product, onClose, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cập nhật input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu khi Success
  const handleSave = () => {
    const updatedProduct = { ...product, ...formData };
    onSave(updatedProduct);
    setIsEditing(false);
  };

  // Xác nhận xoá
  const confirmDelete = () => {
    onDelete(product.id);
    setShowDeleteModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden">
        {/* Nút X đóng modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="grid grid-cols-[1fr_2fr] h-full">
          {/* Left: Image */}
          <div className="bg-gray-100 flex flex-col items-center justify-center p-6">
            <img
              src={formData.image}
              className="max-h-[300px] object-contain rounded-lg shadow-md mb-4"
            />
            {isEditing && (
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg text-sm"
              />
            )}
          </div>

          {/* Right: Info */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-3 mt-7">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg font-semibold text-lg"
                  />

                  <div className="grid items-center grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg"
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg"
                    >
                      <option value="men's clothing">Men's clothing</option>
                      <option value="jewelery">Jewelery</option>
                      <option value="electronics">Electronics</option>
                      <option value="women's clothing">Women's clothing</option>
                    </select>
                  </div>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full h-[200px] resize-none border px-3 py-2 rounded-lg text-sm"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {formData.title}
                  </h2>
                  <p className="text-lg text-gray-700 font-semibold">
                    ${formData.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formData.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    <span className="font-medium text-gray-700">
                      {formData.category}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Rating:{" "}
                    <span className="font-medium text-yellow-600">
                      {product.rating?.rate} ★
                    </span>{" "}
                    ({product.rating?.count} reviews)
                  </p>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow transition"
                  >
                    Success
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg shadow transition"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow transition"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg shadow transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <DeleteModel
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ProductItemView;
