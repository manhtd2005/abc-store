import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from "../contexts/ProductContext";

export default function AddProducts() {
  const { addProduct } = useContext(ProductContext);

  const [images, setImages] = useState([null, null, null, null]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (index, file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    const newImages = [...images];
    newImages[index] = { file, preview: previewUrl };
    setImages(newImages);
  };

  const handleCreate = () => {
    // Validate
    const hasImage = images.some((img) => img !== null);
    if (!hasImage) {
      toast.error("Please add at least 1 image!");
      return;
    }
    if (!productName.trim()) {
      toast.error("Product name is required!");
      return;
    }
    if (!category.trim()) {
      toast.error("Category is required!");
      return;
    }
    if (!price || Number(price) <= 0) {
      toast.error("Valid price is required!");
      return;
    }

    // Thêm sản phẩm vào context
    addProduct({
      title: productName,
      category,
      price: Number(price),
      image: images.find((img) => img !== null)?.preview || "", // lấy ảnh đầu tiên
    });

    toast.success("Successfully create new product!");

    // Reset form
    images.forEach((img) => {
      if (img?.preview) URL.revokeObjectURL(img.preview);
    });
    setImages([null, null, null, null]);
    setProductName("");
    setCategory("");
    setPrice("");
  };

  return (
    <div className="p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🛒</span>
        <h1 className="text-2xl font-bold">Add Product</h1>
      </div>

      {/* Form */}
      <div className="space-y-4 max-w-lg">
        {/* Add Images */}
        <div>
          <label className="block font-medium mb-2">Add Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 border rounded flex items-center justify-center bg-gray-50 overflow-hidden"
              >
                <input
                  key={img ? img.preview : `input-${idx}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(idx, e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {img ? (
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">+ Add</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product name */}
        <div>
          <label className="block font-medium mb-1">Product name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block font-medium mb-1">Categories</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <div className="flex items-center">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
            <span className="ml-2 font-semibold">$</span>
          </div>
        </div>

        {/* Button */}
        <div>
          <button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Create Product
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
