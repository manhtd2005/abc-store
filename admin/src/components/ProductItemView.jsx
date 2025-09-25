import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const getImages = (product) => {
  if (!product) return [];
  if (Array.isArray(product.images) && product.images.length) return product.images;
  if (Array.isArray(product.image) && product.image.length) return product.image;
  if (typeof product.image === "string" && product.image) return [product.image];
  if (typeof product.images === "string" && product.images) return [product.images];
  return [];
};

const ProductItemView = ({ product, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [mainImage, setMainImage] = useState("");
  const [thumbs, setThumbs] = useState([]);

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
      const imgs = getImages(product);
      setThumbs(imgs);
      setMainImage(imgs[0] || "");
      setIsEditing(false);
    }
  }, [product]);

  if (!product || !editedProduct) return null; // ✅ tránh crash

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "count") {
      setEditedProduct((prev) => ({
        ...prev,
        rating: { ...(prev?.rating || {}), count: Number(value) },
      }));
      return;
    }

    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesCSVChange = (e) => {
    const csv = e.target.value;
    const arr = csv.split(",").map((s) => s.trim()).filter(Boolean);
    setThumbs(arr);
    setMainImage(arr[0] || "");
    setEditedProduct((prev) => ({ ...prev, images: arr, image: arr[0] || prev?.image }));
  };

  const handleSubmit = () => {
    const imgs = Array.isArray(editedProduct?.images)
      ? editedProduct.images
      : getImages(editedProduct);

    const normalized = {
      ...editedProduct,
      images: imgs,
      image: imgs[0] || editedProduct?.image || "",
    };

    if (onSave) onSave(normalized);
    setIsEditing(false);
    toast.success("Successfully updated!", { autoClose: 2000 });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span className="text-blue-600">📄</span>
            <span>Product Information</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer shadow"
            >
              {isEditing ? "Submit" : "Edit"}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-12 gap-6 p-6 overflow-auto">
          {/* Left thumbnails */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 flex gap-3">
            <div className="flex flex-col gap-3 w-20 md:w-28 overflow-y-auto max-h-[60vh] pr-1">
              {thumbs?.length > 0 ? (
                thumbs.map((t, i) => (
                  <div
                    key={i}
                    onClick={() => setMainImage(t)}
                    className={`w-full h-20 md:h-24 rounded-md overflow-hidden border cursor-pointer transition-shadow ${
                      mainImage === t ? "ring-2 ring-blue-400" : "hover:shadow-lg"
                    }`}
                  >
                    <img src={t} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="w-full h-20 rounded-md border flex items-center justify-center text-sm text-gray-400">
                  No images
                </div>
              )}
            </div>

            {/* Main image */}
            <div className="flex-1 rounded-md overflow-hidden border">
              {mainImage ? (
                <img src={mainImage} alt="main" className="w-full h-64 md:h-[320px] object-cover" />
              ) : (
                <div className="w-full h-64 md:h-[320px] flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Right info */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
            {/* ID */}
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-medium">{editedProduct?.id ?? "N/A"}</p>
            </div>

            {/* Title */}
            <div>
              <p className="text-sm text-gray-500">Title</p>
              {isEditing ? (
                <input
                  name="title"
                  value={editedProduct?.title ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
                />
              ) : (
                <p className="font-semibold text-gray-800">{editedProduct?.title ?? "N/A"}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <p className="text-sm text-gray-500">Price</p>
              {isEditing ? (
                <input
                  name="price"
                  type="number"
                  value={editedProduct?.price ?? ""}
                  onChange={handleChange}
                  className="w-40 border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-300"
                />
              ) : (
                <p className="font-semibold text-green-600">
                  ${editedProduct?.price ?? "0"}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-500">Description</p>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedProduct?.description ?? ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-gray-300"
                />
              ) : (
                <p className="text-gray-700">{editedProduct?.description ?? "No description"}</p>
              )}
            </div>

            {/* Images CSV */}
            {isEditing && (
              <div>
                <p className="text-sm text-gray-500">Images (comma separated URLs)</p>
                <input
                  type="text"
                  value={(editedProduct?.images && editedProduct.images.join(", ")) || ""}
                  onChange={handleImagesCSVChange}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-200"
                  placeholder="https://..., https://..., ..."
                />
                <p className="text-xs text-gray-400 mt-1">Click thumbnails to change main image.</p>
              </div>
            )}

            {/* Category + Count */}
            <div className="flex gap-6">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Category</p>
                {isEditing ? (
                  <input
                    name="category"
                    value={editedProduct?.category ?? ""}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-200"
                  />
                ) : (
                  <p className="font-semibold">{editedProduct?.category ?? "N/A"}</p>
                )}
              </div>

              <div className="w-40">
                <p className="text-sm text-gray-500">Count</p>
                {isEditing ? (
                  <input
                    name="count"
                    type="number"
                    value={editedProduct?.rating?.count ?? 0}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-200"
                  />
                ) : (
                  <p className="font-semibold">{editedProduct?.rating?.count ?? 0}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={() => {
              setIsEditing(false);
              const imgs = getImages(product);
              setThumbs(imgs);
              setMainImage(imgs[0] || "");
              setEditedProduct(product);
            }}
            className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemView;
