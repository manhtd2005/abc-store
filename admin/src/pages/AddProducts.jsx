import { useState, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { toast } from "react-toastify";

export default function AddProducts() {
  const { addProduct } = useContext(ProductContext);

  // State form
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men's clothing");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(0);
  const [count, setCount] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle khi chọn file ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description || !imageFile) {
      toast.error("Please fill all required fields and select an image.");
      return;
    }

    const clampedRate = Math.min(Math.max(rate, 0), 5);

    try {
      await addProduct({
        title,
        price,
        description,
        category,
        rating: { rate: clampedRate, count },
        image: imageFile,
      });

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("men's clothing");
      setRate(0);
      setCount(0);
      setImageFile(null);
      setImagePreview(null);

      toast.success("Product created successfully!");
    } catch (error) {
      toast.error("Error creating product.");
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🛒 Add Product
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Image + Rating */}
          <div className="grid grid-cols-2 gap-6">
            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600 
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-600
                         hover:file:bg-blue-100
                         cursor-pointer"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-40 h-40 object-contain border rounded"
                />
              )}
            </div>

            {/* Rating */}
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (Rate)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value)) value = 0;
                    // Giới hạn từ 0 đến 5
                    if (value < 0) value = 0;
                    if (value > 5) value = 5;
                    setRate(value);
                  }}
                  placeholder="Enter rate"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (Count)
                </label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="Enter count"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setPrice("");
                setDescription("");
                setCategory("men's clothing");
                setRate(0);
                setCount(0);
                setImageFile(null);
                setImagePreview(null);
              }}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
